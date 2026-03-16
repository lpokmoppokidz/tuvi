import React, { memo } from "react";
import { CungDisplay } from "../../../domain/model/types";
import { CungGridItem } from "./CungGridItem";

interface Props {
  cungList: CungDisplay[];
  onSelect: (cung: CungDisplay) => void;
}

export const CungGrid: React.FC<Props> = memo(({ cungList, onSelect }) => (
  <div className="grid grid-cols-3 gap-4">
    {cungList.map((cung, idx) => (
      <CungGridItem
        key={`${cung.canChi}-${idx}`}
        cung={cung}
        index={idx}
        onClick={() => onSelect(cung)}
      />
    ))}
  </div>
));

CungGrid.displayName = "CungGrid";
