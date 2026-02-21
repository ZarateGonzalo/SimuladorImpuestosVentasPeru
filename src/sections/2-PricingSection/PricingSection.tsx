import React from "react";

interface PricingSectionProps {
  salePricePen: number;
  onSalePriceChange: (value: number) => void;
}

export default function PricingSection({
  salePricePen,
  onSalePriceChange,
}: PricingSectionProps) {
  return (
    <section>
      <h2>Precio para Clientes</h2>

      <label>
        Precio de venta por unidad (PEN){" "}
        <input
          type="number"
          min={0}
          step="0.01"
          value={salePricePen}
          onChange={(e) => onSalePriceChange(Number(e.target.value) || 0)}
        />
      </label>
    </section>
  );
}
