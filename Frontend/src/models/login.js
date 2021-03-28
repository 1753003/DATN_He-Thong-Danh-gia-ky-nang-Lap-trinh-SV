import { stringify } from 'querystring';
import { history } from 'umi';
import { fakeAccountLogin, Login, LoginWithFacebook, LoginWithGoogle } from '@/services/login';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { message } from 'antd';

const Model = {
  namespace: 'login',
  state: {
    status: undefined,
    message: undefined
  },
  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(Login, payload);    
      if (response.status === 'OK') {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            currentAuthority: response.message.type,
            status: 'ok',
            type: 'account'
          },
        }); // Login successfully
        localStorage.setItem('currentUser',payload.email);
        //Save token into cookie
        var d = new Date();
        d.setTime(d.getTime() + (1*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = "accessToken" + "=" + response.message.accessToken + "; " + expires;
        document.cookie = "refreshToken" + "=" + response.message.refreshToken + "; " + expires;
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('🎉 🎉 🎉  OKELA！');
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
     
        if (response.message.type === "developer")
          history.replace('/developer');
        else
          history.replace('/creator');
      }
      else if (response.status === 'error') {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'error',
            type: 'account',
            message: response.message
          },
        });
      }
    },
    *loginFacebook({ payload }, { call, put }) {
      const response = yield call(LoginWithFacebook, payload);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          currentAuthority: response.type,
          status: 'ok',
          type: 'account'
        },
      }); // Login successfully
      localStorage.setItem('currentUser', payload.DevName);
      localStorage.setItem('imageURL', payload.DevImage);
      //Save token into cookie
      var d = new Date();
      d.setTime(d.getTime() + (1*24*60*60*1000));
      var expires = "expires="+ d.toUTCString();
      document.cookie = "accessToken" + "=" + response.accessToken + "; " + expires;
      document.cookie = "refreshToken" + "=" + response.refreshToken + "; " + expires;
      if (response.status === 'OK') {
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('🎉 🎉 🎉  OKELA！');
        let { redirect } = params;

        console.log(response)
        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }

        if (response.type = "developer")
          history.replace('/developer');
        else
          history.replace('/creator');
      }
    },
    *loginGoogle({ payload }, { call, put }) {
      console.log("ABC");
      const response = yield call(LoginWithGoogle, payload);    
      console.log(response)
      if (response.status === 'OK') {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            currentAuthority: response.message.type,
            status: 'ok',
            type: 'account'
          },
        }); // Login successfully
        localStorage.setItem('currentUser',payload.DevMail);
        //Save token into cookie
        var d = new Date();
        d.setTime(d.getTime() + (1*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = "accessToken" + "=" + response.message.accessToken + "; " + expires;
        document.cookie = "refreshToken" + "=" + response.message.refreshToken + "; " + expires;
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        message.success('🎉 🎉 🎉  OKELA！');
        let { redirect } = params;

        if (redirect) {
          const redirectUrlParams = new URL(redirect);

          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);

            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            window.location.href = '/';
            return;
          }
        }
     
        if (response.message.type === "developer")
          history.replace('/developer');
        else
          history.replace('/creator');
      }
      else if (response.status === 'error') {
        yield put({
          type: 'changeLoginStatus',
          payload: {
            status: 'error',
            type: 'account',
            message: response.message
          },
        });
      }
    },
    logout() {       
        localStorage.removeItem('currentUser');
        localStorage.removeItem('antd-pro-authority');
        var d = new Date();
        d.setTime(d.getTime() - 1);
        var expires = "expires="+ d.toUTCString();
        document.cookie = "accessToken" + "=" + '' + "; " + expires;
        document.cookie = "refreshToken" + "=" + '' + "; " + expires;

        history.replace({
          pathname: '/user/login',
        });
    },
    *changeMessage({payload}, {put}) {
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: 'error',
          type: 'account',
          message: payload
        },
      })
    }
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.currentAuthority);
      return { ...state, status: payload.status, type: payload.type, message: payload.message };
    },
  },
};
export default Model;
