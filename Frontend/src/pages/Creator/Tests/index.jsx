import React, { useEffect, useState } from 'react';
import styles from './styles.less';
import { Menu } from 'antd';
import { useHistory } from 'umi';
import { UserOutlined, BookOutlined, StarOutlined } from '@ant-design/icons';
import Collection from './Contents/Collection';
import MyTests from './Contents/MyTests';
import Favorite from './Contents/Favorite';

const Tests = ({ location }) => {
  const history = useHistory();
  const { query } = location;
  const [menuKey, setMenuKey] = useState('collection');

  useEffect(() => {
    if (!query.menuKey) {
      history.push({
        pathname: '/creator/tests',
        query: {
          menuKey: 'collection',
        },
      });
    }
  }, []);

  const handleClick = (e) => {
    history.push({
      pathname: '/creator/tests',
      query: {
        menuKey: e.key,
      },
    });
  };

  const RightContent = () => {
    console.log(query.menuKey);
    switch (query.menuKey) {
      case 'collection':
        return <Collection />;
      case 'tests':
        return <MyTests />;
      default:
        return <Collection />;
    }
  };

  return (
    <div className={styles.container}>
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
        </Menu>
      </div>
      <div className={styles.right}>
        <RightContent />
      </div>
    </div>
  );
};

export default Tests;
