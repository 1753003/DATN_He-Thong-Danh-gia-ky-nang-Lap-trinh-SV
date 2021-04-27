import React from 'react';
import { connect } from 'dva';
import { Row, Col, Input, Form, Button, Alert } from 'antd';

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
                    <Alert type="success" message="We have sent an email to you, check it." showIcon />
                    )}

                    <Form onFinish={this.onFinish}>
                        <Form.Item 
                           name="email"
                           label="Email"
                           rules={[{ required: true, message: 'Please enter your email' },
                                   { type: 'email', message: 'The input is not valid E-mail!'}]}
                        >
                            <Input placeholder="Enter your email" ></Input>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">  
                                Get new password
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