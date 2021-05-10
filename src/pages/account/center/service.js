import request from 'umi-request';

import axios from 'axios'
import tokenHandling from '../../../services/tokenHandling';
import Cookies from 'js-cookie';
export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function queryFakeList(params) {
  return request('/api/fake_list', {
    params,
  });
}

export function getHistory() {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      withCredentials: true,
      url: `localhost:5000/api/submissions`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': 'localhost:8001',
      },
    };
    axios
    .request(options)
    .then((response) => {
    // handle success
    // console.log(response.data)
    resolve(response.data)
    })
    .catch((error) => {
      const message = error.response.data.message;
      tokenHandling(message, resolve, options);
    })
  })
}
