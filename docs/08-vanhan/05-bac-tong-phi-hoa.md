# 05 – Bắc Tông Luận Vận Hạn – Phi Hóa

---

## Điểm khác biệt cốt lõi so với Nam Tông

| Khía cạnh             | Nam Tông                              | Bắc Tông                                   |
|-----------------------|---------------------------------------|---------------------------------------------|
| Trọng tâm luận vận    | Cung sao hội tụ, Cách cục             | **Tứ Hóa bay qua các cung** (Phi tinh)      |
| Công cụ chính         | Mật độ sao, Miếu/Hãm                  | Hóa Lộc, Hóa Kỵ di chuyển theo hạn         |
| Số sao dùng           | 100+ sao                              | Tập trung 14 chính tinh + Tứ Hóa            |
| Đại hạn               | Đọc toàn cung                         | Xem Tứ Hóa Đại hạn can + Lưu niên can      |
| Tiểu hạn              | Cung tiểu hạn là trọng tâm            | Phi hóa từ cung tiểu hạn ra các cung khác  |

---

## Kỹ thuật Phi Hóa áp trên lá số Nam Tông

### Bước 1 – Xác định Can Đại hạn

Mỗi cung trên lá số có một **Can cung** (can của cung theo vòng An can cho 12 cung).  
Khi Đại hạn rơi vào cung X, lấy **Can của cung X** → áp Tứ Hóa của Can đó.

```typescript
// 12 cung theo thứ tự Dần→Sửu có Can lần lượt là:
// Cần xác định theo năm sinh và bảng An can 12 cung
const DAI_HAN_CAN_MAP: Record<number, ThienCan> = {
  // cungIndex → Can của cung (tính từ Can năm sinh)
  // VD: năm sinh Giáp, cung Dần = Giáp, Mão = Ất, Thìn = Bính...
};

function getDaiHanCan(menhCungIndex: number, hanCungIndex: number, yearCan: ThienCan): ThienCan {
  const offset = (hanCungIndex - menhCungIndex + 12) % 12;
  const canIndex = (THIEN_CAN.indexOf(yearCan) + offset) % 10;
  return THIEN_CAN[canIndex];
}
```

> **Lưu ý:** Cách tính Can cho 12 cung có dị bản giữa các trường phái. Bắc Tông dùng "An can 12 cung" từ Can năm sinh. Cần hardcode hoặc tính theo công thức An can chuẩn của phái đang dùng.

### Bước 2 – Phi Hóa từ cung Đại hạn

```
Can Đại hạn → Tứ Hóa (Lộc/Quyền/Khoa/Kỵ) đậu vào các sao nào
→ Sao đó đang đóng ở cung nào trên lá số gốc
→ Cung đó được "chiếu" bởi Đại hạn
```

```typescript
function phiHoaDaiHan(
  daiHanCan: ThienCan,
  allStars: Star[],
  cungs: Cung[]
): PhiHoaResult {
  const tuHoa = TU_HOA_TABLE[daiHanCan];
  return {
    locCung: findStarCung(tuHoa.loc, allStars, cungs),
    quyenCung: findStarCung(tuHoa.quyen, allStars, cungs),
    khoaCung: findStarCung(tuHoa.khoa, allStars, cungs),
    kyCung: findStarCung(tuHoa.ky, allStars, cungs),
  };
}
```

### Bước 3 – Kiểm tra Hóa Kỵ / Hóa Lộc nhập các cung trọng yếu

```
Hóa Kỵ bay vào:
  Cung Mệnh   → Ảnh hưởng bản thân, sức khỏe, tính cách bị thử thách
  Cung Tài    → Tài chính hao hụt, thất thoát
  Cung Quan   → Sự nghiệp trở ngại, dễ mất chức/việc
  Cung Di     → Di chuyển trắc trở, xuất ngoại bất lợi
  Cung Phu Thê→ Hôn nhân/tình duyên gặp sóng gió

Hóa Lộc bay vào:
  Cung Tài    → Năm có thu nhập tốt
  Cung Quan   → Thăng tiến, cơ hội sự nghiệp
  Cung Mệnh   → Tổng thể thuận lợi
```

> **Về Phi Hóa nâng cao:** Bắc Tông có kỹ thuật "Phi hóa tiếp" (hóa bay ra rồi bay tiếp sang cung khác – gọi là trùng phi), độ phức tạp cao, nên implement sau khi đã xong lớp cơ bản.
