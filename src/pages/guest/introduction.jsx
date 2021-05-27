import React from 'react';
import { Col, Menu, Row, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import styles from './introduce.less';
import Language from '@/locales/index';
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
            <>
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
                            <h1>About Us</h1>
                            <p>CodeZone.asia is the leading platform for testing programming capabilities in Vietnam. We provide thousands of algorithmic tests, UI / UX Test, Mobile Test ...</p>
                            <p>Helping technology companies minimize the process of finding quality programmers for projects.</p>
                            <Button onClick={()=>{this.start()}} className = {styles.btn} type="primary" shape="round" icon={<ArrowRightOutlined />}> Get Started </Button>
                        </Col>
                        <Col span={12}>
                            <img className = {styles.img1} src="https://lh3.googleusercontent.com/4JtP84JssU-FnsEKzXTt-9DvxrquDSXrxdPtYK7ZrWSmhknA6SkGCj-8Jzl3-BsQp5zn99mJ0bcBmR1Lu1MFZ7KVldV5QiwwEAXQQ5nVF7t4JSrqsWHBbbZ_bsYEYTOTGrPQZAIjSx1mo4_aMJjokGqc3OnUs-KdbOeCRYxpYHccvgx9m44NIgRfxJdXKPVqe45chYjUu-LHHfX8acVF3yJkPeZ3HY0LX9AABiGOfnqu26RuNBj5o6CltHVKBYR7rE6mFnQkFGF5o_25axcw8-EnbT9fVgD_Uwdnm90gcmnLpmvP8R5V3pd3pMSBqMAEVrkIstz-J-4JtUY_fI_KNg6XcNILut5iNdQ-ivYgzLlXTitCOmXWpaPkeAZBY3E_bEUS5ZEGYo-A6AoXiEaj0N26jYPpW4jTGFteRegF9ev6dDFsKsq7UopttlY1Vc2BIPcB0YdUzOrSKjYbL_xVzXMhFril4A0TfE-QryoXpcixHoxzemIPUG71c5axkWow98JKPQWTYZrxTHoRG3My1PUJ_tP7991w1ATcFqpw0t0dH1exaxPA-YWvGkKMWtNGJfGEPmLcLIpmiMHMKxNuNErfQYeC7YMH_GgsFP-RVKDrpkNxvcSy-psw8jQmJ5Z9AsWRzF1K-6u_amp_2dptYczZwqTJXv0DNM2i2Wb1e-uEoci1_GkwS-K5n-AEWQ0JYLfnWzwkOpi9XqNoNmWia3zU=w1270-h953-no?authuser=0" alt="img1" />
                        </Col>
                    </Row>
                    <Row className = {styles.secondRow}>
                        <Col span={12}>
                            <img className = {styles.img2} src="https://lh3.googleusercontent.com/bEJc3NAcLZpt7Jz_MWzbhGbM6y7jT-xbz6XZiGdutdBFYrEnc3neDOEQyXRf6vDGxiQ-dx5JenPpWXQWYNGKRf2SqNHrwzoNv-tepw80cmg-QbuRUQb7cmXaYV-9nAkunubYK67y05mZfyEWerdDYVRQZw5jv2HGniFSNtcLycQy6jiV2f1mu6v2IjzWtIiqOG6cD0SbySrFj5QommHTtxgN31-8AW5-CYzFwpALMQ7zIVxfng0M37YXoRJtEaSQ9sXTBW3xNaCq2AjndhLkMSf8L5OoQmqVmrcIGeI2Y98PDhCnn-Mi3pgOTKLVHbCsmsKm5imsavHekqPMnawJLwbFVMIAB-7D3ebSGePOgvQhoYFjVTEI8oETnWAabY87OKXKWsNIFMG1XBsvyAiC3Ocw1GeXTs1zy6_J_EXVAS9xk8kSFxOdkkjqX5dCihc-S3ACNG4Jl8LmsZBL2AmokHRZYwD29eabVdoLC-6tmJP0mfveFG06WHjD82zYek1Jnb9XG13SzE4epbjR3EoIm6W2bnHS9IkcI7d-A-xjA9XTtf9lR0TdLiYhRrLNV4I5rRbxVtYJJy1e8PnaQwDlluKXcE00UxhQwTXAk77zaW_n3nHgKnqQc8w0GWBHZltNhAr71DJQJAOmEx7_iAcooHabTDAvVRnbduURiDpOscWlcF97VmOQv_rAFJrJn0yocaB7-hqzLXIWmKLVQ7wD6PgC=w1270-h953-no?authuser=0" alt="error" />
                        </Col>
                        <Col className = {styles.para2} span={12}>
                            <h1>Our Story</h1>
                            <p>I - a 3rd year student always have the idea of a product that can help beginners learn to code easily and quickly access the industry.</p>
                            <p>With that in mind, on September 8, 2020, the first bricks were placed on the foundation of CodeZone</p>
                            <p>CodeZone wants to become a platform for coding practice, sharing programming knowledge and providing input quality tests for employers all over Vietnam..</p>
                        </Col>
                    </Row>
                    <Row className = {styles.thirdRow}>
                        <Col className = {styles.para3} span={12}>
                            <h1>Our Team</h1>
                            <p>CodeZone always welcomes those who have the same idea, enthusiasm, passion to join and become a part of CodeZone.</p>
                        </Col>
                        <Col span={12}>
                            <img className = {styles.img3} src="https://lh3.googleusercontent.com/V0e_eBsi-UK74-CjPiwLKoBXolpNI3CVXqYRD3iMN7xxMq4eDEbuPJccXq887TLeFtA9iP1veap4_cszyo9BbZwr2O6K6UIfTY3muXzydh7XT2c4Cz9YjhHupqKvsE9cMrP7OlvYYDJmZ4avEfePfCTlBTG_MlGeuRMz6_FA11bQW0kAV22cNt5YkGKGomdxULsFg5UqCO2kmE1X5c1Dij-sMbxCBHr69TZuuh9BwqKP_GIx-m5Y2RzSMFIv-irBgYP6SjRfTmovx40nkSbF5h2idZ2vaKFiyJca6ewOEmoQR-e1pfH5a4ZtbVNHHOCv03oSynAfBdFLbHxqGy0O_HQCwCmtIoPlEjzi5a8XU9D14nHha697r7mtATGf7rkelcoZGHmorCbLC_vFF4VtKZRSnkJgNtYjmirqJ6z1nqW3DLzvTecXxtIQfhEa6LsqGH24xvNn8-_tgIu1whdywmz-xuYmCGKdiyA3ihrrc2VDlPk4Y1BU68HNuyaWKYP4-pKH0gz5ETQMkv4873PzmX2ePkPFZUQqBH8EeQq-hUdtHGVkFhVzk6VjyGoGHKBIo6N8J1jPDo3zR24-y8VEAPR2N0IcdJ48sRx_qD5m_5GgXoxP96GMy836iE3CjbnD0qX9LNnd0Zea2AItrri-jPM1kHpyu-DH6HSk1nyscigCDXaZ3ZeZtQ4vtAL9EDnBVwFAQ2btAYWrU4RKstirJMIv=w1270-h953-no?authuser=0" alt="img1" />
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
}

