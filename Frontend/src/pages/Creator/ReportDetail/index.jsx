import React, { useState } from 'react';
import styles from './index.less';
import Summary from './Cotents/Summary';
import Users from './Cotents/Users';
import Questions from './Cotents/Questions';
import Feedback from './Cotents/Feedback';
import { Menu } from 'antd';

const ReportDetail = () => {
  const [menuKey, setMenuKey] = useState('summary');
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2>Report</h2>
          <h1>C Basic Test - KTPM Class - 2021</h1>
          <Menu
            mode="horizontal"
            className={styles.menu}
            onSelect={(info) => {
              setMenuKey(info.key);
            }}
          >
            <Menu.Item key="summary">Summary</Menu.Item>
            <Menu.Item key="users">Users</Menu.Item>
            <Menu.Item key="questions">Questions</Menu.Item>
            <Menu.Item key="feedback">Feedback</Menu.Item>
          </Menu>
        </div>
      </div>
      <div className={styles.body}>
        <RenderBody menuKey={menuKey} />
      </div>
    </div>
  );
};

const RenderBody = ({ menuKey }) => {
  switch (menuKey) {
    case 'summary':
      return <Summary />;
    case 'users':
      return <Users />;
    case 'questions':
      return <Questions />;
    case 'feedback':
      return <Feedback />;
    default:
      return <Summary />;
  }
};

export default ReportDetail;
