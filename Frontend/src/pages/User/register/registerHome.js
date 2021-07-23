import React from 'react';
import { Row, Col, Button } from 'antd';
import { history } from 'umi';
import Language from '@/locales/index';
class RegisterHomepage extends React.Component {
    render() {
        return (
            <div>
                <Row>
                    <Col span={2}/>
                    <Col span={14}>
                        <div style={{
                            fontSize: '35px',
                            marginBottom: '20px'

                        }}>{Language.pages_registerHome_signUp}</div>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={12}>
                                <div style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold'
                                }}>{Language.pages_registerHome_forCreators}</div>
                                <div style={{
                                    marginTop: '10px',
                                    fontSize: '18px'
                                }}>
                                    {Language.pages_registerHome_weAre}
                                </div>
                                <Button type="primary" 
                                        size="large"
                                        shape="round"
                                        style = {{
                                            width: '100%',
                                            marginTop: '20px',
                                            fontSize: '20px',
                                            height: '50px'
                                        }}
                                        onClick = {() => {
                                           history.push('/user/register/creator') 
                                        }}>
                                        {Language.pages_registerHome_signUp} & {Language.pages_registerHome_create}
                                </Button>
                                <div style={{
                                    marginTop: '20px',
                                    fontSize: '18px'
                                }}>
                                    {Language.pages_registerHome_alreadyHaveAcc} <a href="/user/login">{Language.home_login}</a>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold'
                                }}>{Language.pages_registerHome_forDevelopers}</div>
                                <div style={{
                                    marginTop: '10px',
                                    fontSize: '18px'
                                }}>
                                    {Language.pages_registerHome_joinOur}
                                </div>
                                <Button type="primary" 
                                        size="large"
                                        shape="round"
                                        style = {{
                                            width: '100%',
                                            marginTop: '20px',
                                            fontSize: '20px',
                                            height: '50px'
                                        }}
                                        onClick = {() => {
                                           history.push('/user/register/developer') 
                                        }}
                                        >
                                            {Language.pages_registerHome_signUp} & Code
                                </Button>
                                <div style={{
                                    marginTop: '20px',
                                    fontSize: '18px'
                                }}>
                                    {Language.pages_registerHome_alreadySignUp} <a href="user/login">{Language.home_login} {Language.pages_registerHome_now}</a>
                                </div>
                            </Col>
                            
                        </Row>
                    </Col>
                    <Col span ={8} style = {{
                        paddingLeft: '20px'
                    }}>
                    <img
                        style={{ objectFit: 'cover'}} 
                        width='100%'
                        src="https://www.evokedesign.com/wp-content/uploads/2014/01/bigstock-side-view-of-a-business-man-wo-41028847.jpg" alt=""/>
                    </Col>
                    
                </Row>
            </div>
        )
    }
}

export default RegisterHomepage;