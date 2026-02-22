import { useMemo, useState } from "react";
import InvestmentSection from "../5-ClientResults/components/InvestmentComponent";
import ResultsSection from "../4-ResultsSection/ResultsSection";
import PricingSection from "../2-PricingSection/PricingSection";
import TaxesComponent from "./components/TaxesComponent";

type ClientResultsProps = {
  investmentPen: number;
  quantity: number;

  igvPct: number;
  incomeTaxPct: number;

  currencyRate: number;
};

export default function ClientResults({
  investmentPen,
  quantity,
  igvPct,
  incomeTaxPct,
}: ClientResultsProps) {
  const [salePricePen, setSalePricePen] = useState(0);
  const igvPaid = investmentPen - investmentPen / (igvPct / 100 + 1);
  const results = useMemo(() => {
    const grossRevenue = salePricePen * quantity;

    // IGV included in price (1.18 logic)
    const rawIgv = grossRevenue - grossRevenue / (igvPct / 100 + 1);
    const igvAmount = Math.max(0, rawIgv - igvPaid);

    const netSalesNoVAT = grossRevenue - igvAmount;

    const rawTaxableProfit = grossRevenue - investmentPen - igvAmount;
    const taxableProfit = Math.max(0, rawTaxableProfit);

    const rawIncomeTax = taxableProfit * (incomeTaxPct / 100);
    const incomeTaxAmount = Math.max(0, rawIncomeTax);

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
  }, [investmentPen, quantity, salePricePen, igvPct, incomeTaxPct, igvPaid]);

  return (
    <section>
      <h2>Resultado para Cliente</h2>

      <InvestmentSection investmentPen={investmentPen} quantity={quantity} />
      <PricingSection
        salePricePen={salePricePen}
        onSalePriceChange={setSalePricePen}
      />
      <TaxesComponent igvPct={igvPct} incomeTaxPct={incomeTaxPct} />
      <ResultsSection investmentPen={investmentPen} {...results} />
    </section>
  );
}
