import React from 'react';
import { Row, Col, Button } from 'antd';
import { history } from 'umi'
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

                        }}>Sign up</div>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                            <Col span={12}>
                                <div style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold'
                                }}>For Creators</div>
                                <div style={{
                                    marginTop: '10px',
                                    fontSize: '18px'
                                }}>
                                    We are the innovative technical platform to identify developers with the right skills
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
                                        Sign up & Create
                                </Button>
                                <div style={{
                                    marginTop: '20px',
                                    fontSize: '18px'
                                }}>
                                    Already have an account? <a href="/user/login">Login</a>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div style={{
                                    fontSize: '20px',
                                    fontWeight: 'bold'
                                }}>For Devlopers</div>
                                <div style={{
                                    marginTop: '10px',
                                    fontSize: '18px'
                                }}>
                                    Join our community practice coding skills, doing tests.
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
                                            Sign up & Code
                                </Button>
                                <div style={{
                                    marginTop: '20px',
                                    fontSize: '18px'
                                }}>
                                    Already sign up? <a href="user/login">Login now</a>
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