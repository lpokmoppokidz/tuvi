import { calculateNamTong } from "../calculators/NamTongCalculator";

self.onmessage = async (e: MessageEvent) => {
  const { input } = e.data;
  try {
    const result = calculateNamTong(input);
    self.postMessage({ type: "SUCCESS", result });
  } catch (error: any) {
    self.postMessage({ type: "ERROR", error: error.message });
  }
};
