import React, { useEffect } from 'react';
import { Button, Table, Input, Upload, Dropdown, Menu } from 'antd';
import { useHistory, connect } from 'umi';
import styles from './index.less';
import {
  MoreOutlined,
  EditOutlined,
  DeleteOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
const { Search } = Input;
const { Dragger } = Upload;

const MyTests = ({ testList, dispatch, loading }) => {
  const history = useHistory();

  const menu = (item) => {
    return (
      <Menu>
        <Menu.Item key="edit" icon={<EditOutlined />}>
          Edit
        </Menu.Item>
        <Menu.Item key="delete" icon={<DeleteOutlined />}>
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
    {
      title: '',
      render: (item) => {
        return (
          <Dropdown overlay={() => menu(item)} placement="bottomRight">
            <MoreOutlined />
          </Dropdown>
        );
      },
    },
  ];

  const onSearch = (value) => {
    console.log(value);
  };

  const buttonModalOnClick = () => {
    // setModalVisible(true);
    history.push({
      pathname: '/creator/createTest',
    });
  };

  const handleTestOnClick = (testID) => {
    history.push({
      pathname: '/creator/testDetail',
      query: {
        id: testID,
      },
    });
  };

  useEffect(() => {
    // if (testList.length === 0) {
    dispatch({ type: 'test/fetchTestList' });
    // }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>My Tests</h3>
        <Button type="primary" className={styles.button} onClick={buttonModalOnClick}>
          Create test
        </Button>
      </div>
      {testList.length > 0 ? (
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          className={styles.searchBar}
        />
      ) : null}
      <div className={styles.content}>
        <Table
          columns={columns}
          dataSource={testList}
          loading={loading}
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
