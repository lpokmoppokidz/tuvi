# 11. Checklist Triển Khai

## 12. Checklist Triển Khai

### 12.1 Security Checklist

#### Authentication & Authorization

- [ ] Sử dụng HTTPS cho tất cả API calls
- [ ] JWT tokens được lưu trong Keychain/Keystore
- [ ] Refresh tokens được rotate định kỳ
- [ ] Password requirements được enforce (8+ chars, uppercase, number)
- [ ] Rate limiting cho login attempts (5 attempts / 15 minutes)
- [ ] Session timeout sau 30 phút không hoạt động
- [ ] Đăng xuất xóa hết tokens và cache
- [ ] Multi-device login control (nếu cần)

#### Data Security

- [ ] Không lưu password dạng plain text
- [ ] Dữ liệu nhạy cảm (birth_date, birth_time) được mã hóa
- [ ] RLS policies được apply trên tất cả user tables
- [ ] Audit logging cho các thao tác quan trọng
- [ ] Input validation ở cả client và server
- [ ] Sanitization cho user inputs

#### API Security

- [ ] CORS headers được configure đúng
- [ ] Security headers (X-Content-Type-Options, X-Frame-Options, etc.)
- [ ] Rate limiting trên Edge Functions
- [ ] Request/Response size limits
- [ ] Proper error messages (không leak internal details)

#### Storage Security

- [ ] Secure storage cho tokens
- [ ] Biometric authentication cho sensitive data (nếu có)
- [ ] Auto-clear sensitive data khi logout
- [ ] Encrypted AsyncStorage cho cached data

### 12.2 Performance Checklist

#### Bundle Optimization

- [ ] Tree shaking enabled
- [ ] Unused modules removed
- [ ] Code splitting cho routes
- [ ] Lazy loading cho heavy components
- [ ] Dynamic imports cho optional features

#### Image Optimization

- [ ] Images resized to appropriate dimensions
- [ ] WebP format sử dụng khi supported
- [ ] Image compression (quality 80%)
- [ ] Progressive loading cho large images
- [ ] Image caching enabled
- [ ] Placeholder/skeleton loading states

#### Network Optimization

- [ ] Response caching (TTL: 1 hour for horoscopes)
- [ ] Stale-while-revalidate strategy
- [ ] Pagination cho large lists
- [ ] Request deduplication
- [ ] Offline mode support với fallback data

#### Rendering Optimization

- [ ] FlatList với proper key extraction
- [ ] Memoization với React.memo
- [ ] useCallback/useMemo cho expensive operations
- [ ] Virtualization cho long lists
- [ ] Avoid inline function definitions in render
- [ ] Proper image sizing (không scale trong render)

### 12.3 Error Handling Checklist

#### Client-Side Error Handling

- [ ] Error boundaries cho all screens
- [ ] User-friendly error messages
- [ ] Retry mechanisms cho recoverable errors
- [ ] Offline detection và handling
- [ ] Crash recovery với state restoration

#### Server-Side Error Handling

- [ ] Try-catch blocks trong all Edge Functions
- [ ] Proper error responses (không crash)
- [ ] Error logging và monitoring
- [ ] Graceful degradation strategies

#### Crash Prevention

- [ ] Null/undefined checks
- [ ] Type guards cho complex types
- [ ] Async operation error handling
- [ ] App state management (background/foreground)
- [ ] Memory leak prevention (cleanup subscriptions)

### 12.4 Monitoring Checklist

#### Logging

- [ ] Structured logging với levels (DEBUG, INFO, WARN, ERROR, CRITICAL)
- [ ] Log transport cho production monitoring
- [ ] Sensitive data masking trong logs
- [ ] Log rotation/cleanup

#### Performance Monitoring

- [ ] Track slow operations (>100ms)
- [ ] Track slow renders (>16ms)
- [ ] Memory usage monitoring
- [ ] Network request timing

#### Analytics

- [ ] Track app crashes
- [ ] Track user behavior flows
- [ ] Track API error rates
- [ ] Track performance metrics

---

## Tài Liệu Liên Quan

- [Backend System Design](./tu-vi-backend-system-design.md) - Kiến trúc tổng thể hệ thống
- [Algorithm Documentation](./tu-vi-dau-so-van-han-algorithm.md) - Chi tiết thuật toán tính vận hạn

---

**Phiên bản:** 1.0.0  
**Ngày cập nhật:** 2026-04-17  
**Trạng thái:** Hoàn thành
