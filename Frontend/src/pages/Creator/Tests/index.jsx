import React, { useEffect, useState, useMemo } from 'react';
import styles from './styles.less';
import { Menu, Drawer, Button, Typography } from 'antd';
import { useHistory } from 'umi';
import {
  UserOutlined,
  BookOutlined,
  StarOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BankOutlined,
} from '@ant-design/icons';
import Collection from './Contents/Collection';
import MyTests from './Contents/MyTests';
import TestBank from './Contents/TestBank';
import '@/components/GlobalHeader/style.less';
import Constants from '@/utils/constants';

const Tests = ({ location }) => {
  const history = useHistory();
  const { query } = location;
  const [toggle, setToggle] = useState(false);
  const [menuDrawerVisibility, setMenuDrawerVisibility] = useState(false);

  const resize = () => {
    requestAnimationFrame(() => {
      if (window.innerWidth === screen.width) {
        setToggle(false);
      }
    });
  };

  const toggleCollapsed = () => {
    setToggle(!toggle);
  };

  const onClose = () => {
    setMenuDrawerVisibility(false);
  };

  useEffect(() => {
    if (!query.menuKey) {
      history.push({
        pathname: '/creator/tests/home',
        query: {
          menuKey: 'collection',
        },
      });
    }
    window.addEventListener('resize', resize);
    resize();
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

  const returnTitle = useMemo(() => {
    if (query.menuKey === 'collection') return 'Collections';
    if (query.menuKey === 'tests') return 'My Tests';
    if (query.menuKey === 'testBank') return 'Test Bank';
  }, [query.menuKey]);

  const renderMenu = (theme) => {
    return (
      <Menu
        onClick={handleClick}
        selectedKeys={query.menuKey}
        defaultChecked="collection"
        className={styles.menu}
        inlineCollapsed={window.innerWidth > Constants.MIN_SCREEN_WIDTH ? toggle : false}
        mode="inline"
        theme={theme}
      >
        <Menu.Item key="collection" icon={<BookOutlined />}>
          Collections
        </Menu.Item>
        <Menu.Item key="tests" icon={<StarOutlined />}>
          Tests
        </Menu.Item>
        <Menu.Item key="testBank" icon={<BankOutlined />}>
          Questions
        </Menu.Item>
      </Menu>
    );
  };

  return (
    <div className={`${styles.container} custom`}>
      <div
        className={styles.left}
        style={{
          width:
            // eslint-disable-next-line no-nested-ternary
            window.innerWidth > Constants.MIN_SCREEN_WIDTH ? (toggle ? '2%' : '12%') : '0px',
          // eslint-disable-next-line no-nested-ternary
          minWidth: window.innerWidth > Constants.MIN_SCREEN_WIDTH ? (toggle ? 55 : 181) : 0,
        }}
      >
        {window.innerWidth > Constants.MIN_SCREEN_WIDTH ? (
          renderMenu('dark')
        ) : (
          <Drawer
            title="Menu"
            placement="left"
            closable={false}
            onClose={onClose}
            bodyStyle={{ padding: 0 }}
            visible={menuDrawerVisibility}
          >
            {renderMenu('light')}
          </Drawer>
        )}
      </div>
      <div
        className={styles.right}
        style={{
          width: toggle || window.innerWidth < Constants.MIN_SCREEN_WIDTH ? '98%' : '88%',
          paddingLeft: 20,
          paddingTop: window.innerWidth < Constants.MIN_SCREEN_WIDTH && 0,
          paddingRight: 32,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Button
            type="primary"
            onClick={
              window.innerWidth > Constants.MIN_SCREEN_WIDTH
                ? toggleCollapsed
                : () => setMenuDrawerVisibility(true)
            }
            size="small"
            style={{ margin: 10 }}
          >
            {React.createElement(toggle ? MenuUnfoldOutlined : MenuFoldOutlined)}
          </Button>
          <Typography.Title level={2} style={{ paddingTop: 14 }}>
            {returnTitle}
          </Typography.Title>
        </div>

        <RightContent />
      </div>
    </div>
  );
};

export default Tests;
