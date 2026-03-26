import { calculateTuVi } from "./TuViCalculator";

self.onmessage = async (e: MessageEvent) => {
  const { input } = e.data;
  try {
    const result = await calculateTuVi(input);
    self.postMessage({ type: 'SUCCESS', result });
  } catch (error: any) {
    self.postMessage({ type: 'ERROR', error: error.message });
  }
};
