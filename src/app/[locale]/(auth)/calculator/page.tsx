'use client';

import React, { useState } from 'react';
import withAuth from '@/lib/withAuth';
import EngagementMetrics from '@/components/EngagementMetrics/EngagementMetrics';
import Tabs from '@/components/tabs/Tabs';
import ROICalculators from '@/components/ROICalculators/ROICalculators';
import CampaignPlanner from '@/components/CampaignPlanner/CampaignPlanner';
import InfluencerMetrics from '@/components/InfluencerMetrics/InfluencerMetrics';
import SelectInput from '@/components/selectInput/SelectInput';
import styles from './page.module.css';

function CalculatorPage() {
  const [currency, setCurrency] = useState('USD');

  const tabs = [
    {
      key: 'engagementMetrics',
      label: 'Engagement Metrics',
      content: <EngagementMetrics />,
    },
    {
      key: 'costCalculations',
      label: ' ROI & Cost Calculations',
      content: <ROICalculators />,
    },
    // {
    //   key: 'contentStrategy',
    //   label: ' Content & Posting Strategy',
    //   content: <ContentStrategyTools />,
    // },
    // {
    //   key: 'audienceHealth',
    //   label: 'Audience Health',
    //   content: <AudienceHealth />,
    // },
    {
      key: 'campaignPlanner',
      label: 'Campaign Planner',
      content: <CampaignPlanner />,
    },
    {
      key: 'influencerMetrics',
      label: 'InfluencerMetrics',
      content: <InfluencerMetrics />,
    },
  ];

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Social Media Marketing Calculator</h2>
        <p className={styles.description}>
          Use this calculator to estimate your campaign metrics including ROI, Cost Per Click,
          Influencer Performance, and more.
        </p>
      </div>
      <Tabs tabs={tabs} />
    </main>
  );
}

export default withAuth(CalculatorPage);
