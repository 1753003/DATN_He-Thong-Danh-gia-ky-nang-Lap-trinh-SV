import request from 'umi-request';
import axios from 'axios';

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export function Register(params) {
  console.log(params)
  return new Promise( (resolve, reject) => {
      axios.post('http://localhost:5000/api/auth/signup', params)
      .then((response) => {
          // handle success
          resolve(response.data)
      })
      .catch((error) => {
          // handle error
         
      })
  })
}
