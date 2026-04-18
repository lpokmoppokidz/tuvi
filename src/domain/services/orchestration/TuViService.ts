import { CacheService } from "../cache/CacheService";

export interface TuViInput {
  ho_ten: string;
  ngay_sinh: string;
  loai_lich: string;
  gio_sinh: string;
  gioi_tinh: string;
}

// ── Web Worker Bridge ──────────────────────────────────────────────────────────
const runCalculationInWorker = (input: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(new URL("../workers/TuViWorker.ts", import.meta.url), { type: "module" });
    worker.onmessage = (e) => {
      const { type, result, error } = e.data;
      if (type === "SUCCESS") resolve(result);
      else reject(new Error(error));
      worker.terminate();
    };
    worker.onerror = (err) => {
      reject(new Error("Worker error: " + err.message));
      worker.terminate();
    };
    worker.postMessage({ input });
  });
};

export const TuViService = {
  async calculateAndSave(input: TuViInput) {
    const result = await runCalculationInWorker(input);
    CacheService.saveLaSo(result);
    CacheService.saveBirthInfo(input);
    return result;
  },

  async loadOrRefresh(): Promise<any | null> {
    const laso = CacheService.loadLaSo();
    if (!laso) return null;
    return laso;
  },
};

export const calculateTuViChart = async (input: TuViInput) => {
  return runCalculationInWorker(input);
};
