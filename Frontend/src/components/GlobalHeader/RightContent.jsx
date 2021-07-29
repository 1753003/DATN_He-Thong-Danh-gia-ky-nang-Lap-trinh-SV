import { Tooltip, Menu } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { connect, SelectLang, history } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import Language from '@/locales/index';
import HeaderDropdown from '../HeaderDropdown';
import { setLocale } from 'umi';

const GlobalHeaderRight = (props) => {
  const { theme, layout, dispatch } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }
  const onLanguageMenuClick = (event) => {
    let lang = event.key;
    setLocale(lang, true);
  };
  const languageMenu = (
    <Menu className={styles.languageMenu} selectedKeys={[]} onClick={(e) => onLanguageMenuClick(e)}>
      <Menu.Item key="en-US">🇺🇸 English</Menu.Item>
      {<Menu.Divider />}
      <Menu.Item key="vi-VN">🇻🇳 Tiếng Việt</Menu.Item>
    </Menu>
  );
  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="Search"
        defaultValue="Web"
        bordered={false}
        options={[
          {
            label: (
              <a
                onClick={() => {
                  dispatch({ type: 'search/getSearchList', payload: 'C++' });
                  history.push('/developer/search?keyword=C++');
                }}
              >
                C++
              </a>
            ),
            value: 'C++',
          },
          {
            label: (
              <a
                onClick={() => {
                  dispatch({ type: 'search/getSearchList', payload: 'JavaScript' });
                  history.push('/developer/search?keyword=JavaScript');
                }}
              >
                JavaScript
              </a>
            ),
            value: 'JavaScript',
          },
          {
            label: (
              <a
                onClick={() => {
                  dispatch({ type: 'search/getSearchList', payload: 'Pointer' });
                  history.push('/developer/search?keyword=Pointer');
                }}
              >
                Pointer
              </a>
            ),
            value: 'Pointer',
          },
        ]}
        onPressEnter={(value) => {
          dispatch({ type: 'search/getSearchList', payload: value });
          history.push('/developer/search');
        }}
      />
      <Tooltip title={Language.help}>
        <a
          style={{
            color: 'inherit',
          }}
          target="_blank"
          href="https://github.com/1753003/DATN_He-Thong-Danh-gia-ky-nang-Lap-trinh-SV"
          rel="noopener noreferrer"
          className={styles.action}
        >
          <QuestionCircleOutlined />
        </a>
      </Tooltip>

      <Avatar menu />
      <HeaderDropdown className={styles.action} overlay={languageMenu}>
        <span
          style={{
            cursor: 'pointer',
            padding: '12px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 18,
            verticalAlign: 'middle',
          }}
        >
          <i className="anticon">
            <svg
              viewBox="0 0 24 24"
              focusable="false"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path
                d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z "
                className="css-c4d79v"
              />
            </svg>
          </i>
        </span>
      </HeaderDropdown>
    </div>
  );
};

export default connect(({ settings, search }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  search,
}))(GlobalHeaderRight);
