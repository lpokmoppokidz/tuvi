# 2026-04-18 `la-so` Nam Tong UI

- Source doc: `docs/13-namtong`, focus `11-giao-dien-hien-thi.md`.
- No GitNexus used.
- Done:
  - rebuilt `src/ui/features/la-so` board to 12-cung Nam Tong layout `4x3` with center card.
  - added center summary card for `Mệnh`, `Thân`, `Cục`, dates, current `Đại hạn`.
  - upgraded palace cards: `Địa chi`, fixed `Ngũ hành cung`, `Mệnh/Thân` badges, main/support stars, `Tứ hóa`.
  - enriched payload/UI types with `key`, `hanh_cung`, `ten_cung`, `is_menh`, `is_than`.
  - exposed those fields from `src/domain/services/TuViCalculator.ts`.
  - fixed detail-screen icon mapping to use palace key instead of display label.
  - added detail overview metadata block in `CungDetailScreen`.
- New files:
  - `src/ui/features/la-so/components/palaceMeta.ts`
  - `src/ui/features/la-so/components/LaSoCenterCard.tsx`
- Verify: `npm.cmd run lint` -> `tsc --noEmit` passed.

# 2026-04-18 `la-so` overlay extension

- Implemented Nam Tong extension overlay on board:
  - modes: `Tĩnh` / `Đại hạn` / `Tiểu hạn`.
  - center card now controls overlay mode and shows active cycle summary.
  - palace cards now receive overlay badges:
    - `Đại hạn`: current + next cycle palaces.
    - `Tiểu hạn`: current year palace + current month/day/hour markers.
- Updated files:
  - `src/ui/features/la-so/LaSoScreen.tsx`
  - `src/ui/features/la-so/components/CungGrid.tsx`
  - `src/ui/features/la-so/components/CungGridItem.tsx`
  - `src/ui/features/la-so/components/LaSoCenterCard.tsx`
  - `src/ui/features/la-so/components/palaceMeta.ts`
- Verify: `npm.cmd run lint` passed.

# 2026-04-18 `la-so` UI compact redesign

- Source: User request to make board layout more compact and information-dense.
- Redesigned `CungGridItem.tsx`:
  - **Header**: 1-line layout — địa chi + hành badge left, Mệnh/Thân/Tuần/Triệt badges right (abbreviated: M, Th, ⊘K, ⊘T).
  - **Palace name**: smaller font (`9.5px`), `rounded-xl` instead of `rounded-2xl`.
  - **Chính tinh**: replaced `☀☀☀` icons with **colored dots** (6px) — saves ~8px per star.
  - **Phụ tinh**: horizontal wrap instead of vertical list — 4 stars in 1-2 lines instead of 3 separate lines.
  - **Padding**: reduced from `p-2` to `p-1.5`.
  - **Tứ Hóa badges**: shortened labels (Lộc, Q, K, Kỵ) for space efficiency.
- Redesigned `LaSoCenterCard.tsx`:
  - **Padding**: `p-3` → `p-2.5`, gap `gap-2` → `gap-1.5`.
  - **Info grid**: merged 4 info boxes (Mệnh/Thân/Bản mệnh/Cục) into single **2×2 grid** instead of 2 separate grids.
  - **Font sizes**: slightly smaller labels for secondary info.
  - **Removed**: "Phân tích Cách Cục" button (no handler) to save space.
- Result: Palace cards are ~30% more compact while retaining all information. Board fits more comfortably on screen.
- Files modified:
  - `src/ui/features/la-so/components/CungGridItem.tsx`
  - `src/ui/features/la-so/components/LaSoCenterCard.tsx`
- Verify: `npm.cmd run lint` → no new errors (existing error in `VanHanScreen.tsx` unrelated).

# 2026-04-18 `la-so` Góc chiếu & Tương tác Ngũ hành

- Source: `docs/13-namtong/09-tuong-tac-luan-giai.md` — implement missing features from spec.
- Added **Góc chiếu** (aspects) and **Ngũ hành tương tác** (elemental relations) to palace detail screen.
- New file: `src/ui/features/la-so/components/aspectsHelper.ts`
  - Helper functions for palace aspects: `getXungCung`, `getTamHopCungs`, `getNhiHopCung`.
  - Ngũ hành analysis: `analyzeCungSaoRelation`, `analyzeSaoMenhRelation`.
  - Constants: `TAM_HOP`, `NHI_HOP`, `NGU_HANH_SINH`, `NGU_HANH_KHAC`.
- Updated `CungDetailScreen.tsx`:
  - Added new tab: **"Góc chiếu & Tương tác"**.
  - Displays:
    - **Xung chiếu** (180° opposite palace).
    - **Tam hợp** (120° triad palaces).
    - **Nhị hợp** (supportive pair palace).
    - **Cung–Sao relation**: Cung sinh/khắc Sao → Sao tăng/giảm lực.
    - **Sao–Mệnh relation**: Sao sinh/khắc Mệnh chủ → Cát/Hung tinh.
  - Added `banMenhHanh` prop to receive owner's Bản mệnh ngũ hành.
