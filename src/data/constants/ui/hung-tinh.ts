import { HUNG_TINH_LIST as BASE_HUNG_TINH_LIST, isHungPhuTinh } from "../phu-tinh";

export const HUNG_TINH_LIST = [...BASE_HUNG_TINH_LIST];

export type HungTinh = string;

export const isHungTinh = (tinh: string): boolean =>
  isHungPhuTinh(tinh);
