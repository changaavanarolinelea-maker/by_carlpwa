"use client";

import { BanknoteFrame } from "./BanknoteFrame";
import { AgricultureIcon } from "./AgricultureIcon";

export function Banknote2000() {
  return (
    <BanknoteFrame
      value="2000"
      color1="#D97706"
      color2="#FBBF24"
      icon={<AgricultureIcon />}
    />
  );
}