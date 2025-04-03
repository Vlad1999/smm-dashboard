import React, { useState } from 'react';
import ReactECharts from 'echarts-for-react'; // Import ECharts component
import SelectInput from '@/components/selectInput/SelectInput';
import { SocialNetwork } from '@/types/statistics';
import styles from './FollowerGrowthChart.module.css';

interface IProps {
  chartData: any;
}

const FollowerGrowthChart: React.FC<IProps> = ({ chartData }) => {
  const [selectedPlatform, setSelectedPlatform] = useState('Instagram');
  const [selectedPeriod, setSelectedPeriod] = useState('week');

  const data = {
    name: selectedPlatform,
    data: chartData[selectedPlatform].followersGrowth[selectedPeriod],
  };

  const chartOptions = {
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: Array.from(
        { length: chartData[selectedPlatform].followersGrowth[selectedPeriod].length },
        (_, i) => `Day ${i + 1}`,
      ),
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: selectedPlatform,
        type: 'bar',
        data: data.data,
        itemStyle: {
          color: '#397F87',
        },
      },
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>Followers Growth</h3>
        <div className={styles.filter}>
          <SelectInput
            options={Object.values(SocialNetwork)}
            placeholder="Select a platform"
            value={selectedPlatform}
            onChange={setSelectedPlatform}
          />
          <SelectInput
            options={['week', 'month', 'trimester']}
            placeholder="Select a platform"
            value={selectedPeriod}
            onChange={setSelectedPeriod}
          />
        </div>
      </div>
      {/* ECharts */}
      <ReactECharts option={chartOptions} />
    </div>
  );
};

export default FollowerGrowthChart;
