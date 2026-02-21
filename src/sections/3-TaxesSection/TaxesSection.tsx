import { useState } from "react";

interface TaxesSectionProps {
  currency: number;
  igvPct: number;
  incomeTaxPct: number;
  igvPaid: number;
  perceptionPaid: number;
  onCurrencyChange: (v: number) => void;
  onIgvChange: (v: number) => void;
  onIncomeTaxChange: (v: number) => void;
  onIgvPaidChange: (v: number) => void;
  onPerceptionPaidChange: (v: number) => void;
}

const format2 = (n: number) => n.toFixed(2);

export default function TaxesSection({
  currency,
  igvPct,
  incomeTaxPct,
  igvPaid,
  perceptionPaid,
  onCurrencyChange,
  onIgvChange,
  onIncomeTaxChange,
  onIgvPaidChange,
  onPerceptionPaidChange,
}: TaxesSectionProps) {
  const [igvStr, setIgvStr] = useState(() => igvPct.toString());
  const [incomeTaxStr, setIncomeTaxStr] = useState(() =>
    incomeTaxPct.toString(),
  );
  const [currencyStr, setCurrencyStr] = useState(() => currency.toString());
  const [igvPaidStr, setIgvPaidStr] = useState(() => igvPaid.toString());
  const [perceptionStr, setPerceptionStr] = useState(() =>
    perceptionPaid.toString(),
  );

  const handleChange =
    (setStr: (v: string) => void, cb: (v: number) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setStr(val);

      const num = Number(val);
      if (val !== "" && Number.isFinite(num)) {
        cb(num);
      }
    };

  const handleBlur =
    (str: string, setStr: (v: string) => void, cb: (v: number) => void) =>
    () => {
      if (str === "") {
        setStr("0");
        cb(0);
        return;
      }

      const n = Number(str);
      const v = Number.isFinite(n) ? Number(format2(n)) : 0;
      setStr(format2(v));
      cb(v);
    };

  return (
    <section>
      <h2>Impuestos</h2>

      <div>
        IGV (%)
        <input
          type="number"
          value={igvStr}
          onChange={handleChange(setIgvStr, onIgvChange)}
          onBlur={handleBlur(igvStr, setIgvStr, onIgvChange)}
        />
      </div>

      <div>
        Impuesto a la Renta (%)
        <input
          type="number"
          value={incomeTaxStr}
          onChange={handleChange(setIncomeTaxStr, onIncomeTaxChange)}
          onBlur={handleBlur(incomeTaxStr, setIncomeTaxStr, onIncomeTaxChange)}
        />
      </div>

      <hr />

      <div>
        Cambio USD - PEN
        <input
          type="number"
          value={currencyStr}
          onChange={handleChange(setCurrencyStr, onCurrencyChange)}
          onBlur={handleBlur(currencyStr, setCurrencyStr, onCurrencyChange)}
        />
      </div>

      <div>
        IGV pagado en Aduanas (USD)
        <input
          type="number"
          value={igvPaidStr}
          onChange={handleChange(setIgvPaidStr, onIgvPaidChange)}
          onBlur={handleBlur(igvPaidStr, setIgvPaidStr, onIgvPaidChange)}
        />
      </div>

      <div>
        Percepción pagada (USD)
        <input
          type="number"
          value={perceptionStr}
          onChange={handleChange(setPerceptionStr, onPerceptionPaidChange)}
          onBlur={handleBlur(
            perceptionStr,
            setPerceptionStr,
            onPerceptionPaidChange,
          )}
        />
      </div>
    </section>
  );
}
