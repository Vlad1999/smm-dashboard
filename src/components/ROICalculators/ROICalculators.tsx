import React, { useState, useEffect } from 'react';
import Input from '@/components/input/Input';
import SelectInput, { Option } from '@/components/selectInput/SelectInput';
import useCurrencyConversion from '@/hooks/useCurrencyConversion';
import styles from './ROICalculators.module.css';

const ROICalculators: React.FC = () => {
  const { convert, convertBack, currencies } = useCurrencyConversion('USD');
  const [currency, setCurrency] = useState<Option>({ label: 'USD', value: 'USD' });

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
    setConvertedCost(convert(cost, currency.value));
    setConvertedRevenue(convert(revenue, currency.value));
    setConvertedCpc(convert(cpc, currency.value));
    setConvertedCpm(convert(cpm, currency.value));
    setConvertedCpa(convert(cpa, currency.value));
  }, [currency, cost, revenue, clicks, impressions, acquisitions]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>📊 ROI & Cost Calculators</h2>
        <SelectInput
          options={currencies.map((item) => ({ label: item, value: item }))}
          placeholder="Select currency"
          value={currency}
          onChange={setCurrency}
        />
      </div>
      <div className={styles.inputsGrid}>
        <Input
          label={`Total Ad Spend (${currency.value})`}
          value={Math.round(convertedCost).toString()}
          onChange={(value) => {
            const newCost = Number(value);
            setConvertedCost(newCost);
            setCost(convertBack(newCost, currency.value));
          }}
        />
        <Input
          label={`Revenue Generated (${currency.value})`}
          value={Math.round(convertedRevenue).toString()}
          onChange={(value) => {
            const newRevenue = Number(value);
            setConvertedRevenue(newRevenue);
            setRevenue(convertBack(newRevenue, currency.value));
          }}
        />
        <Input
          label="Clicks"
          value={clicks.toString()}
          onChange={(value) => setClicks(Number(value))}
        />
        <Input
          label="Impressions"
          value={impressions.toString()}
          onChange={(value) => setImpressions(Number(value))}
        />
        <Input
          label="Acquisitions"
          value={acquisitions.toString()}
          onChange={(value) => setAcquisitions(Number(value))}
        />
      </div>

      <div className={styles.results}>
        <p>
          <strong>ROI:</strong> {roi.toFixed(2)}%
        </p>
        <p>
          <strong>Cost Per Click (CPC):</strong> {currency.value} {convertedCpc.toFixed(2)}
        </p>
        <p>
          <strong>Cost Per Mille (CPM):</strong> {currency.value} {convertedCpm.toFixed(2)}
        </p>
        <p>
          <strong>Cost Per Acquisition (CPA):</strong> {currency.value} {convertedCpa.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default ROICalculators;
