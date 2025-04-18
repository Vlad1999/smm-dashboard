import React, { useState, useEffect } from 'react';
import Input from '@/components/input/Input';
import SelectInput, { Option } from '@/components/selectInput/SelectInput';
import useCurrencyConversion from '@/hooks/useCurrencyConversion';
import styles from './InfluencerMetrics.module.css';

const InfluencerMetrics: React.FC = () => {
  const { convert, convertBack, currencies } = useCurrencyConversion('USD');
  const [currency, setCurrency] = useState<Option>({ label: 'USD', value: 'USD' });

  const [followers, setFollowers] = useState(0);
  const [engagementRate, setEngagementRate] = useState(0);
  const [totalEngagements, setTotalEngagements] = useState(0);
  const [cost, setCost] = useState(0);
  const [revenue, setRevenue] = useState(0);

  const estimatedReach = followers * (engagementRate / 100);
  const cpe = totalEngagements > 0 ? cost / totalEngagements : 0;
  const roi = cost > 0 ? ((revenue - cost) / cost) * 100 : 0;

  const [convertedCost, setConvertedCost] = useState(cost);
  const [convertedRevenue, setConvertedRevenue] = useState(revenue);
  const [convertedCpe, setConvertedCpe] = useState(cpe);
  const [convertedRoi, setConvertedRoi] = useState(roi);

  useEffect(() => {
    setConvertedCost(convert(cost, currency.value));
    setConvertedRevenue(convert(revenue, currency.value));
    setConvertedCpe(convert(cpe, currency.value));
    setConvertedRoi(convert(roi, currency.value));
  }, [currency, cost, revenue, followers, engagementRate, totalEngagements]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.heading}>🤝 Influencer & Partnership Metrics</h2>
        <SelectInput
          options={currencies.map((item) => ({ label: item, value: item }))}
          placeholder="Select currency"
          value={currency}
          onChange={setCurrency}
        />
      </div>

      <div className={styles.grid}>
        <Input
          label="Influencer Followers"
          value={followers.toString()}
          onChange={(value) => setFollowers(Number(value))}
        />
        <Input
          label="Engagement Rate (%)"
          value={engagementRate.toString()}
          onChange={(value) => setEngagementRate(Number(value))}
        />
        <Input
          label="Total Engagements"
          value={totalEngagements.toString()}
          onChange={(value) => setTotalEngagements(Number(value))}
        />
        <Input
          label={`Partnership Cost (${currency.value})`}
          value={convertedCost.toString()}
          onChange={(value) => {
            const newCost = Number(value);
            setConvertedCost(newCost);
            setCost(convertBack(newCost, currency.value));
          }}
        />
        <Input
          label={`Revenue Generated (${currency.value})`}
          value={convertedRevenue.toString()}
          onChange={(value) => {
            const newRevenue = Number(value);
            setConvertedRevenue(newRevenue);
            setRevenue(convertBack(newRevenue, currency.value));
          }}
        />
      </div>

      <div className={styles.results}>
        <p className={styles.resultItem}>
          <strong>Estimated Reach Value:</strong> {estimatedReach.toFixed(0)} users
        </p>
        <p className={styles.resultItem}>
          <strong>Cost Per Engagement (CPE):</strong> {currency.value} {convertedCpe.toFixed(2)}
        </p>
        <p className={styles.resultItem}>
          <strong>Partnership ROI:</strong> {convertedRoi.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default InfluencerMetrics;