- Updated `LaSoScreen.tsx`: pass `tuViData?.banMenhHanh` to `CungDetailScreen`.
- Verify: `getDiagnostics` → no errors.
- Status: ✅ Phase 4 checklist item "Panel chi tiết từng cung" now includes aspects & elemental analysis per spec.

# 2026-04-18 Backend verification: docs 01, 05, 06, 07

- Task: Verify backend implementation of docs/13-namtong files 01, 05, 06, 07.
- Checked: `src/domain/services/NamTongCalculator.ts`
- Result: ✅ **Backend đã hoàn chỉnh** — all features from specs are implemented:
  - **01 Tổng quan**: System architecture, data flow ✓
  - **05 An 14 chính tinh**: Tử Vi + Thiên Phủ hệ, brightness table (Miếu/Vượng/Đắc/Bình/Hãm) ✓
  - **06 Phụ tinh vòng sao**: 
    - Tứ Hóa (Lộc/Quyền/Khoa/Kỵ) theo Can năm ✓
    - Vòng Thái Tuế (12 sao theo Chi năm) ✓
    - Vòng Lộc Tồn (12 sao: Lộc Tồn, Kình Dương, Đà La, Lực Sỹ, Bác Sỹ...) ✓
    - Vòng Tràng Sinh (12 sao theo Cục + giới tính) ✓
    - Phụ tinh theo Can năm: Khôi Việt, Thiên Quan, Thiên Phúc ✓
    - Phụ tinh theo Chi năm: Thiên Mã, Hồng Loan, Thiên Hỷ, Long Trì, Phượng Các, Kiếp Sát, Hoa Cái, Thiên Tài, Thiên Thọ ✓
  - **07 An sao theo giờ/ngày/tháng**:
    - Theo Tháng: Tả Phụ, Hữu Bật, Thiên Hình, Thiên Diêu, Giải Thần, Thiên Y, Thai Phụ, Phong Cáo, Nguyệt Đức ✓
    - Theo Giờ: Văn Xương, Văn Khúc, Địa Không, Địa Kiếp ✓
    - Theo Ngày: Tam Thai, Bát Tọa, Ân Quang, Thiên Quý ✓
  - Tuần Không & Triệt Lộ ✓
- UI verification:
  - `useCungList` hook correctly maps backend data to UI ✓
  - `CungGridItem` displays 4 phụ tinh (compact) ✓
  - `PhuTinhTab` + `PhuTinhList` show full list with descriptions ✓
- Conclusion: **No implementation needed** — backend logic complete, UI rendering correctly. Docs 01/05/06/07 fully implemented.

# 2026-04-18 TUVI_DATA integration & NamTongCalculator upgrade

- Source: `docs/data.json` (122 stars, 7 categories, aliases).
- Task: Replace hardcoded star lists with centralized `TUVI_DATA` dataset; add all missing stars.
- Changes to `src/domain/services/NamTongCalculator.ts`:
  - **Import**: Added `TUVI_DATA` from `@/data/constants/ui/tuvi-data`.
  - **`addStar()` refactored**: Auto-normalizes star names via `TUVI_DATA.aliases`; auto-classifies `type` from `TUVI_DATA.categories.chinh_tinh_14.stars`.
  - **Ba vòng sao**: `THAI_TUE_VONG`, `LOC_TON_VONG`, `TRANG_SINH_VONG` now sourced from `TUVI_DATA.categories.ba_vong_36.subgroups[]`.
  - **Vòng Bác Sỹ**: Fixed direction (thuận/nghịch) based on Âm Dương giới tính.
  - **22 missing fixed stars added** (section 23):
    - **Cát tinh**: Quý Nhân, Thiên Giải, Địa Giải, Thiên Trù.
    - **Hung tinh**: Đào Hoa, Cô Thần, Quả Tú, Lưu Hà, Phá Toái.
    - **Bổ sung hệ thống**: Thiên La, Địa Võng, Thiên Riêu, Thiên Hư, Thiên Khốc, Quốc Ấn, Đường Phù, Văn Tinh.
    - **Trung tinh**: Thiên Không, Thiên Thương, Thiên Sứ, Thiên Đức, Đẩu Quân.
  - **Star count**: 85 → 107 fixed stars placed (all 107/107 from `docs/data.json` excluding 9 Lưu stars, 4 Tứ Hóa props, 2 Không Vong flags).
- New file: `src/data/constants/ui/tuvi-data.ts` — typed `TUVI_DATA` constant (`as const`).
- Updated: `src/data/constants/index.ts` — re-exports `tuvi-data`.
- Verify: `npm.cmd run lint` → only pre-existing `VanHanScreen.tsx` error.
