import { PHU_TINH_OVERRIDES } from "./phu-tinh-overrides";
import type { PhuTinhLoai, PhuTinhMeta } from "./phu-tinh-types";

export type { PhuTinhLoai, PhuTinhMeta } from "./phu-tinh-types";

const DEFAULT_BENEFIT: Record<PhuTinhLoai, string> = {
  cat: "Khi đi cùng cát tinh hoặc đắc vị, sao này giúp cung phát triển thuận lợi và ổn định hơn.",
  hung: "Nhận diện sớm xu hướng của sao giúp đương số chủ động phòng tránh và giảm bớt tác động bất lợi.",
  trung: "Ý nghĩa của sao rõ hay mờ còn tùy chính tinh đồng cung, tam hợp và đại vận đang xét.",
};

const DEFAULT_DRAWBACK: Record<PhuTinhLoai, string> = {
  cat: "Nếu lạm dụng ưu thế hoặc gặp nhiều sát tinh đi kèm, mặt tốt của sao có thể giảm đáng kể.",
  hung: "Khi gặp thêm sát tinh hoặc rơi vào thời vận xấu, sao dễ làm vấn đề tăng biên độ và kéo dài hơn.",
  trung: "Nếu tách rời bối cảnh toàn lá số thì rất dễ luận sao theo hướng quá đơn giản hoặc cực đoan.",
};

function createStarMeta(
  loai: PhuTinhLoai,
  moTa: string,
  chiTiet: string,
  loi = DEFAULT_BENEFIT[loai],
  batLoi = DEFAULT_DRAWBACK[loai],
): PhuTinhMeta {
  return {
    loai,
    mo_ta: moTa,
    chi_tiet: chiTiet,
    loi,
    bat_loi: batLoi,
    anh_huong_cung: {},
  };
}

function defineStar(name: string, meta: PhuTinhMeta): [string, PhuTinhMeta] {
  return [name, meta];
}

export const PHU_TINH_ALIASES: Record<string, string> = {
  "Thiên Hỉ": "Thiên Hỷ",
  "Bác Sĩ": "Bác Sỹ",
  "Lực Sĩ": "Lực Sỹ",
  "Đầu Quân": "Đẩu Quân",
  "Phục Bình": "Phục Binh",
};

export function normalizePhuTinhName(name: string | number): string {
  const normalized = String(name ?? "").trim();
  return PHU_TINH_ALIASES[normalized] ?? normalized;
}

const CHINH_TINH_NAMES = [
  "Tử Vi",
  "Thiên Cơ",
  "Thái Dương",
  "Vũ Khúc",
  "Thiên Đồng",
  "Liêm Trinh",
  "Thiên Phủ",
  "Thái Âm",
  "Tham Lang",
  "Cự Môn",
  "Thiên Tướng",
  "Thiên Lương",
  "Thất Sát",
  "Phá Quân",
] as const;

const PHU_TINH_TRUNG_TINH_NAMES = [
  "Hóa Lộc",
  "Hóa Quyền",
  "Hóa Khoa",
  "Hóa Kỵ",
  "Lộc Tồn",
  "Kình Dương",
  "Đà La",
  "Hỏa Tinh",
  "Linh Tinh",
  "Thiên Không",
  "Địa Kiếp",
  "Văn Xương",
  "Văn Khúc",
  "Tả Phụ",
  "Hữu Bật",
  "Thiên Khôi",
  "Thiên Việt",
  "Thiên Mã",
  "Thiên Thương",
  "Thiên Sứ",
  "Thiên Đức",
  "Nguyệt Đức",
  "Long Trì",
  "Phượng Các",
  "Thai Phụ",
  "Phong Cáo",
  "Hồng Loan",
  "Thiên Hỷ",
  "Tam Thai",
  "Bát Tọa",
  "Thiên Hình",
  "Thiên Diêu",
  "Đẩu Quân",
] as const;

