import React from 'react';
import {Row, Col, Form, Input, Select, Button, Alert, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import { Redirect, history } from 'umi';

const { Option } = Select;
class registerDeveloper extends React.Component {
    state = {
        status: 'start',
        message: '',
        uid: ''
    }
  
    onFinish = (values) => {      
        if (values !== undefined) {
            this.props.dispatch({
                type: 'userRegister/submit',
                payload: {
                    email: values.email,
                    password: values.password,
                    type: 'developer'
                },
            });
                 
        }
    };
    
    onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    onFinishConfirm = () => {
        history.push('/user/login')
    }

    success = () => {
        message.success('Register successfully')
        history.push('/user/login')
    }
    render() {
        console.log(this.props.userRegister.message);
        return (
            <div>
                <Row style = {{paddingLeft: '20px',
                                paddingRight: '20px'}}>
                    <Col span={1}></Col>
                    <Col span={11}>
                        <div style = {{fontSize: '35px',                                     
                                       marginBottom: '20px',
                                       fontWeight: 'bolder'}}>Start now</div>
                        <div style = {{fontSize: '20px', 
                                       marginBottom: '20px',
                                       fontWeight: 'bold'}}>What can you do with your DevCheck developer account?</div>
                        <ul style = {{fontSize: '18px'}}>
                            <li>Build new tests for unlimited daily </li>
                            <li>Review results and download reports instantly</li>
                            <li>Access customer support 24 hours a day</li>
                            <li>Get support for 4 programming languages</li>
                        </ul>
                    </Col>
                    <Col span={12}>
                        <div style = {{
                            padding: '20px',
                            backgroundColor: 'white'
                        }}>
                        {(this.props.userRegister.status === 'start' || this.props.userRegister.status === 'Fail')?
                        (   
                            <Form layout="vertical" 
                                hideRequiredMark
                                onFinish={this.onFinish}
                                onFinishFailed={this.onFinishFailed()}>
                            {
                                this.props.userRegister.message === '' ? '' : <Alert message={this.props.userRegister.message} type="error" />
                            }
                            <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                name="email"
                                label="Email"
                                rules={[{ required: true, message: 'Please enter your email' },
                                        { type: 'email', message: 'The input is not valid E-mail!'}]}
                                >
                                <Input placeholder="Please enter email" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                name="name"
                                label="Name"
                                rules={[{ required: true, message: 'Please enter full name' }]}
                                >
                                <Input
                                    style={{ width: '100%' }}
                                    placeholder="Please enter full name"
                                />
                                </Form.Item>
                            </Col>
                            </Row>
                            <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                name="password"
                                label="Password"
                                rules={[{ required: true, message: 'Please select your password' }]}
                                hasFeedback
                                >
                                    <Input.Password/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                name="confirm"
                                label="Confirm Password"
                                dependencies={['password']}
                                hasFeedback
                                rules={[
                                    { required: true, message: 'Please confirm your password' },
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            if (!value || getFieldValue('password') === value) {
                                              return Promise.resolve();
                                            }
                              
                                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                          },
                                    })
                                ]}
                                >
                                    <Input.Password/>
                                </Form.Item>
                            </Col>
                            </Row>
                           
                            <Form.Item>
                                <Button type="primary" htmlType="submit">  
                                Sign up
                                </Button>
                            </Form.Item>
                        </Form>                  
                        )
                        :
                        (this.props.userRegister.status === 'Ok' ?
                            (
                                <div>                               
                                    <Alert message={this.props.userRegister.codeMessage} type="error" />                                     
                                    <h3>We have sent an email containing the confirm link to the email you registered, please confirm</h3>
                                    <Button type="Primary" onClick={()=>{this.onFinishConfirm()}}>
                                        Back to login
                                    </Button>
                                    <p><i>Haven't received email? </i><a>Resent email</a></p>
                                </div>
                            )
                            :
                            (
                                <h3></h3>
                            )
                        )
                        }
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect(({ userRegister, loading }) => ({
    userRegister,
  }))(registerDeveloper);