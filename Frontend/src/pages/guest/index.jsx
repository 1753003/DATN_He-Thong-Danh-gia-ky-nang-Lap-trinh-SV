import React, { Component, useState, useRef } from 'react';
import { Row, Col, Button, Menu, Anchor, Carousel } from 'antd';
import { HomeOutlined, UnorderedListOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons'
const { SubMenu } = Menu;
const { Link } = Anchor;
import { history } from 'umi'
import styles from './index.less';
import { fadeInLeft } from 'react-animations';
import Radium, {StyleRoot} from 'radium';
 
const myStyle = {
    fadeInLeft1: {
        animation: 'x 1s',
        animationName: Radium.keyframes(fadeInLeft, 'fadeInLeft')
    },
    fadeInLeft2: {
        animation: 'x 1.5s',
        animationName: Radium.keyframes(fadeInLeft, 'fadeInLeft')
    },
    fadeInLeft3: {
        animation: 'x 2s',
        animationName: Radium.keyframes(fadeInLeft, 'fadeInLeft')
    },
    fadeInLeft4: {
        animation: 'x 2.5s',
        animationName: Radium.keyframes(fadeInLeft, 'fadeInLeft')
    },
    fadeInLeft5: {
        animation: 'x 3s',
        animationName: Radium.keyframes(fadeInLeft, 'fadeInLeft')
    }
}
 
class Header extends React.Component {
    state = {
        current: 'home',
    };
    
    handleClick = e => {
        this.setState({ current: e.key });
        if (e.key === 'signup')
            history.push('/user/login');
        else if (e.key ==='signout') {
            localStorage.removeItem('currentUser');
            localStorage.removeItem('imageURL');
            history.push('/user/login')
        }
    }
      
    isLogin = localStorage.getItem('currentUser');
    render() {
    const { current } = this.state;
    return (
        <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal"
                className={styles.menu}
        >
        <Menu.Item key="home" > 
            Home      
        </Menu.Item>
        <Menu.Item key="introduce">
            Introduce
        </Menu.Item>
        {this.isLogin ? 
            <Menu.Item key="signout"> 
                Sign out
            </Menu.Item>
            :
            <Menu.Item key="signup">
               Login
            </Menu.Item>
        }
        
        </Menu>
    );
    }
}
class Home extends React.Component {
    render()
    {
        return (
           <StyleRoot>
                <div style={{overflow: 'hidden', backgroundColor: 'black'}}>
                <div className="header" style = {{
                            position: 'fixed',
                            zIndex: 1,
                            left: 0,
                            right: 0,
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <Header />
                </div>
                <Carousel dotPosition='right' 
                            customPaging = {i => (
                                <div style = {{
                                    width: '20px',
                                    height: '20px',
                                    borderRadius: '50%',
                                    backgroundColor: 'red',
                                    marginBottom: '5px'
                                }}
                                />
                            )}
                            infinite='true'
                            style={{height: '99vh !important'}}
                            swipeToSlide='true'
                            verticalSwiping='true'
                            >                    
                    <video className={styles.videoTag} autoPlay loop muted>
                        <source src="https://firebasestorage.googleapis.com/v0/b/devcheckpro.appspot.com/o/Logo%2FCodeJOY%20(2).mp4?alt=media&token=a742ee85-ea79-4a87-807a-00f16df87ecd" type='video/mp4' />
                    </video>                             
                    <div className = {styles.specialDesign}>
                        <Row>
                            <Col span = {12} className = {styles.specialContent}></Col>
                            <Col span = {12}>
                            <div className = {styles.perspectiveWrapper}>
                            <div className={styles.container}>
                            <Row className = {styles.firstContainer}> 
                                <Col span={2}></Col>
                                <Col span={10} className={styles.prompt}> 
                                    <div className={styles.promptHeader}>Prompt</div>
                                    <div className={styles.promptContent}>Solve this problem</div>
                                    <div className={styles.promptContentLong} style={myStyle.fadeInLeft1}>a</div>
                                    <div className={styles.promptContentMedium} style={myStyle.fadeInLeft2}>a</div>
                                    <div className={styles.promptContentShort} style={myStyle.fadeInLeft3}>a</div>
                                    <div className={styles.promptContentMedium} style={myStyle.fadeInLeft4}>a</div>
                                    <div className={styles.promptContentShort} style={myStyle.fadeInLeft5}>a</div>
                                </Col>                                    
                                <Col span={10} className={styles.code}>
                                    <div className={styles.codeHeader}>
                                        <p>Code</p>
                                        <Button>Run</Button>
                                    </div>
                                    <div className={styles.shortlineCode} style={myStyle.fadeInLeft1}>
                                        <div className={styles.element1}>a</div>
                                        <div className={styles.element2}>a</div>
                                        <div className={styles.element3}>a</div>
                                    </div>
                                    <div className={styles.longlineCode} style={myStyle.fadeInLeft2}>
                                        <div className={styles.element1}>a</div>
                                        <div className={styles.element2}>a</div>
                                        <div className={styles.element3}>a</div>
                                        <div className={styles.element4}>a</div>
                                    </div>
                                    <div className={styles.mediumlineCode} style={myStyle.fadeInLeft3}>
                                        <div className={styles.element1}>a</div>
                                        <div className={styles.element2}>a</div>
                                        <div className={styles.element3}>a</div>
                                    </div>
                                    <div className={styles.mediumlineCode} style={myStyle.fadeInLeft4}>
                                        <div className={styles.element1}>a</div>
                                        <div className={styles.element2}>a</div>
                                        <div className={styles.element3}>a</div>
                                    </div>
                                    <div className={styles.shortlineCode} style={myStyle.fadeInLeft5}>
                                        <div className={styles.element1}>a</div>
                                        <div className={styles.element2}>a</div>
                                        <div className={styles.element3}>a</div>
                                    </div>
                                    
                                </Col>
                            </Row>
                            <Row className={styles.secondContainer}> 
                                <Col span={2}></Col>
                                <Col span={10} className={styles.prompt}/>                                    
                                <Col span={10} className={styles.code}/>
                            </Row>
                        </div>
                        </div>           
                    
                            </Col>
                        </Row>
                    </div>
                    <div className = {styles.introduce}>
                        abc
                    </div>
                </Carousel>
            </div>
            
           </StyleRoot>
        )
    }
}


export default Home;