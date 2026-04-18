import {
  getPhuTinhMeta,
  normalizePhuTinhName,
  PHU_TINH_DESC,
  PHU_TINH_ORDER,
} from "@/data/constants";

type PhuTinhDesc = (typeof PHU_TINH_DESC)[string];

export interface ResolvedPhuTinh {
  key: string;
  label: string;
  desc?: PhuTinhDesc;
}

const PHU_TINH_ENTRIES = PHU_TINH_ORDER.map((name) => [name, PHU_TINH_DESC[name]] as const);

export function resolvePhuTinh(raw: string | number): ResolvedPhuTinh {
  if (typeof raw === "number" && Number.isInteger(raw)) {
    const byIndex = PHU_TINH_ENTRIES[raw] ?? PHU_TINH_ENTRIES[raw - 1];
    if (byIndex) {
      const [label, desc] = byIndex;
      return { key: String(raw), label, desc };
    }
  }

  const normalized = normalizePhuTinhName(raw);
  const direct = getPhuTinhMeta(normalized);
  if (direct) {
    return { key: normalized, label: normalized, desc: direct };
  }

  if (/^\d+$/.test(normalized)) {
    const numeric = Number(normalized);
    const byIndex = PHU_TINH_ENTRIES[numeric] ?? PHU_TINH_ENTRIES[numeric - 1];
    if (byIndex) {
      const [label, desc] = byIndex;
      return { key: normalized, label, desc };
    }
  }

  return { key: normalized || "unknown", label: normalized || String(raw) };
}

export function resolvePhuTinhList(items: Array<string | number> | null | undefined): ResolvedPhuTinh[] {
  return (items ?? []).map(resolvePhuTinh);
}
