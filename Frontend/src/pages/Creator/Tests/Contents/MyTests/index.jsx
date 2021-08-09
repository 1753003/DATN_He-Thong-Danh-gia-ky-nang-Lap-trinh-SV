import React, { useEffect, useState } from 'react';
import { Button, Table, Input, Menu, Alert, Typography } from 'antd';
import { useHistory, connect } from 'umi';
import styles from './index.less';
import { EditOutlined, DeleteOutlined, LockOutlined, UnlockOutlined, PlusOutlined } from '@ant-design/icons';
import NoData from '@/components/NoData';

const { Search } = Input;

const MyTests = ({ testList, dispatch, loading }) => {
  const history = useHistory();
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(testList);
  }, [testList]);

  const handleEditClick = (TestID) => {
    history.push({
      pathname: '/creator/tests/createTest',
      query: {
        id: TestID,
      },
    });
  };

  const handleDeleteClick = (TestID) => {
    dispatch({
      type: 'test/deleteTest',
      payload: {
        TestID,
        onSuccess: () => {
          console.log('Success');
        },
        onFail: () => {
          console.log('Fail');
        },
      },
    });
  };

  const menu = (item) => {
    return (
      <Menu>
        <Menu.Item key="edit" icon={<EditOutlined />} onClick={() => handleEditClick(item.TestID)}>
          Edit
        </Menu.Item>
        <Menu.Item
          key="delete"
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteClick(item.TestID)}
        >
          Delete
        </Menu.Item>
      </Menu>
    );
  };

  const columns = [
    {
      title: 'Test name',
      dataIndex: 'TestName',
      key: 'TestName',
    },
    {
      title: 'Permission',
      dataIndex: 'Permissions',
      key: 'Permissions',
      render: (permissions) => {
        return permissions === 'private' ? <LockOutlined /> : <UnlockOutlined />;
      },
    },
  ];

  const onSearch = (value) => {
    const searchList = [];
    testList.forEach((element) => {
      if (element.TestName.includes(value)) {
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
    <div className={styles.container}>
      <div className={styles.header}>
      <Typography.Title level={2} className={styles.title}>My Tests</Typography.Title>
        <Button icon={<PlusOutlined/>} className={styles.button} onClick={buttonModalOnClick}>
          Create test
        </Button>
      </div>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        enterButton
        className={styles.searchBar}
      />

      <div className={styles.content}>
        <Alert message="Double click to view detail" type="info" showIcon />
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
  );
};

export default connect(({ test: { testList }, loading }) => ({
  testList,
  loading: loading.effects['test/fetchTestList'],
}))(MyTests);
