import { Tooltip, Tag } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { connect, SelectLang, history } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import Language from '@/locales/index';

const GlobalHeaderRight = (props) => {
  const { theme, layout, dispatch } = props;
  let className = styles.right;

  if (theme === 'dark' && layout === 'top') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <div className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="Search"
        defaultValue="Web"
        bordered={false}
        options={[
          {
            label: <a onClick = {() => {
              dispatch({type:'search/getSearchList', payload: 'C++'})
              history.push('/developer/search?keyword=C++')
            }}>C++</a>,
            value: 'C++',
          },
          {
            label: <a onClick = {() => {
              dispatch({type:'search/getSearchList', payload: 'JavaScript'})
              history.push('/developer/search?keyword=JavaScript')
            }}>JavaScript</a>,
            value: 'JavaScript',
          },
          {
            label: <a onClick = {() => {
              dispatch({type:'search/getSearchList', payload: 'Pointer'})
              history.push('/developer/search?keyword=Pointer')
            }}>Pointer</a>,
            value: 'Pointer',
          },

        ]}
        onPressEnter={(value) => {
          dispatch({type:'search/getSearchList', payload: value})
          history.push('/developer/search')
          
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
      { <SelectLang className={styles.action} /> }
    </div>
  );
};

export default connect(({ settings, search }) => ({
  theme: settings.navTheme,
  layout: settings.layout,
  search
}))(GlobalHeaderRight);
