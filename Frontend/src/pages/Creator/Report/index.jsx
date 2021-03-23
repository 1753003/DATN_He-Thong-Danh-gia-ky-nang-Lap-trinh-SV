import React from 'react';
import styles from './styles.less';
import { Table, Input } from 'antd';
import { useHistory } from 'umi';

const { Search } = Input;
const Report = () => {
  const history = useHistory();
  const columns = [
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'Date',
    },
  ];

  const dataSource = [
    {
      key: 0,
      Name: 'Test C (Basic) - KTPM class - 2021 ',
      Date: 'Feb 21st 2021 - 11:52 AM',
    },
    {
      key: 1,
      Name: 'Test C (Advanced) - KTPM class - 2021 ',
      Date: 'Feb 21st 2021 - 11:52 AM',
    },
  ];

  return (
    <div className={styles.container}>
      <Search
        placeholder="input search text"
        enterButton
        style={{ marginBottom: 20, width: '30%' }}
      />
      <Table
        dataSource={dataSource}
        columns={columns}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              console.log(record);
              history.push({
                pathname: '/creator/reportDetail',
                query: {
                  id: record.key,
                },
              });
            }, // click row
          };
        }}
      />
    </div>
  );
};

export default Report;
