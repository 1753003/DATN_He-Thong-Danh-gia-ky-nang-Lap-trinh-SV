import React from 'react';
import { connect } from 'dva';
import { Row, Col, Input, Form, Button, Alert } from 'antd';
import Language from '@/locales/index';

const FormItem = Form.Item;

class forgotPassword extends React.Component {
    onFinish = (value) => {
        this.props.dispatch({
            type: 'forgotPassword/submit',
            payload: value.email
        });
    }
    render() {
        return (
            <div style = {{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
            }}>
                <div style = {{ width: '40%'}}>
                    {this.props.forgotPassword.status == "" ? "" :
                    (this.props.forgotPassword.status !== "OK" ?
                    <Alert type="error" message={this.props.forgotPassword.message} showIcon></Alert>
                    : 
                    <Alert type="success" message={Language.pages_forgotPw_weHaveSent} showIcon />
                    )}

                    <Form onFinish={this.onFinish}>
                        <Form.Item 
                           name="email"
                           label="Email"
                           rules={[{ required: true, message: 'Please enter your email' },
                                   { type: 'email', message: 'The input is not valid E-mail!'}]}
                        >
                            <Input placeholder={Language.pages_registerCreator_enterEmail} ></Input>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">  
                                {Language.pages_forgotPw_getNew}
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                
            </div>
        )
    }
}

export default connect(({ forgotPassword }) => ({
    forgotPassword
}))(forgotPassword)