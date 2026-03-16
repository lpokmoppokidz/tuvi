export const HUNG_TINH_LIST = [
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
  "Phục Bình",
  "Quan Phủ",
];

export const PHU_TINH_DESC: Record<
  string,
  {
    loai: "cat" | "hung" | "trung";
    mo_ta: string;
    chi_tiet: string;
    loi: string;
    bat_loi: string;
    anh_huong_cung: Record<string, string>;
  }
> = {
  "Tả Phụ": {
    loai: "cat",
    mo_ta:
      "Quý nhân hỗ trợ từ phía tả — một trong tứ sát quý nhân quan trọng nhất",
    chi_tiet:
      "Tả Phụ là sao quý nhân mạnh nhất, đại diện cho người hỗ trợ đắc lực từ phía trái. Khi hội với Hữu Bật tạo thành cặp quý nhân hoàn chỉnh. Tăng cường sức mạnh cho chính tinh bên cạnh lên rất nhiều.",
    loi: "Luôn có người giúp đỡ kịp thời khi gặp khó khăn. Được bề trên tin tưởng và giao việc quan trọng. Tăng mạnh cho chính tinh đồng cung.",
    bat_loi:
      "Dễ phụ thuộc vào sự hỗ trợ, thiếu tự lập. Nếu mất đi chỗ dựa sẽ rất lúng túng.",
    anh_huong_cung: {
      Mệnh: "Cả đời được quý nhân phù trợ, không sợ cô độc. Bản thân có sức hút thu hút người giúp đỡ.",
      "Quan Lộc":
        "Có người đỡ đầu trong sự nghiệp, thăng tiến nhanh nhờ quý nhân nâng đỡ.",
      "Tài Bạch": "Được giúp đỡ trong tài chính, dễ tìm được đối tác tốt.",
      "Phu Thê": "Vợ/chồng là người hỗ trợ đắc lực, luôn sát cánh.",
      "Thiên Di": "Ra ngoài luôn gặp quý nhân, đi đâu cũng có người giúp.",
    },
  },
  "Hữu Bật": {
    loai: "cat",
    mo_ta: "Quý nhân phù trợ từ phía hữu — cặp đôi hoàn hảo với Tả Phụ",
    chi_tiet:
      "Hữu Bật bổ sung cho Tả Phụ, đại diện người hỗ trợ từ phía phải. Khi Tả Phụ Hữu Bật đồng cung với chính tinh tốt tạo cách cục quyền quý cực tốt.",
    loi: "Được người thân tín hỗ trợ đắc lực. Tăng cường uy tín và quyền lực rõ rệt. Có người sát cánh trong mọi quyết định.",
    bat_loi:
      "Đôi khi bị lợi dụng sự tốt bụng. Nếu cung xấu, người hỗ trợ có thể trở thành gánh nặng.",
    anh_huong_cung: {
      Mệnh: "Tính cách được nhiều người yêu mến và tự nguyện giúp đỡ.",
      "Quan Lộc":
        "Đồng nghiệp và cấp dưới hỗ trợ tốt, tập thể làm việc hiệu quả.",
      "Tài Bạch": "Có người hỗ trợ tài chính, dễ huy động vốn khi cần.",
      "Nô Bộc": "Bạn bè và cấp dưới rất trung thành, sẵn sàng hy sinh vì mình.",
    },
  },
  "Văn Xương": {
    loai: "cat",
    mo_ta: "Sao văn chương học vấn — tinh hoa của trí tuệ",
    chi_tiet:
      "Văn Xương đại diện cho tài năng học thuật, văn chương và khả năng diễn đạt bằng chữ viết. Rất tốt cho thi cử, viết lách và mọi ngành liên quan đến ngôn ngữ viết. Hội với Văn Khúc tạo cặp song văn cực quý.",
    loi: "Thi cử thuận lợi, học nhanh hiểu sâu. Tài năng viết lách xuất sắc. Được người trí thức đánh giá cao. Bằng cấp và học vấn thuận lợi.",
    bat_loi:
      "Hay sống trong lý thuyết, thiếu thực tiễn. Khi gặp Hóa Kỵ thành sao xấu gây tai họa về văn tự, hợp đồng.",
    anh_huong_cung: {
      Mệnh: "Thông minh, học giỏi, có khiếu viết lách và diễn đạt. Nổi tiếng nhờ trí tuệ.",
      "Quan Lộc":
        "Thành công trong nghề liên quan đến chữ nghĩa, học thuật, báo chí.",
      "Tài Bạch": "Kiếm tiền bằng trí tuệ và tài năng văn chương.",
      "Phụ Mẫu": "Được cha mẹ đầu tư học hành, hoặc cha mẹ có học thức.",
      "Tử Tức": "Con cái học giỏi, có tài năng học thuật.",
    },
  },
  "Văn Khúc": {
    loai: "cat",
    mo_ta: "Sao nghệ thuật sáng tạo — năng khiếu âm nhạc và nghệ thuật",
    chi_tiet:
      "Văn Khúc bổ sung cho Văn Xương, đại diện cho nghệ thuật, âm nhạc, sáng tạo và biểu diễn. Khác Văn Xương thiên về chữ viết, Văn Khúc thiên về âm thanh và hình ảnh.",
    loi: "Năng khiếu âm nhạc, hội họa, nghệ thuật biểu diễn xuất sắc. Tư duy sáng tạo vượt trội. Được yêu mến nhờ tài năng nghệ thuật.",
    bat_loi:
      "Đa cảm, dễ bị cảm xúc chi phối quyết định. Khi Hóa Kỵ gây tai họa về văn tự và hợp đồng.",
    anh_huong_cung: {
      Mệnh: "Người có tâm hồn nghệ sĩ, nhạy cảm và sáng tạo. Dễ được yêu mến.",
      "Quan Lộc": "Thành công trong lĩnh vực nghệ thuật, âm nhạc, giải trí.",
      "Phu Thê": "Vợ/chồng có tài năng nghệ thuật hoặc tâm hồn lãng mạn.",
      "Tử Tức": "Con cái có năng khiếu âm nhạc, nghệ thuật.",
    },
  },
  "Thiên Khôi": {
    loai: "cat",
    mo_ta: "Thiên Ất Quý Nhân — quý nhân từ trên trời ban xuống",
    chi_tiet:
      "Thiên Khôi là một trong Thiên Ất Quý Nhân (Thiên Khôi - Thiên Việt), đại diện cho quý nhân thiên phù từ bề trên, người quyền quý giúp đỡ. Rất quan trọng trong lá số, khi hội chính tinh tốt tạo cách cục quý hiển.",
    loi: "Gặp quý nhân trong lúc khó khăn nhất. Được người có quyền lực cất nhắc, đề bạt. Thi cử và sự nghiệp thuận lợi nhờ quý nhân.",
    bat_loi:
      "Dễ ỷ lại vào quý nhân, không tự phát triển bản thân. Quý nhân đôi khi đến trễ khi cần gấp.",
    anh_huong_cung: {
      Mệnh: "Cả đời được trời phú quý nhân, nhiều lần được cứu giúp trong nguy nan.",
      "Quan Lộc": "Sự nghiệp được quý nhân nâng đỡ, thăng tiến nhanh và bền.",
      "Tài Bạch": "Quý nhân giúp về tài chính, dễ được đầu tư và hỗ trợ vốn.",
      "Tật Ách": "Khi bệnh tật gặp được thầy thuốc giỏi, quý nhân y tế.",
    },
  },
  "Thiên Việt": {
    loai: "cat",
    mo_ta: "Địa Ất Quý Nhân — quý nhân từ đất, người xung quanh giúp đỡ",
    chi_tiet:
      "Thiên Việt bổ sung cho Thiên Khôi, đại diện cho quý nhân địa phù — những người xung quanh, bạn bè, đồng nghiệp giúp đỡ. Thực tế và gần gũi hơn Thiên Khôi.",
    loi: "Người xung quanh tự nguyện giúp đỡ. Giao tiếp xã hội thuận lợi. Dễ được người quen giới thiệu cơ hội tốt.",
    bat_loi:
      "Quý nhân có thể không đủ sức mạnh để giải quyết vấn đề lớn. Đôi khi nhờ vả nhiều người nhưng hiệu quả thấp.",
    anh_huong_cung: {
      Mệnh: "Được nhiều người xung quanh yêu mến và tự nguyện giúp đỡ.",
      "Quan Lộc":
        "Đồng nghiệp và bạn bè trong nghề giúp đỡ và giới thiệu cơ hội.",
      "Thiên Di": "Ra ngoài gặp nhiều người tốt, dễ được giúp đỡ khi xa nhà.",
      "Nô Bộc": "Bạn bè và cấp dưới tốt, nhiệt tình hỗ trợ.",
    },
  },
  "Lộc Tồn": {
    loai: "cat",
    mo_ta: "Sao giữ tài lộc — kho báu ổn định nhất trong lá số",
    chi_tiet:
      "Lộc Tồn là sao tài lộc ổn định và bền vững nhất. Giữ tiền tốt, tài sản không dễ mất. Tuy nhiên hai bên Lộc Tồn luôn có Kình Dương và Đà La, gọi là Dương Đà giáp Lộc — cần cẩn thận.",
    loi: "Giữ tiền tốt, tài sản ổn định, ít bị mất mát lớn. Cuộc sống vật chất ổn định. Ít bị người khác lấy mất tài sản.",
    bat_loi:
      "Bủn xỉn, khó mở lòng chia sẻ. Hai bên có Kình Đà giáp — dễ gặp tai họa nếu không cẩn thận. Hay lo lắng về tài chính dù đủ ăn.",
    anh_huong_cung: {
      Mệnh: "Tính cách tiết kiệm, giữ của giỏi. Cuộc sống không giàu lớn nhưng ổn định.",
      "Tài Bạch":
        "Tài lộc rất ổn định, giữ tiền tốt, ít bị mất mát. Cách cục giàu bền.",
      "Quan Lộc": "Sự nghiệp ổn định lâu dài, không bị mất việc đột ngột.",
      "Điền Trạch": "Nhà đất ổn định, không dễ mất đất mất nhà.",
    },
  },
  "Kình Dương": {
    loai: "hung",
    mo_ta: "Hung tinh tranh đấu — lưỡi dao sắc bén của số mệnh",
    chi_tiet:
      "Kình Dương là hung tinh mạnh, đại diện cho tranh đấu, xung đột và nghịch cảnh. Ở cung tốt có thể hóa hung thành cát, phù hợp nghề võ, y tế, kỹ thuật. Ở cung xấu gây tai họa lớn về tranh chấp và phẫu thuật.",
    loi: "Tăng ý chí chiến đấu mạnh mẽ. Phù hợp nghề cần sức mạnh, cạnh tranh, quân đội, y tế. Vượt qua nghịch cảnh tốt.",
    bat_loi:
      "Dễ gặp tranh chấp, thị phi, kiện tụng. Tính nóng nảy gây mất quan hệ. Dễ bị thương tích, phẫu thuật. Kèo Lộc Tồn gây họa lớn.",
    anh_huong_cung: {
      Mệnh: "Tính cách mạnh mẽ, ưa cạnh tranh. Cuộc đời nhiều thăng trầm và thử thách lớn.",
      "Quan Lộc":
        "Sự nghiệp nhiều tranh chấp, cạnh tranh gay gắt. Thành công sau nhiều gian khổ.",
      "Tài Bạch":
        "Tài chính hay có tranh chấp, kiện tụng về tiền bạc. Tiền đến mạnh nhưng cũng đi mạnh.",
      "Phu Thê":
        "Hôn nhân hay xảy ra tranh cãi, bạo lực ngôn ngữ. Cần học cách kiềm chế.",
      "Tật Ách":
        "Dễ bị thương, tai nạn, phẫu thuật. Cần cẩn thận trong vận động mạnh.",
    },
  },
  "Đà La": {
    loai: "hung",
    mo_ta: "Hung tinh trì hoãn — xiềng xích vô hình kéo chậm mọi việc",
    chi_tiet:
      "Đà La đại diện cho sự trì hoãn, dây dưa và kéo dài không dứt. Mọi việc liên quan đến cung có Đà La đều bị kéo dài, chậm trễ. Tuy nhiên cũng giúp suy nghĩ kỹ hơn trước khi hành động.",
    loi: "Giúp suy nghĩ cẩn thận trước khi hành động, tránh bốc đồng. Kiên trì dai dẳng đạt mục tiêu dù chậm.",
    bat_loi:
      "Mọi việc bị kéo dài không cần thiết. Khó dứt khoát, hay do dự. Dễ bị người khác lợi dụng sự chậm chạp. Kèo Lộc Tồn gây tai họa.",
    anh_huong_cung: {
      Mệnh: "Tính cách hay do dự, khó quyết định. Cuộc đời hay bị kéo dài về các vấn đề quan trọng.",
      "Quan Lộc":
        "Sự nghiệp thăng tiến chậm, hay bị trì hoãn. Cần kiên nhẫn hơn người bình thường.",
      "Tài Bạch":
        "Thu tiền chậm, hợp đồng hay bị kéo dài. Đầu tư lâu mới thấy kết quả.",
      "Phu Thê":
        "Hôn nhân hay bị trì hoãn, muộn vợ/muộn chồng. Hoặc hay có vấn đề dây dưa không giải quyết được.",
    },
  },
  "Hỏa Tinh": {
    loai: "hung",
    mo_ta: "Hung tinh nóng nảy đột phát — lửa cháy không lường trước",
    chi_tiet:
      "Hỏa Tinh đại diện cho sự bùng phát đột ngột, nóng nảy và tai họa không lường trước. Cùng với Linh Tinh là cặp Hỏa Linh rất hung. Tuy nhiên nếu hội với Thất Sát hoặc Tham Lang có thể hóa thành cách cục tốt.",
    loi: "Hành động nhanh, phản xạ tốt. Phù hợp nghề cần tốc độ và quyết đoán. Đôi khi mang lại thành công bất ngờ.",
    bat_loi:
      "Tính nóng nảy, dễ xung đột và hối hận sau. Hay gặp hỏa hoạn, tai nạn bất ngờ, bệnh sốt cao. Làm mọi việc thiếu cẩn thận.",
    anh_huong_cung: {
      Mệnh: "Tính cách nóng nảy, dễ bùng phát. Cuộc đời hay gặp biến cố đột ngột.",
      "Quan Lộc": "Sự nghiệp hay có biến cố bất ngờ, thăng trầm đột ngột.",
      "Tài Bạch":
        "Tiền tài đến và đi đột ngột. Dễ mất tiền vì quyết định vội vàng.",
      "Tật Ách": "Dễ bị tai nạn, bỏng, sốt cao, bệnh đột ngột.",
    },
  },
  "Linh Tinh": {
    loai: "hung",
    mo_ta: "Hung tinh sự cố âm thầm — ngọn lửa lạnh nguy hiểm",
    chi_tiet:
      "Linh Tinh khác Hỏa Tinh ở chỗ tác động âm thầm và khó phát hiện hơn. Tai họa từ Linh Tinh thường đến chậm và ngấm ngầm. Cặp Hỏa Linh là một trong tứ hung tinh đáng sợ nhất.",
    loi: "Nhạy cảm với nguy hiểm tiềm ẩn, có thể phát hiện sớm vấn đề. Đôi khi mang lại trực giác mạnh.",
    bat_loi:
      "Tai họa âm thầm, khó đề phòng. Bệnh tật hay sự cố đến không báo trước. Hay gặp kẻ thù giấu mặt.",
    anh_huong_cung: {
      Mệnh: "Cuộc đời hay gặp sự cố bất ngờ, khó đề phòng. Cần cảnh giác liên tục.",
      "Quan Lộc": "Sự nghiệp hay bị phá hoại âm thầm từ người ganh ghét.",
      "Tài Bạch":
        "Tài chính hay bị hao hụt âm thầm, mất tiền không rõ nguyên nhân.",
      "Thiên Di": "Ra ngoài hay gặp sự cố bất ngờ, tai nạn khó lường.",
    },
  },
  "Thiên Không": {
    loai: "hung",
    mo_ta: "Hung tinh hư không — mọi nỗ lực dễ tan thành mây khói",
    chi_tiet:
      "Thiên Không đại diện cho sự hư không, mất mát không lý do. Công sức đổ ra không được đền đáp. Tuy nhiên cũng mang đến tư duy thoát tục, phù hợp tu hành và nghệ thuật cao cấp.",
    loi: "Tư duy sáng tạo thoát tục, phù hợp nghệ thuật và tâm linh. Không tham lam, dễ buông bỏ.",
    bat_loi:
      "Mọi nỗ lực dễ không có kết quả. Tiền dễ tan biến. Hay mộng nhiều hơn thực. Đầu tư hay bị mất trắng.",
    anh_huong_cung: {
      Mệnh: "Hay có tư tưởng hư vô, khó tích lũy. Phù hợp con đường tu hành hơn thế tục.",
      "Quan Lộc":
        "Sự nghiệp hay không đạt kết quả dù cố gắng. Nên chọn nghề sáng tạo hoặc tâm linh.",
      "Tài Bạch":
        "Tiền hay mất không rõ lý do. Đầu tư dễ thất bại. Cần tránh mạo hiểm tài chính.",
      "Điền Trạch": "Nhà đất hay có vấn đề, khó giữ được bất động sản lâu dài.",
    },
  },
  "Địa Kiếp": {
    loai: "hung",
    mo_ta: "Hung tinh cướp đoạt — kẻ cướp đến từ mặt đất",
    chi_tiet:
      "Địa Kiếp đại diện cho sự cướp đoạt từ bên ngoài, bị người khác lấy mất thành quả. Cùng Thiên Không là cặp Không Kiếp cực hung. Khi đồng cung Lộc Tồn hay chính tinh tốt gây tổn hại nghiêm trọng.",
    loi: "Hiểu được giá trị của mất mát giúp trân trọng những gì có. Không tham lam và biết buông bỏ.",
    bat_loi:
      "Hay bị người khác cướp đoạt thành quả lao động. Tài sản dễ bị lấy mất. Cản trở bất ngờ từ bên ngoài. Dễ bị lừa đảo.",
    anh_huong_cung: {
      Mệnh: "Cuộc đời hay bị mất những thứ quan trọng bất ngờ. Cần giữ kín tài sản và kế hoạch.",
      "Quan Lộc":
        "Thành quả sự nghiệp dễ bị người khác chiếm đoạt. Cẩn thận với đối tác.",
      "Tài Bạch":
        "Tài chính dễ bị cướp đoạt, lừa đảo. Không cho vay, không bảo lãnh.",
      "Phu Thê":
        "Hôn nhân dễ có người thứ ba xen vào. Cần chú ý giữ gìn hạnh phúc gia đình.",
    },
  },
  "Thiên Mã": {
    loai: "cat",
    mo_ta: "Sao di chuyển và vận động — ngựa thiên mang lộc đến",
    chi_tiet:
      "Thiên Mã đại diện cho sự di chuyển, thay đổi và vận động không ngừng. Khi hội Lộc Tồn tạo Lộc Mã Giao Trì — cách cục giàu có nhờ di chuyển và thay đổi. Không hợp người thích yên một chỗ.",
    loi: "Năng động, di chuyển nhiều mang lại cơ hội. Thay đổi môi trường mang lại may mắn. Phù hợp nghề liên quan đến đi lại.",
    bat_loi:
      "Không ổn định, hay phải thay đổi. Nếu bị Không Kiếp giáp thì Không Mã — vất vả mà không có kết quả.",
    anh_huong_cung: {
      Mệnh: "Cuộc đời nhiều di chuyển và thay đổi. Không hợp ở một nơi quá lâu.",
      "Quan Lộc":
        "Sự nghiệp liên quan đến di chuyển, xuất ngoại. Thay đổi công việc mang lại cơ hội.",
      "Tài Bạch":
        "Tiền tài đến nhờ di chuyển và giao thương. Kinh doanh vận tải, xuất nhập khẩu tốt.",
      "Thiên Di": "Rất hợp xuất ngoại, đi xa mang lại nhiều lợi ích.",
    },
  },
  "Thái Tuế": {
    loai: "hung",
    mo_ta: "Sao năm — đại diện cho năm xung và áp lực của thời gian",
    chi_tiet:
      "Thái Tuế là sao của năm hiện tại, khi an vào cung nào thì cung đó chịu áp lực lớn trong năm đó. Không nhất thiết xấu nhưng cần cẩn thận trong lĩnh vực cung đó quản lý.",
    loi: "Tập trung sức lực vào lĩnh vực cung này trong năm, có thể đạt thành tựu lớn nếu nỗ lực.",
    bat_loi:
      "Áp lực lớn, dễ gặp tai họa nếu không cẩn thận. Năm xung tuổi thường gặp nhiều trắc trở.",
    anh_huong_cung: {
      Mệnh: "Năm này bản thân chịu nhiều áp lực, cần chú ý sức khỏe và các quyết định lớn.",
      "Quan Lộc":
        "Sự nghiệp có biến động lớn trong năm, cẩn thận với thay đổi công việc.",
      "Tài Bạch":
        "Tài chính có biến động, tránh đầu tư mạo hiểm trong năm này.",
    },
  },
  "Tang Môn": {
    loai: "hung",
    mo_ta: "Sao tang tóc — mang điềm buồn về người thân",
    chi_tiet:
      "Tang Môn báo hiệu về tang chế, chia ly hoặc chuyện buồn liên quan đến người thân. Không nhất thiết là chết chóc mà có thể là chia xa, mất mát tinh thần.",
    loi: "Giúp người suy nghĩ về vô thường, biết trân trọng người thân hơn.",
    bat_loi:
      "Dễ gặp tang tóc, chia ly, chuyện buồn. Tâm trạng u ám, dễ rơi vào trầm uất.",
    anh_huong_cung: {
      Mệnh: "Dễ mang tâm trạng buồn bã, hay nghĩ về những điều tiêu cực.",
      "Phụ Mẫu": "Cẩn thận sức khỏe cha mẹ, hay có tin buồn từ người lớn tuổi.",
      "Phu Thê": "Hôn nhân dễ có chia ly hoặc chuyện buồn.",
    },
  },
  "Bạch Hổ": {
    loai: "hung",
    mo_ta: "Hung tinh máu và vũ lực — cọp trắng gây thương tích",
    chi_tiet:
      "Bạch Hổ liên quan đến máu, thương tích, phẫu thuật và tai nạn thể chất. Cũng có thể biểu hiện qua nghề y tế hoặc quân sự.",
    loi: "Phù hợp nghề y tế, quân sự, cảnh sát. Ý chí mạnh mẽ khi đối mặt nguy hiểm.",
    bat_loi:
      "Dễ bị thương, tai nạn, phẫu thuật. Hay gặp chuyện liên quan đến máu và bạo lực.",
    anh_huong_cung: {
      "Tật Ách":
        "Dễ bị thương tích, tai nạn, phẫu thuật. Cần cẩn thận khi vận động mạnh.",
      Mệnh: "Cuộc đời hay có chuyện liên quan đến thương tích hoặc máu.",
      "Thiên Di": "Cẩn thận tai nạn khi đi lại, di chuyển.",
    },
  },
  "Thiếu Dương": {
    loai: "trung",
    mo_ta: "Sao dương nhỏ — năng lượng đang tích lũy, chuẩn bị phát triển",
    chi_tiet:
      "Thiếu Dương trong vòng Thái Tuế đại diện cho giai đoạn chuẩn bị, năng lượng chưa đủ mạnh để bùng phát nhưng đang tích lũy tốt.",
    loi: "Năng lượng đang tích lũy, chuẩn bị cho giai đoạn phát triển mạnh. Thời điểm tốt để học hỏi và chuẩn bị.",
    bat_loi:
      "Chưa đủ sức mạnh để đột phá, dễ bị người khác vượt qua nếu không kiên nhẫn.",
    anh_huong_cung: {
      Mệnh: "Đang trong giai đoạn phát triển, chưa đạt đỉnh cao. Cần kiên nhẫn.",
      "Quan Lộc":
        "Sự nghiệp đang trên đà phát triển, cần thêm thời gian và nỗ lực.",
      "Tài Bạch": "Tài chính đang tích lũy dần, chưa bùng phát nhưng ổn định.",
    },
  },
  "Thiếu Âm": {
    loai: "trung",
    mo_ta: "Sao âm nhỏ — trăng non đang lớn dần, phát triển nội tâm",
    chi_tiet:
      "Thiếu Âm trong vòng Thái Tuế đại diện cho giai đoạn tích lũy âm thầm, phát triển nội tâm và sự nhạy cảm.",
    loi: "Phát triển nội tâm tốt, tích lũy kinh nghiệm. Trực giác được tăng cường.",
    bat_loi:
      "Chưa được nhìn nhận xứng đáng, hay bị bỏ qua. Dễ bị cảm xúc chi phối.",
    anh_huong_cung: {
      Mệnh: "Tích lũy nội tâm tốt nhưng chưa được công nhận. Cần thể hiện bản thân hơn.",
      "Phu Thê":
        "Tình cảm đang phát triển âm thầm, cần thêm thời gian vun đắp.",
    },
  },
  "Quan Phù": {
    loai: "hung",
    mo_ta: "Sao kiện tụng — quan tòa và rắc rối pháp lý",
    chi_tiet:
      "Quan Phù báo hiệu về kiện tụng, tranh chấp pháp lý và những rắc rối liên quan đến pháp luật. Cần đặc biệt cẩn thận về hợp đồng và giao dịch.",
    loi: "Nhắc nhở cẩn thận về pháp lý, tránh vi phạm. Tăng cảnh giác trong giao dịch.",
    bat_loi:
      "Dễ gặp kiện tụng, rắc rối pháp lý. Cần tránh ký kết hợp đồng quan trọng trong giai đoạn này.",
    anh_huong_cung: {
      Mệnh: "Cẩn thận với pháp luật và hợp đồng, dễ bị kiện tụng.",
      "Quan Lộc": "Sự nghiệp dễ có tranh chấp pháp lý, kiện tụng nơi công sở.",
      "Tài Bạch": "Tài chính dễ có tranh chấp, nợ nần, kiện tụng về tiền bạc.",
    },
  },
  "Tử Phù": {
    loai: "hung",
    mo_ta: "Sao vong linh — liên quan đến tang ma và âm khí nặng",
    chi_tiet:
      "Tử Phù trong vòng Thái Tuế liên quan đến tang ma, âm khí và những chuyện không may về người thân. Cần cúng bái và hóa giải.",
    loi: "Nhắc nhở về vô thường, biết trân trọng cuộc sống và người thân.",
    bat_loi:
      "Dễ gặp tang tóc, chuyện buồn về người thân. Tâm trạng nặng nề, âm khí nặng.",
    anh_huong_cung: {
      Mệnh: "Tâm trạng hay u ám, dễ gặp chuyện buồn liên quan đến người thân.",
      "Phụ Mẫu": "Cẩn thận sức khỏe cha mẹ và người lớn tuổi trong gia đình.",
      "Tử Tức": "Cẩn thận sức khỏe con cái, dễ có chuyện lo lắng.",
    },
  },
  "Điếu Khách": {
    loai: "hung",
    mo_ta: "Sao viếng thăm — khách đến viếng tang, mang âm khí",
    chi_tiet:
      "Điếu Khách liên quan đến việc đi viếng tang, gặp chuyện buồn của người xung quanh. Mang âm khí, ảnh hưởng tinh thần tiêu cực.",
    loi: "Tăng sự đồng cảm và hiểu biết về cuộc sống vô thường.",
    bat_loi:
      "Hay phải đi viếng tang, gặp chuyện buồn. Mang âm khí không tốt cho tinh thần.",
    anh_huong_cung: {
      Mệnh: "Hay tiếp xúc với chuyện buồn, tang ma trong năm này.",
      "Thiên Di": "Đi ra ngoài hay gặp chuyện buồn, tang lễ.",
      "Nô Bộc": "Bạn bè hay gặp chuyện không vui, cần hỗ trợ tinh thần.",
    },
  },
  "Bệnh Phù": {
    loai: "hung",
    mo_ta: "Sao bệnh tật — thần bệnh ghé thăm, sức khỏe suy yếu",
    chi_tiet:
      "Bệnh Phù báo hiệu về bệnh tật, sức khỏe suy yếu trong giai đoạn này. Khi hội với các hung tinh khác sức khỏe đặc biệt đáng lo ngại.",
    loi: "Nhắc nhở chú ý sức khỏe, phòng bệnh kịp thời. Là dấu hiệu để khám sức khỏe định kỳ.",
    bat_loi:
      "Dễ ốm đau, bệnh mãn tính tái phát. Sức đề kháng yếu, dễ bị cảm nhiễm.",
    anh_huong_cung: {
      Mệnh: "Sức khỏe cần chú ý đặc biệt, tránh làm việc quá sức.",
      "Tật Ách": "Cẩn thận sức khỏe, dễ bị bệnh nặng hoặc mãn tính tái phát.",
      "Phụ Mẫu": "Sức khỏe cha mẹ cần theo dõi sát sao.",
      "Tử Tức": "Con cái dễ ốm đau, cần chú ý sức khỏe.",
    },
  },
  "Long Đức": {
    loai: "cat",
    mo_ta: "Sao phúc đức rồng — mang điều lành và may mắn",
    chi_tiet:
      "Long Đức trong vòng Thái Tuế mang điềm lành, may mắn và phúc đức. Giúp hóa giải những khó khăn, tai ương trong năm.",
    loi: "Mang lại may mắn và phúc lành. Giúp hóa giải tai ương, vượt qua khó khăn dễ dàng hơn.",
    bat_loi: "Không có bất lợi đặc biệt, nhưng phúc đức cần được vun đắp thêm.",
    anh_huong_cung: {
      Mệnh: "Năm này được phúc đức che chở, ít gặp tai họa nghiêm trọng.",
      "Tài Bạch": "Tài lộc được phù hộ, ít bị mất mát bất ngờ.",
      "Quan Lộc": "Sự nghiệp được che chở, vượt qua khó khăn tốt.",
    },
  },
  "Phúc Đức": {
    loai: "cat",
    mo_ta: "Sao phúc lành — điều tốt lành từ đức hạnh tích lũy",
    chi_tiet:
      "Phúc Đức trong vòng Thái Tuế mang lại sự bình an và may mắn từ đức hạnh tích lũy qua nhiều đời.",
    loi: "Bình an, may mắn, được phúc đức che chở. Cuộc sống tinh thần tốt, ít lo âu.",
    bat_loi:
      "Không có bất lợi rõ rệt, nhưng cần tiếp tục tu dưỡng đức hạnh để duy trì.",
    anh_huong_cung: {
      Mệnh: "Tâm trạng bình an, được phúc lành bảo hộ trong năm.",
      "Phúc Đức": "Phúc đức được tăng cường, cuộc sống tinh thần phong phú.",
      "Tử Tức": "Con cái được phúc đức che chở, hay gặp may mắn.",
    },
  },
  "Tuế Phá": {
    loai: "hung",
    mo_ta: "Sao phá hoại của năm — hủy diệt đột ngột không lường trước",
    chi_tiet:
      "Tuế Phá đối xứng với Thái Tuế, mang tính phá hoại mạnh. Năm nào có Tuế Phá ở cung quan trọng cần đặc biệt cẩn thận, tránh đầu tư lớn.",
    loi: "Phá cũ lập mới — đôi khi phá hoại dẫn đến cơ hội thay đổi và tái tạo tốt hơn.",
    bat_loi:
      "Phá hoại bất ngờ, mất mát không lường. Cung bị Tuế Phá hay gặp tai họa lớn trong năm.",
    anh_huong_cung: {
      Mệnh: "Năm này cẩn thận tai họa bất ngờ, tránh quyết định lớn và mạo hiểm.",
      "Tài Bạch": "Tài chính dễ bị phá hoại nghiêm trọng, tránh đầu tư lớn.",
      "Quan Lộc":
        "Sự nghiệp dễ có biến cố lớn, cẩn thận mất việc hoặc tranh chấp.",
      "Điền Trạch": "Nhà đất dễ có sự cố, tranh chấp hoặc mất mát.",
    },
  },
  "Thiên La": {
    loai: "hung",
    mo_ta: "Sao lưới trời — vướng víu và bị ràng buộc không thoát ra được",
    chi_tiet:
      "Thiên La cố định tại cung Thìn, đại diện cho sự vướng víu, ràng buộc và khó thoát khỏi hoàn cảnh. Đặc biệt nguy hiểm khi có hung tinh hội tụ.",
    loi: "Nhắc nhở kiên nhẫn và không nên hành động bốc đồng khi bị ràng buộc.",
    bat_loi:
      "Mọi việc bị vướng víu, khó giải quyết dứt điểm. Dễ bị giam cầm hoặc ràng buộc về pháp lý.",
    anh_huong_cung: {
      Mệnh: "Cảm giác bí bách, bị ràng buộc. Cần kiên nhẫn vượt qua.",
      "Quan Lộc":
        "Công việc bị vướng víu, khó thăng tiến hoặc thoát khỏi tình huống xấu.",
      "Thiên Di": "Đi lại bị cản trở, không thuận lợi cho xuất ngoại.",
    },
  },
  "Địa Võng": {
    loai: "hung",
    mo_ta: "Sao lưới đất — bẫy từ phía dưới, cạm bẫy tiềm ẩn",
    chi_tiet:
      "Địa Võng cố định tại cung Tuất, đại diện cho cạm bẫy từ dưới đất, những mối nguy hiểm tiềm ẩn không nhìn thấy trước.",
    loi: "Nhắc nhở cẩn thận quan sát môi trường xung quanh, phát hiện cạm bẫy sớm.",
    bat_loi:
      "Dễ rơi vào cạm bẫy không lường trước. Bị người khác hãm hại từ phía dưới.",
    anh_huong_cung: {
      Mệnh: "Cần cảnh giác với những nguy hiểm tiềm ẩn xung quanh.",
      "Tài Bạch": "Dễ bị lừa đảo tài chính qua các bẫy tinh vi.",
      "Nô Bộc": "Cẩn thận với bạn bè, cấp dưới có thể gài bẫy.",
    },
  },
  "Kiếp Sát": {
    loai: "hung",
    mo_ta: "Hung tinh tai họa — mang lại tai ương và thất bại lớn",
    chi_tiet:
      "Kiếp Sát là sao rất hung, gây tai họa, thất bại, bệnh tật nghiêm trọng. Khi hội với các hung tinh khác tác hại tăng gấp bội.",
    loi: "Rèn luyện sức mạnh ý chí để đối mặt với nghịch cảnh lớn.",
    bat_loi:
      "Tai họa lớn, thất bại nặng nề. Dễ gặp tai nạn, bệnh tật nguy hiểm hoặc mất mát lớn.",
    anh_huong_cung: {
      Mệnh: "Cuộc đời nhiều nghịch cảnh lớn, cần tu dưỡng và cẩn thận.",
      "Tật Ách": "Sức khỏe rất yếu, dễ bệnh nặng hoặc tai nạn nghiêm trọng.",
      "Tài Bạch": "Mất mát tài chính lớn, dễ phá sản hoặc bị cướp đoạt.",
      "Quan Lộc":
        "Sự nghiệp gặp tai họa lớn, dễ mất chức hoặc thất bại hoàn toàn.",
    },
  },
  "Phá Toái": {
    loai: "hung",
    mo_ta: "Sao phá vỡ — phá hủy và tan vỡ mọi thứ",
    chi_tiet:
      "Phá Toái gây phá hoại, tan vỡ thành quả đã xây dựng. Cần cực kỳ cẩn thận khi cung quan trọng có sao này.",
    loi: "Phá cũ lập mới — đôi khi cần phá bỏ cái cũ để tái tạo và xây dựng lại tốt hơn.",
    bat_loi:
      "Phá hoại lớn, mất mát toàn diện những gì đã xây dựng. Dễ tan vỡ trong tình cảm và sự nghiệp.",
    anh_huong_cung: {
      Mệnh: "Cuộc đời hay bị phá bỏ những thứ vừa xây dựng xong.",
      "Quan Lộc": "Sự nghiệp bị phá hủy đột ngột, mất thành quả lao động.",
      "Phu Thê": "Hôn nhân dễ tan vỡ, tình cảm bị phá hoại.",
      "Điền Trạch": "Nhà đất bị phá hoại hoặc mất đi không lường trước.",
    },
  },
  "Thiên Hình": {
    loai: "hung",
    mo_ta: "Sao hình pháp — liên quan đến pháp luật và hình phạt",
    chi_tiet:
      "Thiên Hình đại diện cho hình phạt, pháp luật. Có thể dẫn đến vấn đề pháp lý nghiêm trọng. Tuy nhiên phù hợp nghề luật, y tế, quân sự.",
    loi: "Nhắc nhở tuân thủ pháp luật. Phù hợp nghề liên quan đến pháp lý, y tế, quân đội.",
    bat_loi:
      "Dễ gặp rắc rối pháp lý, kiện tụng, thậm chí tù tội nếu không cẩn thận.",
    anh_huong_cung: {
      Mệnh: "Cẩn thận với hợp đồng, giao dịch và mọi vấn đề pháp lý.",
      "Quan Lộc": "Sự nghiệp dễ có vấn đề pháp lý, tranh chấp nơi làm việc.",
      "Tật Ách":
        "Bệnh tật có thể liên quan đến phẫu thuật hoặc điều trị bắt buộc.",
      "Thiên Di": "Cẩn thận khi đi lại, dễ vi phạm luật giao thông.",
    },
  },
  "Thiên Riêu": {
    loai: "hung",
    mo_ta: "Sao bệnh dai dẳng — sức khỏe suy yếu kéo dài",
    chi_tiet:
      "Thiên Riêu gây ảnh hưởng xấu đến sức khỏe lâu dài, dễ bị bệnh tật dai dẳng khó chữa khỏi hoàn toàn.",
    loi: "Nhắc nhở chú ý sức khỏe, điều trị kịp thời và duy trì lối sống lành mạnh.",
    bat_loi:
      "Sức khỏe yếu kéo dài, bệnh dai dẳng khó dứt. Hay tái phát bệnh cũ.",
    anh_huong_cung: {
      Mệnh: "Thể trạng yếu, dễ mắc bệnh mãn tính. Cần chú ý sức khỏe thường xuyên.",
      "Tật Ách": "Sức khỏe rất yếu, bệnh tật dai dẳng, khó phục hồi hoàn toàn.",
      "Phụ Mẫu": "Cha mẹ hay ốm đau, bệnh kéo dài.",
    },
  },
  "Thiên Hư": {
    loai: "hung",
    mo_ta: "Sao hư không — mất mát và cảm giác trống rỗng",
    chi_tiet:
      "Thiên Hư đại diện cho sự hư không, trống rỗng, mất mát tinh thần và vật chất. Khó tích lũy và giữ gìn được thành quả.",
    loi: "Nhận ra những điều thực sự quan trọng, học cách buông bỏ những thứ không cần thiết.",
    bat_loi: "Cảm giác trống rỗng, mất mát, khó tích lũy được gì lâu dài.",
    anh_huong_cung: {
      Mệnh: "Tâm hồn trống rỗng, khó cảm thấy hạnh phúc thực sự.",
      "Phúc Đức": "Phúc đức bị suy giảm, thiếu ý nghĩa trong cuộc sống.",
      "Tài Bạch": "Tài sản mất đi, khó tích lũy được của cải lâu dài.",
    },
  },
  "Thiên Khốc": {
    loai: "hung",
    mo_ta: "Sao bi thương — mang lại đau khổ và nước mắt",
    chi_tiet:
      "Thiên Khốc đại diện cho bi thương, đau khổ và nước mắt. Hay gặp chuyện buồn khiến phải khóc lóc hoặc đau lòng.",
    loi: "Rèn luyện sự đồng cảm và lòng trắc ẩn qua những đau khổ trải qua.",
    bat_loi: "Hay gặp chuyện buồn, đau lòng. Tâm trạng dễ suy sụp, khóc lóc.",
    anh_huong_cung: {
      Mệnh: "Cuộc đời hay gặp chuyện buồn, dễ bi thương.",
      "Phu Thê": "Tình cảm hay có nước mắt, đau khổ trong hôn nhân.",
      "Tử Tức": "Dễ lo lắng và khóc vì con cái.",
    },
  },
  "Phi Liêm": {
    loai: "hung",
    mo_ta: "Sao phiền phức — rắc rối và bất an liên tục",
    chi_tiet:
      "Phi Liêm gây rắc rối, phiền phức, bất an trong cuộc sống và công việc hàng ngày.",
    loi: "Rèn luyện sự kiên nhẫn khi đối mặt với phiền phức liên tục.",
    bat_loi: "Cuộc sống đầy rắc rối nhỏ, dễ cáu gắt và khó tìm được bình an.",
    anh_huong_cung: {
      Mệnh: "Tâm trạng bất an, hay bị phiền phức làm phiền.",
      "Quan Lộc": "Công việc nhiều rắc rối nhỏ, phiền phức từ đồng nghiệp.",
      "Tài Bạch": "Tài chính hay có những khoản chi phí phiền phức không đáng.",
    },
  },
  "Lưu Hà": {
    loai: "hung",
    mo_ta: "Sao nước chảy — di chuyển liên tục, thiếu ổn định",
    chi_tiet:
      "Lưu Hà đại diện cho sự di chuyển liên tục, bạc nhược, dễ bị trôi giạt theo hoàn cảnh. Thiếu ổn định và định hướng rõ ràng.",
    loi: "Thích nghi tốt với môi trường thay đổi, linh hoạt trong cuộc sống.",
    bat_loi:
      "Bạc nhược, thiếu kiên định, dễ bị cuốn đi theo người khác. Khó tích lũy ổn định.",
    anh_huong_cung: {
      Mệnh: "Tính cách bạc nhược, thiếu kiên định và định hướng rõ ràng.",
      "Thiên Di":
        "Di chuyển nhiều nhưng dễ bị trôi giạt, không có mục tiêu rõ.",
      "Tài Bạch": "Tài chính bạc nhược, khó tích lũy vì thiếu kế hoạch.",
    },
  },
  "Tiểu Hao": {
    loai: "hung",
    mo_ta: "Sao hao tổn nhỏ — mất mát tài chính liên tục tuy nhỏ",
    chi_tiet:
      "Tiểu Hao đại diện cho những mất mát nhỏ, hao tổn tài chính thường xuyên tuy ít mỗi lần nhưng cộng lại đáng kể.",
    loi: "Nhắc nhở cẩn thận chi tiêu, chú ý đến những khoản nhỏ thường bị bỏ qua.",
    bat_loi:
      "Tiền tài hao tổn liên tục dù nhỏ, tích lũy khó khăn vì chi tiêu rải rác.",
    anh_huong_cung: {
      Mệnh: "Cuộc sống hàng ngày hay có những hao tổn nhỏ liên tục.",
      "Tài Bạch": "Hao tổn tài chính nhỏ thường xuyên, khó giữ tiền.",
      "Thiên Di": "Chi phí đi lại, di chuyển nhiều và tốn kém.",
    },
  },
  "Đại Hao": {
    loai: "hung",
    mo_ta: "Sao hao tổn lớn — mất mát tài sản nghiêm trọng",
    chi_tiet:
      "Đại Hao là sao hao tổn lớn, gây mất mát tài sản nghiêm trọng. Cần tránh đầu tư lớn và giao dịch quan trọng khi cung có sao này.",
    loi: "Nhắc nhở cực kỳ cẩn thận, tránh mọi rủi ro tài chính lớn trong giai đoạn này.",
    bat_loi:
      "Mất mát tài sản lớn, thất bại tài chính nghiêm trọng. Dễ phá sản hoặc mất trắng.",
    anh_huong_cung: {
      Mệnh: "Năm này cẩn thận mọi quyết định tài chính lớn.",
      "Tài Bạch": "Mất mát tài sản lớn, nguy cơ phá sản hoặc mất trắng.",
      "Điền Trạch": "Mất nhà đất hoặc bất động sản có giá trị.",
      "Quan Lộc": "Sự nghiệp sụp đổ, mất việc hoặc mất thành quả lớn.",
    },
  },
  "Phục Binh": {
    loai: "hung",
    mo_ta: "Sao mai phục — nguy hiểm tiềm ẩn từ kẻ thù ẩn mình",
    chi_tiet:
      "Phục Binh đại diện cho mai phục, nguy hiểm tiềm ẩn từ kẻ thù ẩn mình xung quanh. Cần cảnh giác cao độ với người thân cận.",
    loi: "Rèn luyện sự cảnh giác và khả năng phát hiện nguy hiểm tiềm ẩn.",
    bat_loi:
      "Dễ bị mai phục, kẻ thù ẩn mình và phản bội bất ngờ. Khó phòng tránh.",
    anh_huong_cung: {
      Mệnh: "Cuộc đời có kẻ thù ẩn mình, cần cảnh giác cao độ.",
      "Quan Lộc":
        "Đồng nghiệp có thể ngầm phá hoại, cẩn thận với người thân cận.",
      "Nô Bộc": "Bạn bè, cấp dưới có thể mai phục và phản bội bất ngờ.",
      "Phu Thê":
        "Cẩn thận người thứ ba, có thể có mối nguy tiềm ẩn trong hôn nhân.",
    },
  },
  "Quan Phủ": {
    loai: "hung",
    mo_ta: "Sao điều tra kiểm soát — bị giám sát và kiểm tra chặt chẽ",
    chi_tiet:
      "Quan Phủ đại diện cho sự điều tra, kiểm soát chặt chẽ từ cấp trên hoặc cơ quan chức năng. Mọi hành động đều bị theo dõi.",
    loi: "Có khả năng điều tra và phát hiện vấn đề sớm. Tăng cường kỷ luật bản thân.",
    bat_loi:
      "Dễ bị điều tra, kiểm soát, mất tự do hoạt động. Mọi sai phạm đều bị phát hiện.",
    anh_huong_cung: {
      Mệnh: "Cuộc sống bị giám sát chặt chẽ, thiếu tự do hành động.",
      "Quan Lộc":
        "Bị cấp trên kiểm tra, điều tra hoặc cơ quan chức năng thanh tra.",
      "Tài Bạch": "Tài chính bị thanh tra, kiểm toán chặt chẽ.",
    },
  },
  "Thiên Y": {
    loai: "cat",
    mo_ta: "Sao chữa lành — mang lại sức khỏe và bình phục",
    chi_tiet:
      "Thiên Y đại diện cho sự chữa lành, phục hồi sức khỏe và bình an. Rất tốt cho những người đang bệnh hoặc cần hồi phục.",
    loi: "Mang lại sức khỏe tốt, bệnh tật dễ chữa lành. Gặp được thầy thuốc giỏi khi cần.",
    bat_loi: "Quá chú trọng sức khỏe có thể dẫn đến lo lắng thái quá.",
    anh_huong_cung: {
      Mệnh: "Sức khỏe được bảo vệ tốt, có khả năng phục hồi nhanh.",
      "Tật Ách": "Bệnh tật dễ chữa lành, gặp được bác sĩ giỏi.",
      "Phúc Đức": "Phúc đức thể hiện qua sức khỏe tốt và tinh thần an lành.",
      "Phụ Mẫu": "Cha mẹ sức khỏe được bảo vệ, dễ phục hồi khi bệnh.",
    },
  },
  "Thiên Đức": {
    loai: "cat",
    mo_ta: "Sao phúc đức — đức hạnh tạo ra phúc báo lớn",
    chi_tiet:
      "Thiên Đức đại diện cho đức hạnh, lòng trắc ẩn và phúc báo từ việc làm thiện. Tăng uy tín, danh tiếng và được mọi người kính trọng.",
    loi: "Được mọi người kính trọng vì đức hạnh. Phúc lộc dồi dào, danh tiếng tốt trong cộng đồng.",
    bat_loi:
      "Cần duy trì đức hạnh liên tục, nếu không phúc đức có thể giảm sút.",
    anh_huong_cung: {
      Mệnh: "Tâm hồn cao thượng, được nhiều người kính trọng và yêu mến.",
      "Quan Lộc":
        "Danh tiếng tốt trong nghề, thăng tiến nhờ đức hạnh và tài năng.",
      "Phúc Đức":
        "Phúc đức được tăng cường mạnh, cuộc sống hạnh phúc và bình an.",
    },
  },
  "Hồng Loan": {
    loai: "cat",
    mo_ta: "Sao hôn nhân tình duyên — hạnh phúc lứa đôi và tình cảm",
    chi_tiet:
      "Hồng Loan đại diện cho hôn nhân hạnh phúc, tình duyên tốt đẹp. Năm có Hồng Loan là năm thuận lợi cho chuyện tình cảm và hôn nhân.",
    loi: "Hôn nhân hạnh phúc, được bạn đời yêu thương. Tình duyên thuận lợi, dễ gặp người phù hợp.",
    bat_loi:
      "Quá nhiều tình duyên có thể gây xao nhãng công việc và sự nghiệp.",
    anh_huong_cung: {
      Mệnh: "Tính cách hòa nhã, duyên dáng, dễ được người khác yêu mến.",
      "Phu Thê": "Hôn nhân hạnh phúc, tình cảm vợ chồng được tăng cường.",
      "Tử Tức": "Con cái hiếu thảo, gia đình đầm ấm và hòa thuận.",
    },
  },
  "Thiên Hỉ": {
    loai: "cat",
    mo_ta: "Sao vui mừng — niềm vui và các sự kiện tốt đẹp",
    chi_tiet:
      "Thiên Hỉ đại diện cho sự vui vẻ, may mắn và các sự kiện tốt đẹp như cưới hỏi, sinh con, thăng chức.",
    loi: "Cuộc sống vui vẻ, nhiều niềm vui và sự kiện đáng mừng. Được mọi người yêu mến.",
    bat_loi: "Quá hưởng thụ có thể dẫn đến chi tiêu nhiều, thiếu tiết kiệm.",
    anh_huong_cung: {
      Mệnh: "Tâm trạng lạc quan, cuộc sống đầy niềm vui và may mắn.",
      "Phu Thê": "Hôn nhân hạnh phúc, có tin vui trong gia đình.",
      "Tử Tức": "Con cái hay có tin vui, thành đạt và hạnh phúc.",
      "Thiên Di": "Đi du lịch hoặc ra ngoài hay gặp may mắn và niềm vui.",
    },
  },
  "Cô Thần": {
    loai: "hung",
    mo_ta: "Sao cô độc — sự cô đơn và thiếu hỗ trợ từ người thân",
    chi_tiet:
      "Cô Thần đại diện cho sự cô độc, cô lập, thiếu người hỗ trợ. Gây cảm giác cô đơn và không có ai sát cánh.",
    loi: "Rèn luyện sự tự lập và không phụ thuộc vào người khác.",
    bat_loi: "Cô độc, ít bạn bè, khó nhận được sự giúp đỡ khi cần thiết nhất.",
    anh_huong_cung: {
      Mệnh: "Tính cách khép kín, ít bạn bè thân thiết, hay cô đơn.",
      "Huynh Đệ": "Anh em ít hỗ trợ, cô độc trong gia đình.",
      "Nô Bộc":
        "Bạn bè và cấp dưới ít gần gũi, khó tìm được người thật sự tin tưởng.",
    },
  },
  "Quả Tú": {
    loai: "hung",
    mo_ta: "Sao hao tổn — mất mát tài sản và của cải không ngờ",
    chi_tiet:
      "Quả Tú đại diện cho sự hao tổn, mất mát tài chính và của cải. Dễ bị lừa đảo, trộm cắp hoặc mất mát không lường.",
    loi: "Nhắc nhở cẩn thận về tài chính và tài sản, không ham hố lợi nhuận cao.",
    bat_loi:
      "Tài chính dễ bị thất thoát, mất mát lớn. Dễ bị lừa đảo hoặc trộm cắp.",
    anh_huong_cung: {
      Mệnh: "Cuộc đời hay gặp hao tổn tài sản không lường trước.",
      "Tài Bạch": "Tiền tài hao tổn, dễ bị lừa đảo hoặc mất mát lớn.",
      "Điền Trạch": "Bất động sản dễ bị tổn thất hoặc tranh chấp.",
    },
  },
  "Thiên Diêu": {
    loai: "cat",
    mo_ta: "Sao vui chơi nghệ thuật — tài năng sáng tạo và giải trí",
    chi_tiet:
      "Thiên Diêu đại diện cho sự vui vẻ, nghệ thuật, giải trí và tình duyên. Người có sao này thường có tài năng nghệ thuật và cuộc sống phong phú.",
    loi: "Cuộc sống vui vẻ, có nhiều sở thích nghệ thuật và giải trí phong phú.",
    bat_loi:
      "Dễ sa đà vào vui chơi giải trí, ít tập trung vào công việc và tích lũy.",
    anh_huong_cung: {
      Mệnh: "Tính cách vui vẻ, tài năng nghệ thuật, thích cuộc sống phong phú.",
      "Thiên Di": "Ra ngoài nhiều, gặp may mắn trong giải trí và du lịch.",
      "Tử Tức": "Con cái có năng khiếu nghệ thuật và tính cách vui vẻ.",
    },
  },
  "Đào Hoa": {
    loai: "cat",
    mo_ta: "Sao đào hoa — tình duyên phong phú, hấp dẫn người khác",
    chi_tiet:
      "Đào Hoa đại diện cho tình duyên phong phú, sức hút cá nhân mạnh mẽ. Dễ được người khác yêu thích và theo đuổi.",
    loi: "Đào hoa nhiều, được nhiều người theo đuổi và yêu thích. Cuộc sống tình cảm phong phú.",
    bat_loi:
      "Tình duyên phức tạp, dễ xảy ra ngoại tình hoặc tranh chấp tình cảm.",
    anh_huong_cung: {
      Mệnh: "Tính cách quyến rũ, dễ thu hút người khác giới.",
      "Phu Thê": "Hôn nhân nhiều tình duyên, cần chọn lọc và cẩn thận.",
      "Nô Bộc": "Bạn bè đông đảo, nhiều mối quan hệ xã hội.",
    },
  },
  "Thiên Quan": {
    loai: "cat",
    mo_ta: "Sao quan chức — quyền lực, địa vị và thăng tiến",
    chi_tiet:
      "Thiên Quan đại diện cho quyền lực, chức vụ cao và sự thăng tiến trong quan trường và xã hội.",
    loi: "Thăng tiến nhanh trong sự nghiệp, được quý nhân nâng đỡ. Có quyền lực và địa vị.",
    bat_loi:
      "Quyền lực lớn dễ dẫn đến chuyên quyền, cần dùng đúng đắn và công bằng.",
    anh_huong_cung: {
      Mệnh: "Có uy tín và địa vị cao trong xã hội, được nhiều người kính trọng.",
      "Quan Lộc": "Sự nghiệp thăng tiến mạnh, được bổ nhiệm chức vụ cao.",
      "Tài Bạch": "Tài lộc đến từ chức vụ và quyền lực.",
    },
  },
  "Thiên Phúc": {
    loai: "cat",
    mo_ta: "Sao phúc lộc — phúc đức và của cải dồi dào",
    chi_tiet:
      "Thiên Phúc mang lại phúc lộc, hạnh phúc và sự may mắn trong cuộc sống. Phúc đức được tăng cường mạnh mẽ.",
    loi: "Phúc lộc dồi dào, cuộc sống hạnh phúc và được mọi người yêu mến.",
    bat_loi:
      "Quá phúc có thể dẫn đến hưởng thụ và thiếu tiết kiệm cho tương lai.",
    anh_huong_cung: {
      Mệnh: "Cuộc sống phúc lộc, tâm hồn an hòa và hạnh phúc.",
      "Phúc Đức": "Phúc đức được gia tăng mạnh, cuộc sống sung sướng.",
      "Tài Bạch": "Tài lộc dồi dào, giàu có và ổn định.",
    },
  },
  "Thiên Tài": {
    loai: "cat",
    mo_ta: "Sao tài năng — thông minh vượt trội và sáng tạo đặc biệt",
    chi_tiet:
      "Thiên Tài đại diện cho tài năng xuất chúng, thông minh và khả năng sáng tạo vượt bậc so với người thường.",
    loi: "Tài năng vượt trội, học nhanh hiểu sâu. Sáng tạo và giải quyết vấn đề xuất sắc.",
    bat_loi: "Tài năng quá lớn có thể dẫn đến kiêu ngạo, cần giữ sự khiêm tốn.",
    anh_huong_cung: {
      Mệnh: "Thông minh đặc biệt, học giỏi và có tài năng xuất chúng.",
      "Quan Lộc":
        "Thành công vượt trội trong nghề nghiệp nhờ tài năng đặc biệt.",
    },
  },
  "Thiên Thọ": {
    loai: "cat",
    mo_ta: "Sao trường thọ — tuổi thọ cao và sức khỏe bền vững",
    chi_tiet:
      "Thiên Thọ đại diện cho tuổi thọ dài, sức khỏe bền vững và khả năng phục hồi tốt sau bệnh tật.",
    loi: "Tuổi thọ cao, sức khỏe tốt và bền vững. Ít bị bệnh tật nghiêm trọng.",
    bat_loi: "Không có nhược điểm rõ rệt đặc biệt.",
    anh_huong_cung: {
      Mệnh: "Sinh lực dồi dào, sống lâu và khỏe mạnh.",
      "Tật Ách": "Ít bệnh tật nghiêm trọng, sức khỏe ổn định và bền vững.",
      "Phúc Đức": "Phúc lộc kéo dài tuổi thọ và sức khỏe.",
    },
  },
  "Bác Sĩ": {
    loai: "cat",
    mo_ta: "Sao y tế — chữa bệnh và chăm sóc sức khỏe tốt",
    chi_tiet:
      "Bác Sĩ trong vòng Trường Sinh đại diện cho y tế, thầy thuốc và khả năng chữa bệnh. Gặp được bác sĩ giỏi khi cần.",
    loi: "Gặp bác sĩ giỏi khi bệnh, chữa trị hiệu quả. Có duyên với nghề y tế.",
    bat_loi: "Quá phụ thuộc vào bác sĩ, cần tự chăm sóc sức khỏe chủ động hơn.",
    anh_huong_cung: {
      Mệnh: "Có duyên với nghề y tế, chăm sóc sức khỏe tốt.",
      "Tật Ách": "Sức khỏe được chữa trị tốt, luôn gặp được thầy thuốc giỏi.",
      "Phúc Đức": "Phúc đức thể hiện qua việc chữa lành và giúp đỡ người bệnh.",
    },
  },
  "Lực Sĩ": {
    loai: "cat",
    mo_ta: "Sao sức mạnh — thể lực dồi dào và sức khỏe cường tráng",
    chi_tiet:
      "Lực Sĩ đại diện cho sức mạnh thể chất, sức khỏe dẻo dai và năng lượng dồi dào. Phù hợp các nghề cần thể lực.",
    loi: "Sức khỏe tốt, thể lực dồi dào. Làm việc nặng nhọc giỏi và bền bỉ.",
    bat_loi:
      "Quá sức có thể gây chấn thương, cần kiểm soát và nghỉ ngơi đúng lúc.",
    anh_huong_cung: {
      Mệnh: "Thể trạng cường tráng, nhiều năng lượng và sức sống.",
      "Tật Ách": "Sức khỏe tốt, thể lực dồi dào, ít bệnh tật.",
    },
  },
  "Thanh Long": {
    loai: "cat",
    mo_ta: "Sao thanh long may mắn — rồng xanh báo hiệu thịnh vượng",
    chi_tiet:
      "Thanh Long là sao may mắn, đại diện cho sự phát triển, thịnh vượng và may mắn lớn. Được trời phù hộ đặc biệt.",
    loi: "May mắn lớn, phát triển mạnh mẽ, được trời phù hộ. Mọi việc thuận lợi.",
    bat_loi: "Quá may mắn có thể dẫn đến chủ quan và thiếu cẩn thận.",
    anh_huong_cung: {
      Mệnh: "Cuộc đời phát triển mạnh mẽ, được may mắn lớn che chở.",
      "Quan Lộc": "Thăng tiến nhanh và bền vững, được quý nhân nâng đỡ.",
      "Tài Bạch": "Tài lộc phát triển mạnh, giàu có và thịnh vượng.",
    },
  },
  "Thiên Trù": {
    loai: "cat",
    mo_ta: "Sao phù trợ hợp tác — được giúp đỡ và hợp tác hiệu quả",
    chi_tiet:
      "Thiên Trù đại diện cho sự phù trợ, hợp tác và được người khác giúp đỡ nhiệt tình và hiệu quả.",
    loi: "Được nhiều người giúp đỡ nhiệt tình. Hợp tác tốt, công việc được ủng hộ từ mọi phía.",
    bat_loi: "Quá phụ thuộc vào sự giúp đỡ của người khác, thiếu tính tự lập.",
    anh_huong_cung: {
      Mệnh: "Được nhiều người tự nguyện giúp đỡ và hỗ trợ.",
      "Nô Bộc": "Bạn bè và cấp dưới giúp đỡ nhiệt tình và hiệu quả.",
      "Quan Lộc": "Đồng nghiệp ủng hộ, làm việc nhóm rất hiệu quả.",
    },
  },
  "Thiên Giải": {
    loai: "cat",
    mo_ta: "Sao giải quyết — may mắn trong việc tháo gỡ khó khăn",
    chi_tiet:
      "Thiên Giải giúp giải quyết vấn đề và tháo gỡ khó khăn một cách thuận lợi. Mang may mắn trong việc vượt qua trở ngại.",
    loi: "Giải quyết vấn đề tốt, gặp may mắn khi cần tháo gỡ khó khăn.",
    bat_loi: "Ít có nhược điểm rõ rệt, nhưng không nên ỷ lại.",
    anh_huong_cung: {
      Mệnh: "Tư duy sắc bén, giải quyết vấn đề nhanh và hiệu quả.",
      "Quan Lộc":
        "Giải quyết công việc khó khăn dễ dàng, vượt qua trở ngại tốt.",
      "Tật Ách": "Bệnh tật được chữa lành nhanh, gặp được bác sĩ giỏi.",
    },
  },
  "Địa Giải": {
    loai: "cat",
    mo_ta: "Sao giải quyết địa phương — may mắn từ quê hương và người thân",
    chi_tiet:
      "Địa Giải giúp giải quyết vấn đề tại quê nhà, được người địa phương và người thân hỗ trợ tốt.",
    loi: "Được người địa phương và người thân giúp đỡ nhiệt tình. Việc nhà thuận lợi.",
    bat_loi: "Có thể quá gắn bó và phụ thuộc vào quê hương, khó phát triển xa.",
    anh_huong_cung: {
      Mệnh: "Gắn bó với quê hương, được nơi chốn bình an và an toàn.",
      "Thiên Di": "Ra ngoài gặp người địa phương giúp đỡ nhiệt tình.",
      "Phụ Mẫu": "Cha mẹ và người thân giúp đỡ rất nhiều trong cuộc sống.",
    },
  },
  "Giải Thần": {
    loai: "cat",
    mo_ta: "Sao giải trừ — hóa giải tai ương và chữa lành",
    chi_tiet:
      "Giải Thần đại diện cho khả năng giải trừ tai ương, hóa giải xui xẻo và chữa lành những vết thương.",
    loi: "Giải quyết vấn đề và hóa giải tai ương tốt. Chữa lành nhanh cả thể xác lẫn tinh thần.",
    bat_loi: "Ít có nhược điểm rõ rệt.",
    anh_huong_cung: {
      Mệnh: "Có khả năng hóa giải tai ương và vượt qua khó khăn tốt.",
      "Tật Ách": "Sức khỏe được chữa lành nhanh, tai ương được hóa giải.",
      "Quan Lộc": "Vượt qua khó khăn trong công việc một cách thuận lợi.",
    },
  },
  "Hoa Cái": {
    loai: "cat",
    mo_ta: "Sao hoa rực rỡ — vẻ đẹp và sự nổi bật trong đám đông",
    chi_tiet:
      "Hoa Cái đại diện cho sự rực rỡ, vẻ đẹp nổi bật và may mắn trong các sự kiện quan trọng.",
    loi: "Cuộc sống rực rỡ, nổi bật trong đám đông. Được chú ý và yêu mến vì vẻ đẹp và tài năng.",
    bat_loi: "Dễ sa đà vào phô trương hình thức, chi tiêu nhiều cho vẻ ngoài.",
    anh_huong_cung: {
      Mệnh: "Tính cách hoa nhã, nổi bật và được nhiều người chú ý.",
      "Thiên Di": "Đi ra ngoài được chú ý và nổi bật trong đám đông.",
      "Phu Thê": "Hôn nhân đẹp đẽ, nhiều kỷ niệm đẹp và lãng mạn.",
    },
  },
  "Thiên Sứ": {
    loai: "trung",
    mo_ta: "Sao sứ mệnh — truyền đạt thông điệp và kết nối mọi người",
    chi_tiet:
      "Thiên Sứ đại diện cho sứ mệnh cao cả, khả năng truyền đạt thông điệp và kết nối mọi người với nhau.",
    loi: "Có khả năng truyền đạt tốt, kết nối và truyền cảm hứng cho người khác.",
    bat_loi: "Có thể bị hiểu lầm, áp lực từ sứ mệnh quá lớn.",
    anh_huong_cung: {
      Mệnh: "Có sứ mệnh rõ ràng trong cuộc đời, cần thực hiện.",
      "Quan Lộc":
        "Nghề nghiệp liên quan đến truyền thông, giáo dục hoặc sứ mệnh xã hội.",
      "Thiên Di": "Đi nhiều nơi để truyền đạt thông điệp và giao lưu văn hóa.",
    },
  },
  "Trực Phù": {
    loai: "trung",
    mo_ta: "Sao chính trực — thẳng thắn và không vòng vo",
    chi_tiet:
      "Trực Phù đại diện cho sự thẳng thắn, chính trực và không chịu vòng vo hay giả dối.",
    loi: "Chính trực, thẳng thắn, đáng tin cậy cao. Được người khác tôn trọng vì tính trung thực.",
    bat_loi: "Thẳng thắn quá mức dễ gây thị phi và mất quan hệ xã hội.",
    anh_huong_cung: {
      Mệnh: "Tính cách thẳng thắn, không ưa vòng vo hay giả dối.",
      "Quan Lộc":
        "Công việc đòi hỏi chính trực cao, được tin tưởng giao việc quan trọng.",
    },
  },
  "Tướng Quân": {
    loai: "cat",
    mo_ta: "Sao tướng quân — lãnh đạo mạnh mẽ và quyền uy",
    chi_tiet:
      "Tướng Quân đại diện cho lãnh đạo, quyền uy và chiến lược. Phù hợp các vị trí lãnh đạo và quản lý.",
    loi: "Lãnh đạo giỏi, chiến thuật sắc bén. Được cấp dưới tôn trọng và phục tùng.",
    bat_loi:
      "Quyền lực lớn có thể dẫn đến chuyên quyền, cần giữ sự khiêm nhường và lắng nghe.",
    anh_huong_cung: {
      Mệnh: "Tính cách lãnh tụ mạnh mẽ, có khả năng dẫn dắt người khác.",
      "Quan Lộc": "Lãnh đạo cấp cao, có quyền lực lớn trong tổ chức.",
    },
  },
  "Quốc Ấn": {
    loai: "cat",
    mo_ta: "Sao quốc ấn — uy tín và địa vị cao quý nhất",
    chi_tiet:
      "Quốc Ấn là sao đại diện cho uy tín lớn, địa vị cao và quyền lực ở tầm quốc gia hoặc tổ chức lớn.",
    loi: "Uy tín lớn, địa vị cao, có ảnh hưởng rộng rãi trong xã hội.",
    bat_loi:
      "Quyền lực và trách nhiệm lớn đi kèm nhau, dễ bị toan tính và ghen ghét.",
    anh_huong_cung: {
      Mệnh: "Uy tín lớn, được nhiều người kính trọng và ngưỡng mộ.",
      "Quan Lộc": "Đạt đến vị trí cao nhất trong lĩnh vực hoạt động.",
    },
  },
  "Đường Phù": {
    loai: "cat",
    mo_ta: "Sao giao thông thương mại — di chuyển và buôn bán thuận lợi",
    chi_tiet:
      "Đường Phù đại diện cho giao thông, giao thương và việc đi lại buôn bán thuận lợi.",
    loi: "Di chuyển thuận lợi, buôn bán phát đạt. Giao thông an toàn và nhanh chóng.",
    bat_loi:
      "Quá nhiều di chuyển có thể gây mệt mỏi và thiếu thời gian nghỉ ngơi.",
    anh_huong_cung: {
      Mệnh: "Cuộc sống năng động, nhiều di chuyển và giao tiếp rộng rãi.",
      "Thiên Di": "Đi lại rất thuận lợi, giao thông an toàn và may mắn.",
      "Tài Bạch": "Buôn bán phát đạt, giao dịch thương mại thuận lợi.",
    },
  },
  "Ân Quang": {
    loai: "cat",
    mo_ta: "Sao ân huệ — được người lớn ban ân huệ và phúc lành",
    chi_tiet:
      "Ân Quang đại diện cho ân huệ từ người có quyền lực hoặc bề trên, được ban phúc lành bất ngờ.",
    loi: "Được ân huệ và phúc lộc bất ngờ từ người lớn và bề trên. May mắn đặc biệt.",
    bat_loi: "Quá phụ thuộc vào ân huệ người khác, cần biết đáp đền và tự lực.",
    anh_huong_cung: {
      Mệnh: "Được trời ban ân huệ đặc biệt, cuộc sống dễ dàng hơn người.",
      "Quan Lộc": "Được quý nhân và cấp trên ân huệ, thăng tiến nhờ đó.",
    },
  },
  "Thiên Quý": {
    loai: "cat",
    mo_ta: "Sao quý giá — được trân trọng và có giá trị cao",
    chi_tiet:
      "Thiên Quý đại diện cho sự quý giá, được người khác trân trọng và có giá trị cao trong mắt mọi người.",
    loi: "Được mọi người trân trọng và quý mến. Có giá trị và uy tín cao.",
    bat_loi: "Có thể bị người khác lợi dụng vì quá quý giá và tốt bụng.",
    anh_huong_cung: {
      Mệnh: "Được mọi người trân trọng và quý mến đặc biệt.",
      "Quan Lộc": "Có quý nhân nâng đỡ sự nghiệp, được đánh giá cao.",
      "Nô Bộc": "Bạn bè và cấp dưới trân trọng và quý mến mình.",
    },
  },
  "Long Trì": {
    loai: "cat",
    mo_ta: "Sao rồng trì — quyền lực và vinh hoa như rồng ngự trị",
    chi_tiet:
      "Long Trì đại diện cho quyền lực cao, vinh hoa phú quý và địa vị như một con rồng đang ngự trị.",
    loi: "Quyền lực lớn, vinh hoa phú quý, được nhiều người tôn sùng và kính trọng.",
    bat_loi: "Quyền lực lớn dễ rước lấy oán thù, cần giữ sự khiêm nhường.",
    anh_huong_cung: {
      Mệnh: "Tính cách lãnh tụ, có uy quyền lớn và được tôn trọng cao.",
      "Quan Lộc": "Đạt đến đỉnh cao quyền lực trong lĩnh vực hoạt động.",
    },
  },
  "Phượng Các": {
    loai: "cat",
    mo_ta: "Sao phượng hoàng — vinh hoa xa xỉ và cuộc sống đẳng cấp",
    chi_tiet:
      "Phượng Các đại diện cho vinh hoa phú quý, cuộc sống đẳng cấp và sang trọng như phượng hoàng.",
    loi: "Cuộc sống phú quý, đầy đủ, được nhiều người ngưỡng mộ và tôn trọng.",
    bat_loi: "Quá xa xỉ có thể dẫn đến phung phí và mất của.",
    anh_huong_cung: {
      Mệnh: "Cuộc sống xa hoa, đẳng cấp và được nhiều người ngưỡng mộ.",
      "Tài Bạch": "Giàu có và xa xỉ, của cải dồi dào.",
      "Điền Trạch": "Nhà cửa xa hoa, bất động sản có giá trị cao.",
    },
  },
  "Hỷ Thần": {
    loai: "cat",
    mo_ta: "Sao hân hoan — mang lại niềm vui và sự kiện hạnh phúc",
    chi_tiet:
      "Hỷ Thần mang lại niềm vui, sự hân hoan và các sự kiện hạnh phúc trong cuộc sống.",
    loi: "Cuộc sống vui vẻ, nhiều niềm vui và sự kiện đáng mừng. Tâm trạng lạc quan.",
    bat_loi: "Quá vui vẻ có thể dẫn đến phung phí và thiếu kiểm soát.",
    anh_huong_cung: {
      Mệnh: "Tâm trạng vui vẻ, lạc quan và cuộc sống nhiều niềm vui.",
      "Phu Thê": "Hôn nhân hạnh phúc, nhiều kỷ niệm đẹp và niềm vui.",
      "Thiên Di": "Đi chơi và du lịch mang lại nhiều may mắn và niềm vui.",
    },
  },
  "Văn Tinh": {
    loai: "cat",
    mo_ta: "Sao văn học — học vấn và tài năng văn chương",
    chi_tiet:
      "Văn Tinh tương tự Văn Xương, đại diện cho học vấn cao, tài năng văn chương và trí tuệ sắc bén.",
    loi: "Học giỏi, thông minh và có tài năng văn chương xuất sắc.",
    bat_loi: "Quá học thuật có thể thiếu tính thực tế trong cuộc sống.",
    anh_huong_cung: {
      Mệnh: "Thông minh, học giỏi và có năng khiếu văn chương đặc biệt.",
      "Quan Lộc": "Thành công trong nghề học thuật, giáo dục hoặc văn chương.",
    },
  },
  "Tam Thai": {
    loai: "trung",
    mo_ta: "Sao ba giai đoạn — cuộc đời trải qua ba bước phát triển rõ rệt",
    chi_tiet:
      "Tam Thai đại diện cho ba giai đoạn phát triển rõ rệt trong cuộc sống, từng bước thăng tiến.",
    loi: "Cuộc sống có cấp độ phát triển rõ ràng, từng bước thăng tiến vững chắc.",
    bat_loi: "Có thể bị áp lực bởi các giai đoạn phát triển và kỳ vọng.",
    anh_huong_cung: {
      Mệnh: "Cuộc đời trải qua ba giai đoạn phát triển rõ rệt và có ý nghĩa.",
      "Quan Lộc": "Sự nghiệp phát triển qua ba cấp độ rõ ràng.",
    },
  },
  "Nguyệt Đức": {
    loai: "cat",
    mo_ta: "Sao đức nữ — đức hạnh, sự dịu dàng và phúc đức từ âm",
    chi_tiet:
      "Nguyệt Đức đại diện cho đức hạnh nữ tính, sự dịu dàng và phúc đức từ phía âm. Được người yêu mến vì đức hạnh.",
    loi: "Được mọi người yêu mến vì đức hạnh và sự dịu dàng. Cuộc sống hài hòa và bình an.",
    bat_loi:
      "Quá nữ tính và dịu dàng có thể thiếu quyết đoán trong những lúc cần thiết.",
    anh_huong_cung: {
      Mệnh: "Tính cách hiền hòa, đức hạnh và được mọi người quý mến.",
      "Phu Thê": "Bạn đời có đức hạnh, hôn nhân hòa thuận và hạnh phúc.",
    },
  },
};
