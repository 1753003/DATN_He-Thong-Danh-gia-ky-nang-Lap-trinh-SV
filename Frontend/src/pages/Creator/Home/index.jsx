import React from 'react';
import styles from './index.less';
import { Typography } from 'antd';
import Collection from '@/components/CreatorComponents/Collection';
import Test from '@/components/CreatorComponents/Test';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.quickReportContainer}>
        <h3 className={styles.title}>QuickLy Report</h3>
      </div>
      <div className={styles.collectionContainer}>
        <h3 className={styles.titleCollection}>Collection</h3>
        <Collection />
      </div>
      <div className={styles.myTestContainer}>
        <h3 className={styles.title}>My Tests</h3>
        <Test />
      </div>
    </div>
  );
};

export default Home;
