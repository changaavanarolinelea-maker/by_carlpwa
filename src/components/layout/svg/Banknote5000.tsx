"use client";

import { BanknoteFrame } from "./BanknoteFrame";
import { FinanceIcon } from "./FinanceIcon";

export function Banknote5000() {
  return (
    <BanknoteFrame
      value="5000"
      color1="#15803D"
      color2="#4ADE80"
      icon={<FinanceIcon />}
    />
  );
}