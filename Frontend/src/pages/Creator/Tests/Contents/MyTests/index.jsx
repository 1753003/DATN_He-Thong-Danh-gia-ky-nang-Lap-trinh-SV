import React, { useEffect, useState } from 'react';
import { Button, Table, Input, Menu, Alert, ConfigProvider } from 'antd';
import { useHistory, connect, getLocale } from 'umi';
import styles from './index.less';
import { EditOutlined, DeleteOutlined, LockOutlined, UnlockOutlined } from '@ant-design/icons';
import NoData from '@/components/NoData';
import { removeAccents } from '@/utils/string';

const { Search } = Input;

const MyTests = ({ testList, dispatch, loading }) => {
  const history = useHistory();
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(testList);
  }, [testList]);

  const columns = [
    {
      title: 'Test name',
      dataIndex: 'TestName',
      key: 'TestName',
    },
    {
      title: 'Created date',
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      sorter: (a, b) => Date.parse(a.CreatedAt) > Date.parse(b.CreatedAt),
      sortDirections: ['descend'],
    },
    {
      title: 'Permission',
      dataIndex: 'Permissions',
      key: 'Permissions',
      filters: [
        {
          text: 'Private',
          value: 'private',
        },
        {
          text: 'Public',
          value: 'public',
        },
      ],
      onFilter: (value, record) => record.Permissions === value,
      render: (permissions) => {
        return permissions === 'private' ? <LockOutlined /> : <UnlockOutlined />;
      },
    },
  ];

  const onSearch = (value) => {
    const searchList = [];
    const refactorValue = removeAccents(value).toLowerCase();
    testList.forEach((element) => {
      console.log(element);
      if (
        removeAccents(element?.TestName).toLowerCase().includes(refactorValue) ||
        removeAccents(element?.BriefDescription).toLowerCase().includes(refactorValue)
      ) {
        searchList.push(element);
      }
    });
    setList(searchList);
  };

  const buttonModalOnClick = () => {
    history.push({
      pathname: '/creator/tests/createTest',
    });
  };

  const handleTestOnClick = (testID) => {
    history.push({
      pathname: '/creator/tests/testDetail',
      query: {
        id: testID,
      },
    });
  };

  useEffect(() => {
    dispatch({ type: 'test/fetchTestList' });
  }, []);

  return (
    <ConfigProvider locale={getLocale()}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Search
            placeholder="Please input search text"
            onSearch={onSearch}
            enterButton
            className={styles.searchBar}
          />
          <Button type="primary" className={styles.button} onClick={buttonModalOnClick}>
            Create test
          </Button>
        </div>

        <div className={styles.content}>
          <Alert message="Double click to show detail" type="info" showIcon />
          <Table
            columns={columns}
            dataSource={list}
            loading={loading}
            locale={{ emptyText: NoData }}
            style={{ cursor: 'pointer' }}
            onRow={(record, rowIndex) => {
              return {
                onDoubleClick: (event) => {
                  handleTestOnClick(record.TestID);
                },
              };
            }}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default connect(({ test: { testList }, loading }) => ({
  testList,
  loading: loading.effects['test/fetchTestList'],
}))(MyTests);
