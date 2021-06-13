import React, { useEffect } from 'react';
import styles from './index.less';
import Collection from '@/components/CreatorComponents/Collection';
import Test from '@/components/CreatorComponents/Test';
import '../../../components/GlobalHeader/style.less';
import { connect } from 'umi';

const Home = ({ dispatch, collectionList, testList }) => {
  useEffect(() => {
    if (collectionList.length === 0) {
      dispatch({ type: 'collection/fetchCollection' });
    }
    if (testList.length === 0) {
      dispatch({ type: 'test/fetchTestList' });
    }
  }, []);
  return (
    <div className={`${styles.container} custom`}>
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

export default connect(({ collection: { collectionList }, test: { testList } }) => ({
  collectionList,
  testList,
}))(Home);
