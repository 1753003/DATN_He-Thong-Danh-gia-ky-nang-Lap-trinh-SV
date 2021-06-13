import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu, Spin } from 'antd';
import React from 'react';
import { history, connect } from 'umi';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import Language from '@/locales/index';

function generateDarkColorHex() {
  let color = "#";
  for (let i = 0; i < 3; i++)
    color += ("0" + Math.floor(Math.random() * Math.pow(16, 2) / 2).toString(16)).slice(-2);
  return color;
}
function generateLightColorHex() {
  let color = "#";
  for (let i = 0; i < 3; i++)
    color += ("0" + Math.floor(((1 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
  return color;
}
class AvatarDropdown extends React.Component {
  onMenuClick = (event) => {
    const { key } = event;

    if (key === 'logout') {
      const { dispatch } = this.props;

      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }
    history.push(`/developer/profile`);
  };

  render() {
    const {
      menu,
    } = this.props;

    const currentUser = {
      avatar: localStorage.getItem('imageURL'),
      name: localStorage.getItem('currentUser')
    }
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="profile">
            <UserOutlined />
            {Language.avtDropdown_profile}
          </Menu.Item>
        )}
        
        {menu && <Menu.Divider />}
        <Menu.Item key="logout">
          <LogoutOutlined />
          {Language.avtDropdown_logout}
        </Menu.Item>
      </Menu>
    );
    return currentUser && currentUser.name ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar style={{marginRight:'5px',fontWeight:'bold', color: `${generateDarkColorHex()}`, backgroundColor: `${generateLightColorHex()}` }} size="small" className={styles.avatar} src={currentUser.avatar} alt="avatar" >{currentUser.name[0].toUpperCase()}</Avatar>
          <span className={`${styles.name} anticon`}>{currentUser.name}</span>
        </span>
      </HeaderDropdown>
    ) : (
      <span className={`${styles.action} ${styles.account}`}>
        <Spin
          size="small"
          style={{
            marginLeft: 8,
            marginRight: 8,
          }}
        />
      </span>
    );
  }
}

export default connect(({ user }) => ({
  currentUser: user.currentUser,
}))(AvatarDropdown);
