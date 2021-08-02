import {
  LockOutlined,
  UserOutlined,
  FacebookOutlined,
  GoogleOutlined,
} from '@ant-design/icons';

import firebase from '@/utils/firebase'

import { Alert, Space, Tabs, Button } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useIntl, connect, FormattedMessage } from 'umi';
import styles from './index.less';
import Language from '@/locales/index';

const LoginMessage = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login = (props) => {
  const { userLogin = {}, submitting } = props;
  const { status, type: loginType, message } = userLogin;
  const [type, setType] = useState('account');
  const intl = useIntl();

  const handleSubmit = (values) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    });
  };
  const loginGoogle = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      var credential = result.credential;

      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      const { dispatch } = props;
        dispatch({
          type:'login/loginGoogle',
          payload: {
            UserID: user.uid,
            UserType: 'developer',
            UserStatus: 'active',
            DevImage: user.photoURL,
            DevName: user.displayName,
            DevMail: user.email,
            PhoneNumber: user.phoneNumber
          }
        })
      // ...
    }).catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      console.log(errorMessage)
    });
  }
  const loginFacebook = () => {
    var provider = new firebase.auth.FacebookAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        var credential = result.credential;
        console.log(result.user)
        var user = result.user;
        const { dispatch } = props;
        dispatch({
          type:'login/loginFacebook',
          payload: {
            UserID: user.uid,
            UserType: 'developer',
            UserStatus: 'not active',
            DevImage: user.photoURL,
            DevName: user.displayName,
            DevMail: user.email,
            PhoneNumber: user.phoneNumber
          }
        })
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        //var accessToken = credential.accessToken;

        // ...
      })
      .catch((error) => {
      var errorMessage = error.message;
      const { dispatch } = props;
      dispatch({
        type: 'login/changeMessage',
        payload: errorMessage,
      });
    // ...
    });
  }

  return (
    <div className={styles.main}>
      <ProForm
        initialValues={{
          autoLogin: true,
        }}
        submitter={{
          render: (props, dom) => {
            // console.log(props)
            return [<Button loading={submitting} block type="primary" key="submit" onClick={() =>props.form?.submit()}>{Language.home_login}</Button>]
          },
        }}
        onFinish={(values) => {
          handleSubmit(values);
          return Promise.resolve();
        }}
      >
        <Tabs activeKey={type} onChange={setType}>
          <Tabs.TabPane
            key="account"
            tab={intl.formatMessage({
              id: 'pages.login.accountLogin.tab',
            })}
          />
        </Tabs>

        {status === 'error' && loginType === 'account' && !submitting && (
          <LoginMessage
            content={message}
          />
        )}
        {type === 'account' && (
          <>
            <ProFormText
              name="email"
              fieldProps={{
                size: 'large',
                prefix: <UserOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.username.placeholder',
                defaultMessage: 'Enter your email',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.username.required"
                      defaultMessage="Please input your email!"
                    />
                  ),
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: <LockOutlined className={styles.prefixIcon} />,
              }}
              placeholder={intl.formatMessage({
                id: 'pages.login.password.placeholder',
                defaultMessage: 'Enter your password',
              })}
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage
                      id="pages.login.password.required"
                      defaultMessage="Please input your password"
                    />
                  ),
                },
              ]}
            />
          </>
        )}

        {status === 'error' && loginType === 'mobile' && !submitting && (
          <LoginMessage content="" />
        )}
        
        <div
          style={{
            marginBottom: 24,
          }}
        >
          {/* <ProFormCheckbox noStyle name="autoLogin">
            <FormattedMessage id="pages.login.rememberMe" defaultMessage="Remember me" />
          </ProFormCheckbox> */}
          <a
            style={{
              float: 'left',
            }}
            href="/user/forgotPassword"
          >
            <FormattedMessage id="pages.login.forgotPassword" defaultMessage="Forgot password" />
          </a>
          <a
            style={{
              float: 'right',
            }}
            href="/user/register"
          >
            <FormattedMessage id="pages.login.register" defaultMessage={Language.login_doNotHaveAnAccount} />
          </a>
        </div>
      </ProForm>
      <Space className={styles.other}>
        <FormattedMessage id="pages.login.loginWith" defaultMessage="Login with" />
        <FacebookOutlined className={styles.icon} onClick = {()=>{loginFacebook()}} />
        <GoogleOutlined className={styles.icon} onClick = {() => {loginGoogle()}} />
      </Space>
    </div>
  );
};

export default connect(({ login, loading }) => ({
  userLogin: login, 
  submitting: loading.effects['login/login'],
}))(Login);
