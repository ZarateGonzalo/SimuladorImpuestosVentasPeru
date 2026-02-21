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

export default function ResultsSection(props: ResultsSectionProps) {
  const fmt = (n: number) => n.toFixed(2);

  return (
    <section>
      <h2>Resultado</h2>

      <div>Ingresos Brutos: S/ {fmt(props.grossRevenue)}</div>
      <div>
        <strong>IGV a pagar: S/ {fmt(props.igvAmount)}</strong>
      </div>

      <div
        style={{
          color: props.netSalesNoVAT < props.investmentPen ? "#995e5e" : "",
        }}
      >
        Ingresos Netos (IGV descontado): S/ {fmt(props.netSalesNoVAT)}{" "}
        (Inversión de Importación S./{props.investmentPen})
      </div>

      <div>Ganancia Imponible: S/ {fmt(props.taxableProfit)}</div>

      <div>
        <strong>Renta a pagar: S/ {fmt(props.incomeTaxAmount)}</strong>
      </div>

      <hr />

      <div>
        <strong>Utilidad Neta:</strong> S/ {fmt(props.netProfit)}
      </div>
      <div>
        <strong>Utilidad por Unidad:</strong> S/ {fmt(props.unitProfit)}
      </div>
    </section>
  );
}
