export interface CungChiTietInfo {
  mo_ta: string;
  y_nghia_sau: string;
  loi: string[];
  bat_loi: string[];
  anh_huong_den: string[];
  bi_anh_huong_boi: string[];
  loi_khuyen: string;
}

export const CUNG_CHI_TIET: Record<string, CungChiTietInfo> = {
  Mệnh: {
    mo_ta: "Cung chủ đạo — phản ánh toàn bộ tính cách, ngoại hình, năng lực bẩm sinh và con đường cuộc đời.",
    y_nghia_sau: "Cung Mệnh là cung quan trọng nhất trong lá số, quyết định phần lớn bản chất con người.",
    loi: ["Phản ánh rõ nhất tài năng và thế mạnh bẩm sinh", "Quyết định mức độ may mắn tổng thể"],
    bat_loi: ["Hung tinh tại Mệnh gây ảnh hưởng sâu rộng", "Khó hóa giải nếu nhiều sao xấu hội tụ"],
    anh_huong_den: ["Quan Lộc", "Tài Bạch", "Thiên Di"],
    bi_anh_huong_boi: ["Phúc Đức", "Tật Ách"],
    loi_khuyen: "Phát huy tối đa điểm mạnh từ chính tinh. Tu dưỡng đức hạnh để hóa giải sao xấu.",
  },
  "Phụ Mẫu": {
    mo_ta: "Cung cha mẹ — phản ánh mối quan hệ với cha mẹ, bề trên và cấp trên.",
    y_nghia_sau: "Phản ánh sự nâng đỡ từ người lớn tuổi và những người có quyền lực.",
    loi: ["Được cấp trên tin tưởng", "Thừa hưởng di sản từ gia đình"],
    bat_loi: ["Dễ mâu thuẫn với người lớn tuổi", "Tự thân vận động nếu cung xấu"],
    anh_huong_den: ["Mệnh", "Quan Lộc"],
    bi_anh_huong_boi: ["Phúc Đức"],
    loi_khuyen: "Hiếu thảo giúp tăng cường khí vận. Chủ động xây dựng quan hệ tốt với cấp trên.",
  },
  "Phúc Đức": {
    mo_ta: "Cung phúc phần — đời sống tinh thần, tâm linh và phúc báo từ tiền kiếp.",
    y_nghia_sau: "Phúc Đức ảnh hưởng đến mức độ hạnh phúc thật sự, không chỉ vật chất.",
    loi: ["Tinh thần lạc quan, vượt khó tốt", "Duyên với tâm linh, bình an nội tâm"],
    bat_loi: ["Dễ buồn bã, lo âu vô cớ", "Đời sống tinh thần bất ổn"],
    anh_huong_den: ["Mệnh", "Tài Bạch"],
    bi_anh_huong_boi: ["Mệnh"],
    loi_khuyen: "Làm việc thiện để bồi đắp phúc đức. Cung này cải thiện qua hành động tích đức.",
  },
  "Điền Trạch": {
    mo_ta: "Cung nhà cửa — phản ánh bất động sản, nơi ở và tài sản cố định.",
    y_nghia_sau: "Cho biết khả năng sở hữu và chất lượng không gian sống.",
    loi: ["Dễ mua nhà, đầu tư sinh lời", "Môi trường sống tốt, gia đình êm ấm"],
    bat_loi: ["Hay chuyển chỗ ở, nhà dễ gặp sự cố", "Bất động sản dễ thua lỗ"],
    anh_huong_den: ["Tài Bạch", "Phúc Đức"],
    bi_anh_huong_boi: ["Thiên Di"],
    loi_khuyen: "Đầu tư bất động sản sớm nếu cung tốt. Cần ổn định trước khi mua nếu cung xấu.",
  },
  "Quan Lộc": {
    mo_ta: "Cung sự nghiệp — công danh, nghề nghiệp và thăng tiến xã hội.",
    y_nghia_sau: "Quyết định lĩnh vực nghề nghiệp phù hợp và tốc độ thăng tiến.",
    loi: ["Thăng tiến nhanh, uy tín tốt", "Phù hợp lãnh đạo hoặc tự doanh"],
    bat_loi: ["Dễ bị đồng nghiệp gây khó dễ", "Sự nghiệp nhiều biến động"],
    anh_huong_den: ["Tài Bạch", "Mệnh"],
    bi_anh_huong_boi: ["Thiên Di"],
    loi_khuyen: "Chọn nghề theo chính tinh. Tránh chính trường nếu có hung tinh.",
  },
  "Nô Bộc": {
    mo_ta: "Cung bạn bè — mối quan hệ với bạn bè, cấp dưới và đối tác.",
    y_nghia_sau: "Cho biết chất lượng hỗ trợ từ những người xung quanh.",
    loi: ["Nhiều bạn tốt, cấp dưới trung thành", "Dễ tìm được đối tác phù hợp"],
    bat_loi: ["Dễ bị phản bội, lừa gạt", "Mối quan hệ xã hội phức tạp"],
    anh_huong_den: ["Quan Lộc", "Tài Bạch"],
    bi_anh_huong_boi: ["Mệnh"],
    loi_khuyen: "Cần hợp đồng rõ ràng trong làm ăn. Tránh bảo lãnh tài chính.",
  },
  "Thiên Di": {
    mo_ta: "Cung di chuyển — việc xuất ngoại, đi lại và môi trường bên ngoài.",
    y_nghia_sau: "Cho biết mức độ phát đạt khi làm việc xa quê hương.",
    loi: ["Phát đạt khi xa nhà, gặp nhiều may mắn", "Hợp định cư nước ngoài, du học"],
    bat_loi: ["Đi xa hay gặp rủi ro, sự cố", "Môi trường ngoài hay gây trở ngại"],
    anh_huong_den: ["Quan Lộc", "Tài Bạch"],
    bi_anh_huong_boi: ["Mệnh"],
    loi_khuyen: "Tận dụng cơ hội đi xa nếu cung tốt. Hoạt động gần nhà nếu cung xấu.",
  },
  "Tật Ách": {
    mo_ta: "Cung sức khỏe — bệnh tật tiềm ẩn và khả năng phục hồi.",
    y_nghia_sau: "Phản ánh sức đề kháng tổng thể và những tai nạn có thể gặp.",
    loi: ["Sức khỏe dồi dào, phục hồi nhanh", "Tuổi thọ cao, ít bị ảnh hưởng môi trường"],
    bat_loi: ["Dễ mắc bệnh mãn tính, tai nạn", "Cần chú ý khám định kỳ"],
    anh_huong_den: ["Mệnh", "Quan Lộc"],
    bi_anh_huong_boi: ["Phúc Đức"],
    loi_khuyen: "Khám định kỳ dù cung tốt hay xấu. Tránh mạo hiểm nếu cung xấu.",
  },
  "Tài Bạch": {
    mo_ta: "Cung tài chính — khả năng kiếm tiền và quản lý của cải.",
    y_nghia_sau: "Quyết định cách kiếm tiền và mức độ giữ được tiền.",
    loi: ["Kiếm tiền dễ, tích lũy nhanh", "Thu nhập tăng trưởng bền vững"],
    bat_loi: ["Dễ thất thoát tài chính bất ngờ", "Thất thường, không ổn định"],
    anh_huong_den: ["Quan Lộc", "Điền Trạch"],
    bi_anh_huong_boi: ["Mệnh"],
    loi_khuyen: "Đầu tư theo chính tinh. Tránh mạo hiểm tài chính nếu có hung tinh.",
  },
  "Tử Tức": {
    mo_ta: "Cung con cái — mối quan hệ với thế hệ sau và sức sáng tạo.",
    y_nghia_sau: "Phản ánh khả năng sinh sản và sự hiếu thảo của con cái.",
    loi: ["Con cái ngoan, thành đạt", "Sức sáng tạo dồi dào, học trò giỏi"],
    bat_loi: ["Muộn con hoặc ít con", "Quan hệ cha mẹ - con cái căng thẳng"],
    anh_huong_den: ["Phúc Đức", "Quan Lộc"],
    bi_anh_huong_boi: ["Phu Thê"],
    loi_khuyen: "Đầu tư cho giáo dục con cái. Chú ý sức khỏe sinh sản sớm.",
  },
  "Huynh Đệ": {
    mo_ta: "Cung anh em — quan hệ với anh chị em và bạn thân thiết.",
    y_nghia_sau: "Cho biết mức độ hòa thuận và hỗ trợ trong gia đình.",
    loi: ["Anh em đoàn kết, giúp đỡ nhau", "Bạn bè trung thành, sát cánh"],
    bat_loi: ["Anh em bất hòa, tranh chấp", "Cô độc trong quyết định lớn"],
    anh_huong_den: ["Nô Bộc", "Tài Bạch"],
    bi_anh_huong_boi: ["Mệnh"],
    loi_khuyen: "Chủ động vun đắp tình cảm. Tránh hùn hạp nếu cung xấu.",
  },
  "Phu Thê": {
    mo_ta: "Cung hôn nhân — tình duyên và người bạn đời.",
    y_nghia_sau: "Mô tả đặc điểm người bạn đời và chất lượng sống chung.",
    loi: ["Bạn đời tốt, hỗ trợ sự nghiệp", "Hôn nhân hạnh phúc, bền lâu"],
    bat_loi: ["Hôn nhân trắc trở, dễ ly hôn", "Muộn màng tình duyên, hay hiểu lầm"],
    anh_huong_den: ["Tử Tức", "Mệnh"],
    bi_anh_huong_boi: ["Phúc Đức"],
    loi_khuyen: "Không nên kết hôn sớm nếu cung xấu. Tìm người có mệnh tương sinh.",
  },
};
