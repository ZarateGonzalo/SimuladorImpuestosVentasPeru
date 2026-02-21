import { useMemo } from "react";

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
  const unitPrice = useMemo(() => {
    if (quantity > 0 && Number.isFinite(investmentPen / quantity)) {
      return Number((investmentPen / quantity).toFixed(2));
    }
    return 0;
  }, [investmentPen, quantity]);

  return (
    <section>
      <h2>Inversión</h2>

      {/* Total investment */}
      <div>
        <label>Inversión total (S/) </label>
        <input
          type="number"
          value={investmentPen}
          onChange={(e) => onInvestmentChange(Number(e.target.value) || 0)}
        />
      </div>

      {/* Quantity */}
      <div>
        <label>Cantidad de unidades </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => onQuantityChange(Number(e.target.value) || 0)}
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
