import request from 'umi-request';
import Constant from '@/utils/contants';
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
      url: `${Constant.API}/api/submissions`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': Constant.CORS,
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

export function getInfo() {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      withCredentials: true,
      url: `${Constant.API}/api/developer`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': Constant.CORS,
      },
    };
    axios
    .request(options)
    .then((response) => {
    // handle success
    console.log(response.data)
    resolve(response.data)
    })
    .catch((error) => {
      const message = error?.response?.data?.message;
      tokenHandling(message, resolve, options);
    })
  })
}

export function updateInfo(data) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'PATCH',
      withCredentials: true,
      url: `${Constant.API}/api/developer`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': Constant.CORS,
      },
      data
    };
    axios
    .request(options)
    .then((response) => {
    // handle success
    console.log(response.data)
    resolve(response.data)
    })
    .catch((error) => {
      try {
      const message = error?.response?.data?.message;
      tokenHandling(message, resolve, options);
      }
      catch(e) {
        console.log(error)
      }
    })
  })
}

