import { z } from "zod";

export const birthSchema = z.object({
  fullName:     z.string().min(1, "Vui lòng nhập họ tên"),
  birthDate:    z.string().min(1, "Vui lòng chọn ngày sinh"),
  birthTime:    z.string().min(1, "Vui lòng chọn giờ sinh"),
  calendarType: z.enum(["solar", "lunar"]),
  gender:       z.enum(["male", "female"]),
});

export type BirthSchema = z.infer<typeof birthSchema>;
