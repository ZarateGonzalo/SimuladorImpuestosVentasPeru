import React from "react";

interface ResultsSectionProps {
  investmentPen: number;
  grossRevenue: number;
  igvAmount: number;
  netSalesNoVAT: number;
  taxableProfit: number;
  incomeTaxAmount: number;
  netProfit: number;
  unitProfit: number;
}

export default function ResultsSection({
  investmentPen,
  grossRevenue,
  igvAmount,
  netSalesNoVAT,
  taxableProfit,
  incomeTaxAmount,
  netProfit,
  unitProfit,
}: ResultsSectionProps) {
  const fmt = (n: number) => n.toFixed(2);

  return (
    <section>
      <h2>Resultado</h2>

      <div>Ingresos Brutos: S/ {fmt(grossRevenue)}</div>
      <div>
        <strong>IGV: S/ {fmt(igvAmount)}</strong>
      </div>
      <div style={{ color: netSalesNoVAT < investmentPen ? "#a76f6f" : "" }}>
        Ingresos Netos (post IGV): S/ {fmt(netSalesNoVAT)} (Inversión:{" "}
        {investmentPen})
      </div>
      <div>Ganancia Imponible: S/ {fmt(taxableProfit)}</div>
      <div>
        <strong>Impuesto a la Renta: S/ {fmt(incomeTaxAmount)}</strong>
      </div>

      <hr />

      <div>
        <strong>Utilidad Neta Total:</strong> S/ {fmt(netProfit)}
      </div>
      <div>
        <strong>Utilidad por Unidad:</strong> S/ {fmt(unitProfit)}
      </div>
    </section>
  );
}
