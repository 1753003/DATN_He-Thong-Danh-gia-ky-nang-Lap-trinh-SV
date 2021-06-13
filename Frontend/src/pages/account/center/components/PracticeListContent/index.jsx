import { Avatar } from 'antd';
import React from 'react';
import moment from 'moment';
import styles from './index.less';
import Language from '@/locales/index';

const PracticeListContent = ({ data: { CreatedAt, Score, MaxScore } }) => (
  <div className={styles.listContent}>
    <div className={styles.description}>
      {Language.pages_profile_score} {Score}/{MaxScore}
    </div>
    <div className={styles.extra}>
      <em>{moment(CreatedAt).format('YYYY-MM-DD HH:mm')}</em>
    </div>
  </div>
);

export default PracticeListContent;
