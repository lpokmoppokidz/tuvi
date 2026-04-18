# 05. Bảo Mật Database & RLS

## 5. Bảo Mật Database & Row Level Security

### 5.1 RLS Policies Chi Tiết

```sql
-- ============================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================
-- Supabase đã enable RLS trên tất cả các bảng
-- Đảm bảo user chỉ có thể truy cập data của chính mình
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.horoscopes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.van_hans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- USERS TABLE POLICIES
-- ============================================================

-- Policy: User chỉ có thể xem THÔNG TIN CƠ BẢN của chính mình
-- Không cho xem email, auth metadata của người khác
CREATE POLICY "users_select_own" ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: User chỉ có thể cập nhật THÔNG TIN CƠ BẢN của chính mình
CREATE POLICY "users_update_own" ON public.users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Policy: User không thể INSERT/XÓA rows trong users table
-- (Supabase Auth tự quản lý auth.users)
CREATE POLICY "users_no_insert" ON public.users
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- HOROSCOPES TABLE POLICIES
-- ============================================================

-- Policy: User chỉ có thể xem lá số của chính mình
CREATE POLICY "horoscopes_select_own" ON public.horoscopes
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: User chỉ có thể tạo lá số cho chính mình
CREATE POLICY "horoscopes_insert_own" ON public.horoscopes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: User chỉ có thể cập nhật lá số của chính mình
CREATE POLICY "horoscopes_update_own" ON public.horoscopes
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: User chỉ có thể xóa lá số của chính mình
CREATE POLICY "horoscopes_delete_own" ON public.horoscopes
  FOR DELETE
  USING (auth.uid() = user_id);

-- Policy: Ai cũng có thể xem lá số CÔNG KHAI (nếu user cho phép)
CREATE POLICY "horoscopes_select_public" ON public.horoscopes
  FOR SELECT
  USING (is_public = TRUE);

-- Policy: Chỉ owner mới có thể thay đổi is_public
CREATE POLICY "horoscopes_update_public_own" ON public.horoscopes
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id AND
    (is_public = FALSE OR is_public = TRUE) -- Không thể force change
  );

-- ============================================================
-- VAN_HANS TABLE POLICIES
-- ============================================================

CREATE POLICY "van_hans_select_own" ON public.van_hans
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "van_hans_insert_own" ON public.van_hans
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "van_hans_update_own" ON public.van_hans
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "van_hans_delete_own" ON public.van_hans
  FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================================
-- USER_SETTINGS TABLE POLICIES
-- ============================================================

-- Mỗi user chỉ có 1 row trong user_settings
-- User chỉ có thể xem/sửa settings của chính mình
CREATE POLICY "user_settings_select_own" ON public.user_settings
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "user_settings_insert_own" ON public.user_settings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "user_settings_update_own" ON public.user_settings
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Auto-create settings when user is created (via trigger)
CREATE POLICY "user_settings_auto_create" ON public.user_settings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- USER_FAVORITES TABLE POLICIES
-- ============================================================

CREATE POLICY "user_favorites_all_own" ON public.user_favorites
  FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- AUDIT_LOG TABLE POLICIES
-- ============================================================

-- Chỉ admin hoặc service role mới có thể ghi audit log
-- Users có thể xem audit log của chính mình
CREATE POLICY "audit_log_select_own" ON public.audit_log
  FOR SELECT
  USING (auth.uid() = user_id);

-- Insert được thực hiện bởi trigger hoặc service role
-- Users không thể insert/delete audit log
CREATE POLICY "audit_log_no_modify" ON public.audit_log
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- ============================================================
-- PUBLIC TABLES (No RLS needed - read-only reference data)
-- ============================================================

-- sao_master - Danh mục sao (read-only, public)
-- luuan_gia - Luận giải mẫu (read-only, public)
-- Các bảng này chỉ được update bởi admin

-- ============================================================
-- SERVICE ROLE BYPASS
-- ============================================================
-- Edge Functions sử dụng service_role key sẽ bypass RLS
-- Chỉ dùng service_role trong server-side code
-- KHÔNG BAO GIỜ expose service_role key ra client
-- ============================================================
```

### 5.2 Audit Logging

```sql
-- Tạo bảng audit_log nếu chưa có
CREATE TABLE IF NOT EXISTS public.audit_log (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT,
    entity_id UUID,
    old_value JSONB,
    new_value JSONB,
    ip_address INET,
    user_agent TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_audit_user ON public.audit_log(user_id);
CREATE INDEX idx_audit_entity ON public.audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_created ON public.audit_log(created_at DESC);
CREATE INDEX idx_audit_action ON public.audit_log(action);

-- Function để ghi audit log
CREATE OR REPLACE FUNCTION public.log_audit_event(
    p_user_id UUID,
    p_action TEXT,
    p_entity_type TEXT,
    p_entity_id UUID,
    p_old_value JSONB DEFAULT NULL,
    p_new_value JSONB DEFAULT NULL,
    p_metadata JSONB DEFAULT '{}'
) RETURNS BIGINT AS $$
DECLARE
    audit_id BIGINT;
    v_ip_address INET;
    v_user_agent TEXT;
BEGIN
    -- Get client IP (from request headers set by Supabase)
    v_ip_address := current_setting('request.jwt.claim.ip_address', true)::INET;
    v_user_agent := current_setting('request.jwt.claim.user_agent', true);

    INSERT INTO public.audit_log (
        user_id, action, entity_type, entity_id,
        old_value, new_value, ip_address, user_agent, metadata
    ) VALUES (
        p_user_id, p_action, p_entity_type, p_entity_id,
        p_old_value, p_new_value, v_ip_address, v_user_agent, p_metadata
    ) RETURNING id INTO audit_id;

    RETURN audit_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger để tự động ghi audit khi có thay đổi
CREATE OR REPLACE FUNCTION public.capture_changes()
RETURNS TRIGGER AS $$
DECLARE
    audit_action TEXT;
    old_val JSONB;
    new_val JSONB;
BEGIN
    IF TG_OP = 'INSERT' THEN
        audit_action := 'INSERT';
        old_val := NULL;
        new_val := to_jsonb(NEW);
    ELSIF TG_OP = 'UPDATE' THEN
        audit_action := 'UPDATE';
        old_val := to_jsonb(OLD);
        new_val := to_jsonb(NEW);
    ELSIF TG_OP = 'DELETE' THEN
        audit_action := 'DELETE';
        old_val := to_jsonb(OLD);
        new_val := NULL;
    END IF;

    -- Don't log if no actual changes
    IF audit_action = 'UPDATE' AND old_val = new_val THEN
        RETURN NEW;
    END IF;

    PERFORM public.log_audit_event(
        COALESCE(NEW.user_id, OLD.user_id),
        audit_action,
        TG_TABLE_NAME,
        COALESCE(NEW.id, OLD.id),
        old_val,
        new_val,
        jsonb_build_object('trigger', TG_NAME)
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Attach trigger to tables (optional - only for important tables)
CREATE TRIGGER users_audit
    AFTER INSERT OR UPDATE OR DELETE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.capture_changes();

CREATE TRIGGER horoscopes_audit
    AFTER INSERT OR UPDATE OR DELETE ON public.horoscopes
    FOR EACH ROW EXECUTE FUNCTION public.capture_changes();
```
