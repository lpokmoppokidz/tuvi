import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown, ChevronUp, Sparkles, User, Coins,
  Heart, Activity, TrendingUp, Star, Lightbulb, Users,
} from 'lucide-react';
import { TuViData } from '../../domain/model/types';
import { CHINH_TINH_DESC } from '../../data/constants';

interface TongQuanLaSoProps {
  tuViData: TuViData;
}

// ── Helper lấy mô tả từ chính tinh ─────────────────────────────
function getMoTaFromSao(saoList: string[], field: keyof typeof CHINH_TINH_DESC[string]): string {
  for (const sao of saoList) {
    const desc = CHINH_TINH_DESC[sao];
    if (desc && desc[field]) return desc[field] as string;
  }
  return 'Đang cập nhật thông tin...';
}

// ── Sections config ─────────────────────────────────────────────
function buildSections(tuViData: TuViData) {
  const cung12    = tuViData['12_cung'];
  const menh      = cung12?.menh;
  const quan_loc  = cung12?.quan_loc;
  const tai_bach  = cung12?.tai_bach;
  const phu_the   = cung12?.phu_the;
  const tat_ach   = cung12?.tat_ach;
  const phu_mau   = cung12?.phu_mau;
  const huynh_de  = cung12?.huynh_de;
  const thien_di  = cung12?.thien_di;
  const van_han   = tuViData.van_han;
  const co_ban    = tuViData.thong_tin_co_ban;

  const menhSao   = menh?.chinh_tinh     || [];
  const quanSao   = quan_loc?.chinh_tinh || [];
  const taiSao    = tai_bach?.chinh_tinh || [];
  const thueSao   = phu_the?.chinh_tinh  || [];
  const tatSao    = tat_ach?.chinh_tinh  || [];

  return [
    {
      key:   'ban_sac',
      icon:  User,
      color: 'text-purple-400',
      bg:    'bg-purple-400/10',
      title: 'Bản Sắc & Khí Chất',
      sub:   'Tính cách — Năng lực — Thần thái',
      items: [
        {
          label: 'Tính cách gốc',
          content: getMoTaFromSao(menhSao, 'tinh_cach'),
        },
        {
          label: 'Năng lực bẩm sinh',
          content: getMoTaFromSao(menhSao, 'y_nghia'),
        },
        {
          label: 'Chính tinh cung Mệnh',
          content: menhSao.length > 0
            ? menhSao.join(', ')
            : 'Cung Mệnh vô chính diệu — luận theo cung đối chiếu',
        },
      ],
    },
    {
      key:   'tai_su',
      icon:  Coins,
      color: 'text-yellow-400',
      bg:    'bg-yellow-400/10',
      title: 'Tài Chính & Sự Nghiệp',
      sub:   'Hướng nghiệp — Tiền tài — Thăng tiến',
      items: [
        {
          label: 'Hướng nghiệp phù hợp',
          content: getMoTaFromSao(quanSao, 'cong_danh'),
        },
        {
          label: 'Khả năng tài chính',
          content: getMoTaFromSao(taiSao.length > 0 ? taiSao : menhSao, 'tai_chinh'),
        },
        {
          label: 'Chính tinh cung Quan Lộc',
          content: quanSao.length > 0
            ? quanSao.join(', ')
            : 'Cung Quan Lộc vô chính diệu — sự nghiệp biến hóa linh hoạt',
        },
      ],
    },
    {
      key:   'quan_he',
      icon:  Users,
      color: 'text-pink-400',
      bg:    'bg-pink-400/10',
      title: 'Quan Hệ & Gia Đạo',
      sub:   'Cha mẹ — Tình duyên — Quý nhân',
      items: [
        {
          label: 'Tình duyên & Hôn nhân',
          content: getMoTaFromSao(thueSao.length > 0 ? thueSao : menhSao, 'tinh_duyen'),
        },
        {
          label: 'Quan hệ cha mẹ',
          content: (phu_mau?.chinh_tinh?.length || 0) > 0
            ? `Cung Phụ Mẫu có ${phu_mau!.chinh_tinh.join(', ')} — ${getMoTaFromSao(phu_mau!.chinh_tinh, 'tinh_cach')}`
            : 'Cung Phụ Mẫu vô chính diệu — mối quan hệ với cha mẹ trung bình, cần tự thân vận động.',
        },
        {
          label: 'Anh em & Bạn bè',
          content: (huynh_de?.chinh_tinh?.length || 0) > 0
            ? `Cung Huynh Đệ có ${huynh_de!.chinh_tinh.join(', ')}`
            : 'Cung Huynh Đệ vô chính diệu — anh em bình thường, ít được giúp đỡ.',
        },
      ],
    },
    {
      key:   'suc_khoe',
      icon:  Activity,
      color: 'text-red-400',
      bg:    'bg-red-400/10',
      title: 'Sức Khỏe & Tai Ách',
      sub:   'Thể chất — Bệnh tật — Cẩn trọng',
      items: [
        {
          label: 'Sức khỏe tổng thể',
          content: getMoTaFromSao(tatSao.length > 0 ? tatSao : menhSao, 'suc_khoe'),
        },
        {
          label: 'Cần lưu ý',
          content: (() => {
            const hungTinh = [
              ...(menh?.phu_tinh  || []),
              ...(tat_ach?.phu_tinh || []),
            ].filter(s => ['Kình Dương','Đà La','Hỏa Tinh','Linh Tinh','Thiên Không','Địa Kiếp'].includes(s));
            return hungTinh.length > 0
              ? `Có ${hungTinh.join(', ')} — cần cẩn thận tai nạn và sức khỏe đột ngột.`
              : 'Không có hung tinh đặc biệt — sức khỏe tương đối ổn định.';
          })(),
        },
        {
          label: 'Cung Tật Ách',
          content: tatSao.length > 0
            ? tatSao.join(', ')
            : 'Vô chính diệu — sức khỏe bình thường, ít bệnh nặng.',
        },
      ],
    },
    {
      key:   'dai_van',
      icon:  TrendingUp,
      color: 'text-blue-400',
      bg:    'bg-blue-400/10',
      title: 'Đại Vận Cuộc Đời',
      sub:   'Thời trẻ — Trung vận — Hậu vận',
      items: [
        {
          label: `Đại hạn hiện tại (${van_han?.dai_han_hien_tai?.tuoi_bat_dau}–${van_han?.dai_han_hien_tai?.tuoi_ket_thuc} tuổi)`,
          content: (() => {
            const dh = van_han?.dai_han_hien_tai;
            if (!dh) return 'Chưa có thông tin đại hạn.';
            const sao = dh.chinh_tinh || [];
            return sao.length > 0
              ? `Đại hạn cung ${dh.dia_chi} có ${sao.join(', ')} — ${getMoTaFromSao(sao, 'y_nghia')}`
              : `Đại hạn cung ${dh.dia_chi} vô chính diệu — giai đoạn bình ổn, tích lũy.`;
          })(),
        },
        {
          label: `Đại hạn tiếp theo (${van_han?.dai_han_tiep_theo?.tuoi_bat_dau}–${van_han?.dai_han_tiep_theo?.tuoi_ket_thuc} tuổi)`,
          content: (() => {
            const dh = van_han?.dai_han_tiep_theo;
            if (!dh) return 'Chưa có thông tin.';
            const sao = dh.chinh_tinh || [];
            return sao.length > 0
              ? `Cung ${dh.dia_chi} có ${sao.join(', ')} — ${getMoTaFromSao(sao, 'y_nghia')}`
              : `Cung ${dh.dia_chi} — giai đoạn cần chuẩn bị kỹ lưỡng.`;
          })(),
        },
        {
          label: 'Tiểu hạn năm nay',
          content: (() => {
            const th = van_han?.tieu_han_hien_tai;
            if (!th) return 'Chưa có thông tin.';
            const sao = th.chinh_tinh || [];
            return `Năm ${th.can_chi_nam} — cung ${th.dia_chi}${sao.length > 0 ? ` có ${sao.join(', ')}` : ' vô chính diệu'}.`;
          })(),
        },
      ],
    },
    {
      key:   'loi_khuyen',
      icon:  Lightbulb,
      color: 'text-amber-400',
      bg:    'bg-amber-400/10',
      title: 'Lời Khuyên & Định Hướng',
      sub:   'Điểm mạnh — Điểm yếu — Thời điểm vàng',
      items: [
        {
          label: 'Phát huy điểm mạnh',
          content: (() => {
            const catTinh = [
              ...(menh?.phu_tinh || []),
            ].filter(s => ['Tả Phụ','Hữu Bật','Văn Xương','Văn Khúc','Thiên Khôi','Thiên Việt','Lộc Tồn'].includes(s));
            return catTinh.length > 0
              ? `Có ${catTinh.join(', ')} tại cung Mệnh — hãy tận dụng sự hỗ trợ từ quý nhân và phát triển tài năng thiên bẩm.`
              : getMoTaFromSao(menhSao, 'tinh_cach');
          })(),
        },
        {
          label: 'Khắc phục điểm yếu',
          content: getMoTaFromSao(menhSao, 'tinh_cach') + ' — ' +
            (CHINH_TINH_DESC[menhSao[0]]?.bat_loi?.[0] || 'Cần tu dưỡng tính kiên nhẫn và khiêm tốn.'),
        },
        {
          label: 'Định hướng tổng thể',
          content: `Mệnh ${co_ban?.ngu_hanh_menh_cuc} ${co_ban?.so_cuc} cục — ${
            co_ban?.am_duong === 'Dương'
              ? 'Vận trình đi thuận, phát triển theo chiều tích cực.'
              : 'Vận trình đi nghịch, cần kiên nhẫn vượt qua thử thách.'
          } Tập trung vào ${getMoTaFromSao(quanSao, 'cong_danh').split('.')[0]}.`,
        },
      ],
    },
  ];
}

