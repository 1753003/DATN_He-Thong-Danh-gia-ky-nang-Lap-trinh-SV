import request from '@/utils/request';
import axios from 'axios';

export function Login(params) {
  return new Promise( (resolve, reject) => {
      axios.post('https://codejoy.herokuapp.com/api/auth/login', params)
      .then((response) => {
          // handle success
          console.log(response.data)
          resolve(response.data)
      })
      .catch((error) => {
          // handle error
          console.log(error)
         
      })
  })
}

export function LoginWithFacebook(params) {
  console.log(params)
  return new Promise( (resolve, reject) => {
      axios.post('https://codejoy.herokuapp.com/api/auth/loginFacebook', params)
      .then((response) => {
          // handle success
          resolve(response.data)
      })
      .catch((error) => {
          // handle error
         
      })
  })
}

export function LoginWithGoogle(params) {
  console.log(params)
  return new Promise( (resolve, reject) => {
      axios.post('https://codejoy.herokuapp.com/api/auth/loginGoogle', params)
      .then((response) => {
          // handle success
          resolve(response.data)
      })
      .catch((error) => {
          // handle error
         
      })
  })
}
export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
