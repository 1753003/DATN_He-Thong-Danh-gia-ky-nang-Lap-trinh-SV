import React from 'react';
import {Row, Col, Form, Input, Select, Button, Alert, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { connect } from 'dva';
import { Redirect, history } from 'umi';
import Language from '@/locales/index';

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
                    type: 'developer',
                    name: values.name,
                    image: null
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
                                       fontWeight: 'bolder'}}>{Language.pages_registerCreator_startNow}</div>
                        <div style = {{fontSize: '20px', 
                                       marginBottom: '20px',
                                       fontWeight: 'bold'}}>{Language.pages_registerCreator_codeJoy2}</div>
                        <ul style = {{fontSize: '18px'}}>
                            <li>{Language.pages_registerCreator_build}</li>
                            <li>{Language.pages_registerCreator_review}</li>
                            <li>{Language.pages_registerCreator_access}</li>
                            <li>{Language.pages_registerCreator_get}</li>
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
                                <Input placeholder={Language.pages_registerCreator_enterEmail} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                name="name"
                                label={Language.pages_profile_name}
                                rules={[{ required: true, message: 'Please enter full name' }]}
                                >
                                <Input
                                    style={{ width: '100%' }}
                                    placeholder={Language.pages_profile_edit_name}
                                />
                                </Form.Item>
                            </Col>
                            </Row>
                            <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                name="password"
                                label={Language.pages_registerCreator_password}
                                rules={[{ required: true, message: 'Please select your password' }]}
                                hasFeedback
                                >
                                    <Input.Password/>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                name="confirm"
                                label={Language.pages_registerCreator_confirmPw}
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
                                {Language.pages_registerHome_signUp}
                                </Button>
                            </Form.Item>
                        </Form>                  
                        )
                        :
                        (this.props.userRegister.status === 'Ok' ?
                            (
                                <div>                               
                                    <Alert message={this.props.userRegister.codeMessage} type="error" />                                     
                                    <h3>{Language.pages_registerCreator_weSent}</h3>
                                    <Button type="Primary" onClick={()=>{this.onFinishConfirm()}}>
                                    {Language.pages_registerCreator_back}
                                    </Button>
                                    <p><i>{Language.pages_registerCreator_haveNot}</i><a>{Language.pages_registerCreator_resent}</a></p>
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