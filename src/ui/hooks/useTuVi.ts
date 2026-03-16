import { useMutation } from "@tanstack/react-query";
import { TuViService } from "../../domain/services/TuViService";
import { TuViData } from "../../domain/model/types";

interface BirthFormData {
  fullName: string;
  birthDate: string;
  birthTime: string;
  calendarType: "solar" | "lunar";
  gender: "male" | "female";
}

export const useTuVi = (onSuccess: (data: TuViData) => void) => {
  const mutation = useMutation({
    mutationFn: async (formData: BirthFormData) => {
      const [y, m, d] = formData.birthDate.split("-");
      return TuViService.calculateAndSave({
        ho_ten: formData.fullName,
        ngay_sinh: `${d}/${m}/${y}`,
        loai_lich: formData.calendarType === "solar" ? "duong" : "am",
        gio_sinh: formData.birthTime,
        gioi_tinh: formData.gender === "male" ? "Nam" : "Nữ",
      });
    },
    onSuccess,
  });

  return {
    calculate: mutation.mutateAsync,
    isCalculating: mutation.isPending,
    error: mutation.error,
  };
};
