import re
import os

def extract_block(text, start_marker):
    """Trích xuất block bắt đầu bằng start_marker, kết thúc bằng } đồng cấp"""
    start_idx = text.find(start_marker)
    if start_idx == -1:
        return None
    brace_start = text.find('{', start_idx)
    if brace_start == -1:
        return None
    brace_count = 1
    i = brace_start + 1
    while i < len(text):
        if text[i] == '{':
            brace_count += 1
        elif text[i] == '}':
            brace_count -= 1
            if brace_count == 0:
                return text[brace_start:i+1]
        i += 1
    return None

# Tạo thư mục constants
os.makedirs('src/data/constants', exist_ok=True)

print("🔍 Trích xuất constants từ file gốc...")

# ===== CungDetailScreen =====
with open('src/ui/components/CungDetailScreen_original.tsx', 'r', encoding='utf-8') as f:
    cung_text = f.read()

# 1. CUNG_ICON + CUNG_CHI_TIET
cung_icon = extract_block(cung_text, 'export const CUNG_ICON: Record<string, any> =')
cung_chi_tiet_match = re.search(r'const CUNG_CHI_TIET: Record<.*?>= (\{.*?\n\});', cung_text, re.DOTALL)
if cung_icon and cung_chi_tiet_match:
    cung_chi_tiet = cung_chi_tiet_match.group(0).replace('const CUNG_CHI_TIET', 'export const CUNG_CHI_TIET', 1)
    with open('src/data/constants/cung-chi-tiet.ts', 'w', encoding='utf-8') as f:
        f.write(cung_icon + '\n\n' + cung_chi_tiet + '\n')
    print("  ✅ cung-chi-tiet.ts")
else:
    print("  ❌ Thiếu CUNG_ICON hoặc CUNG_CHI_TIET")

# 2. CHINH_TINH_DESC
chinh_tinh = extract_block(cung_text, 'export const CHINH_TINH_DESC: Record<')
if chinh_tinh:
    with open('src/data/constants/chinh-tinh.ts', 'w', encoding='utf-8') as f:
        f.write(chinh_tinh + '\n')
    print("  ✅ chinh-tinh.ts")
else:
    print("  ❌ Không tìm thấy CHINH_TINH_DESC")

# 3. PHU_TINH_DESC + HUNG_TINH_LIST
phu_tinh = extract_block(cung_text, 'export const PHU_TINH_DESC: Record<')
if phu_tinh:
    hung_list = '''export const HUNG_TINH_LIST = [
  "Kình Dương","Đà La","Hỏa Tinh","Linh Tinh","Thiên Không","Địa Kiếp",
  "Thái Tuế","Tang Môn","Bạch Hổ","Quan Phù","Tử Phù","Điếu Khách",
  "Bệnh Phù","Tuế Phá","Thiên La","Địa Võng","Kiếp Sát","Phá Toái",
  "Thiên Hình","Thiên Riêu","Thiên Hư","Thiên Khốc","Phi Liêm",
  "Lưu Hà","Tiểu Hao","Đại Hao","Phục Bình","Quan Phủ"
];
'''
    with open('src/data/constants/phu-tinh.ts', 'w', encoding='utf-8') as f:
        f.write(hung_list + '\n' + phu_tinh + '\n')
    print("  ✅ phu-tinh.ts")
else:
    print("  ❌ Không tìm thấy PHU_TINH_DESC")

# 4. TU_HOA_DESC
tu_hoa = extract_block(cung_text, 'export const TU_HOA_DESC: Record<')
if tu_hoa:
    with open('src/data/constants/tu-hoa.ts', 'w', encoding='utf-8') as f:
        f.write(tu_hoa + '\n')
    print("  ✅ tu-hoa.ts")
else:
    print("  ❌ Không tìm thấy TU_HOA_DESC")