const VONG_LOC_TON_NAMES = [
  "Bác Sỹ",
  "Lực Sỹ",
  "Thanh Long",
  "Tiểu Hao",
  "Tướng Quân",
  "Tấu Thư",
  "Phi Liêm",
  "Hỷ Thần",
  "Bệnh Phù",
  "Đại Hao",
  "Phục Binh",
  "Quan Phủ",
] as const;

const VONG_THAI_TUE_NAMES = [
  "Thái Tuế",
  "Thiếu Dương",
  "Tang Môn",
  "Thiếu Âm",
  "Quan Phù",
  "Tử Phù",
  "Tuế Phá",
  "Long Đức",
  "Bạch Hổ",
  "Phúc Đức",
  "Điếu Khách",
  "Trực Phù",
] as const;

const TRANG_SINH_NAMES = [
  "Tràng Sinh",
  "Mộc Dục",
  "Quan Đới",
  "Lâm Quan",
  "Đế Vượng",
  "Suy",
  "Bệnh",
  "Tử",
  "Mộ",
  "Tuyệt",
  "Thai",
  "Dưỡng",
] as const;

const THAN_SAT_NAMES = [
  "Ân Quang",
  "Thiên Quý",
  "Thiên Quan",
  "Thiên Phúc",
  "Quý Nhân",
  "Thiên Giải",
  "Địa Giải",
  "Giải Thần",
  "Thiên Y",
  "Thiên Trù",
  "Thiên Tài",
  "Thiên Thọ",
  "Đào Hoa",
  "Địa Không",
  "Cô Thần",
  "Quả Tú",
  "Lưu Hà",
  "Phá Toái",
  "Kiếp Sát",
] as const;

const KHONG_VONG_NAMES = ["Tuần", "Triệt"] as const;

const BO_SUNG_HE_THONG_NAMES = [
  "Thiên La",
  "Địa Võng",
  "Thiên Riêu",
  "Thiên Hư",
  "Thiên Khốc",
  "Hoa Cái",
  "Quốc Ấn",
  "Đường Phù",
  "Văn Tinh",
] as const;

export const PHU_TINH_GROUPS = {
  chinh_tinh: [...CHINH_TINH_NAMES],
  phu_tinh_trung_tinh: [...PHU_TINH_TRUNG_TINH_NAMES],
  vong_loc_ton: [...VONG_LOC_TON_NAMES],
  vong_thai_tue: [...VONG_THAI_TUE_NAMES],
  vong_trang_sinh: [...TRANG_SINH_NAMES],
  than_sat: [...THAN_SAT_NAMES],
  khong_vong: [...KHONG_VONG_NAMES],
  bo_sung_he_thong: [...BO_SUNG_HE_THONG_NAMES],
} as const;

const CANONICAL_STAR_ORDER = [
  ...PHU_TINH_GROUPS.chinh_tinh,
  ...PHU_TINH_GROUPS.phu_tinh_trung_tinh,
  ...PHU_TINH_GROUPS.vong_loc_ton,
  ...PHU_TINH_GROUPS.vong_thai_tue,
  ...PHU_TINH_GROUPS.vong_trang_sinh,
  ...PHU_TINH_GROUPS.than_sat,
  ...PHU_TINH_GROUPS.khong_vong,
  ...PHU_TINH_GROUPS.bo_sung_he_thong,
] as const;

export const PHU_TINH_ORDER = Array.from(new Set(CANONICAL_STAR_ORDER));

const HUNG_TINH_CANONICAL = [
  "Kình Dương",
  "Đà La",
  "Hỏa Tinh",
  "Linh Tinh",
  "Thiên Không",
  "Địa Kiếp",
  "Thái Tuế",
  "Tang Môn",
  "Bạch Hổ",
  "Quan Phù",
  "Tử Phù",
  "Điếu Khách",
  "Bệnh Phù",
  "Tuế Phá",
  "Thiên La",
  "Địa Võng",
  "Kiếp Sát",
  "Phá Toái",
  "Thiên Hình",
  "Thiên Riêu",
  "Thiên Hư",
  "Thiên Khốc",
  "Phi Liêm",
  "Lưu Hà",
  "Tiểu Hao",
  "Đại Hao",
  "Phục Binh",
  "Quan Phủ",
  "Địa Không",
  "Cô Thần",
  "Quả Tú",
  "Tuần",
  "Triệt",
] as const;

