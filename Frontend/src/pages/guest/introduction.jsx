import React from 'react';
import { Col, Menu, Row, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import styles from './introduce.less';
import Language from '@/locales/index';
import Cookies from 'js-cookie';
import { history } from 'umi';

class Header extends React.Component {
    state = {
      current: 'introduce',
    };
  
    handleClick = (e) => {
      this.setState({ current: e.key });
      if (e.key === 'signup') history.push('/user/login');
      else if (e.key === 'signout') {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('imageURL');
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        history.push('/user/login');
        
      }
      else if (e.key === 'home') history.push('/')
      else if (e.key === 'join') {
        if (localStorage.getItem('antd-pro-authority') == '["developer"]')
          history.push('/developer')
        else
        history.push('/creator')
      }
    };
  
    isLogin = localStorage.getItem('currentUser');
    render() {
      const { current } = this.state;
      return (
        this.isLogin ? 
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          className={styles.menu}
        >
          <Menu.Item key="home">{Language.home_home}</Menu.Item>
          <Menu.Item key="introduce">{Language.home_introduce}</Menu.Item>
          <Menu.Item key="join">{Language.home_join}</Menu.Item> 
          {this.isLogin ? (
            <Menu.Item key="signout">{Language.home_signOut}</Menu.Item>
          ) : (
            <Menu.Item key="signup">{Language.home_login}</Menu.Item>
          )}
        </Menu>
        :
        <Menu
          onClick={this.handleClick}
          selectedKeys={[current]}
          mode="horizontal"
          className={styles.menu}
        >
          <Menu.Item key="home">{Language.home_home}</Menu.Item>
          <Menu.Item key="introduce">{Language.home_introduce}</Menu.Item>
          {this.isLogin ? (
            <Menu.Item key="signout">{Language.home_signOut}</Menu.Item>
          ) : (
            <Menu.Item key="signup">{Language.home_login}</Menu.Item>
          )}
        </Menu>
     
      );
    }
  }

export default class Introduction extends React.Component {
    start = () => {
        console.log("pon map")
        history.push('/developer/welcome')
    };
    render() {
        return (
            <div style={{ backgroundColor: 'black', color: 'white'}}>
                <div style={{ overflow: 'hidden', backgroundColor: 'white' }}>
                    <div
                    className="header"
                    style={{
                        position: 'fixed',
                        zIndex: 1,
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                    >
                    <Header />
                    </div>
                </div>
                <div>
                    <Row className = {styles.firstRow}>
                        <Col className = {styles.para1} span={12}>
                            <h1>{Language.pages_guest_introduction_aboutUs}</h1>
                            <p>{Language.pages_guest_introduction_aboutUs_1}</p>
                            <p>{Language.pages_guest_introduction_aboutUs_2}</p>
                            <Button onClick={()=>{this.start()}} className = {styles.btn} type="primary" shape="round" icon={<ArrowRightOutlined />}>{Language.pages_guest_introduction_getStarted}</Button>
                        </Col>
                        <Col span={12}>
                            <img className = {styles.img1} src="https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/GuestPage%2Fintro1.jpeg?alt=media&token=f132ffd9-affa-484f-b899-2900babe9bdf" alt="img1" />
                        </Col>
                    </Row>
                    <Row className = {styles.secondRow}>
                        <Col span={12}>
                            <img className = {styles.img2} src="https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/GuestPage%2Fintro2.jpeg?alt=media&token=fbbdede4-8473-4dd6-8ca9-5415268f665f" alt="error" />
                        </Col>
                        <Col className = {styles.para2} span={12}>
                            <h1>{Language.pages_guest_introduction_ourStory}</h1>
                            <p>{Language.pages_guest_introduction_ourStory_1}</p>
                            <p>{Language.pages_guest_introduction_ourStory_2}</p>
                        </Col>
                    </Row>
                    <Row className = {styles.thirdRow}>
                        <Col className = {styles.para3} span={12}>
                            <h1>{Language.pages_guest_introduction_ourTeam}</h1>
                            <p>{Language.pages_guest_introduction_ourTeam_1}</p>
                        </Col>
                        <Col span={12}>
                            <img className = {styles.img3} src="https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/GuestPage%2Fintro3.jpeg?alt=media&token=3fab0d7f-5bb3-4d0c-b299-6052f7c16ad1" alt="img1" />
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

