import React, { useEffect, useState } from 'react';
import styles from './styles.less';
import { Menu } from 'antd';
import { useHistory } from 'umi';
import { UserOutlined, BookOutlined, StarOutlined } from '@ant-design/icons';
import Collection from './Contents/Collection';
import MyTests from './Contents/MyTests';
import TestBank from './Contents/TestBank';
import '../../../components/GlobalHeader/style.less';

const Tests = ({ location }) => {
  const history = useHistory();
  const { query } = location;

  useEffect(() => {
    if (!query.menuKey) {
      history.push({
        pathname: '/creator/tests/home',
        query: {
          menuKey: 'collection',
        },
      });
    }
  }, []);

  const handleClick = (e) => {
    history.push({
      pathname: '/creator/tests/home',
      query: {
        menuKey: e.key,
      },
    });
  };

  const RightContent = () => {
    switch (query.menuKey) {
      case 'collection':
        return <Collection />;
      case 'tests':
        return <MyTests />;
      case 'testBank':
        return <TestBank />;
      default:
        return <Collection />;
    }
  };

  return (
    <div className={`${styles.container} custom`}>
      <div className={styles.left}>
        <Menu
          onClick={handleClick}
          selectedKeys={query.menuKey}
          defaultChecked="collection"
          className={styles.menu}
          mode="inline"
          theme="dark"
        >
          <Menu.Item key="collection" icon={<BookOutlined />}>
            Collections
          </Menu.Item>
          <Menu.Item key="tests" icon={<StarOutlined />}>
            My Tests
          </Menu.Item>
          <Menu.Item key="testBank" icon={<StarOutlined />}>
            Test Bank
          </Menu.Item>
        </Menu>
      </div>
      <div className={styles.right}>
        <RightContent />
      </div>
    </div>
  );
};

export default Tests;
