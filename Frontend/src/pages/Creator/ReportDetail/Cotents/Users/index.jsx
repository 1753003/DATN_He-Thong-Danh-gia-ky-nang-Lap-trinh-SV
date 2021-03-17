import React from 'react';
import styles from './index.less';
import { Table } from 'antd';

const Users = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Rank',
      dataIndex: 'Rank',
      key: 'Rank',
    },
    {
      title: 'Corrected Answer',
      dataIndex: 'CorrectedAnswer',
      key: 'CorrectedAnswer',
    },
    {
      title: 'Unanswered',
      dataIndex: 'Unanswered',
      key: 'Unanswered',
    },
    {
      title: 'Final Score',
      dataIndex: 'FinalScore',
      key: 'FinalScore',
    },
  ];

  const dataSource = [
    {
      key: 0,
      Name: 'Khanh duy Pon Pham',
      Rank: 1,
      CorrectedAnswer: 90,
      Unanswered: 8,
      FinalScore: 188,
    },
    {
      key: 1,
      Name: 'Khanh duy Pon Pham 1',
      Rank: 1,
      CorrectedAnswer: 90,
      Unanswered: 8,
      FinalScore: 188,
    },
    {
      key: 2,
      Name: 'Khanh duy Pon Pham 2',
      Rank: 1,
      CorrectedAnswer: 90,
      Unanswered: 8,
      FinalScore: 188,
    },
    {
      key: 3,
      Name: 'Khanh duy Pon Pham 3',
      Rank: 1,
      CorrectedAnswer: 90,
      Unanswered: 8,
      FinalScore: 188,
    },
    {
      key: 4,
      Name: 'Khanh duy Pon Pham 4',
      Rank: 1,
      CorrectedAnswer: 90,
      Unanswered: 8,
      FinalScore: 188,
    },
    {
      key: 5,
      Name: 'Khanh duy Pon Pham 5',
      Rank: 1,
      CorrectedAnswer: 90,
      Unanswered: 8,
      FinalScore: 188,
    },
  ];

  return (
    <div className={styles.container}>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Users;
