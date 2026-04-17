// src/ui/components/shared/EmptyState.tsx
import React from "react";
import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  message: string;
}

export const EmptyState: React.FC<Props> = ({ icon: Icon, message }) => (
  <div className="p-10 flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
    <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10">
      <Icon className="text-primary/40" size={40} />
    </div>
    <p className="text-text-secondary text-sm font-medium">{message}</p>
  </div>
);
