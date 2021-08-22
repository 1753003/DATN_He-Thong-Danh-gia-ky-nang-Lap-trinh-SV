import React, { useState } from 'react';
import styles from './index.less';
import { Table, ConfigProvider, Input } from 'antd';
import '@/components/GlobalHeader/style.less';
import { useHistory, getLocale } from 'umi';
import NoData from '@/components/NoData';
import { removeAccents } from '@/utils/string';

const { Search } = Input;

const Users = ({ summaryUser, reportID }) => {
  const history = useHistory();
  const [data, setData] = useState(summaryUser || []);
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
      title: 'Answered',
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

  const onSearch = (value) => {
    const searchList = [];
    const refactorValue = removeAccents(value).toLowerCase();
    summaryUser.forEach((element) => {
      if (removeAccents(element?.UserName).toLowerCase().includes(refactorValue)) {
        searchList.push(element);
      }
    });
    setData(searchList);
  };

  return (
    <ConfigProvider locale={getLocale()}>
      <div className={`${styles.container} custom`}>
        <Search
          placeholder="Please input username to search"
          enterButton
          // className={styles.searchBar}
          onSearch={onSearch}
        />
        <Table
          dataSource={data}
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
    </ConfigProvider>
  );
};

export default Users;
