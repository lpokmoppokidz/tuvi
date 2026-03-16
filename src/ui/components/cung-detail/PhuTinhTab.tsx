import React from 'react';
import { PhuTinhList } from './PhuTinhList';

interface PhuTinhTabProps {
  phuTinh: string[];
  cungTen: string;
}

export const PhuTinhTab: React.FC<PhuTinhTabProps> = ({ phuTinh, cungTen }) => {
  return <PhuTinhList phuTinh={phuTinh} cungTen={cungTen} />;
};
