import { useMemo, useState } from "react";
import InvestmentSection from "./sections/1-InvestmentSection/InvestmentSection";
import PricingSection from "./sections/2-PricingSection/PricingSection";
import TaxesSection from "./sections/3-TaxesSection/TaxesSection";
import ResultsSection from "./sections/4-ResultsSection/ResultsSection";

export default function App() {
  const [investmentPen, setInvestmentPen] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [salePricePen, setSalePricePen] = useState(0);

  const [igvPct, setIgvPct] = useState(18);
  const [incomeTaxPct, setIncomeTaxPct] = useState(30);

  const [currencyRate, setCurrecyRate] = useState(3.5);
  const [igvPaid, setIgvPaid] = useState(0);
  const [perceptionPaid, setPerceptionPaid] = useState(0);

  const results = useMemo(() => {
    const grossRevenue = salePricePen * quantity;

    const rawIgv = grossRevenue - grossRevenue / (igvPct / 100 + 1);
    const igvAmount = Math.max(0, rawIgv - igvPaid * currencyRate);

    const netSalesNoVAT = grossRevenue - igvAmount;

    const rawTaxableProfit = grossRevenue - investmentPen - igvAmount;
    console.log("gross: " + grossRevenue);
    console.log("invest: " + investmentPen);
    console.log("igv: " + igvAmount);
    const taxableProfit = Math.max(0, rawTaxableProfit);

    const rawIncomeTax = taxableProfit * (incomeTaxPct / 100);
    const incomeTaxAmount = Math.max(
      0,
      rawIncomeTax - perceptionPaid * currencyRate,
    );

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
  }, [
    currencyRate,
    salePricePen,
    quantity,
    investmentPen,
    igvPct,
    incomeTaxPct,
    igvPaid,
    perceptionPaid,
  ]);

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
        currency={currencyRate}
        igvPct={igvPct}
        incomeTaxPct={incomeTaxPct}
        igvPaid={igvPaid}
        perceptionPaid={perceptionPaid}
        onCurrencyChange={setCurrecyRate}
        onIgvChange={setIgvPct}
        onIncomeTaxChange={setIncomeTaxPct}
        onIgvPaidChange={setIgvPaid}
        onPerceptionPaidChange={setPerceptionPaid}
      />

      <ResultsSection investmentPen={investmentPen} {...results} />
    </main>
  );
}
