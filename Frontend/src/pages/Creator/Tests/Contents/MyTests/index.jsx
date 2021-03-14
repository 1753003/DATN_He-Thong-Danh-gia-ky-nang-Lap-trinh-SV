import React, { useState } from 'react';
import { Card, Button, Table, Input, Modal, Form, Upload, Image, Dropdown, Menu } from 'antd';
import { useHistory } from 'umi';
import styles from './index.less';
import {
  MoreOutlined,
  InboxOutlined,
  FolderOpenOutlined,
  EditOutlined,
  DeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
const { Search } = Input;
const { Dragger } = Upload;

const MyTests = () => {
  const history = useHistory();
  const menu = (
    <Menu>
      <Menu.Item
        key="open"
        icon={<FolderOpenOutlined />}
        onClick={() => {
          history.push({
            pathname: '/creator/testDetail',
            query: {
              id: '123',
            },
          });
        }}
      >
        Open
      </Menu.Item>
      <Menu.Item key="edit" icon={<EditOutlined />}>
        Edit
      </Menu.Item>
      <Menu.Item key="delete" icon={<DeleteOutlined />}>
        Delete
      </Menu.Item>
    </Menu>
  );
  const data = [
    {
      TestID: '1',
      TestName: '17CLC1 Class - Ky thuat lap trinh - 2021',
      Permissions: 'dev',
    },
    {
      TestID: '2',
      TestName: '17CLC1 Class - Ky thuat lap trinh - 2021',
      Permissions: 'dev',
    },
  ];
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
        return permissions === 'dev' ? <UserOutlined /> : null;
      },
    },
    {
      title: '',
      render: () => {
        return (
          <Dropdown overlay={menu} placement="bottomRight">
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>My Tests</h3>
        <Button type="primary" className={styles.button} onClick={buttonModalOnClick}>
          Create test
        </Button>
      </div>
      {data.length > 0 ? (
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          enterButton
          className={styles.searchBar}
        />
      ) : null}
      <div className={styles.content}>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default MyTests;
