import React from "react";

interface TaxesSectionProps {
  igvPct: number;
  incomeTaxPct: number;
  onIgvChange: (value: number) => void;
  onIncomeTaxChange: (value: number) => void;
}

export default function TaxesSection({
  igvPct,
  incomeTaxPct,
  onIgvChange,
  onIncomeTaxChange,
}: TaxesSectionProps) {
  return (
    <section>
      <h2>Impuestos</h2>

      <div>
        <label>
          IGV (%){" "}
          <input
            type="number"
            min={0}
            step="0.01"
            value={igvPct}
            onChange={(e) => onIgvChange(Number(e.target.value) || 0)}
          />
        </label>
      </div>
      <div>
        <label>
          Impuesto a la Renta (%){" "}
          <input
            type="number"
            min={0}
            step="0.01"
            value={incomeTaxPct}
            onChange={(e) => onIncomeTaxChange(Number(e.target.value) || 0)}
          />
        </label>
      </div>
    </section>
  );
}
