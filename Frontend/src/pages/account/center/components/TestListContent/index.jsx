import { Avatar } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';

const TestListContent = ({ data: { CreatedAt, Score, MaxScore } }) => (
  <div className={styles.listContent}>
    <div className={styles.description}>
      Score: {Score} / {MaxScore}
    </div>
    <div className={styles.extra}>
      <em>{moment(CreatedAt).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default TestListContent;