const HUNG_TINH_ALIAS_NAMES = Object.keys(PHU_TINH_ALIASES).filter((alias) =>
  HUNG_TINH_CANONICAL.includes(PHU_TINH_ALIASES[alias] as (typeof HUNG_TINH_CANONICAL)[number]),
);

export const HUNG_TINH_LIST = Array.from(new Set([...HUNG_TINH_CANONICAL, ...HUNG_TINH_ALIAS_NAMES]));

function createChinhTinhMeta(name: string): PhuTinhMeta {
  return createStarMeta(
    "trung",
    "Chính tinh nòng cốt của lá số, quyết định khí chất và trục vận chính của cung.",
    `${name} thuộc hệ 14 chính tinh. Khi luận cần xét đồng thời vị trí cung, trạng thái miếu-vượng-đắc-hãm, các sao hội hợp và đại vận để xác định mức cát hung thực tế.`,
    "Khi được cát tinh hỗ trợ và ở vị trí tốt, sao phát huy rất rõ vai trò chủ quản của cung.",
    "Nếu hãm địa hoặc bị nhiều sát tinh xâm phạm, tác động của sao dễ chuyển thành áp lực và biến động.",
  );
}

function createTrangSinhMeta(name: string): PhuTinhMeta {
  return createStarMeta(
    "trung",
    "Một pha trong vòng Tràng Sinh, dùng để định trạng thái sinh - vượng - suy của khí.",
    `${name} là một trong 12 sao của vòng Tràng Sinh. Nhóm sao này chủ yếu giúp đọc nhịp phát triển, độ sung mãn hay suy giảm của khí tại cung, nên luôn cần luận theo toàn vòng thay vì tách riêng từng sao.`,
    "Cho thêm lớp thông tin về chu kỳ phát triển và độ chín của sự việc.",
    "Nếu tách khỏi cục, giới tính, chiều an sao và chính tinh đi kèm thì rất dễ luận sai.",
  );
}

