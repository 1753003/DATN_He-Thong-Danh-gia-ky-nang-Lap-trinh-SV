import request from '@/utils/request';
import axios from 'axios';

export function Login(params) {
  return new Promise( (resolve, reject) => {
      axios.post('http://localhost:5000/api/auth/login', params)
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
