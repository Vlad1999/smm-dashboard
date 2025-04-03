import React, { useState } from 'react';
import Image from 'next/image';
import { SocialNetwork, Statistics } from '@/types/statistics';
import SelectInput from '@/components/selectInput/SelectInput';
import styles from './InsightBox.module.css';

interface IProps {
  data: Statistics | null;
}

const InsightBox: React.FC<IProps> = ({ data }) => {
  const [selectedNetwork, setSelectedNetwork] = useState<SocialNetwork>(SocialNetwork.Instagram);

  const formatNumber = (num: number): string => {
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M'; // 1.2M
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K'; // 1.9K
    return num.toString();
  };

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          <Image
            alt={selectedNetwork}
            height={28}
            src={`icons/social/${selectedNetwork}.svg`}
            width={28}
          />
          {selectedNetwork}
        </h3>
        <SelectInput
          options={Object.values(SocialNetwork)}
          placeholder="Select a platform"
          value={selectedNetwork}
          onChange={(value) => setSelectedNetwork(value)}
        />
      </div>
      <div className={styles.items}>
        {Object.entries(data[selectedNetwork].statistics).map(([key, value]) => (
          <div className={styles.item} key={key}>
            <p className={styles['item-value']}>{formatNumber(value)}</p>
            <p className={styles['item-label']}>{key}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightBox;
