import { useEffect, useMemo, useState } from "react";

type InvestmentSectionProps = {
  investmentPen: number;
  quantity: number;
  onInvestmentChange: (value: number) => void;
  onQuantityChange: (value: number) => void;
};

export default function InvestmentSection({
  investmentPen,
  quantity,
  onInvestmentChange,
  onQuantityChange,
}: InvestmentSectionProps) {
  const [investmentStr, setInvestmentStr] = useState("0");
  const [quantityStr, setQuantityStr] = useState("0");

  // sync external → internal
  useEffect(() => {
    setInvestmentStr(investmentPen.toString());
  }, [investmentPen]);

  useEffect(() => {
    setQuantityStr(quantity.toString());
  }, [quantity]);

  const unitPrice = useMemo(() => {
    const inv = Number(investmentStr);
    const qty = Number(quantityStr);
    if (qty > 0 && Number.isFinite(inv / qty)) {
      return (inv / qty).toFixed(2);
    }
    return "0.00";
  }, [investmentStr, quantityStr]);

  return (
    <section>
      <h2>Inversión</h2>

      {/* Total investment */}
      <div>
        <label>Inversión total (S/) </label>
        <input
          type="number"
          step="any"
          className="border px-2 w-32"
          value={investmentStr}
          onChange={(e) => setInvestmentStr(e.target.value)}
          onBlur={() => {
            if (investmentStr === "") {
              setInvestmentStr("0");
              onInvestmentChange(0);
            } else {
              const num = Number(investmentStr);
              const fixed = Number.isFinite(num) ? Number(num.toFixed(2)) : 0;
              setInvestmentStr(fixed.toFixed(2));
              onInvestmentChange(fixed);
            }
          }}
        />
      </div>

      {/* Quantity */}
      <div>
        <label>Cantidad de unidades </label>
        <input
          type="number"
          className="border px-2 w-24"
          value={quantityStr}
          onChange={(e) => setQuantityStr(e.target.value)}
          onBlur={() => {
            if (quantityStr === "") {
              setQuantityStr("0");
              onQuantityChange(0);
            } else {
              const num = Number(quantityStr);
              const fixed = Number.isFinite(num) ? Math.floor(num) : 0;
              setQuantityStr(fixed.toString());
              onQuantityChange(fixed);
            }
          }}
        />
      </div>

      {/* Unit cost */}
      <div>
        <label>Costo unitario (S/) </label>
        <span>{unitPrice}</span>
      </div>
    </section>
  );
}
