interface TaxesComponentProps {
  igvPct: number;
  incomeTaxPct: number;
}

const fmt = (n: number) => n.toFixed(2);

export default function TaxesComponent({
  igvPct,
  incomeTaxPct,
}: TaxesComponentProps) {
  return (
    <section>
      <h2>Impuestos</h2>

      <div>
        <strong>IGV (%):</strong> {fmt(igvPct)}
      </div>

      <div>
        <strong>Impuesto a la Renta (%):</strong> {fmt(incomeTaxPct)}
      </div>
    </section>
  );
}