# ===== NgayMaiScreen =====
ngay_original = 'src/ui/screens/NgayMaiScreen_original.tsx'
ngay_text = ''
if os.path.exists(ngay_original):
    with open(ngay_original, 'r', encoding='utf-8') as f:
        ngay_text = f.read()
    
    print("\n🔍 Trích xuất từ NgayMaiScreen_original.tsx...")
    
    # NGU_HANH_ORDER
    order_match = re.search(r'const NGU_HANH_ORDER = \[.*?\];', ngay_text, re.DOTALL)
    order_line = order_match.group(0).replace('const NGU_HANH_ORDER', 'export const NGU_HANH_ORDER', 1) if order_match else 'export const NGU_HANH_ORDER = ["Mộc", "Hỏa", "Thổ", "Kim", "Thủy"];'
    print("  ✅ NGU_HANH_ORDER")
    
    # NGU_HANH_NGAY
    ngu_hanh = extract_block(ngay_text, 'const NGU_HANH_NGAY: Record<')
    if ngu_hanh:
        ngu_hanh = ngu_hanh.replace('const NGU_HANH_NGAY', 'export const NGU_HANH_NGAY', 1)
        print("  ✅ NGU_HANH_NGAY")
    else:
        print("  ❌ Không tìm thấy NGU_HANH_NGAY")
        ngu_hanh = ''
    
    # Functions
    funcs = []
    for name in ['tinhTuongSinh', 'tinhDiem', 'phanTichSaoNgay', 'getDateStr']:
        m = re.search(rf'(function {name}\s*\(.*?\n\}})', ngay_text, re.DOTALL)
        if m:
            code = m.group(1).replace(f'function {name}', f'export function {name}', 1)
            funcs.append(code)
            print(f"  ✅ {name}")
        else:
            print(f"  ❌ Không tìm thấy {name}")
    
    with open('src/data/constants/ngu-hanh-ngay.ts', 'w', encoding='utf-8') as f:
        f.write(order_line + '\n\n' + ngu_hanh + '\n\n' + '\n\n'.join(funcs) + '\n')
    print("  📄 Created ngu-hanh-ngay.ts")
else:
    print("\n⚠️ Không có NgayMaiScreen_original.tsx")

# ===== REBUILD COMPONENTS =====
print("\n🔨 Rebuild components...")

# Rebuild CungDetailScreen
cung_start = cung_text.find('export const CungDetailScreen: React.FC<')
if cung_start != -1:
    component_code = cung_text[cung_start:]
    header = '''import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Star,
  Zap,
  Shield,
  TrendingUp,
  Heart,
  Coins,
  Briefcase,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Users,
  Home,
  Activity,
  Globe,
  Baby,
  Swords,
} from "lucide-react";
import { Cung } from "../../domain/model/types";

// Constants
import { CUNG_ICON, CUNG_CHI_TIET } from "../../data/constants/cung-chi-tiet";
import { CHINH_TINH_DESC } from "../../data/constants/chinh-tinh";
import { PHU_TINH_DESC, HUNG_TINH_LIST } from "../../data/constants/phu-tinh";
import { TU_HOA_DESC } from "../../data/constants/tu-hoa";

'''
    with open('src/ui/components/CungDetailScreen.tsx', 'w', encoding='utf-8') as f:
        f.write(header + component_code)
    print("  ✅ Rebuilt CungDetailScreen.tsx")
else:
    print("  ❌ Không tìm thấy CungDetailScreen component")

# Rebuild NgayMaiScreen
if os.path.exists(ngay_original):
    ngay_start = ngay_text.find('export const NgayMaiScreen: React.FC<')
    if ngay_start != -1:
        component_code = ngay_text[ngay_start:]
        header = '''import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Star,
  Coins,
  Stethoscope,
  Heart,
  Briefcase,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Compass,
  Clock,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CrystalCard } from "../components/shared/CrystalCard";
import { CrystalRing } from "../components/shared/CrystalRing";
import { TuViData } from "../../domain/model/types";

// Constants
import {
  NGU_HANH_NGAY,
  tinhTuongSinh,
  tinhDiem,
  phanTichSaoNgay,
  getDateStr,
} from "../../data/constants/ngu-hanh-ngay";

'''
        with open('src/ui/screens/NgayMaiScreen.tsx', 'w', encoding='utf-8') as f:
            f.write(header + component_code)
        print("  ✅ Rebuilt NgayMaiScreen.tsx")
    else:
        print("  ❌ Không tìm thấy NgayMaiScreen component")
else:
    print("  ⚠️ Bỏ qua rebuild NgayMaiScreen.tsx")

print("\n🏁 Xong! Chạy 'npm run lint' để kiểm tra TypeScript.")
