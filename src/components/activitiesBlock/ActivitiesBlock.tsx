'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import Tabs from '@/components/tabs/Tabs';
import ActivitiesList from '@/components/activitiesBlock/ActivitiesList';
import SelectInput from '@/components/selectInput/SelectInput';
import { SocialNetwork } from '@/types/statistics';
import styles from './ActivitiesBlock.module.css';

export interface IActivities {
  comment: IActivity[];
  message: IActivity[];
  follow_request: IActivity[];
}

export interface IActivity {
  type: string;
  website: string;
  lastname: string;
  comment?: string;
  message?: string;
  timestamp: string;
  action: string;
  firstname: string;
}

interface IAllActivities {
  key: 'comment' | 'message' | 'follow_request';
  label: string;
  content: ReactNode | null;
}

interface IProps {
  activities: IActivities;
}

const ActivitiesBlock: React.FC<IProps> = ({ activities }) => {
  const [selectedNetwork, setSelectedNetwork] = useState<SocialNetwork | 'Show all'>('Show all');

  const [allActivities, setAllActivities] = useState<IAllActivities[]>([
    { key: 'message', label: 'Inbox', content: null },
    {
      key: 'follow_request',
      label: 'Follow Requests',
      content: null,
    },
    { key: 'comment', label: 'Comments', content: null },
  ]);

  useEffect(() => {
    if (activities) {
      const newActivities = allActivities.map((el: IAllActivities) => {
        const filteredActivities =
          selectedNetwork !== 'Show all'
            ? activities[el.key].filter(
                (activity: IActivity) => activity.website === selectedNetwork,
              )
            : activities[el.key];

        const content = <ActivitiesList activities={filteredActivities} />;

        return { ...el, content };
      });

      setAllActivities(newActivities);
    }
  }, [activities, selectedNetwork]);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>All Activities</h3>
        <SelectInput
          options={Object.values({ All: 'Show all', ...SocialNetwork })}
          placeholder="Select a platform"
          value={selectedNetwork}
          onChange={(value) => setSelectedNetwork(value)}
        />
      </div>
      <Tabs tabs={allActivities} />
    </div>
  );
};

export default ActivitiesBlock;
