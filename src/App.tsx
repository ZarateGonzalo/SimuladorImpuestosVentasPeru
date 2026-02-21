import { useMemo, useState } from "react";
import InvestmentSection from "./sections/1-InvestmentSection/InvestmentSection";
import PricingSection from "./sections/2-PricingSection/PricingSection";
import TaxesSection from "./sections/3-TaxesSection/TaxesSection";
import ResultsSection from "./sections/4-ResultsSection/ResultsSection";

/**
 * APP ROOT
 * All business logic lives here.
 * Child components are dumb inputs / displays.
 */
export default function App() {
  // ─── Core business state ─────────────────────────────
  const [investmentPen, setInvestmentPen] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [salePricePen, setSalePricePen] = useState<number>(0);

  // ─── Taxes ───────────────────────────────────────────
  const [igvPct, setIgvPct] = useState<number>(18);
  const [incomeTaxPct, setIncomeTaxPct] = useState<number>(30);

  // ─── Derived calculations (single source of truth) ──
  const results = useMemo(() => {
    const grossRevenue = salePricePen * quantity;

    const igvAmount = grossRevenue - grossRevenue / (igvPct / 100 + 1);

    const netSalesNoVAT = grossRevenue - igvAmount;

    const taxableProfit =
      grossRevenue - investmentPen - igvAmount > 0
        ? grossRevenue - investmentPen - igvAmount
        : 0;

    const incomeTaxAmount = taxableProfit * (incomeTaxPct / 100);

    const netProfit =
      grossRevenue - igvAmount - incomeTaxAmount - investmentPen;

    const unitProfit = quantity === 0 ? 0 : netProfit / quantity;

    return {
      grossRevenue,
      igvAmount,
      netSalesNoVAT,
      taxableProfit,
      incomeTaxAmount,
      netProfit,
      unitProfit,
    };
  }, [salePricePen, quantity, igvPct, incomeTaxPct, investmentPen]);

  // ─── UI ──────────────────────────────────────────────
  return (
    <main style={{ padding: 24 }}>
      <h1>Simulador de Impuestos (Perú)</h1>

      <InvestmentSection
        investmentPen={investmentPen}
        quantity={quantity}
        onInvestmentChange={setInvestmentPen}
        onQuantityChange={setQuantity}
      />

      <PricingSection
        salePricePen={salePricePen}
        onSalePriceChange={setSalePricePen}
      />

      <TaxesSection
        igvPct={igvPct}
        incomeTaxPct={incomeTaxPct}
        onIgvChange={setIgvPct}
        onIncomeTaxChange={setIncomeTaxPct}
      />

      <ResultsSection
        investmentPen={investmentPen}
        grossRevenue={results.grossRevenue}
        igvAmount={results.igvAmount}
        netSalesNoVAT={results.netSalesNoVAT}
        taxableProfit={results.taxableProfit}
        incomeTaxAmount={results.incomeTaxAmount}
        netProfit={results.netProfit}
        unitProfit={results.unitProfit}
      />
    </main>
  );
}
