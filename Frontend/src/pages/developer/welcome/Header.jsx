import React from 'react';
import { Row, Col, Icon, Menu, Button, Popover } from 'antd';
import {connect, history} from 'umi'
import { enquireScreen } from 'enquire-js';
import HeaderSearch from '@/components/HeaderSearch';
import Avatar from '@/components/GlobalHeader/AvatarDropdown';


class Header extends React.Component {
  state = {
    menuVisible: false,
    menuMode: 'horizontal',
  };

  componentDidMount() {
    enquireScreen((b) => {
      this.setState({ menuMode: b ? 'inline' : 'horizontal' });
    });
  }

  render() {
    const { menuMode, menuVisible } = this.state;

    const menu = (
      <Menu mode={menuMode} id="nav" key="nav">
        <Menu.Item key="search">
          <HeaderSearch className="search"
          bordered={false}
          onPressEnter={(value) => {
            this.props.dispatch({type:'search/getSearchList', payload: value})
            history.push('/developer/search')
            
          }}
          ></HeaderSearch>
        </Menu.Item>
        <Menu.Item>
          <Avatar></Avatar>
        </Menu.Item>
      </Menu>
    );

    return (
      <div id="header" className="header">
        {menuMode === 'inline' ? (
          <Popover
            overlayClassName="popover-menu"
            placement="bottomRight"
            content={menu}
            trigger="click"
            visible={menuVisible}
            arrowPointAtCenter
            onVisibleChange={this.onMenuVisibleChange}
          >
            <Icon
              className="nav-phone-icon"
              type="menu"
              onClick={this.handleShowMenu}
            />
          </Popover>
        ) : null}
        <Row>
          <Col xxl={4} xl={5} lg={8} md={8} sm={24} xs={24}>
            <div id="logo" to="/">
              <img alt="logo" />
            </div>
          </Col>
          <Col xxl={20} xl={19} lg={16} md={16} sm={0} xs={0}>
            <div className="header-meta">
              {menuMode === 'horizontal' ? <div id="menu">{menu}</div> : null}
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect(({search})=>({
  search
}))(Header);
