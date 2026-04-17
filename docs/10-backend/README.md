# TỬ VI ĐẨU SỐ - BACKEND SYSTEM DESIGN

> **Version:** 1.0.0  
> **Date:** 2026-04-17  
> **System:** Bắc Tông (Hồ Ly/Hải Phòng tradition)  
> **Platform:** React Native Expo (Mobile) + Supabase Backend

---

## MỤC LỤC

1. [Tổng Quan Hệ Thống](#1-tổng-quan-hệ-thống)
2. [Technology Stack](#2-technology-stack)
3. [Database Schema - Supabase/PostgreSQL](#3-database-schema--supabasepostgresql)
4. [API Architecture](#4-api-architecture)
5. [Authentication & Security](#5-authentication--security)
6. [Algorithm Engine - Tính Toán Vận Hạn](#6-algorithm-engine---tính-toán-vận-hạn)
7. [Edge Functions - Supabase](#7-edge-functions---supabase)
8. [Row Level Security (RLS)](#8-row-level-security-rls)
9. [Frontend Integration](#9-frontend-integration)
10. [Deployment & DevOps](#10-deployment--devops)
11. [Performance & Caching](#11-performance--caching)
12. [Cost Estimation](#12-cost-estimation)

---

## 1. Tổng Quan Hệ Thống

### 1.1 Mô Hình Kiến Trúc

```
┌─────────────────────────────────────────────────────────┐
│                    MOBILE CLIENT                         │
│              (React Native Expo SDK 54)                  │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌──────────────────────┐  │
│  │  Screens │  │   Redux  │  │  Algorithm Engine    │  │
│  │  (Routes)│  │  Store   │  │  (Tính Vận Hạn)      │  │
│  └────┬─────┘  └────┬─────┘  └──────────┬───────────┘  │
└───────┼─────────────┼───────────────────┼────────────────┘
        │             │                   │
        └─────────────┴───────────────────┘
                        │
                        ▼
              ┌─────────────────────┐
              │    SUPABASE LAYER   │
              │                     │
              │  ┌───────────────┐  │
              │  │   Auth         │  │  Supabase Auth
              │  │   (JWT)        │  │
              │  └───────┬───────┘  │
              │           │          │
              │  ┌───────▼────────┐  │
              │  │   Database     │  │  PostgreSQL 15
              │  │   (Schema)     │  │
              │  └───────┬────────┘  │
              │          │            │
              │  ┌───────▼────────┐  │
              │  │  Edge Functions │  │  Deno Runtime
              │  │  (API Logic)    │  │
              │  └───────┬────────┘  │
              │          │            │
              │  ┌───────▼────────┐  │
              │  │   Storage      │  │  S3-compatible
              │  └────────────────┘  │
              └─────────────────────┘
                        │
                        ▼
              ┌─────────────────────┐
              │  External Services  │
              │  • Email (Resend)   │
              │  • Analytics        │
              │  • Push Notif       │
              └─────────────────────┘
```

### 1.2 Core Business Logic - Tử Vi Bắc Tông

Hệ thống Bắc Tông (đặc biệt theo hệ Hồ Ly/Hải Phòng) có các đặc trưng:

| Module           | Mô tả                                                                                                                               |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Cung An Mệnh** | 12 cung trên địa bàn: Mệnh, Phụ Mẫu, Phúc Đức, Điền Trạch, Quan Lộc, Nô Bộc, Thiên Di, Tài Bạch, Tử Nữ, Phu Thê, Huynh Đệ, Phúc Đức |
| **Tam Hợp**      | Tý-Dần-Thìn, Tỵ-Dậu-Sửu, Ngọ-Tuất-Mùi, Hợi-Mão-Mùi                                                                                  |
| **Ngũ Hành**     | Kim, Mộc, Thủy, Hỏa, Thổ với tương sinh/tương khắc                                                                                  |
| **Sao Đẩu Số**   | 100+ sao cố định + 12 cửu Phi Tinh (Lưu sao)                                                                                        |
| **Vận Hạn**      | 4 cấp: Đại Hạn (10 năm), Tiểu Hạn (1 năm), Nguyệt Hạn (tháng), Nhật Hạn (ngày), Thời Hạn (giờ)                                      |
| **Cục Số**       | Nhị cục, Tam cục, Tứ cục, Ngũ cục, Lục cục, Thất cục, Bát cục                                                                       |

### 1.3 Data Flow

```
┌────────────────────────────────────────────────────────────────┐
│                      USER INPUT                                 │
│   Ngày sinh │ Giờ sinh │ Tháng sinh │ Năm sinh │ Giới tính    │
└────────────────────────┬───────────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────────────┐
│                   EDGE FUNCTION: /calculate                    │
│                                                                 │
│  1. Xác định Can Chi năm/tháng/ngày/giờ sinh                  │
│  2. Xác định Mệnh Can, Mệnh Chi                                │
│  3. Xác định Cục số (Nhị/Tam/Tứ/Ngũ/Lục/Thất/Bát cục)         │
│  4. An 12 cung trên địa bàn (Nam/Nữ khác nhau)                │
│  5. An các sao cố định vào 12 cung                             │
│  6. Xác định Tứ Hợp, Tam Hợp                                  │
│  7. Tính Vận Hạn (Đại/Tiểu/Nguyệt/Nhật/Thời hạn)              │
│  8. Tính Lưu sao (Cửu Phi Tinh)                                │
│  9. Luận đoán tổng hợp                                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────────────┐
│                   DATABASE - SAVE RESULT                        │
│                                                                 │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐    │
│   │  users       │    │  horoscopes   │    │  van_hans    │    │
│   │  (profile)   │───▶│  (lá số)     │───▶│  (vận hạn)  │    │
│   └──────────────┘    └──────────────┘    └──────────────┘    │
│                                                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌────────────────────────────────────────────────────────────────┐
│                    RETURN TO MOBILE                             │
│                                                                 │
│   JSON Response → Redux Store → UI Screens                     │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

### 2.1 Backend Stack

| Layer         | Technology                   | Version       | Mục đích                       |
| ------------- | ---------------------------- | ------------- | ------------------------------ |
| **Database**  | Supabase (PostgreSQL)        | 15+           | Primary data storage           |
| **Auth**      | Supabase Auth                | -             | Authentication, JWT            |
| **API**       | Supabase Edge Functions      | Deno 2.x      | Server-side logic              |
| **Realtime**  | Supabase Realtime            | -             | Live notifications             |
| **Storage**   | Supabase Storage             | S3-compatible | User avatars, exports          |
| **Email**     | Resend / Supabase Edge Email | -             | Transactional emails           |
| **Vector DB** | Supabase pgvector            | 0.7+          | AI-based interpretation search |

### 2.2 Frontend Stack (Đã có)

| Layer          | Technology                  | Version |
| -------------- | --------------------------- | ------- |
| **Framework**  | React Native Expo           | SDK 54  |
| **Navigation** | Expo Router v6              | 6.0.23  |
| **State**      | Redux Toolkit               | 2.5.0   |
| **Language**   | TypeScript                  | ~5.9.2  |
| **UI**         | @expo/vector-icons + custom | -       |

### 2.3 Development Tools

| Tool                   | Mục đích                      |
| ---------------------- | ----------------------------- |
| **Supabase CLI**       | Local development, migrations |
| **Deno**               | Edge Functions runtime        |
| **Postman / Insomnia** | API testing                   |
| **pgAdmin**            | Database management           |
| **GitHub Actions**     | CI/CD pipeline                |

### 2.4 Supabase vs Tự Build Backend

| Tiêu chí           | Supabase                 | Tự build (Node.js/Express) |
| ------------------ | ------------------------ | -------------------------- |
| **Setup time**     | ✅ Nhanh (vài giờ)       | ❌ Chậm (vài ngày)         |
| **Auth**           | ✅ Built-in, secure      | ❌ Cần tự implement        |
| **Database**       | ✅ PostgreSQL mạnh mẽ    | ⚠️ Cần setup riêng         |
| **Edge Functions** | ✅ Deno, auto-scale      | ❌ Cần deploy riêng        |
| **Realtime**       | ✅ WebSocket built-in    | ❌ Cần Socket.io           |
| **Cost**           | ✅ Free tier tốt ($25/m) | ⚠️ Tùy provider            |
| **Custom logic**   | ⚠️ Limited               | ✅ Full control            |
| **Cold start**     | ⚠️ Edge functions        | ✅ V8 isolate              |
| **Scaling**        | ✅ Auto                  | ✅ Manual                  |
| **Lock-in**        | ⚠️ Vendor lock-in        | ✅ Full control            |

**Khuyến nghị: Sử dụng Supabase** vì:

1. Setup nhanh, tập trung vào business logic Tử Vi
2. Auth, Database, Storage đã có sẵn
3. Free tier đủ cho MVP (dưới 50K users)
4. Edge Functions (Deno) đủ mạnh cho algorithm engine
5. Có thể migrate sang tự host Supabase later nếu cần

---

## 3. Database Schema - Supabase/PostgreSQL

### 3.1 Entity Relationship Diagram

```
┌──────────────┐     ┌──────────────┐     ┌──────────────────┐
│    users     │────▶│  horoscopes  │────▶│   sao_xung_hop   │
│  (profiles)  │     │   (lá số)    │     │  (bộ sao)        │
└──────┬───────┘     └──────┬───────┘     └──────────────────┘
       │                    │
       │                    ▼
       │            ┌──────────────────┐
       │            │  van_hans        │
       │            │ (vận hạn 5 cấp) │
       │            └────────┬─────────┘
       │                    │
       ▼                    ▼
┌──────────────┐     ┌──────────────────┐     ┌──────────────────┐
│ user_settings │     │  luuan_gia      │◀────│  phu_de         │
│   (cài đặt)  │     │ (luận giải)     │     │ (phú đoán)       │
└──────────────┘     └──────────────────┘     └──────────────────┘
                            │
                            ▼
                    ┌──────────────────┐
                    │  user_favorites   │
                    │  (yêu thích)      │
                    └──────────────────┘
```

### 3.2 Tables Definition

#### Table: `users` (Profile)

```sql
-- Supabase Auth tự tạo bảng auth.users
-- Bảng này là public profile mở rộng

CREATE TABLE public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Basic info
    display_name TEXT,
    avatar_url TEXT,

    -- Birth data (REQUIRED for horoscope)
    birth_date DATE NOT NULL,
    birth_time TIME NOT NULL,           -- Giờ sinh (00:00-23:59)
    birth_hour INT GENERATED ALWAYS AS (EXTRACT(HOUR FROM birth_time)) STORED,  -- 0-23
    birth_time_type TEXT CHECK (birth_time_type IN ('am', 'pm', 'both')) DEFAULT 'both',
    gender TEXT CHECK (gender IN ('male', 'female')) NOT NULL,

    -- Location at birth
    birth_province TEXT,
    birth_country TEXT DEFAULT 'Vietnam',
    timezone TEXT DEFAULT 'Asia/Ho_Chi_Minh',
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),

    -- Can Chi (auto-calculated from birth data)
    can_nam TEXT,      -- Can của năm sinh: Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý
    chi_nam TEXT,      -- Chi của năm sinh: Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi
    can_thang TEXT,    -- Can của tháng sinh
    chi_thang TEXT,    -- Chi của tháng sinh
    can_ngay TEXT,     -- Can của ngày sinh
    chi_ngay TEXT,     -- Chi của ngày sinh
    can_gio TEXT,      -- Can của giờ sinh
    chi_gio TEXT,      -- Chi của giờ sinh (Tý, Sửu, Dần...)

    -- Mệnh
    menh_can TEXT,     -- Can của Mệnh: Kim, Mộc, Thủy, Hỏa, Thổ
    menh_chi TEXT,     -- Chi của Mệnh
    menh_text TEXT,    -- Text đầy đủ: "Kim Mệnh", "Thủy Mệnh"

    -- Cục
    cuc_number INT,    -- Số Cục: 2, 3, 4, 5, 6, 7, 8
    cuc_text TEXT,     -- Text Cục: "Thủy Nhị Cục", "Mộc Tam Cục"

    -- Âm Dương
    am_duong TEXT CHECK (am_duong IN ('duong', 'am')),

    -- Metadata
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Subscription
    is_premium BOOLEAN DEFAULT FALSE,
    premium_expires_at TIMESTAMPTZ,

    CONSTRAINT birth_date_valid CHECK (birth_date <= CURRENT_DATE),
    CONSTRAINT birth_hour_valid CHECK (birth_hour BETWEEN 0 AND 23)
);

-- Indexes for performance
CREATE INDEX idx_users_gender ON public.users(gender);
CREATE INDEX idx_users_cuc ON public.users(cuc_number);
CREATE INDEX idx_users_menh ON public.users(menh_can);
CREATE INDEX idx_users_created ON public.users(created_at DESC);
```

#### Table: `horoscopes` (Lá Số)

```sql
CREATE TABLE public.horoscopes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,

    -- Thông tin cơ bản
    name TEXT,                    -- Tên lá số (optional)

    -- 12 Cung trên Địa Bàn
    -- Key: cung名称, Value: { sao: [], is_que: boolean }
    cung_menh JSONB DEFAULT '{}',      -- Cung Mệnh
    cung_phu_me TEXT,                   -- Cung Phụ Mẫu
    cung_phuc_duc TEXT,                -- Cung Phúc Đức
    cung_dien_trach TEXT,              -- Cung Điền Trạch
    cung_quan_loc TEXT,                -- Cung Quan Lộc
    cung_no_bo TEXT,                   -- Cung Nô Bộc
    cung_thien_di TEXT,                -- Cung Thiên Di
    cung_tai_bach TEXT,                -- Cung Tài Bạch
    cung_tu_nu TEXT,                   -- Cung Tử Nữ
    cung_phu_the TEXT,                 -- Cung Phu Thê
    cung_huynh_de TEXT,                -- Cung Huynh Đệ
    cung_phuc_duc_2 TEXT,              -- Cung Phúc Đức (lặp)

    -- 12 Cung chi tiết (JSON)
    dia_chi JSONB DEFAULT '[]',
    /* Format:
    [
      {
        "cung": "命",
        "chi": "子",
        "hanh": "水",
        "sao": ["紫微", "天机", "太阳"],
        "is_truong": true
      },
      ...
    ]
    */

    -- Các cặp Tứ Hợp
    tu_hop_1 JSONB,   -- Tý-Dần-Thìn
    tu_hop_2 JSONB,   -- Tỵ-Dậu-Sửu
    tu_hop_3 JSONB,   -- Ngọ-Tuất-Mùi
    tu_hop_4 JSONB,   -- Hợi-Mão-Mùi

    -- Các cặp Tam Hợp
    tam_hop_1 JSONB,  -- 3 cung trong tam hợp 1
    tam_hop_2 JSONB,  -- 3 cung trong tam hợp 2
    tam_hop_3 JSONB,  -- 3 cung trong tam hợp 3
    tam_hop_4 JSONB,  -- 3 cung trong tam hợp 4

    -- Sao trên 12 cung (flattened for easier querying)
    sao_list JSONB DEFAULT '[]',
    /* Format:
    [
      {
        "sao_id": "tu_vi",
        "sao_name": "Tử Vi",
        "cung": "命",
        "vi_tri": 1,
        "brightness": "M",  -- M: Miếu, V: Vượng, Đ: Đắc, H: Hãm
        "is_luc_sao": false
      },
      ...
    ]
    */

    -- Đặc biệt: Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kiếp
    hoa_loc JSONB,
    hoa_quyen JSONB,
    hoa_khoa JSONB,
    hoa_kiep JSONB,

    -- Full Natal Chart (raw calculation result)
    natal_chart JSONB,
    /* Full JSON:
    {
      "birth_data": { ... },
      "can_chi": { ... },
      "menh": { ... },
      "cuc": { ... },
      "dia_chi": [ ... ],
      "sao": [ ... ],
      "tu_hop": [ ... ],
      "tam_hop": [ ... ],
      "hoa": [ ... ],
      "calculated_at": "ISO timestamp"
    }
    */

    -- Version tracking
    version INT DEFAULT 1,
    calculated_at TIMESTAMPTZ DEFAULT NOW(),
    calculation_engine TEXT DEFAULT 'bac_tong_v1',

    -- Privacy
    is_public BOOLEAN DEFAULT FALSE,
    share_token TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(user_id)
);

-- Indexes
CREATE INDEX idx_horoscopes_user ON public.horoscopes(user_id);
CREATE INDEX idx_horoscopes_public ON public.horoscopes(is_public) WHERE is_public = TRUE;
CREATE INDEX idx_horoscopes_sao ON public.horoscopes USING GIN(sao_list);
CREATE INDEX idx_horoscopes_dia_chi ON public.horoscopes USING GIN(dia_chi);
```

#### Table: `van_hans` (Vận Hạn)

```sql
CREATE TABLE public.van_hans (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    horoscope_id UUID REFERENCES public.horoscopes(id) ON DELETE CASCADE NOT NULL,

    -- Vận hạn được tính cho năm nào
    target_year INT NOT NULL,          -- Năm Dương Lịch: 2024, 2025...
    target_can TEXT,                   -- Can của năm: Giáp, Ất...
    target_chi TEXT,                   -- Chi của năm: Tý, Dần...

    -- Loại vận hạn
    han_type TEXT CHECK (han_type IN ('dai', 'tieu', 'nguyet', 'nhat', 'thoi')),

    -- Vị trí cung của vận hạn
    cung_location TEXT,                -- Cung nào trên địa bàn
    cung_hanh TEXT,                    -- Hành của cung đó

    -- Chi tiết từng cấp vận hạn
    dai_han JSONB,                     -- Đại Hạn (10 năm)
    tieu_han JSONB,                    -- Tiểu Hạn (1 năm)
    nguyet_han JSONB,                 -- Nguyệt Hạn (tháng)
    nhat_han JSONB,                   -- Nhật Hạn (ngày)
    thoi_han JSONB,                   -- Thời Hạn (giờ)

    -- Cửu Phi Tinh (Lưu Sao)
    cuu_phi_tinh JSONB DEFAULT '[]',
    /* Format:
    [
      {
        "sao_id": "luu_thai_tue",
        "sao_name": "Lưu Thái Tuế",
        "cung": "卯",
        "cung_index": 3,
        "year_offset": 0
      },
      ...
    ]
    */

    -- Đánh giá tổng quát
    score INT CHECK (score BETWEEN -100 AND 100),  -- Điểm vận hạn: -100 đến +100
    rating TEXT CHECK (rating IN ('ruc_rong', 'tuoi_vang', 'binh_thuong', 'tai_chung', 'duong_thi')),
    summary TEXT,                        -- Tóm tắt vận hạn

    -- Chi tiết luận giải
    interpretation JSONB,
    /* Format:
    {
      "tong_quan": "...",
      "cong_dan": "...",
      "tinh_yeu": "...",
      "suc_khoe": "...",
      "tai_van": "...",
      "hanh_phuc": "...",
      "loi_khuyen": [...]
    }
    */

    -- Cảnh báo (nếu có sát tinh)
    warnings JSONB DEFAULT '[]',

    -- Metadata
    calculated_at TIMESTAMPTZ DEFAULT NOW(),
    calculation_engine TEXT DEFAULT 'bac_tong_van_han_v1',

    created_at TIMESTAMPTZ DEFAULT NOW(),

    -- Unique constraint: 1 user có thể có nhiều vận hạn nhưng mỗi (user, target_year, han_type) là duy nhất
    UNIQUE(user_id, target_year, han_type)
);

-- Indexes
CREATE INDEX idx_van_hans_user ON public.van_hans(user_id);
CREATE INDEX idx_van_hans_year ON public.van_hans(target_year);
CREATE INDEX idx_van_hans_horoscope ON public.van_hans(horoscope_id);
CREATE INDEX idx_van_hans_score ON public.van_hans(score);
CREATE INDEX idx_van_hans_cuu_phi ON public.van_hans USING GIN(cuu_phi_tinh);
```

#### Table: `sao_master` (Danh Mục Sao)

```sql
CREATE TABLE public.sao_master (
    id TEXT PRIMARY KEY,               -- e.g., "tu_vi", "liem_trinh", "vu_du"
    sao_name_vi TEXT NOT NULL,         -- Tên tiếng Việt: "Tử Vi", "Liêm Trinh"
    sao_name_cn TEXT,                  -- Tên chữ Nho: "紫微"
    sao_type TEXT NOT NULL,            -- 'chinh', 'phu', 'sat', 'duong', 'am'
    hanh TEXT CHECK (hanh IN ('kim', 'moc', 'thuy', 'hoa', 'tho')),  -- Ngũ hành của sao

    -- Độ sáng (trạng thái)
    brightness_m VARCHAR(20),          -- Miếu: tốt nhất
    brightness_v VARCHAR(20),          -- Vượng: tốt
    brightness_d VARCHAR(20),           -- Đắc: khá
    brightness_h VARCHAR(20),          -- Hãm: xấu

    -- Thuộc tính
    thuoc_tinh JSONB DEFAULT '[]',
    /* e.g., ["quyen_luc", "nguyen_tu", "than_quan"] */

    -- Ý nghĩa
    y_nghia_vi TEXT,
    y_nghia_cn TEXT,

    -- Khi nhập cung nào thì tốt/xấu
    tot_khi_nhap JSONB DEFAULT '[]',   -- Các cung tốt khi nhập
    xau_khi_nhap JSONB DEFAULT '[]',   -- Các cung xấu khi nhập

    -- Bộ sao
    bo_sao TEXT,                      -- Thuộc bộ sao nào

    -- Priority cho việc hiển thị (số cao = ưu tiên)
    display_priority INT DEFAULT 0,

    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Seed data: ~100+ sao
INSERT INTO public.sao_master (id, sao_name_vi, sao_name_cn, sao_type, hanh, brightness_m, brightness_v, brightness_d, brightness_h, y_nghia_vi) VALUES
-- Chính Tinh
('tu_vi', 'Tử Vi', '紫微', 'chinh', 'thuy', 'Mệnh, Phụ', 'Quan, Phúc', 'Tài', 'Huynh', 'Sao Hoàng Đế, chúa tể các sao, quyền lực tối cao'),
('liem_trinh', 'Liêm Trinh', '廉贞', 'chinh', 'hoa', 'Mệnh', 'Quan', 'Phúc', 'Tài', 'Sao Quan Liêm, chính trực, khắc kỵ'),
('thien_co', 'Thiên Cơ', '天机', 'chinh', 'moc', 'Mệnh, Phụ', 'Quan, Phúc', 'Tài, Huynh', 'Nô', 'Sao Thần Cơ, trí tuệ, thiên tài'),
('thai_duong', 'Thái Dương', '太阳', 'chinh', 'hoa', 'Mệnh, Phụ, Quan', 'Phúc, Tài', 'Huynh', 'Nô, Thiên', 'Sao Mặt Trời, vinh quang, nam giới'),
('vo_qua', 'Vũ Khúc', '武曲', 'chinh', 'kim', 'Quan, Tài', 'Mệnh, Phúc', 'Phụ', 'Huynh, Nô', 'Sao Ngũ Quan, tài lộc, quân sự'),
('thien_tong', 'Thiên Tồn', '天同', 'chinh', 'thuy', 'Mệnh, Phúc', 'Tài', 'Quan, Huynh', 'Phụ, Nô', 'Sao Thiên Đồng, hạnh phúc, đông phương'),
('thien_phu', 'Thiên Phủ', '天府', 'chinh', 'tho', 'Mệnh, Tài', 'Quan, Phúc', 'Phụ, Huynh', 'Nô', 'Sao Nam Hóa, quyền lực, phú quý'),
('thien_tri', 'Thiên Trì', '天机', 'chinh', 'moc', 'Mệnh, Phụ', 'Quan', 'Phúc, Tài', 'Huynh', 'Sao Thông Minh, học vấn'),
('vu_du', 'Vũ Dương', '武曲', 'chinh', 'kim', 'Quan, Tài', 'Mệnh, Phúc', 'Phụ', 'Huynh, Nô', 'Sao Chính Quân, nam giới'),
('bach_ho', 'Bạch Hổ', '白虎', 'sat', 'kim', NULL, NULL, NULL, 'Mệnh', 'Sao Bạo Quân, tai ách, tang chế'),
('thien_tuong', 'Thiên Tướng', '天相', 'chinh', 'thuy', 'Mệnh, Quan', 'Phúc, Tài', 'Huynh', 'Phụ, Nô', 'Sao Tướng Quân, hòa nhã'),
('lien_ma', 'Liên Mã', '莲马', 'duong', 'moc', NULL, NULL, NULL, NULL, 'Sao Trung Cấp, du lịch'),
('truc_sat', 'Trực Sát', '直杀', 'sat', NULL, NULL, NULL, NULL, NULL, 'Sao Sát Khí, nguy hiểm'),
-- Thêm 80+ sao nữa...
;
```

#### Table: `luuan_gia` (Luận Giải)

```sql
CREATE TABLE public.luuan_gia (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

    -- Loại luận giải
    type TEXT CHECK (type IN ('cung', 'sao', 'van_han', 'tu_hop', 'tam_hop', 'hoa', 'tong_hop')),

    -- Điều kiện để áp dụng (JSON)
    conditions JSONB NOT NULL,
    /* Format:
    {
      "cung": "命",              -- Cung cụ thể
      "sao": ["Tử Vi"],         -- Sao nhập cung
      "brightness": "M",         -- Độ sáng
      "has_sao_khac": ["Lộc Tồn"], -- Có thêm sao này
      "has_tu_hop": true,        -- Thuộc tứ hợp
      "menh": "Thủy"            -- Mệnh hành
    }
    */

    -- Nội dung luận giải
    title TEXT,
    content TEXT NOT NULL,           -- Nội dung chính
    content_short TEXT,              -- Tóm tắt (cho mobile)

    -- Điểm đánh giá (-10 đến +10)
    score_modifier INT DEFAULT 0,

    -- Thẻ/tags để search
    tags TEXT[] DEFAULT '{}',

    -- Nguồn tham khảo
    source TEXT,
    source_url TEXT,

    -- Version
    version INT DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast matching
CREATE INDEX idx_luuan_gia_conditions ON public.luuan_gia USING GIN(conditions);
CREATE INDEX idx_luuan_gia_type ON public.luuan_gia(type);
CREATE INDEX idx_luuan_gia_tags ON public.luuan_gia USING GIN(tags);
CREATE INDEX idx_luuan_gia_active ON public.luuan_gia(is_active) WHERE is_active = TRUE;
```

#### Table: `user_favorites` (Yêu Thích)

```sql
CREATE TABLE public.user_favorites (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,

    -- Reference đến bảng nào
    ref_table TEXT CHECK (ref_table IN ('horoscopes', 'van_hans', 'luuan_gia')),
    ref_id UUID NOT NULL,

    -- Loại yêu thích
    favorite_type TEXT CHECK (favorite_type IN ('saved', 'shared', 'viewed', 'calculated')),

    -- Ghi chú của user
    note TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE(user_id, ref_table, ref_id)
);

CREATE INDEX idx_user_favorites_user ON public.user_favorites(user_id);
CREATE INDEX idx_user_favorites_ref ON public.user_favorites(ref_table, ref_id);
```

#### Table: `user_settings` (Cài Đặt)

```sql
CREATE TABLE public.user_settings (
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE PRIMARY KEY,

    -- Ngôn ngữ
    language TEXT DEFAULT 'vi' CHECK (language IN ('vi', 'en', 'zh')),

    -- Theme
    theme TEXT DEFAULT 'dark' CHECK (theme IN ('light', 'dark', 'auto')),

    -- Thông báo
    notify_van_han BOOLEAN DEFAULT TRUE,       -- Thông báo vận hạn năm mới
    notify_daily BOOLEAN DEFAULT FALSE,         -- Thông báo hàng ngày
    notify_promotion BOOLEAN DEFAULT TRUE,     -- Khuyến mãi

    -- Privacy
    show_profile BOOLEAN DEFAULT TRUE,
    show_horoscope BOOLEAN DEFAULT FALSE,

    -- Subscription (cache)
    subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium', 'pro')),
    subscription_id TEXT,

    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Table: `audit_log` (Nhật Ký Hệ Thống)

```sql
CREATE TABLE public.audit_log (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID REFERENCES public.users(id),
    action TEXT NOT NULL,
    entity_type TEXT,
    entity_id UUID,
    old_value JSONB,
    new_value JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_user ON public.audit_log(user_id);
CREATE INDEX idx_audit_entity ON public.audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_created ON public.audit_log(created_at DESC);
```

---

## 4. API Architecture

### 4.1 API Endpoints Overview

```
┌──────────────────────────────────────────────────────────────┐
│                    SUPABASE EDGE FUNCTIONS                   │
│                      (Deno Runtime)                          │
└─────────────────────────┬────────────────────────────────────┘
                          │
         ┌────────────────┼────────────────┐
         ▼                ▼                ▼
  ┌────────────┐  ┌────────────┐  ┌────────────────┐
  │ Auth APIs  │  │ Horoscope  │  │  Vận Hạn APIs  │
  │ (Supabase  │  │   APIs     │  │   (Edge Fn)    │
  │  built-in) │  │ (Edge Fn)  │  │                │
  └────────────┘  └────────────┘  └────────────────┘
                          │
                          ▼
              ┌────────────────────────┐
              │    Database APIs        │
              │   (Direct via Supabase) │
              └────────────────────────┘
```

### 4.2 REST API Endpoints

#### Authentication APIs (Supabase Built-in)

| Method | Endpoint                             | Mô tả                       |
| ------ | ------------------------------------ | --------------------------- |
| POST   | `/auth/v1/signup`                    | Đăng ký tài khoản mới       |
| POST   | `/auth/v1/token?grant_type=password` | Đăng nhập (lấy JWT)         |
| POST   | `/auth/v1/logout`                    | Đăng xuất                   |
| GET    | `/auth/v1/user`                      | Lấy thông tin user hiện tại |
| PUT    | `/auth/v1/user`                      | Cập nhật thông tin user     |
| POST   | `/auth/v1/recover`                   | Quên mật khẩu               |

#### Horoscope APIs (Edge Functions)

| Method | Endpoint                                | Mô tả                        | Auth     |
| ------ | --------------------------------------- | ---------------------------- | -------- |
| POST   | `/functions/v1/calculate`               | Tính lá số đầy đủ            | Required |
| GET    | `/functions/v1/horoscope/:id`           | Lấy lá số theo ID            | Required |
| GET    | `/functions/v1/horoscopes`              | Lấy danh sách lá số của user | Required |
| PUT    | `/functions/v1/horoscope/:id`           | Cập nhật lá số               | Required |
| DELETE | `/functions/v1/horoscope/:id`           | Xóa lá số                    | Required |
| POST   | `/functions/v1/horoscope/:id/share`     | Chia sẻ lá số                | Required |
| GET    | `/functions/v1/horoscope/shared/:token` | Xem lá số được chia sẻ       | Public   |

#### Vận Hạn APIs (Edge Functions)

| Method | Endpoint                          | Mô tả                    | Auth     |
| ------ | --------------------------------- | ------------------------ | -------- |
| POST   | `/functions/v1/van-han/calculate` | Tính vận hạn cho năm     | Required |
| GET    | `/functions/v1/van-han/:year`     | Lấy vận hạn năm cụ thể   | Required |
| GET    | `/functions/v1/van-han`           | Lấy tất cả vận hạn       | Required |
| POST   | `/functions/v1/van-han/monthly`   | Tính nguyệt hạn chi tiết | Required |
| GET    | `/functions/v1/van-han/timeline`  | Timeline vận hạn 10 năm  | Required |

#### Interpretation APIs (Edge Functions)

| Method | Endpoint                            | Mô tả                  | Auth     |
| ------ | ----------------------------------- | ---------------------- | -------- |
| POST   | `/functions/v1/interpret`           | Luận giải tổng hợp     | Required |
| GET    | `/functions/v1/interpret/:type/:id` | Lấy chi tiết luận giải | Required |
| GET    | `/functions/v1/interpret/search`    | Tìm kiếm luận giải     | Public   |

#### User APIs

| Method | Endpoint                           | Mô tả                   | Auth     |
| ------ | ---------------------------------- | ----------------------- | -------- |
| GET    | `/functions/v1/user/profile`       | Lấy profile             | Required |
| PUT    | `/functions/v1/user/profile`       | Cập nhật profile        | Required |
| GET    | `/functions/v1/user/settings`      | Lấy cài đặt             | Required |
| PUT    | `/functions/v1/user/settings`      | Cập nhật cài đặt        | Required |
| POST   | `/functions/v1/user/favorites`     | Thêm yêu thích          | Required |
| DELETE | `/functions/v1/user/favorites/:id` | Xóa yêu thích           | Required |
| GET    | `/functions/v1/user/favorites`     | Lấy danh sách yêu thích | Required |

#### Subscription APIs

| Method | Endpoint                                     | Mô tả                 | Auth     |
| ------ | -------------------------------------------- | --------------------- | -------- |
| GET    | `/functions/v1/subscription/plans`           | Lấy danh sách gói     | Public   |
| POST   | `/functions/v1/subscription/create-checkout` | Tạo thanh toán Stripe | Required |
| POST   | `/functions/v1/subscription/webhook`         | Stripe webhook        | Public   |
| DELETE | `/functions/v1/subscription/cancel`          | Hủy subscription      | Required |

### 4.3 API Request/Response Examples

#### POST /functions/v1/calculate

**Request:**

```json
{
  "birth_date": "1990-05-15",
  "birth_time": "09:30:00",
  "gender": "male",
  "birth_province": "TP. Hồ Chí Minh",
  "birth_country": "Vietnam",
  "timezone": "Asia/Ho_Chi_Minh"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "can_nam": "Canh",
      "chi_nam": "Tuất",
      "can_thang": "Mậu",
      "chi_thang": "Thìn",
      "can_ngay": "Nhâm",
      "chi_ngay": "Thìn",
      "can_gio": "Tân",
      "chi_gio": "Tý",
      "menh_can": "Kim",
      "menh_chi": "Thìn",
      "menh_text": "Kim Mệnh Thìn Vượng",
      "cuc_number": 4,
      "cuc_text": "Kim Tứ Cục",
      "am_duong": "duong"
    },
    "horoscope": {
      "id": "uuid",
      "dia_chi": [
        {
          "cung": "Mệnh",
          "chi": "Tý",
          "hanh": "Thủy",
          "sao": ["Tử Vi", "Thiên Cơ"],
          "is_truong": true
        },
        {
          "cung": "Phụ Mẫu",
          "chi": "Sửu",
          "hanh": "Thổ",
          "sao": ["Thái Dương", "Vũ Khúc"],
          "is_truong": false
        }
        // ... 12 cung
      ],
      "sao_list": [
        {
          "sao_id": "tu_vi",
          "sao_name": "Tử Vi",
          "cung": "Mệnh",
          "brightness": "M",
          "vi_tri": 1
        }
        // ... 100+ sao
      ],
      "tu_hop": [
        { "cung_1": "Tý", "cung_2": "Dần", "cung_3": "Thìn", "name": "Tý-Dần-Thìn" }
      ],
      "tam_hop": [...],
      "hoa_loc": { "cung": "Mệnh", "sao_khac": ["Lộc Tồn"] }
    },
    "calculated_at": "2026-04-17T10:00:00Z",
    "version": 1
  }
}
```

#### POST /functions/v1/van-han/calculate

**Request:**

```json
{
  "horoscope_id": "uuid-of-horoscope",
  "target_year": 2026,
  "include_monthly": true,
  "include_daily": false
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "target_year": 2026,
    "target_can": "Bính",
    "target_chi": "Ngọ",
    "am_duong_nam": "Dương",
    "score": 45,
    "rating": "tuoi_vang",
    "summary": "Năm 2026 thuộc Bính Ngọ - Dương Nam. Vận hạn tốt, có cơ hội thăng tiến và tài lộc.",

    "dai_han": {
      "current_cung": "Phúc Đức",
      "cung_hanh": "Mộc",
      "years_remaining": 7,
      "description": "Đại Hạn đang ở cung Phúc Đức, thuộc hành Mộc. Năm nay tiếp tục được hưởng phúc đức tổ tiên."
    },

    "tieu_han": {
      "cung": "Thiên Di",
      "cung_hanh": "Hỏa",
      "can_nam": "Bính",
      "chi_nam": "Ngọ",
      "huong_di": "thuan",
      "description": "Tiểu Hạn năm nay tại cung Thiên Di, chủ về xa di. Có thể có tin vui từ phương xa."
    },

    "nguyet_han": [
      {
        "month": 1,
        "thang_am_lich": "Tháng Giêng",
        "cung": "Thiên Di",
        "description": "Tháng đầu năm chủ về khởi đầu, gặp nhiều thuận lợi."
      }
      // ... 12 tháng
    ],

    "cuu_phi_tinh": [
      {
        "sao_id": "luu_thai_tue",
        "sao_name": "Lưu Thái Tuế",
        "cung": "Ngọ",
        "description": "Lưu Thái Tuế đóng tại cung Ngọ, bản mệnh được che chở."
      },
      {
        "sao_id": "luu_tang_mon",
        "sao_name": "Lưu Tang Môn",
        "cung": "Mùi",
        "description": "Cẩn thận với việc hao tài, có thể có người mời đến nhà."
      },
      {
        "sao_id": "luu_bach_ho",
        "sao_name": "Lưu Bạch Hổ",
        "cung": "Sửu",
        "description": "Cẩn thận tai nạn, đặc biệt về giao thông."
      },
      {
        "sao_id": "luu_loc_ton",
        "sao_name": "Lưu Lộc Tồn",
        "cung": "Thân",
        "description": "Tài lộc tăng trưởng, có thêm thu nhập."
      },
      {
        "sao_id": "luu_kinh_duong",
        "sao_name": "Lưu Kình Dương",
        "cung": "Dần",
        "description": "Năng động, quyết đoán, nhưng cẩn thận xung đột."
      },
      {
        "sao_id": "luu_da_la",
        "sao_name": "Lưu Đà La",
        "cung": "Tuất",
        "description": "Di chuyển nhiều, thay đổi nơi ở hoặc công việc."
      },
      {
        "sao_id": "luu_thien_ma",
        "sao_name": "Lưu Thiên Mã",
        "cung": "Mão",
        "description": "Có cơ hội đi xa, du lịch."
      },
      {
        "sao_id": "luu_khoc",
        "sao_name": "Lưu Thiên Khốc",
        "cung": "Tỵ",
        "description": "Có thể gặp mất mát nhỏ, buồn phiền."
      },
      {
        "sao_id": "luu_hu",
        "sao_name": "Lưu Thiên Hư",
        "cung": "Dậu",
        "description": "Tâm trạng dao động, cần giữ tinh thần ổn định."
      }
    ],

    "interpretation": {
      "tong_quan": "Năm 2026 là năm tương đối tốt. Công việc có nhiều thuận lợi, có thể được thăng tiến hoặc nhận được sự công nhận. Tài chính ổn định, có cơ hội đầu tư tốt.",
      "cong_dan": "Có cơ hội thăng tiến trong công việc, đặc biệt nếu làm trong lĩnh vực liên quan đến Mộc hoặc Thủy. Nên chú ý đến mối quan hệ với đồng nghiệp.",
      "tinh_yeu": "Năm nay thuận lợi cho người độc thân tìm được người yêu. Người đã có gia đình cần chú ý giữ gìn hạnh phúc, tránh cãi vã.",
      "suc_khoe": "Sức khỏe tổng quát tốt, nhưng cần chú ý đến hệ tiêu hóa vào các tháng 3, 4. Cẩn thận khi tham gia giao thông.",
      "tai_van": "Thu nhập ổn định, có thể có khoản tiền bất ngờ vào tháng 5-6. Năm nay thuận lợi cho việc đầu tư bất động sản.",
      "hanh_phuc": "Gia đình hòa thuận, có tin vui về con cái. Nên dành thời gian cho gia đình nhiều hơn."
    },

    "warnings": [
      {
        "type": "sat_tinh",
        "sao": "Lưu Bạch Hổ",
        "cung": "Sửu",
        "description": "Cẩn thận tai nạn giao thông, tháng 8 đặc biệt nguy hiểm."
      }
    ],

    "loi_khuyen": [
      "Năm nay nên mặc màu xanh dương, tránh màu đỏ rực",
      "Đeo bùa hộ mệnh hóa giải sát tinh",
      "Tháng 3, 8 cẩn thận trong giao dịch tài chính",
      "Nên làm việc thiện vào ngày rằm, mùng 1"
    ]
  }
}
```

---

## 5. Authentication & Security

### 5.1 Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTHENTICATION FLOW                        │
│                                                              │
│  ┌──────────┐     ┌──────────────┐     ┌──────────────────┐  │
│  │  User    │────▶│ Supabase     │────▶│ JWT Access Token │  │
│  │  Login   │     │  Auth        │     │ (1 hour)        │  │
│  └──────────┘     └──────────────┘     └────────┬─────────┘  │
│                                                  │            │
│                                                  ▼            │
│                                          ┌──────────────────┐  │
│                                          │ JWT Refresh Token│  │
│                                          │ (30 days)       │  │
│                                          └──────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

### 5.2 Supabase Auth Configuration

```typescript
// supabase/auth.config.ts
export const authConfig = {
  // JWT settings
  jwt: {
    secret: process.env.SUPABASE_JWT_SECRET!,
    exp: 3600, // 1 hour
    refreshExp: 2592000, // 30 days
  },

  // Providers
  providers: {
    email: true, // Email/password
    phone: false, // Không cần phone
    google: true, // Google OAuth (optional)
    apple: false, // Apple OAuth (optional)
  },

  // Password requirements
  password: {
    minLength: 6,
    requireUppercase: false,
    requireNumbers: false,
    requireSpecialChars: false,
  },

  // Email templates
  email: {
    confirmRedirect: "app://confirm",
    resetRedirect: "app://reset-password",
  },
};
```

### 5.3 API Key Management

```sql
-- Supabase anon key để client sử dụng
-- Runtime: public.apikey = 'eyJ...' (public readable)

-- Supabase service role key chỉ dùng trong Edge Functions
-- Runtime: service_role key chỉ truy cập từ server-side
```

---

## 6. Algorithm Engine - Tính Toán Vận Hạn

### 6.1 Core Algorithm Modules

```
┌─────────────────────────────────────────────────────────────┐
│                  ALGORITHM ENGINE (Deno)                     │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ LunarDate   │  │  CanChi     │  │   CungAn           │  │
│  │ Converter   │  │  Calculator │  │   (12 Cung)        │  │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬──────────┘  │
│         │                │                     │             │
│         ▼                ▼                     ▼             │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                  HoroscopeCalculator                   │  │
│  │  • Xác định Mệnh Can/Chi                              │  │
│  │  • Tính Cục số                                        │  │
│  │  • An 12 cung trên địa bàn                            │  │
│  │  • An sao cố định                                     │  │
│  │  • Xác định Tứ Hợp, Tam Hợp                           │  │
│  │  • Tính Hóa Lộc/Quyền/Khoa/Kiếp                       │  │
│  └────────────────────────┬───────────────────────────────┘  │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                  VanHanCalculator                       │  │
│  │  • Đại Hạn (10 năm) - xác định cung, số năm            │  │
│  │  • Tiểu Hạn (1 năm) - cung khởi theo Chi              │  │
│  │  • Nguyệt Hạn (tháng) - 3 bước đặc biệt               │  │
│  │  • Nhật Hạn (ngày) - đếm thuận                        │  │
│  │  • Thời Hạn (giờ) - đếm thuận                          │  │
│  │  • Cửu Phi Tinh (Lưu sao)                             │  │
│  └────────────────────────┬───────────────────────────────┘  │
│                           │                                  │
│                           ▼                                  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │                  InterpreterEngine                      │  │
│  │  • Tra cứu luận giải từ database                       │  │
│  │  • Tính điểm vận hạn                                  │  │
│  │  • So sánh Ngũ hành                                   │  │
│  │  • Đưa ra cảnh báo                                     │  │
│  └────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

### 6.2 Algorithm Implementation - Chi Tiết

#### A. Tính Ngày Âm Lịch (Lunar Date Conversion)

```typescript
// Deno Edge Function: /src/algorithms/lunar-calendar.ts

/**
 * Chuyển đổi Dương Lịch sang Âm Lịch (Năm, Tháng, Ngày)
 * Sử dụng thuật toán của Jeanhee Lii (hiệu chỉnh cho Việt Nam)
 */
export function solarToLunar(
  year: number,
  month: number,
  day: number,
  timezone: number = 7, // Vietnam UTC+7
): LunarDate {
  // Thuật toán:
  // 1. Tính Julian Day Number (JDN)
  // 2. Áp dụng correction và offset
  // 3. Trả về Âm Lịch (năm, tháng, ngày, nhuận)

  const jdn = getJulianDayNumber(year, month, day);
  const lunarYear = getLunarYear(jdn, year, timezone);
  const [lunarMonth, isLeap] = getLunarMonth(jdn, lunarYear, timezone);
  const lunarDay = getLunarDay(jdn, lunarYear, lunarMonth, isLeap, timezone);

  return { year: lunarYear, month: lunarMonth, day: lunarDay, isLeap };
}

interface LunarDate {
  year: number; // Năm âm lịch
  month: number; // Tháng âm lịch
  day: number; // Ngày âm lịch
  isLeap: boolean; // Có phải tháng nhuận không
}
```

#### B. Tính Can Chi

```typescript
// Deno Edge Function: /src/algorithms/can-chi.ts

const CAN = [
  "Giáp",
  "Ất",
  "Bính",
  "Đinh",
  "Mậu",
  "Kỷ",
  "Canh",
  "Tân",
  "Nhâm",
  "Quý",
];
const CHI = [
  "Tý",
  "Sửu",
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
];

/**
 * Tính Can Chi cho Năm sinh
 * Công thức: Can = (năm % 10), Chi = (năm % 12)
 * Với offset đặc biệt cho âm lịch
 */
export function tinhCanChiNam(namAmLich: number): { can: string; chi: string } {
  const canIndex = (((namAmLich + 6) % 10) + 10) % 10;
  const chiIndex = (((namAmLich + 8) % 12) + 12) % 12;
  return { can: CAN[canIndex], chi: CHI[chiIndex] };
}

/**
 * Tính Can Chi cho Tháng sinh
 * Tháng 1 (Giêng) luôn bắt đầu từ cặp Can Chi theo năm
 */
export function tinhCanChiThang(
  namCan: string,
  thangAmLich: number,
): { can: string; chi: string } {
  const canStartIndex = CAN.indexOf(namCan);
  // Can tháng = (Can năm * 2 + tháng) % 10
  const canIndex = (((canStartIndex * 2 + thangAmLich) % 10) + 10) % 10;
  const chiIndex = (((thangAmLich + 1) % 12) + 12) % 12;
  return { can: CAN[canIndex], chi: CHI[chiIndex] };
}

/**
 * Tính Can Chi cho Ngày (Lịch Julius)
 */
export function tinhCanChiNgay(jdn: number): { can: string; chi: string } {
  const canIndex = (((jdn + 9) % 10) + 10) % 10;
  const chiIndex = (((jdn + 1) % 12) + 12) % 12;
  return { can: CAN[canIndex], chi: CHI[chiIndex] };
}

/**
 * Tính Can Chi cho Giờ sinh
 * Giờ Tý bắt đầu từ 23:00 - 01:00
 */
export function tinhCanChiGio(
  gio: number,
  phut: number,
): { can: string; chi: string } {
  // Tính số giờ Tý (bắt đầu từ 23:00)
  const gioTy = Math.floor(((gio + 1) % 24) / 2);
  // Can giờ = (Can ngày * 2 + giờ Tý) % 10
  // Cần Can của ngày để tính
  const chiIndex = gioTy;
  return { can: "", chi: CHI[chiIndex] };
}
```

#### C. Tính Mệnh

```typescript
// Deno Edge Function: /src/algorithms/menh.ts

const MENH_NAM = {
  // can_nam -> menh
  Giáp: { can: "Kim", ky: 0 }, // Giáp Tý = Kim
  Ất: { can: "Kim", ky: 1 }, // ...
  Bính: { can: "Mộc", ky: 2 },
  Đinh: { can: "Mộc", ky: 3 },
  Mậu: { can: "Hỏa", ky: 4 },
  Kỷ: { can: "Hỏa", ky: 5 },
  Canh: { can: "Thổ", ky: 6 },
  Tân: { can: "Thổ", ky: 7 },
  Nhâm: { can: "Thủy", ky: 8 },
  Quý: { can: "Thủy", ky: 9 },
};

/**
 * Xác định Mệnh Can, Mệnh Chi, và Mệnh Text
 * Áp dụng công thức Bắc Tông
 */
export function tinhMenhip(
  canNam: string,
  chiNam: string,
  isLeapMonth: boolean = false,
): MenhResult {
  // Mệnh Can
  const menhCan = MENH_NAM[canNam]?.can || "Unknown";

  // Mệnh Chi (phụ thuộc vào Chi năm và Can năm)
  const menhChi = tinhMenhChi(canNam, chiNam);

  // Mệnh Text đầy đủ
  const menhText = `${menhCan} Mệnh ${menhChi}`;

  // Âm Dương
  const amDuong = ["Giáp", "Bính", "Mậu", "Canh", "Nhâm"].includes(canNam)
    ? "duong"
    : "am";

  return {
    can: menhCan,
    chi: menhChi,
    text: menhText,
    amDuong,
  };
}

function tinhMenhChi(canNam: string, chiNam: string): string {
  // Theo Bắc Tông: Mệnh Chi phụ thuộc vào Can năm
  // Bảng tra: Từng cặp (Can, Chi) cho ra Mệnh Chi cụ thể
  const menhChiMap: Record<string, string> = {
    // Kim
    "Giáp-Tý": "Tý",
    "Ất-Tý": "Tý",
    "Giáp-Sửu": "Sửu",
    "Ất-Sửu": "Sửu",
    "Canh-Thân": "Thân",
    "Tân-Thân": "Thân",
    "Canh-Dậu": "Dậu",
    "Tân-Dậu": "Dậu",
    // Mộc
    "Bính-Mão": "Mão",
    "Đinh-Mão": "Mão",
    "Bính-Tỵ": "Tỵ",
    "Đinh-Tỵ": "Tỵ",
    // Thủy
    "Nhâm-Tý": "Tý",
    "Quý-Tý": "Tý",
    "Nhâm-Hợi": "Hợi",
    "Quý-Hợi": "Hợi",
    // Hỏa
    "Mậu-Ngọ": "Ngọ",
    "Kỷ-Ngọ": "Ngọ",
    "Mậu-Tỵ": "Tỵ",
    "Kỷ-Tỵ": "Tỵ",
    // Thổ
    "Canh-Tuất": "Tuất",
    "Tân-Tuất": "Tuất",
    "Canh-Mùi": "Mùi",
    "Tân-Mùi": "Mùi",
  };

  return menhChiMap[`${canNam}-${chiNam}`] || chiNam;
}
```

#### D. Tính Cục Số

```typescript
// Deno Edge Function: /src/algorithms/cuc.ts

/**
 * Tính Cục số theo Bắc Tông
 * Cục = (Tổng Can + Tổng Chi + Tháng sinh) % 9
 * Với điều chỉnh: Dương Nam/Âm Nữ đếm thuận, Âm Nam/Dương Nữ đếm nghịch
 */
export function tinhCucSo(
  canNam: string,
  chiNam: string,
  thangSinh: number,
  amDuong: "duong" | "am",
  gender: "male" | "female",
): CucResult {
  // 1. Tổng Can
  const canIndex = CAN.indexOf(canNam);
  const canSum = canIndex;

  // 2. Tổng Chi
  const chiIndex = CHI.indexOf(chiNam);
  const chiSum = chiIndex;

  // 3. Tổng + Tháng
  let cucRaw = (canSum + chiSum + thangSinh) % 9;
  if (cucRaw === 0) cucRaw = 9;

  // 4. Xác định chiều đi
  const isForward =
    (amDuong === "duong" && gender === "male") ||
    (amDuong === "am" && gender === "female");

  // 5. Cục text
  const cucTextMap: Record<number, string> = {
    2: "Thủy Nhị Cục",
    3: "Mộc Tam Cục",
    4: "Mộc Tứ Cục",
    5: "Thổ Ngũ Cục",
    6: "Kim Lục Cục",
    7: "Kim Thất Cục",
    8: "Thổ Bát Cục",
    1: "Thủy Nhất Cục", // Can 0 = 1
    9: "Hỏa Cửu Cục",
  };

  // 6. Cung khởi đầu Đại Hạn
  const diaban = [
    "Tý",
    "Sửu",
    "Dần",
    "Mão",
    "Thìn",
    "Tỵ",
    "Ngọ",
    "Mùi",
    "Thân",
    "Dậu",
    "Tuất",
    "Hợi",
  ];

  // Cung khởi = Cục số % 12
  const startIndex = (cucRaw - 1) % 12;

  return {
    soCuc: cucRaw,
    text: cucTextMap[cucRaw] || `${cucRaw} Cục`,
    startCung: diaban[startIndex],
    direction: isForward ? "thuan" : "nghich",
    isForward,
  };
}
```

#### E. An 12 Cung trên Địa Bàn

```typescript
// Deno Edge Function: /src/algorithms/dia-ban.ts

const CUNG_NAMES = [
  "Mệnh",
  "Phụ Mẫu",
  "Phúc Đức",
  "Điền Trạch",
  "Quan Lộc",
  "Nô Bộc",
  "Thiên Di",
  "Tài Bạch",
  "Tử Nữ",
  "Phu Thê",
  "Huynh Đệ",
  "Phúc Đức",
];

const CHI_ORDER = [
  "Tý",
  "Sửu",
  "Dần",
  "Mão",
  "Thìn",
  "Tỵ",
  "Ngọ",
  "Mùi",
  "Thân",
  "Dậu",
  "Tuất",
  "Hợi",
];

/**
 * An 12 Cung trên Địa Bàn theo Bắc Tông
 * Nam: đếm thuận từ cung Mệnh theo thứ tự Chi
 * Nữ: đếm nghịch từ cung Mệnh theo thứ tự Chi
 */
export function anDiaBan(
  menhChi: string, // Chi của Mệnh
  gender: "male" | "female",
  cucDirection: "thuan" | "nghich",
): DiaChiCung[] {
  const menhIndex = CHI_ORDER.indexOf(menhChi);
  const direction =
    (gender === "male" && cucDirection === "thuan") ||
    (gender === "female" && cucDirection === "nghich")
      ? 1
      : -1;

  const result: DiaChiCung[] = [];

  for (let i = 0; i < 12; i++) {
    // Tính vị trí cung i trên địa bàn
    let cungChiIndex: number;
    if (direction === 1) {
      cungChiIndex = (menhIndex + i) % 12;
    } else {
      cungChiIndex = (menhIndex - i + 12) % 12;
    }

    result.push({
      cung: CUNG_NAMES[i],
      chi: CHI_ORDER[cungChiIndex],
      chiIndex: cungChiIndex,
      viTri: i + 1,
      isTruongCung: i === 0, // Cung Mệnh luôn là trường cung
    });
  }

  return result;
}

interface DiaChiCung {
  cung: string; // Tên cung
  chi: string; // Chi của cung đó
  chiIndex: number; // Index 0-11
  viTri: number; // Vị trí 1-12
  isTruongCung: boolean;
}
```

#### F. An Sao Cố Định

```typescript
// Deno Edge Function: /src/algorithms/sao.ts

interface SaoAn {
  saoId: string;
  cungIndex: number; // Index 0-11 trên địa bàn
  brightness: "M" | "V" | "Đ" | "H"; // Miếu, Vượng, Đắc, Hãm
}

/**
 * An các sao cố định vào 12 cung theo Bắc Tông
 * Công thức đặc biệt cho từng sao
 */
export function anSaoCoDinh(
  diaBan: DiaChiCung[],
  canNam: string,
  chiNam: string,
  canThang: string,
  isLeapMonth: boolean,
  menhChi: string,
  gender: "male" | "female",
): SaoAn[] {
  const results: SaoAn[] = [];

  // 1. Tử Vi - An theo cung Mệnh + Can năm
  const tuViCung = tinhTuVi(menhChi, canNam);
  results.push({ saoId: "tu_vi", cungIndex: tuViCung, brightness: "M" });

  // 2. Liêm Trinh
  const liemTrinhCung = tinhLiemTrinh(menhChi, canNam);
  results.push({
    saoId: "liem_trinh",
    cungIndex: liemTrinhCung,
    brightness: "M",
  });

  // 3. Thiên Cơ
  const thienCoCung = tinhThienCo(menhChi, chiNam);
  results.push({ saoId: "thien_co", cungIndex: thienCoCung, brightness: "M" });

  // 4. Thái Dương
  const thaiDuongCung = tinhThaiDuong(menhChi, canNam);
  results.push({
    saoId: "thai_duong",
    cungIndex: thaiDuongCung,
    brightness: "M",
  });

  // ... tiếp tục cho 100+ sao khác

  return results;
}

function tinhTuVi(menhChi: string, canNam: string): number {
  // Tử Vi an theo công thức:
  // Vị trí = (Mệnh Chi + Can Năm) % 12
  const menhIndex = CHI_ORDER.indexOf(menhChi);
  const canIndex = CAN.indexOf(canNam);
  return (menhIndex + canIndex) % 12;
}

function tinhLiemTrinh(menhChi: string, canNam: string): number {
  // Liêm Trinh = Tử Vi + 4 (hoặc -8 tùy hệ thống)
  const tuVi = tinhTuVi(menhChi, canNam);
  return (tuVi + 4) % 12;
}
// ... các hàm khác
```

#### G. Tính Vận Hạn (Đại Hạn, Tiểu Hạn, Nguyệt Hạn)

```typescript
// Deno Edge Function: /src/algorithms/van-han.ts

/**
 * ===== ĐẠI HẠN (10 năm) =====
 * - Bắt đầu tại cung Mệnh
 * - Ghi số Cục tại cung Mệnh
 * - Dương Nam/Âm Nữ: đếm thuận
 * - Âm Nam/Dương Nữ: đếm nghịch
 * - Mỗi cung = 10 năm
 */
export function tinhDaiHan(
  diaBan: DiaChiCung[],
  cucNumber: number,
  amDuong: "duong" | "am",
  gender: "male" | "female",
  tuoiHienTai: number,
): DaiHanResult {
  const menhIndex = diaBan.findIndex((c) => c.cung === "Mệnh");
  const direction =
    (amDuong === "duong" && gender === "male") ||
    (amDuong === "am" && gender === "female")
      ? 1
      : -1;

  // Mỗi cung = 10 năm
  // Số cục xác định cung bắt đầu
  const startOffset = (cucNumber - 1) % 12;

  const hanList: CungHan[] = [];

  for (let i = 0; i < 12; i++) {
    let cungIndex: number;
    if (direction === 1) {
      cungIndex = (menhIndex + startOffset + i) % 12;
    } else {
      cungIndex = (menhIndex - startOffset - i + 24) % 12;
    }

    const startYear = i * 10;
    const endYear = (i + 1) * 10 - 1;

    hanList.push({
      cung: diaBan[cungIndex].cung,
      chi: diaBan[cungIndex].chi,
      hanh: getHanhByChi(diaBan[cungIndex].chi),
      startYear,
      endYear,
      soNam: `Tuổi ${startYear + 1} đến ${endYear + 1}`,
      viTri: i + 1,
    });
  }

  // Tìm Đại Hạn hiện tại
  const currentDecade = Math.floor(tuoiHienTai / 10);
  const currentHan = hanList[currentDecade] || hanList[0];

  return {
    list: hanList,
    current: currentHan,
    remainingYears: 10 - (tuoiHienTai % 10),
  };
}

/**
 * ===== TIỂU HẠN (1 năm) =====
 * - Cung khởi dựa vào Chi năm sinh:
 *   Tý, Ngọ, Mão, Hợi → Khởi tại Tý
 *   Sửu, Thìn, Dậu, Mùi → Khởi tại Sửu
 *   Dần, Ngọ, Tuất, Thân → Khởi tại Dần
 *   Tỵ, Dậu, Sửu, Mùi → Khởi tại Tỵ
 * - Nam đếm thuận, Nữ đếm nghịch
 */
export function tinhTieuHan(
  diaBan: DiaChiCung[],
  chiNam: string,
  targetYear: number,
  gender: "male" | "female",
): TieuHanResult {
  // Xác định cung khởi theo Chi năm sinh
  const khoiCung = getKhoiCungByChi(chiNam);
  const khoiIndex = diaBan.findIndex((c) => c.chi === khoiCung) ?? 0;

  // Đếm số bước = (năm hiện tại - năm sinh)
  const soBuoc = targetYear - new Date().getFullYear() + 1; // Cần truyền năm sinh

  const direction = gender === "male" ? 1 : -1;
  let tieuHanIndex: number;

  if (direction === 1) {
    tieuHanIndex = (khoiIndex + soBuoc) % 12;
  } else {
    tieuHanIndex = (khoiIndex - soBuoc + 24) % 12;
  }

  const cung = diaBan[tieuHanIndex];

  return {
    cung: cung.cung,
    chi: cung.chi,
    hanh: getHanhByChi(cung.chi),
    viTri: tieuHanIndex + 1,
    canNam: CAN[((targetYear % 10) + 10) % 10],
    chiNam: CHI[((targetYear % 12) + 12) % 12],
    direction: direction === 1 ? "thuan" : "nghich",
  };
}

/**
 * ===== NGUYỆT HẠN (tháng) =====
 * Quy trình 3 bước:
 * 1. Lấy cung Tiểu Hạn làm tháng Giêng, đếm NGHỊCH đến tháng sinh
 * 2. Từ cung đó gọi là giờ Tý, đếm THUẬN đến giờ sinh → cung thực sự của tháng Giêng
 * 3. Từ tháng Giêng đếm thuận mỗi cung một tháng
 */
export function tinhNguyetHan(
  tieuHanCung: DiaChiCung,
  thangSinh: number,
  gioSinh: number,
  phutSinh: number,
): NguyetHanResult[] {
  const results: NguyetHanResult[] = [];

  // Bước 1: Đếm nghịch từ Tiểu Hạn đến tháng sinh
  // Tháng 1 (Giêng) = 1, Tháng 2 = 2, ...
  let step = 0;
  let currentIndex = diaBan.indexOf(tieuHanCung);

  // Đếm nghịch đến tháng sinh
  // Đếm nghịch nghĩa là đi ngược chiều Kim Đồng Hồ
  // Trong hệ Bắc Tông, chiều nghịch = -1 mỗi tháng
  for (let thang = 1; thang < thangSinh; thang++) {
    currentIndex = (currentIndex - 1 + 12) % 12;
  }

  // Bước 2: Từ cung đó, đếm thuận đến giờ sinh
  // Giờ Tý = 0, Giờ Sửu = 1, ..., Giờ Hợi = 11
  const gioTyIndex = Math.floor(((gioSinh + 1) % 24) / 2);
  let gioIndex = 0;
  const cungThangMot = currentIndex;

  for (let g = 0; g < gioTyIndex; g++) {
    cungThangMot;
    gioIndex = (gioIndex + 1) % 12;
  }

  // Bước 3: Từ cung tháng Giêng, đếm thuận mỗi cung một tháng
  for (let thang = 1; thang <= 12; thang++) {
    const cungIndex = (cungThangMot + thang - 1) % 12;
    const cung = diaBan[cungIndex];

    results.push({
      thang,
      thangAmLich: getThangAmLichText(thang),
      cung: cung.cung,
      chi: cung.chi,
      hanh: getHanhByChi(cung.chi),
    });
  }

  return results;
}

/**
 * ===== NHẬT HẠN (ngày) =====
 * Lấy cung Nguyệt Hạn làm mùng 1, đếm thuận mỗi cung một ngày
 */
export function tinhNhatHan(
  nguyetHanCung: DiaChiCung,
  targetDay: number, // Ngày trong tháng (1-30)
): NhatHanResult {
  const ngayIndex = (targetDay - 1) % 12;
  const cungIndex = (diaBan.indexOf(nguyetHanCung) + ngayIndex) % 12;
  const cung = diaBan[cungIndex];

  return {
    ngay: targetDay,
    cung: cung.cung,
    chi: cung.chi,
    hanh: getHanhByChi(cung.chi),
  };
}

/**
 * ===== THỜI HẠN (giờ) =====
 * Lấy cung Nhật Hạn làm giờ Tý, đếm thuận mỗi cung một giờ
 */
export function tinhThoiHan(
  nhatHanCung: DiaChiCung,
  targetHour: number,
): ThoiHanResult {
  const gioTyIndex = Math.floor(((targetHour + 1) % 24) / 2);
  const cungIndex = (diaBan.indexOf(nhatHanCung) + gioTyIndex) % 12;
  const cung = diaBan[cungIndex];

  return {
    gio: targetHour,
    cung: cung.cung,
    chi: cung.chi,
    hanh: getHanhByChi(cung.chi),
  };
}
```

#### H. Cửu Phi Tinh (Lưu Sao)

```typescript
// Deno Edge Function: /src/algorithms/cuu-phi-tinh.ts

interface CuuPhiTinh {
  saoId: string;
  saoName: string;
  cung: string;
  cungIndex: number;
  description: string;
}

/**
 * An Cửu Phi Tinh (9 Lưu Sao) cho năm xem hạn
 */
export function anCuuPhiTinh(
  targetYear: number,
  chiNam: string,
  diaBan: DiaChiCung[],
): CuuPhiTinh[] {
  const results: CuuPhiTinh[] = [];
  const chiIndex = CHI_ORDER.indexOf(chiNam);

  // 1. Lưu Thái Tuế: Năm nào thì đóng tại cung đó
  const luuThaiTue = diaBan.findIndex((c) => c.chi === chiNam);
  results.push({
    saoId: "luu_thai_tue",
    saoName: "Lưu Thái Tuế",
    cung: chiNam,
    cungIndex: luuThaiTue,
    description: `Đóng tại cung ${chiNam}, bản mệnh được che chở.`,
  });

  // 2. Lưu Tang Môn: Đi cùng Lưu Thái Tuế
  results.push({
    saoId: "luu_tang_mon",
    saoName: "Lưu Tang Môn",
    cung: diaBan[luuThaiTue].cung,
    cungIndex: luuThaiTue,
    description: "Chủ về tang chế, hao tài.",
  });

  // 3. Lưu Bạch Hổ: Đi cùng Lưu Thái Tuế
  results.push({
    saoId: "luu_bach_ho",
    saoName: "Lưu Bạch Hổ",
    cung: diaBan[luuThaiTue].cung,
    cungIndex: luuThaiTue,
    description: "Chủ về bạo lực, tai nạn, tang chế.",
  });

  // 4. Lưu Thiên Mã: Theo Chi năm
  // Dần-Ngọ-Tuất → Thân; Thân-Tý-Thìn → Hợi; etc.
  const thienMaMap: Record<string, string> = {
    Tý: "Thân",
    Ngọ: "Thân",
    Tuất: "Thân",
    Sửu: "Mão",
    Tỵ: "Mão",
    Mùi: "Mão",
    Dần: "Hợi",
    Mão: "Hợi",
    Hợi: "Hợi",
    Thân: "Dần",
    Dậu: "Dần",
    Thìn: "Dần",
  };
  const thienMaChi = thienMaMap[chiNam] || chiNam;
  const thienMaIndex = diaBan.findIndex((c) => c.chi === thienMaChi);
  results.push({
    saoId: "luu_thien_ma",
    saoName: "Lưu Thiên Mã",
    cung: thienMaChi,
    cungIndex: thienMaIndex,
    description: "Chủ về du lịch, di chuyển, thay đổi.",
  });

  // 5. Lưu Lộc Tồn: Theo Can năm
  const canIndex = ((targetYear % 10) + 10) % 10;
  const locTonMap = [
    "Tý",
    "Sửu",
    "Dần",
    "Mão",
    "Thìn",
    "Tỵ",
    "Ngọ",
    "Mùi",
    "Thân",
    "Dậu",
  ];
  const locTonIndex = diaBan.findIndex((c) => c.chi === locTonMap[canIndex]);
  results.push({
    saoId: "luu_loc_ton",
    saoName: "Lưu Lộc Tồn",
    cung: locTonMap[canIndex],
    cungIndex: locTonIndex,
    description: "Tài lộc tăng trưởng, có thêm thu nhập.",
  });

  // 6. Lưu Kình Dương: Theo Can năm
  const kinhDuongIndex = (canIndex + 4) % 12;
  results.push({
    saoId: "luu_kinh_duong",
    saoName: "Lưu Kình Dương",
    cung: CHI_ORDER[kinhDuongIndex],
    cungIndex: kinhDuongIndex,
    description: "Năng động, quyết đoán, nhưng cẩn thận xung đột.",
  });

  // 7. Lưu Đà La: Đối xung với Kình Dương
  const daLaIndex = (kinhDuongIndex + 6) % 12;
  results.push({
    saoId: "luu_da_la",
    saoName: "Lưu Đà La",
    cung: CHI_ORDER[daLaIndex],
    cungIndex: daLaIndex,
    description: "Dao động, bất an, có thể có thay đổi.",
  });

  // 8. Lưu Thiên Khốc: Khởi từ Ngọ tính nghịch đến năm hạn
  const ngoIndex = CHI_ORDER.indexOf("Ngọ");
  const namTuoi = new Date().getFullYear() - targetYear;
  const khocIndex = (ngoIndex - namTuoi + 12) % 12;
  results.push({
    saoId: "luu_khoc",
    saoName: "Lưu Thiên Khốc",
    cung: CHI_ORDER[khocIndex],
    cungIndex: khocIndex,
    description: "Chủ về mất mát, buồn phiền, ốm đau.",
  });

  // 9. Lưu Thiên Hư: Khởi từ Ngọ tính thuận đến năm hạn
  const huIndex = (ngoIndex + namTuoi) % 12;
  results.push({
    saoId: "luu_hu",
    saoName: "Lưu Thiên Hư",
    cung: CHI_ORDER[huIndex],
    cungIndex: huIndex,
    description: "Tâm linh, thiêng liêng, cần giữ tinh thần.",
  });

  return results;
}
```

#### I. Scoring & Interpretation Engine

```typescript
// Deno Edge Function: /src/algorithms/interpreter.ts

interface VanHanScore {
  score: number; // -100 to +100
  rating: "ruc_rong" | "tuoi_vang" | "binh_thuong" | "tai_chung" | "duong_thi";
  factors: ScoreFactor[];
}

interface ScoreFactor {
  type: "positive" | "negative" | "warning";
  source: string; // Nguồn (e.g., "Ngũ Hành", "Sao Sáng", "Sát Tinh")
  description: string;
  score: number; // Điểm cộng/trừ
}

/**
 * Tính điểm vận hạn tổng hợp
 */
export function tinhDiemVanHan(
  menhCan: string,
  tieuHanCung: string,
  tieuHanHanh: string,
  cuuPhiTinh: CuuPhiTinh[],
  saoList: SaoAn[],
): VanHanScore {
  let totalScore = 0;
  const factors: ScoreFactor[] = [];

  // 1. Ngũ Hành tương sinh/tương khắc
  // Mệnh Thủy gặp cung Kim (tương sinh) → +10
  // Mệnh Thủy gặp cung Thổ (tương khắc) → -10
  const huongSinh: Record<string, string> = {
    Kim: "Thủy",
    Thủy: "Mộc",
    Mộc: "Hỏa",
    Hỏa: "Thổ",
    Thổ: "Kim",
  };
  const huongKhac: Record<string, string> = {
    Kim: "Mộc",
    Thủy: "Thổ",
    Mộc: "Thổ",
    Hỏa: "Thủy",
    Thổ: "Hỏa",
  };

  if (huongSinh[menhCan] === tieuHanHanh) {
    totalScore += 15;
    factors.push({
      type: "positive",
      source: "Ngũ Hành",
      description: `${menhCan} gặp ${tieuHanHanh} - Tương sinh`,
      score: 15,
    });
  } else if (huongKhac[menhCan] === tieuHanHanh) {
    totalScore -= 15;
    factors.push({
      type: "negative",
      source: "Ngũ Hành",
      description: `${menhCan} gặp ${tieuHanHanh} - Tương khắc`,
      score: -15,
    });
  }

  // 2. Đánh giá Sao trong cung Tiểu Hạn
  const saoTrongTieuHan = saoList.filter(
    (s) => s.cungIndex === diaBan.findIndex((c) => c.cung === tieuHanCung),
  );
  for (const sao of saoTrongTieuHan) {
    if (sao.brightness === "M" || sao.brightness === "V") {
      totalScore += 10;
      factors.push({
        type: "positive",
        source: `Sao ${sao.saoId}`,
        description: `${sao.saoId} sáng chủ về hưng vượng`,
        score: 10,
      });
    } else if (sao.brightness === "H") {
      totalScore -= 10;
      factors.push({
        type: "negative",
        source: `Sao ${sao.saoId}`,
        description: `${sao.saoId} hãm địa`,
        score: -10,
      });
    }
  }

  // 3. Lưu Sao trong cung Tiểu Hạn
  for (const luu of cuuPhiTinh) {
    if (luu.cungIndex === diaBan.findIndex((c) => c.cung === tieuHanCung)) {
      if (["luu_loc_ton", "luu_thai_tue", "luu_khoa"].includes(luu.saoId)) {
        totalScore += 8;
        factors.push({
          type: "positive",
          source: luu.saoName,
          description: `${luu.saoName} nhập cung tiểu hạn`,
          score: 8,
        });
      } else if (
        ["luu_bach_ho", "luu_khoc", "luu_kinh_duong"].includes(luu.saoId)
      ) {
        totalScore -= 8;
        factors.push({
          type: "negative",
          source: luu.saoName,
          description: `${luu.saoName} nhập cung tiểu hạn`,
          score: -8,
        });
      }
    }
  }

  // 4. Trùng Phùng (Đại Hạn + Tiểu Hạn cùng cung)
  // Xử lý riêng trong API

  // 5. Rating
  let rating: VanHanScore["rating"];
  if (totalScore >= 60) rating = "ruc_rong";
  else if (totalScore >= 30) rating = "tuoi_vang";
  else if (totalScore >= -10) rating = "binh_thuong";
  else if (totalScore >= -40) rating = "tai_chung";
  else rating = "duong_thi";

  return { score: Math.max(-100, Math.min(100, totalScore)), rating, factors };
}
```

---

## 7. Edge Functions - Supabase

### 7.1 Project Structure

```
supabase/
├── functions/
│   ├── _shared/
│   │   ├── db.ts              # Supabase DB client
│   │   ├── auth.ts            # Auth helpers
│   │   ├── logger.ts          # Structured logging
│   │   └── cors.ts            # CORS headers
│   │
│   ├── calculate/
│   │   ├── index.ts           # Main handler
│   │   ├── lunar-calendar.ts  # Lunar conversion
│   │   ├── can-chi.ts         # Can Chi calculation
│   │   ├── menh.ts            # Mệnh calculation
│   │   ├── cuc.ts             # Cục calculation
│   │   ├── dia-ban.ts         # 12 Cung
│   │   ├── sao.ts             # Sao placement
│   │   ├── tu-hop.ts          # Tứ Hợp
│   │   ├── tam-hop.ts         # Tam Hợp
│   │   ├── hoa.ts             # Hóa Lộc/Quyền/Khoa/Kiếp
│   │   └── index.ts
│   │
│   ├── van-han/
│   │   ├── index.ts           # Main handler
│   │   ├── dai-han.ts         # Đại Hạn
│   │   ├── tieu-han.ts        # Tiểu Hạn
│   │   ├── nguyet-han.ts      # Nguyệt Hạn
│   │   ├── nhat-han.ts        # Nhật Hạn
│   │   ├── thoi-han.ts        # Thời Hạn
│   │   ├── cuu-phi-tinh.ts    # Cửu Phi Tinh
│   │   └── interpreter.ts     # Scoring & interpretation
│   │
│   ├── interpret/
│   │   ├── index.ts           # Main handler
│   │   ├── rules.ts           # Interpretation rules
│   │   └── templates.ts       # Text templates
│   │
│   ├── user-profile/
│   │   ├── index.ts           # Profile CRUD
│   │   └── settings.ts        # Settings
│   │
│   ├── subscription/
│   │   ├── index.ts           # Subscription management
│   │   ├── stripe.ts          # Stripe integration
│   │   └── webhook.ts         # Stripe webhook handler
│   │
│   └── health/
│       └── index.ts           # Health check
│
├── migrations/
│   ├── 001_initial_schema.sql
│   ├── 002_sao_master.sql
│   ├── 003_luuan_gia.sql
│   └── 004_indexes.sql
│
└── config.toml                # Supabase CLI config
```

### 7.2 Edge Function Example - Calculate

```typescript
// supabase/functions/calculate/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";
import {
  tinhCanChiNam,
  tinhCanChiThang,
  tinhCanChiNgay,
  tinhCanChiGio,
} from "./can-chi.ts";
import { tinhMenh } from "./menh.ts";
import { tinhCucSo } from "./cuc.ts";
import { anDiaBan } from "./dia-ban.ts";
import { anSaoCoDinh } from "./sao.ts";
import { anTuHop } from "./tu-hop.ts";
import { anTamHop } from "./tam-hop.ts";
import { anHoaSao } from "./hoa.ts";

serve(async (req: Request) => {
  // CORS
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Verify auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Missing auth" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      { global: { headers: { Authorization: authHeader } } },
    );

    const {
      data: { user },
      error: authError,
    } = await supabaseClient.auth.getUser();
    if (authError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 2. Parse request
    const body = await req.json();
    const { birth_date, birth_time, gender, birth_province } = body;

    // 3. Convert to lunar date
    const [year, month, day] = birth_date.split("-").map(Number);
    const [hour, minute] = birth_time.split(":").map(Number);

    const lunarDate = solarToLunar(year, month, day, 7);

    // 4. Calculate Can Chi
    const canChiNam = tinhCanChiNam(lunarDate.year);
    const canChiThang = tinhCanChiThang(canChiNam.can, lunarDate.month);
    const canChiNgay = tinhCanChiNgay(getJulianDayNumber(year, month, day));
    const canChiGio = tinhCanChiGio(hour, minute, canChiNgay.can);

    // 5. Calculate Mệnh
    const menh = tinhMenh(canChiNam.can, canChiNam.chi, lunarDate.isLeap);

    // 6. Calculate Cục
    const cuc = tinhCucSo(
      canChiNam.can,
      canChiNam.chi,
      lunarDate.month,
      menh.amDuong,
      gender,
    );

    // 7. An Địa Bàn
    const diaBan = anDiaBan(menh.chi, gender, cuc.direction);

    // 8. An Sao
    const saoList = anSaoCoDinh(
      diaBan,
      canChiNam.can,
      canChiNam.chi,
      canChiThang.can,
      lunarDate.isLeap,
      menh.chi,
      gender,
    );

    // 9. An Tứ Hợp, Tam Hợp
    const tuHop = anTuHop(diaBan);
    const tamHop = anTamHop(diaBan);

    // 10. An Hóa Sao
    const hoaSao = anHoaSao(canChiNam.can, canChiNam.chi, diaBan);

    // 11. Save to database
    // ... save user birth data and horoscope ...

    // 12. Return response
    return new Response(
      JSON.stringify({
        success: true,
        data: {
          user: {
            /* ... */
          },
          horoscope: { diaBan, saoList, tuHop, tamHop, hoaSao },
        },
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
```

### 7.3 Edge Function Example - Van Han

```typescript
// supabase/functions/van-han/index.ts

serve(async (req: Request) => {
  // ... auth ...

  const { horoscope_id, target_year, include_monthly, include_daily } =
    await req.json();

  // 1. Get horoscope from DB
  const { data: horoscope, error } = await supabaseClient
    .from("horoscopes")
    .select("*")
    .eq("id", horoscope_id)
    .single();

  if (error || !horoscope) {
    return new Response(JSON.stringify({ error: "Horoscope not found" }), {
      status: 404,
    });
  }

  // 2. Get user birth data
  const { data: user } = await supabaseClient
    .from("users")
    .select("*")
    .eq("id", user_id)
    .single();

  // 3. Calculate Đại Hạn
  const daiHan = tinhDaiHan(
    horoscope.dia_chi,
    user.cuc_number,
    user.am_duong,
    user.gender,
    target_year - new Date(user.birth_date).getFullYear(),
  );

  // 4. Calculate Tiểu Hạn
  const tieuHan = tinhTieuHan(
    horoscope.dia_chi,
    user.chi_nam,
    target_year,
    user.gender,
  );

  // 5. Calculate Nguyệt Hạn (nếu cần)
  let nguyetHan = null;
  if (include_monthly) {
    nguyetHan = [];
    for (let thang = 1; thang <= 12; thang++) {
      const nh = tinhNguyetHan(horoscope.dia_chi, thang, user.birth_hour, 0);
      nguyetHan.push(...nh);
    }
  }

  // 6. Calculate Cửu Phi Tinh
  const cuuPhiTinh = anCuuPhiTinh(target_year, user.chi_nam, horoscope.dia_chi);

  // 7. Scoring
  const score = tinhDiemVanHan(
    user.menh_can,
    tieuHan.cung,
    tieuHan.hanh,
    cuuPhiTinh,
    horoscope.sao_list,
  );

  // 8. Save to DB
  // ...

  // 9. Return
  return new Response(
    JSON.stringify({
      success: true,
      data: {
        target_year,
        score,
        dai_han: daiHan,
        tieu_han: tieuHan,
        nguyet_han: nguyetHan,
        cuu_phi_tinh: cuuPhiTinh,
        interpretation: generateInterpretation(score, tieuHan, cuuPhiTinh),
      },
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
```

---

## 8. Row Level Security (RLS)

### 8.1 RLS Policies

```sql
-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.horoscopes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.van_hans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_favorites ENABLE ROW LEVEL SECURITY;

-- ============================================
-- USERS POLICIES
-- ============================================

-- User có thể đọc và cập nhật THÔNG TIN CƠ BẢN của chính mình
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- User có thể xem birth data (cần thiết cho horoscope) nhưng không phải ai cũng được xem
CREATE POLICY "Users can view own birth data" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- ============================================
-- HOROSCOPES POLICIES
-- ============================================

-- User chỉ có thể xem lá số của chính mình
CREATE POLICY "Users can view own horoscopes" ON public.horoscopes
  FOR SELECT USING (auth.uid() = user_id);

-- User chỉ có thể tạo lá số cho chính mình
CREATE POLICY "Users can create own horoscopes" ON public.horoscopes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- User chỉ có thể cập nhật lá số của chính mình
CREATE POLICY "Users can update own horoscopes" ON public.horoscopes
  FOR UPDATE USING (auth.uid() = user_id);

-- User chỉ có thể xóa lá số của chính mình
CREATE POLICY "Users can delete own horoscopes" ON public.horoscopes
  FOR DELETE USING (auth.uid() = user_id);

-- Ai cũng có thể xem lá số CÔNG KHAI
CREATE POLICY "Anyone can view public horoscopes" ON public.horoscopes
  FOR SELECT USING (is_public = TRUE);

-- ============================================
-- VAN_HANS POLICIES
-- ============================================

-- User chỉ có thể xem/cập nhật vận hạn của chính mình
CREATE POLICY "Users can view own van_hans" ON public.van_hans
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own van_hans" ON public.van_hans
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own van_hans" ON public.van_hans
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own van_hans" ON public.van_hans
  FOR DELETE USING (auth.uid() = user_id);

-- ============================================
-- USER_SETTINGS POLICIES
-- ============================================

-- User chỉ có thể xem/sửa cài đặt của chính mình
CREATE POLICY "Users can view own settings" ON public.user_settings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" ON public.user_settings
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================
-- USER_FAVORITES POLICIES
-- ============================================

-- User chỉ có thể xem/sửa yêu thích của chính mình
CREATE POLICY "Users can manage own favorites" ON public.user_favorites
  FOR ALL USING (auth.uid() = user_id);

-- ============================================
-- PUBLIC TABLES (No RLS needed)
-- ============================================

-- sao_master, luuan_gia có thể xem công khai
-- Không cần RLS vì đây là dữ liệu reference

-- ============================================
-- SERVICE ROLE BYPASS
-- ============================================

-- Edge Functions (service role) có full access
-- Không cần policy vì service role bypass RLS
```

---

## 9. Frontend Integration

### 9.1 API Service Layer (Supabase Client)

```typescript
// src/shared/services/api.ts hoặc src/lib/supabase.ts

import { createClient } from "@supabase/supabase-js";
import config from "@/shared/utils/config";

const supabaseUrl = config.SUPABASE_URL;
const supabaseAnonKey = config.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Auth helpers
export async function signUp(
  email: string,
  password: string,
  birthData: BirthData,
) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: birthData.displayName,
        birth_date: birthData.birthDate,
        birth_time: birthData.birthTime,
        gender: birthData.gender,
      },
    },
  });
  return { data, error };
}

export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  return { error };
}

export async function getCurrentUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  return { user, error };
}
```

### 9.2 Horoscope Service

```typescript
// src/shared/services/horoscope.service.ts

import { supabase } from "./supabase";

export const horoscopeService = {
  /**
   * Tính lá số đầy đủ
   */
  async calculate(birthData: BirthDataInput): Promise<HoroscopeResult> {
    const { data, error } = await supabase.functions.invoke("calculate", {
      body: birthData,
    });
    if (error) throw error;
    return data;
  },

  /**
   * Lấy lá số của user
   */
  async getById(horoscopeId: string): Promise<Horoscope> {
    const { data, error } = await supabase.functions.invoke(
      `horoscope/${horoscopeId}`,
    );
    if (error) throw error;
    return data;
  },

  /**
   * Lấy danh sách lá số
   */
  async getList(): Promise<Horoscope[]> {
    const { data, error } = await supabase.functions.invoke("horoscopes");
    if (error) throw error;
    return data;
  },

  /**
   * Chia sẻ lá số
   */
  async share(horoscopeId: string): Promise<{ shareToken: string }> {
    const { data, error } = await supabase.functions.invoke(
      `horoscope/${horoscopeId}/share`,
      {
        method: "POST",
      },
    );
    if (error) throw error;
    return data;
  },
};
```

### 9.3 Van Han Service

```typescript
// src/shared/services/van-han.service.ts

import { supabase } from "./supabase";

export const vanHanService = {
  /**
   * Tính vận hạn cho năm
   */
  async calculate(params: {
    horoscopeId: string;
    targetYear: number;
    includeMonthly?: boolean;
    includeDaily?: boolean;
  }): Promise<VanHanResult> {
    const { data, error } = await supabase.functions.invoke(
      "van-han/calculate",
      {
        body: params,
      },
    );
    if (error) throw error;
    return data;
  },

  /**
   * Lấy vận hạn năm cụ thể
   */
  async getByYear(horoscopeId: string, year: number): Promise<VanHanResult> {
    const { data, error } = await supabase.functions.invoke(`van-han/${year}`, {
      body: { horoscope_id: horoscopeId },
    });
    if (error) throw error;
    return data;
  },

  /**
   * Lấy timeline vận hạn 10 năm
   */
  async getTimeline(horoscopeId: string): Promise<VanHanTimeline> {
    const { data, error } = await supabase.functions.invoke(
      "van-han/timeline",
      {
        body: { horoscope_id: horoscopeId },
      },
    );
    if (error) throw error;
    return data;
  },
};
```

### 9.4 Redux Store Integration

```typescript
// src/shared/store/slices/horoscope.slice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { horoscopeService } from "@/shared/services/horoscope.service";

interface HoroscopeState {
  current: Horoscope | null;
  list: Horoscope[];
  loading: boolean;
  error: string | null;
}

const initialState: HoroscopeState = {
  current: null,
  list: [],
  loading: false,
  error: null,
};

export const calculateHoroscope = createAsyncThunk(
  "horoscope/calculate",
  async (birthData: BirthDataInput, { rejectWithValue }) => {
    try {
      const result = await horoscopeService.calculate(birthData);
      return result;
    } catch (error: any) {
      return rejectWithValue(error.message || "Lỗi khi tính lá số");
    }
  },
);

export const fetchHoroscopeList = createAsyncThunk(
  "horoscope/fetchList",
  async (_, { rejectWithValue }) => {
    try {
      const list = await horoscopeService.getList();
      return list;
    } catch (error: any) {
      return rejectWithValue(error.message || "Lỗi khi lấy danh sách lá số");
    }
  },
);

const horoscopeSlice = createSlice({
  name: "horoscope",
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(calculateHoroscope.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateHoroscope.fulfilled, (state, action) => {
        state.loading = false;
        state.current = action.payload.horoscope;
        if (action.payload.user) {
          state.list.push({
            ...action.payload.horoscope,
            user: action.payload.user,
          });
        }
      })
      .addCase(calculateHoroscope.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
```

---

## 10. Deployment & DevOps

### 10.1 Supabase CLI Setup

```bash
# Cài đặt Supabase CLI
npm install -g supabase

# Login
supabase login

# Link project
cd d:/0-automationland/E-BROKER/mobile
supabase link --project-ref <your-project-ref>

# Khởi tạo local development
supabase init
```

### 10.2 Database Migration

```bash
# Tạo migration mới
supabase migration new initial_schema

# Chạy migration
supabase db push

# Reset database (local only)
supabase db reset
```

### 10.3 Edge Functions Deployment

```bash
# Deploy tất cả functions
supabase functions deploy

# Deploy function cụ thể
supabase functions deploy calculate
supabase functions deploy van-han

# Deploy với secret
supabase secrets set STRIPE_SECRET_KEY=sk_live_xxx
```

### 10.4 GitHub Actions CI/CD

```yaml
# .github/workflows/supabase.yml

name: Deploy Supabase

on:
  push:
    branches: [main]
    paths:
      - "supabase/**"

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Supabase CLI
        uses: supabase/setup-cli@v1
        with:
          version: 1.200.0

      - name: Link Project
        run: supabase link --project-ref ${{ secrets.SUPABASE_PROJECT_REF }}
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}

      - name: Push Migrations
        run: supabase db push

      - name: Deploy Functions
        run: supabase functions deploy
        env:
          SUPABASE_ACCESS_TOKEN: ${{ secrets.SUPABASE_ACCESS_TOKEN }}
```

---

## 11. Performance & Caching

### 11.1 Caching Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                      CACHING LAYERS                          │
│                                                              │
│  1. Client Cache (React Native AsyncStorage)                 │
│     - Lưu horoscope đã tính                                 │
│     - TTL: 24 giờ                                           │
│     - Key: `horoscope_${userId}`                            │
│                                                              │
│  2. Edge Function Cache (Deno Cache)                        │
│     - Lưu kết quả luận giải đã tính                         │
│     - TTL: 1 giờ                                            │
│                                                              │
│  3. Database Query Cache (Supabase)                         │
│     - Auto-managed by PostgreSQL                             │
│     - Join indexes cho các bảng liên quan                   │
│                                                              │
│  4. CDN Cache (Supabase Edge Functions)                     │
│     - Static content (sao_master) có thể cache 1 tuần       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 11.2 AsyncStorage Caching

```typescript
// src/shared/utils/cache.ts

import AsyncStorage from "@react-native-async-storage/async-storage";

const CACHE_PREFIX = "@tuvi:";
const DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours

export async function getCache<T>(key: string): Promise<T | null> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return null;

    const { data, timestamp } = JSON.parse(raw);
    if (Date.now() - timestamp > DEFAULT_TTL) {
      await AsyncStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }
    return data as T;
  } catch {
    return null;
  }
}

export async function setCache<T>(key: string, data: T): Promise<void> {
  await AsyncStorage.setItem(
    CACHE_PREFIX + key,
    JSON.stringify({ data, timestamp: Date.now() }),
  );
}
```

### 11.3 Database Indexes for Performance

```sql
-- Composite indexes cho các query thường dùng
CREATE INDEX idx_horoscopes_user_dai_han
  ON public.horoscopes(user_id, created_at DESC);

CREATE INDEX idx_van_hans_user_year
  ON public.van_hans(user_id, target_year DESC);

-- Partial indexes
CREATE INDEX idx_horoscopes_public_shared
  ON public.horoscopes(id)
  WHERE is_public = TRUE;

-- GIN indexes cho JSONB
CREATE INDEX idx_horoscopes_dia_chi_gin
  ON public.horoscopes USING GIN (dia_chi);

CREATE INDEX idx_horoscopes_sao_gin
  ON public.horoscopes USING GIN (sao_list);

CREATE INDEX idx_van_hans_cuu_phi_gin
  ON public.van_hans USING GIN (cuu_phi_tinh);

-- Text search index
CREATE INDEX idx_luuan_gia_content_fts
  ON public.luuan_gia USING GIN (to_tsvector('vietnamese', content));
```

---

## 12. Cost Estimation

### 12.1 Supabase Pricing (2026)

| Tier     | Giá        | Database | Edge Functions        | Storage | Bandwidth |
| -------- | ---------- | -------- | --------------------- | ------- | --------- |
| **Free** | $0         | 500MB    | 2M invocations/tháng  | 1GB     | 5GB       |
| **Pro**  | $25/tháng  | 8GB      | 10M invocations/tháng | 100GB   | 50GB      |
| **Team** | $599/tháng | Custom   | Unlimited             | 1TB     | Unlimited |

### 12.2 Ước Tính Chi Phí

| Thành phần              | Số lượng                | Chi phí ước tính       |
| ----------------------- | ----------------------- | ---------------------- |
| Supabase Pro            | 1 project               | $25/tháng              |
| Supabase Edge Functions | ~100K invocations/tháng | $0 (trong limit)       |
| Supabase Storage        | ~5GB                    | $0 (trong limit)       |
| Stripe (Subscription)   | Nếu có                  | 2.9% + $0.30/giao dịch |
| **Tổng MVP**            |                         | **$25/tháng**          |
| **Tổng Production**     |                         | **$25-100/tháng**      |

### 12.3 Scaling Path

```
MVP (0-10K users)
├── Supabase Free/Pro
├── Edge Functions: ~2M invocations/tháng
└── Storage: ~1GB

Growth (10K-100K users)
├── Supabase Pro ($25/tháng)
├── Edge Functions: ~10M invocations/tháng
├── Storage: ~10GB
└── Add Redis cache if needed

Scale (100K+ users)
├── Self-hosted Supabase hoặc Supabase Enterprise
├── Vercel/Cloudflare Workers cho Edge Functions
├── Redis cluster cho caching
└── CDN cho static assets
```

---

## 13. Roadmap Triển Khai

### Phase 1: Setup & Core (Tuần 1-2)

- [ ] Tạo Supabase project
- [ ] Chạy database migrations
- [ ] Seed data: `sao_master` (100+ sao)
- [ ] Seed data: `luuan_gia` (mẫu luận giải)
- [ ] Setup Supabase CLI
- [ ] Deploy Edge Functions cơ bản

### Phase 2: Algorithm Engine (Tuần 3-4)

- [ ] Implement Lunar Calendar Converter
- [ ] Implement Can Chi Calculator
- [ ] Implement Mệnh & Cục Calculator
- [ ] Implement Địa Bàn (12 Cung)
- [ ] Implement Sao Placement (~100 sao)
- [ ] Unit tests cho từng module

### Phase 3: Vận Hạn Engine (Tuần 5-6)

- [ ] Implement Đại Hạn Calculator
- [ ] Implement Tiểu Hạn Calculator
- [ ] Implement Nguyệt Hạn Calculator
- [ ] Implement Cửu Phi Tinh
- [ ] Implement Scoring Engine
- [ ] Integration tests

### Phase 4: API & Frontend Integration (Tuần 7-8)

- [ ] Complete API endpoints
- [ ] Integrate với React Native app
- [ ] Redux store setup
- [ ] UI screens: Input birth data
- [ ] UI screens: Display horoscope
- [ ] UI screens: Display Vận Hạn

### Phase 5: Polish & Launch (Tuần 9-10)

- [ ] RLS policies review
- [ ] Performance optimization
- [ ] Caching implementation
- [ ] Error handling
- [ ] Documentation
- [ ] Soft launch

---

## 14. Appendix

### A. Các Bảng Tra Cứu Quan Trọng

#### A.1 Bảng Can Chi

```
CAN: Giáp(0), Ất(1), Bính(2), Đinh(3), Mậu(4), Kỷ(5), Canh(6), Tân(7), Nhâm(8), Quý(9)
CHI: Tý(0), Sửu(1), Dần(2), Mão(3), Thìn(4), Tỵ(5), Ngọ(6), Mùi(7), Thân(8), Dậu(9), Tuất(10), Hợi(11)
```

#### A.2 Bảng Ngũ Hành

```
Kim: Tây, Thân, Dậu
Mộc: Đông, Mão, Tỵ
Thủy: Bắc, Tý, Hợi
Hỏa: Nam, Ngọ, Dần
Thổ: Trung ương, Sửu, Mùi, Thìn, Tuất
```

#### A.3 Bảng Tương Sinh/Tương Khắc

```
Tương Sinh: Kim→Thủy→Mộc→Hỏa→Thổ→Kim
Tương Khắc: Kim⚔Mộc, Thủy🔥Hỏa, Mộc⚔Thổ, Hỏa⚔Thủy, Thổ⚔Hỏa
```

#### A.4 Bảng Độ Sáng Sao

```
M (Miếu): Tốt nhất - Tại cung thuộc về nó
V (Vượng): Khá tốt - Cung liên quan
Đ (Đắc): Bình thường - Cung có lợi
H (Hãm): Xấu - Cung không thuộc về nó
```

### B. Sample Database Seed (sao_master)

```sql
-- Xem đầy đủ trong migrations/002_sao_master.sql
-- Bao gồm ~100+ sao với đầy đủ metadata
```

### C. Environment Variables

```bash
# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Stripe (nếu có subscription)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...

# App
NEXT_PUBLIC_APP_URL=https://tuvi.app
```

---

**Document Version:** 1.0.0  
**Last Updated:** 2026-04-17  
**Author:** AI Assistant  
**Status:** Draft - Ready for Review
