import { useEffect, useState } from "react";

type PricingSectionProps = {
  salePricePen: number;
  onSalePriceChange: (value: number) => void;
};

export default function PricingSection({
  salePricePen,
  onSalePriceChange,
}: PricingSectionProps) {
  const [localValue, setLocalValue] = useState("0");

  // sync external → internal (only when parent changes externally)
  useEffect(() => {
    setLocalValue(salePricePen.toString());
  }, [salePricePen]);

  return (
    <section>
      <h2>Precio para Clientes</h2>

      <label>
        Precio de venta por unidad (PEN)
        <input
          type="number"
          step="any"
          className="border px-2 w-32"
          value={localValue}
          onChange={(e) => {
            const val = e.target.value;
            setLocalValue(val);

            const num = Number(val);
            if (val !== "" && Number.isFinite(num)) {
              onSalePriceChange(num); // 🔥 update immediately
            }
          }}
          onBlur={() => {
            if (localValue === "") {
              setLocalValue("0");
              onSalePriceChange(0);
            } else {
              const num = Number(localValue);
              const fixed = Number.isFinite(num) ? Number(num.toFixed(2)) : 0;
              setLocalValue(fixed.toFixed(2));
              onSalePriceChange(fixed);
            }
          }}
        />
      </label>
    </section>
  );
}
