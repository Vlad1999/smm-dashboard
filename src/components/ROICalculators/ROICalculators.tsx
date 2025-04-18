import React, { useState, useEffect } from 'react';
import Input from '@/components/input/Input';
import SelectInput from '@/components/selectInput/SelectInput';
import useCurrencyConversion from '@/hooks/useCurrencyConversion';
import styles from './ROICalculators.module.css';
import { useTranslations } from 'next-intl'

const ROICalculators: React.FC = () => {
  const { convert, convertBack, loading, currencies } = useCurrencyConversion('USD'); // Keep USD as the base
  const [currency, setCurrency] = useState<string>('USD');

  const [cost, setCost] = useState(0);
  const [revenue, setRevenue] = useState(0);
  const [clicks, setClicks] = useState(0);
  const [impressions, setImpressions] = useState(0);
  const [acquisitions, setAcquisitions] = useState(0);

  const roi = cost > 0 ? ((revenue - cost) / cost) * 100 : 0;
  const cpc = clicks > 0 ? cost / clicks : 0;
  const cpm = impressions > 0 ? (cost / impressions) * 1000 : 0;
  const cpa = acquisitions > 0 ? cost / acquisitions : 0;

  const [convertedCost, setConvertedCost] = useState(cost);
  const [convertedRevenue, setConvertedRevenue] = useState(revenue);
  const [convertedCpc, setConvertedCpc] = useState(cpc);
  const [convertedCpm, setConvertedCpm] = useState(cpm);
  const [convertedCpa, setConvertedCpa] = useState(cpa);

  useEffect(() => {
    setConvertedCost(convert(cost, currency));
    setConvertedRevenue(convert(revenue, currency));
    setConvertedCpc(convert(cpc, currency));
    setConvertedCpm(convert(cpm, currency));
    setConvertedCpa(convert(cpa, currency));
  }, [currency, cost, revenue, clicks, impressions, acquisitions]);

  const t = useTranslations('Calculator');
  

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>{t("rcc")}</h2>
        <SelectInput
          options={currencies}
          placeholder={t("currency")}
          value={currency}
          onChange={setCurrency}
        />
      </div>
      <div className={styles.inputsGrid}>
        <Input
          label={`totalAdSpend (${currency})`}
          value={Math.round(convertedCost).toString()}
          onChange={(value) => {
            const newCost = Number(value);
            setConvertedCost(newCost);
            setCost(convertBack(newCost, currency));
          }}
        />
        <Input
          label={`Revenue Generated (${currency})`}
          value={Math.round(convertedRevenue).toString()}
          onChange={(value) => {
            const newRevenue = Number(value);
            setConvertedRevenue(newRevenue);
            setRevenue(convertBack(newRevenue, currency));
          }}
        />
        <Input
          label={t("clicks")}
          value={clicks.toString()}
          onChange={(value) => setClicks(Number(value))}
        />
        <Input
          label={t("impressions")}
          value={impressions.toString()}
          onChange={(value) => setImpressions(Number(value))}
        />
        <Input
          label={t("acquisitions")}
          value={acquisitions.toString()}
          onChange={(value) => setAcquisitions(Number(value))}
        />
      </div>

      <div className={styles.results}>
        <p>
          <strong>{t("roi")}</strong> {roi.toFixed(2)}%
        </p>
        <p>
          <strong>{t("cpc")}</strong> {currency} {convertedCpc.toFixed(2)}
        </p>
        <p>
          <strong>{t("cpm")}</strong> {currency} {convertedCpm.toFixed(2)}
        </p>
        <p>
          <strong>{t("cpa")}</strong> {currency} {convertedCpa.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ROICalculators;