// ── Main Component ───────────────────────────────────────────────
export const TongQuanLaSo: React.FC<TongQuanLaSoProps> = ({ tuViData }) => {
  const [expanded, setExpanded] = useState<string | null>('ban_sac');
  const sections = buildSections(tuViData);

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center gap-3 px-1 mb-4">
        <Sparkles size={16} className="text-celestial-gold opacity-60" />
        <h3 className="text-xs font-display text-white/40 uppercase tracking-[0.3em]">
          Tổng Quan Lá Số
        </h3>
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-[9px] font-display text-white/20 uppercase tracking-widest">
          {tuViData.thong_tin_co_ban.can_chi_nam}
        </span>
      </div>

      {/* Accordion sections */}
      {sections.map((section) => {
        const IconComp = section.icon;
        const isOpen   = expanded === section.key;

        return (
          <div
            key={section.key}
            className={`glass-panel rounded-3xl overflow-hidden transition-all duration-300 ${
              isOpen ? 'shadow-xl' : 'shadow-md'
            }`}
          >
            {/* Section header */}
            <button
              onClick={() => setExpanded(isOpen ? null : section.key)}
              className="w-full p-5 flex items-center gap-4 hover:bg-white/5 transition-all text-left"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${section.bg}`}>
                <IconComp size={18} className={section.color} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className={`text-sm font-display tracking-widest uppercase ${isOpen ? section.color : 'text-white/70'}`}>
                  {section.title}
                </h4>
                <p className="text-[9px] text-white/25 uppercase tracking-widest mt-0.5 truncate">
                  {section.sub}
                </p>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0"
              >
                <ChevronDown size={16} className="text-white/20" />
              </motion.div>
            </button>

            {/* Section content */}
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 space-y-3 border-t border-white/5 pt-4">
                    {section.items.map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-4 rounded-2xl bg-white/5"
                      >
                        <p className={`text-[9px] font-display uppercase tracking-widest mb-2 ${section.color} opacity-70`}>
                          {item.label}
                        </p>
                        <p className="text-xs text-white/60 leading-relaxed">
                          {item.content}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