const GENERATED_STAR_META = Object.fromEntries([
  ...CHINH_TINH_NAMES.map((name) => defineStar(name, createChinhTinhMeta(name))),
  ...TRANG_SINH_NAMES.map((name) => defineStar(name, createTrangSinhMeta(name))),
  defineStar(
    "Hóa Lộc",
    createStarMeta(
      "cat",
      "Tứ hóa chủ tài lộc, khả năng sinh lợi và hấp dẫn nguồn lực.",
      "Hóa Lộc làm nổi bật mặt tăng trưởng, thu hút tiền bạc, cơ hội và sự hưởng thụ. Đây là một trong các sao tứ hóa quan trọng nhất khi xét tài vận và khả năng khai mở nguồn lợi.",
      "Giúp cung dễ sinh tài, có duyên với nguồn lực, khách hàng hoặc cơ hội thực dụng.",
      "Nếu đi cùng nhiều hung tinh, lợi ích dễ biến thành tham cầu, thất thoát hoặc được rồi lại mất.",
    ),
  ),
  defineStar(
    "Hóa Quyền",
    createStarMeta(
      "cat",
      "Tứ hóa chủ quyền hành, năng lực điều phối và sức ảnh hưởng.",
      "Hóa Quyền làm tăng tính chủ động, khả năng quyết đoán, tiếng nói và vai trò dẫn dắt. Sao này thường được chú ý khi xét công danh, vị thế và bản lĩnh thực thi.",
      "Giúp cung mạnh về chủ kiến, năng lực nắm quyền và thúc đẩy kết quả.",
      "Nếu mất cân bằng, quyền lực dễ kéo theo áp lực, cố chấp hoặc xung đột vị trí.",
    ),
  ),
  defineStar(
    "Hóa Khoa",
    createStarMeta(
      "cat",
      "Tứ hóa chủ danh tiếng, học thức, sự bảo hộ và khả năng giải ách.",
      "Hóa Khoa thường làm sáng cung theo hướng văn danh, tri thức, tín nhiệm và hóa giải bớt va chạm. Đây là sao rất đáng chú ý khi xét thi cử, uy tín và sự nâng đỡ bằng danh vị.",
      "Tăng cơ hội được ghi nhận, bảo hộ, học hành hanh thông và lời nói có trọng lượng.",
      "Nếu luận riêng lẻ mà bỏ qua nền cung, hiệu ứng bảo hộ của Hóa Khoa dễ bị đánh giá quá mức.",
    ),
  ),
  defineStar(
    "Hóa Kỵ",
    createStarMeta(
      "hung",
      "Tứ hóa chủ vướng mắc, thị phi, ràng buộc cảm xúc và điểm nghẽn khó thông.",
      "Hóa Kỵ làm lộ rõ phần bất toàn của cung: chậm trễ, hiểu lầm, phiền muộn hoặc vấn đề lặp lại. Khi đi cùng chính tinh mạnh, sao này vẫn có thể biến thành động lực sửa sai và đào sâu nội tâm.",
      "Giúp đương số nhìn ra điểm yếu, học cách thận trọng và xử lý các nút thắt từ gốc.",
      "Nếu gặp thêm sát tinh hoặc thời vận xấu, cung dễ sinh thị phi, chậm trễ và hao tổn tinh thần.",
    ),
  ),
  defineStar(
    "Địa Không",
    createStarMeta(
      "hung",
      "Hung tinh thiên về hư hao, trống hụt, sự việc dễ đứt đoạn giữa chừng.",
      "Địa Không thường báo hiệu trạng thái hụt lực, công sức không thu đủ kết quả hoặc có yếu tố rỗng ở bên trong. Khi đi cùng hung tinh khác, tính phá tán và bất an thường tăng rõ.",
    ),
  ),
  defineStar(
    "Thiên Thương",
    createStarMeta(
      "trung",
      "Sao phụ ghi nhận dấu ấn tổn thương, trả giá và bài học qua trải nghiệm thực tế.",
      "Thiên Thương thường được dùng để nhấn mạnh mặt phải chịu đựng, hy sinh hoặc gánh vác hệ quả. Ý nghĩa cụ thể cần xét thêm cung vị, chính tinh đồng cung và hạn vận.",
    ),
  ),
  defineStar(
    "Thai Phụ",
    createStarMeta(
      "cat",
      "Phụ tinh thiên về nâng đỡ, thai nghén ý tưởng và sự hỗ trợ kín đáo.",
      "Thai Phụ thường đi cùng các sao văn tinh, quý tinh để tăng nền hậu thuẫn, học hành hoặc sự giúp sức đúng lúc. Sao này hợp khi xét khả năng vun bồi và nuôi dưỡng kết quả về sau.",
    ),
  ),
  defineStar(
    "Phong Cáo",
    createStarMeta(
      "cat",
      "Phụ tinh gắn với danh dự, văn thư, sự tuyên dương và tính chính danh.",
      "Phong Cáo làm nổi bật mặt danh dự, tiếng tốt, giấy tờ hoặc sự ghi nhận công khai. Khi hội cát tinh, sao này thường tăng độ đẹp về hình thức lẫn uy tín.",
    ),
  ),
  defineStar(
    "Bát Tọa",
    createStarMeta(
      "cat",
      "Phụ tinh chủ chỗ đứng, nền tảng ổn định và sự nâng đỡ vị thế.",
      "Bát Tọa thường giúp cung có điểm tựa, tăng độ vững vàng trong học hành, công việc hoặc quan hệ. Khi đi cùng Tam Thai, tính chất nền nếp và từng bước đi lên càng rõ.",
    ),
  ),
  defineStar(
    "Đẩu Quân",
    createStarMeta(
      "trung",
      "Phụ tinh chỉ nhịp vận động, trật tự vận hành và điểm xoay của thời khí.",
      "Đẩu Quân được dùng như một sao mốc để hỗ trợ luận thời điểm và dòng vận của các sự việc. Ý nghĩa của sao thiên về chức năng hỗ trợ hơn là tự quyết cát hung.",
    ),
  ),
  defineStar(
    "Tấu Thư",
    createStarMeta(
      "cat",
      "Sao thiên về giấy tờ, văn bản, trình bày và khả năng diễn đạt chính thức.",
      "Tấu Thư giúp nổi bật các việc liên quan hồ sơ, công văn, học thuật hoặc phát biểu có cấu trúc. Khi đi cùng văn tinh, sức biểu đạt và tính chuẩn mực thường tăng rõ.",
    ),
  ),
  defineStar(
    "Quý Nhân",
    createStarMeta(
      "cat",
      "Sao phước trợ, thường chỉ người nâng đỡ, cơ hội tốt và sự cứu giải đúng lúc.",
      "Quý Nhân làm sáng cung theo hướng được hỗ trợ, gặp người tốt hoặc có lối ra khi tình thế khó. Đây là sao bổ trợ quan trọng khi xét phúc khí và duyên gặp đúng người đúng thời điểm.",
    ),
  ),
  defineStar(
    "Tuần",
    createStarMeta(
      "hung",
      "Không vong làm ngắt mạch lực của cung, khiến sự việc phải đi vòng hoặc chậm thông.",
      "Tuần Trung Không Vong tạo vùng rỗng khiến sao và cung bị giảm độ phát huy trong giai đoạn đầu, đồng thời buộc sự việc phải qua thử thách rồi mới ổn định hơn.",
      "Giúp lọc bớt sự cực đoan của một số sao quá mạnh và khiến đương số thận trọng hơn.",
      "Thường gây trễ nhịp, hụt đầu, khởi sự không như ý hoặc thành quả đến chậm.",
    ),
  ),
  defineStar(
    "Triệt",
    createStarMeta(
      "hung",
      "Không vong chặn ngang dòng vận, cắt mạnh đà phát triển hoặc hiệu lực của sao.",
      "Triệt Lộ Không Vong có tính cắt, chặn và buộc cung phải tái cấu trúc cách vận hành. Tác động của Triệt thường trực diện hơn Tuần, nhất là ở giai đoạn đầu đời hoặc đầu chu kỳ sự việc.",
      "Có thể chặn bớt hung tính quá mạnh và ép đương số đi theo hướng tỉnh táo, thực tế hơn.",
      "Dễ tạo cảm giác bị cản, công việc đứt đoạn, công sức phải làm lại hoặc khó đi theo đường thẳng.",
    ),
  ),
]) as Record<string, PhuTinhMeta>;

const NORMALIZED_OVERRIDES = Object.fromEntries(
  Object.entries(PHU_TINH_OVERRIDES).map(([name, meta]) => [normalizePhuTinhName(name), meta]),
) as Record<string, PhuTinhMeta>;

const BASE_PHU_TINH_DESC = {
  ...GENERATED_STAR_META,
  ...NORMALIZED_OVERRIDES,
};

const ALIAS_PHU_TINH_DESC = Object.fromEntries(
  Object.entries(PHU_TINH_ALIASES)
    .map(([alias, canonical]) => [alias, BASE_PHU_TINH_DESC[canonical]] as const)
    .filter((entry): entry is [string, PhuTinhMeta] => Boolean(entry[1])),
);

export const PHU_TINH_DESC: Record<string, PhuTinhMeta> = {
  ...BASE_PHU_TINH_DESC,
  ...ALIAS_PHU_TINH_DESC,
};

export function getPhuTinhMeta(name: string | number): PhuTinhMeta | undefined {
  return PHU_TINH_DESC[normalizePhuTinhName(name)];
}

export function isHungPhuTinh(name: string | number): boolean {
  return HUNG_TINH_LIST.includes(normalizePhuTinhName(name));
}
