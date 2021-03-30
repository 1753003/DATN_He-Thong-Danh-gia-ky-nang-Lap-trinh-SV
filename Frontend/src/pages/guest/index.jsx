import React, { Component, useState, useRef } from 'react';
import { Row, Col, Button, Menu, Anchor, Card } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;
const { Meta } = Card;
import { history } from 'umi';
import styles from './index.less';
import TweenOne from 'rc-tween-one';
import { OverPack } from 'rc-scroll-anim';

class Header extends React.Component {
  state = {
    current: 'home',
  };

  handleClick = (e) => {
    this.setState({ current: e.key });
    if (e.key === 'signup') history.push('/user/login');
    else if (e.key === 'signout') {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('imageURL');
      history.push('/user/login');
    }
  };

  isLogin = localStorage.getItem('currentUser');
  render() {
    const { current } = this.state;
    return (
      <Menu
        onClick={this.handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        className={styles.menu}
      >
        <Menu.Item key="home">Home</Menu.Item>
        <Menu.Item key="introduce">Introduce</Menu.Item>
        {this.isLogin ? (
          <Menu.Item key="signout">Sign out</Menu.Item>
        ) : (
          <Menu.Item key="signup">Login</Menu.Item>
        )}
      </Menu>
    );
  }
}
class Home extends React.Component {
  state = { current: 1 };
  changeSlide = (page) => {
    this.setState({ current: page });
  };
  render() {
    return (
      <div style={{ overflow: 'hidden', backgroundColor: 'black' }}>
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
        {(() => {
          switch (this.state.current) {
            case 1:
              return (
                <div className={styles.pageVideo}>
                  <video className={styles.videoTag} autoPlay loop muted>
                    <source
                      src="https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/Logo%2FCodeJOY%20(2).mp4?alt=media&token=a742ee85-ea79-4a87-807a-00f16df87ecd"
                      type="video/mp4"
                    />
                  </video>
                  <Button
                    onClick={() => {
                      this.changeSlide(2);
                    }}
                  >
                    <CaretDownOutlined />
                  </Button>
                </div>
              );
            case 2:
              return (
                <div className={styles.specialDesign}>
                  <Row>
                    <Col span={12} className={styles.specialContent}>
                      <div className={styles.specialTitle}>
                        What is CodeJoy?
                      </div>
                      <div className={styles.specialSubTitle}>
                        The ultimate resource to practice and test your coding skills.
                      </div>
                      <div className={styles.specialSubTitle}>
                        The environment to create different test to challenge your developers.
                      </div>
                      <Row gutter = {64} style = {{marginTop: '40px'}}>
                        <Col span = {12}>
                          <div className={styles.card}>
                            <div className={styles.cardIcon}>
                              <img src="https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/GuestPage%2Flist-rich-64.png?alt=media&token=0202b3ba-ea71-480d-8ac4-367864d1364d" alt=""/>
                            </div>
                            <div className={styles.cardTitle}>Hundreds of Hand-picked questions</div>
                          </div>                  
                        </Col>
                        <Col span={12}>
                          <div className={styles.card}>
                            <div className={styles.cardIcon}>
                              <img src="https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/GuestPage%2Fcode-64.png?alt=media&token=b30b4c8e-3bd3-4450-8b61-fa1f46a99049" alt=""/>
                            </div>
                            <div className={styles.cardTitle}>Support 4 different languages</div>
                          </div>
                        </Col>
                      </Row>
                      <Row gutter = {64} style = {{marginTop: '40px'}}>
                        <Col span = {12}>
                          <div className={styles.card}>
                            <div className={styles.cardIcon}>
                              <img src="https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/GuestPage%2Ftop-navigation-toolbar-64.png?alt=media&token=8981b21b-478f-4d6b-9e7f-fb8aa56c011b" alt=""/>
                            </div>
                            <div className={styles.cardTitle}>Code-Execution Environment</div>
                          </div>                  
                        </Col>
                        <Col span={12}>
                          <div className={styles.card}>
                            <div className={styles.cardIcon}>
                              <img src="https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/GuestPage%2Fcomputer-64.png?alt=media&token=ccd8ffd8-32a4-4101-ba88-6f9f3edeca9f" alt=""/>
                            </div>
                            <div className={styles.cardTitle}>Space-Time Complexity Analyses</div>
                          </div>
                        </Col>
                      </Row>                 
                    </Col>
                    <Col span={12}>
                      <div className={styles.perspectiveWrapper}>
                        <div className={styles.container}>
                          <Row className={styles.firstContainer}>
                            <Col span={2}></Col>
                            <Col span={10} className={styles.prompt}>
                              <div className={styles.promptHeader}>Prompt</div>
                              <div className={styles.promptContent}>Solve this problem</div>
                              <OverPack style={{ overflow: 'hidden' }}>
                                <TweenOne
                                  animation={{
                                    x: 0,
                                    duration: 500,
                                    repeat: 0,
                                  }}
                                  className={styles.promptContentLong}
                                  style={{ transform: 'translateX(-80px)' }}
                                >
                                  a
                                </TweenOne>
                                <TweenOne
                                  animation={{
                                    x: 0,
                                    duration: 600,
                                    repeat: 0,
                                  }}
                                  className={styles.promptContentShort}
                                  style={{ transform: 'translateX(-80px)' }}
                                >
                                  a
                                </TweenOne>
                                <TweenOne
                                  animation={{
                                    x: 0,
                                    duration: 700,
                                    repeat: 0,
                                  }}
                                  className={styles.promptContentShort}
                                  style={{ transform: 'translateX(-80px)' }}
                                >
                                  a
                                </TweenOne>
                                <TweenOne
                                  animation={{
                                    x: 0,
                                    duration: 800,
                                    repeat: 0,
                                  }}
                                  className={styles.promptContentMedium}
                                  style={{ transform: 'translateX(-80px)' }}
                                >
                                  a
                                </TweenOne>
                                <TweenOne
                                  animation={{
                                    x: 0,
                                    duration: 900,
                                    repeat: 0,
                                  }}
                                  className={styles.promptContentLong}
                                  style={{ transform: 'translateX(-80px)' }}
                                >
                                  a
                                </TweenOne>
                              </OverPack>
                            </Col>
                            <Col span={10} className={styles.code}>
                              <div className={styles.codeHeader}>
                                <p>Code</p>
                                <Button>Run</Button>
                              </div>
                              <OverPack style={{ overflow: 'hidden' }}>
                                <TweenOne
                                  animation={{
                                    x: 0,
                                    duration: 500,
                                    repeat: 0,
                                  }}
                                  className={styles.longlineCode}
                                  style={{ transform: 'translateX(-80px)' }}
                                >
                                  <div className={styles.element1}>a</div>
                                  <div className={styles.element2}>a</div>
                                  <div className={styles.element3}>a</div>
                                  <div className={styles.element4}>a</div>
                                </TweenOne>
                                <TweenOne
                                  animation={{
                                    x: 0,
                                    duration: 600,
                                    repeat: 0,
                                  }}
                                  className={styles.longlineCode}
                                  style={{ transform: 'translateX(-80px)' }}
                                >
                                  <div className={styles.element1}>a</div>
                                  <div className={styles.element2}>a</div>
                                  <div className={styles.element3}>a</div>
                                  <div className={styles.element4}>a</div>
                                </TweenOne>
                                <TweenOne
                                  animation={{
                                    x: 0,
                                    duration: 700,
                                    repeat: 0,
                                  }}
                                  className={styles.mediumlineCode}
                                  style={{ transform: 'translateX(-80px)' }}
                                >
                                  <div className={styles.element1}>a</div>
                                  <div className={styles.element2}>a</div>
                                  <div className={styles.element3}>a</div>
                                </TweenOne>
                                <TweenOne
                                  animation={{
                                    x: 0,
                                    duration: 800,
                                    repeat: 0,
                                  }}
                                  className={styles.mediumlineCode}
                                  style={{ transform: 'translateX(-80px)' }}
                                >
                                  <div className={styles.element1}>a</div>
                                  <div className={styles.element2}>a</div>
                                  <div className={styles.element3}>a</div>
                                </TweenOne>
                                <TweenOne
                                  animation={{
                                    x: 0,
                                    duration: 900,
                                    repeat: 0,
                                  }}
                                  className={styles.shortlineCode}
                                  style={{ transform: 'translateX(-80px)' }}
                                >
                                  <div className={styles.element1}>a</div>
                                  <div className={styles.element2}>a</div>
                                  <div className={styles.element3}>a</div>
                                </TweenOne>
                              </OverPack>
                            </Col>
                          </Row>
                          <Row className={styles.secondContainer}>
                            <Col span={2}></Col>
                            <Col span={10} className={styles.testcase}> 
                                <div class={styles.testcaseHeader}>Testcases</div>
                            </Col>
                            <Col span={10} className={styles.output}>
                                <div class={styles.outputHeader}>Output</div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Col>
                  </Row>
                  <Button
                    onClick={() => {
                      this.changeSlide(1);
                    }}
                    className = {styles.sliderButton}
                  >
                    <CaretDownOutlined />
                  </Button>
                </div>
              );
          }
        })()}
      </div>
    );
  }
}

export default Home;
