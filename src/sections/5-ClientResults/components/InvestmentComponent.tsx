import { useMemo } from "react";

type InvestmentSectionProps = {
  investmentPen: number;
  quantity: number;
};

export default function InvestmentSection({
  investmentPen,
  quantity,
}: InvestmentSectionProps) {
  const unitPrice = useMemo(() => {
    if (quantity > 0 && Number.isFinite(investmentPen / quantity)) {
      return (investmentPen / quantity).toFixed(2);
    }
    return "0.00";
  }, [investmentPen, quantity]);

  const fmt = (n: number) => n.toFixed(2);

  return (
    <section>
      <h2>Inversión</h2>

      <div>
        <strong>Inversión total:</strong> S/ {fmt(investmentPen)}
      </div>

      <div>
        <strong>Cantidad de unidades:</strong> {quantity}
      </div>

      <div>
        <strong>Costo unitario:</strong> S/ {unitPrice}
      </div>
    </section>
  );
}
