import React from 'react';
import styles from './index.less';
import { Table } from 'antd';
import '@/components/GlobalHeader/style.less';
import { useHistory } from 'umi';
import NoData from '@/components/NoData';

const Users = ({ summaryUser, reportID }) => {
  const history = useHistory();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'UserName',
      key: 'UserName',
    },
    {
      title: 'Rank',
      dataIndex: 'Rank',
      key: 'Rank',
      sorter: (a, b) => a.Rank - b.Rank,
    },
    {
      title: 'Correct Percent',
      dataIndex: 'CorrectPercent',
      key: 'CorrectPercent',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.CorrectPercent - b.CorrectPercent,
    },
    {
      title: 'Answerd',
      dataIndex: 'AnsweredNumber',
      key: 'AnsweredNumber',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.Unanswered - b.Unanswered,
    },
    {
      title: 'Final Score',
      dataIndex: 'Score',
      key: 'Score',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.Score - b.Score,
    },
  ];

  return (
    <div className={`${styles.container} custom`}>
      <Table
        dataSource={summaryUser}
        columns={columns}
        locale={{ emptyText: NoData }}
        style={{ cursor: 'pointer' }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              console.log(record);
              history.push({
                pathname: '/creator/report/user',
                query: {
                  userName: encodeURIComponent(record.UserName),
                  reportID: reportID,
                },
              });
            }, // double click row
          };
        }}
      />
    </div>
  );
};

export default Users;
