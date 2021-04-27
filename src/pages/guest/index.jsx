import React, { Component, useState, useRef } from 'react';
import { Row, Col, Button, Menu, Anchor, Card } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { history } from 'umi';
import styles from './index.less';
import TweenOne from 'rc-tween-one';
import { OverPack } from 'rc-scroll-anim';
import YouTube from 'react-youtube';
import AnchorLink from 'react-anchor-link-smooth-scroll';
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
const Content = () => {
  const [page, setPage] = useState(0);
  const handleScroll = (e) => {
    if (
      window.pageYOffset < document.documentElement.offsetHeight * 1.5 &&
      window.pageYOffset > document.documentElement.offsetHeight * 0.5
    )
      setPage(1);
    if (window.pageYOffset > document.documentElement.offsetHeight * 1.5) setPage(2);
    if (window.pageYOffset < document.documentElement.offsetHeight * 0.5) setPage(0);
  };
  return (
    <>
      <div
        className={styles.container}
        onScroll={(e) => console.log(e)}
        onWheel={(e) => handleScroll(e)}
      >
        <div className={styles.body}>
          <div id="p1" key="0" className={styles.page}>
            <div className={styles.one}>
              <video className={styles.videoTag} autoPlay loop muted>
                <source
                  src="https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/Logo%2FCodeJOY%20(2).mp4?alt=media&token=a742ee85-ea79-4a87-807a-00f16df87ecd"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
          <div id="p2" key="1" className={styles.page}>
            <div className={styles.two + ' ' + styles.specialDesign}>
              <Row>
                <Col span={12} className={styles.specialContent}>
                  <div className={styles.specialTitle}>What is CodeJoy?</div>
                  <div className={styles.specialSubTitle}>
                    The ultimate resource to practice and test your coding skills.
                  </div>
                  <div className={styles.specialSubTitle}>
                    The environment to create different test to challenge your developers.
                  </div>
                  <Row gutter={64} style={{ marginTop: '40px' }}>
                    <Col span={12}>
                      <div className={styles.card}>
                        <div className={styles.cardIcon}>
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/GuestPage%2Flist-rich-64.png?alt=media&token=0202b3ba-ea71-480d-8ac4-367864d1364d"
                            alt=""
                          />
                        </div>
                        <div className={styles.cardTitle}>Hundreds of Hand-picked questions</div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className={styles.card}>
                        <div className={styles.cardIcon}>
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/GuestPage%2Fcode-64.png?alt=media&token=b30b4c8e-3bd3-4450-8b61-fa1f46a99049"
                            alt=""
                          />
                        </div>
                        <div className={styles.cardTitle}>Support 4 different languages</div>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={64} style={{ marginTop: '40px' }}>
                    <Col span={12}>
                      <div className={styles.card}>
                        <div className={styles.cardIcon}>
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/GuestPage%2Ftop-navigation-toolbar-64.png?alt=media&token=8981b21b-478f-4d6b-9e7f-fb8aa56c011b"
                            alt=""
                          />
                        </div>
                        <div className={styles.cardTitle}>Code-Execution Environment</div>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className={styles.card}>
                        <div className={styles.cardIcon}>
                          <img
                            src="https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/GuestPage%2Fcomputer-64.png?alt=media&token=ccd8ffd8-32a4-4101-ba88-6f9f3edeca9f"
                            alt=""
                          />
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
                          <div className={styles.testcaseHeader}>Testcases</div>
                        </Col>
                        <Col span={10} className={styles.output}>
                          <div className={styles.outputHeader}>Output</div>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div id="p3" key="2" className={styles.page}>
            <div className={styles.three}>
              <Row className = {styles.navigationContent}>
                <Col span={12} className = {styles.navigationContentDeveloper}>
                  <div className = {styles.wallpaper}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/GuestPage%2Fdev-login.png?alt=media&token=282a2155-07e1-457e-abb1-bb424f80766a" alt="" width="80%" height="80%"/>
                  </div>
                  <Row className = {styles.text}>
                    <div className = {styles.cardTitle}>Are you student?</div>
                    <Button onClick = {() => {history.push('/developer/practice')}}
                            type="primary"
                    >
                      Join now
                    </Button>
                  </Row>
                </Col>
                <Col span={12} className = {styles.navigationContentDeveloper}>
                  <div className = {styles.wallpaper}>
                    <img src="https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/GuestPage%2Fcreator-login.jpg?alt=media&token=b47214d7-09be-4796-a4f7-cc641e67313b" alt="" width="80%" height="80%"/>
                  </div>
                  <Row className = {styles.text}>
                  <div className = {styles.cardTitle}>Are you teacher?</div>
                    <Button onClick = {() => {history.push('/creator')}}
                            type="primary"
                    >
                      Join now
                    </Button>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
          <div className={styles.thumbs}>
            <AnchorLink
              href="#p1"
              onClick={() => {
                setPage(0);
              }}
            >
              <div
                className={styles.thumb}
                style={page == 0 ? { backgroundColor: 'white' } : null}
              ></div>
            </AnchorLink>
            <AnchorLink
              href="#p2"
              onClick={() => {
                setPage(1);
              }}
            >
              <div
                className={styles.thumb}
                style={page == 1 ? { backgroundColor: 'white' } : null}
              ></div>
            </AnchorLink>
            <AnchorLink
              href="#p3"
              onClick={() => {
                setPage(2);
              }}
            >
              <div
                className={styles.thumb}
                style={page == 2 ? { backgroundColor: 'white' } : null}
              ></div>
            </AnchorLink>
          </div>
        </div>
      </div>
    </>
  );
};

class Home extends React.Component {
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
        <Content></Content>
      </div>
    );
  }
}

export default Home;
