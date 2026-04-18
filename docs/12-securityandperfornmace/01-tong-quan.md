# 01. Tổng Quan Bảo Mật & Hiệu Năng

## 1. Tổng Quan Bảo Mật & Hiệu Năng

### 1.1 Mô Hình Bảo Mật Đa Lớp

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    MULTI-LAYER SECURITY MODEL                             │
│                                                                          │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  LAYER 1: CLIENT-SIDE SECURITY                                    │  │
│  │  • Secure Storage (Keychain / Keystore)                          │  │
│  │  • Token Management                                               │  │
│  │  • Input Validation                                              │  │
│  │  • HTTPS Enforcement                                             │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                   │                                       │
│                                   ▼                                       │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  LAYER 2: API SECURITY                                           │  │
│  │  • JWT Validation                                                 │  │
│  │  • Rate Limiting                                                 │  │
│  │  • CORS Configuration                                             │  │
│  │  • Request/Response Encryption                                   │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                   │                                       │
│                                   ▼                                       │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  LAYER 3: DATABASE SECURITY                                      │  │
│  │  • Row Level Security (RLS) Policies                             │  │
│  │  • Encryption at Rest                                            │  │
│  │  • Audit Logging                                                 │  │
│  │  • Access Control                                                │  │
│  └──────────────────────────────────────────────────────────────────┘  │
│                                   │                                       │
│                                   ▼                                       │
│  ┌──────────────────────────────────────────────────────────────────┐  │
│  │  LAYER 4: INFRASTRUCTURE SECURITY                                │  │
│  │  • Supabase Cloud Security                                        │  │
│  │  • SSL/TLS Certificates                                           │  │
│  │  • DDoS Protection                                               │  │
│  │  • Firewall Rules                                                │  │
│  └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

### 1.2 Threat Model

| Threat Category       | Mô tả                                 | Mức độ rủi ro | Biện pháp                  |
| --------------------- | ------------------------------------- | ------------- | -------------------------- |
| **Token Theft**       | JWT bị đánh cắp qua man-in-the-middle | Cao           | HTTPS + Secure Storage     |
| **Password Cracking** | Brute force attack                    | Cao           | Rate limiting + Hashing    |
| **Data Breach**       | SQL injection / Unauthorized access   | Rất cao       | RLS + Input validation     |
| **API Abuse**         | DDoS / Request flooding               | Trung bình    | Rate limiting + Throttling |
| **Session Hijacking** | Refresh token bị đánh cắp             | Cao           | Secure storage + Rotation  |
| **Data Leakage**      | Thông tin nhạy cảm bị expose          | Trung bình    | Encryption + Masking       |
