import Constant from '@/utils/contants';
import axios from 'axios';
import Cookies from 'js-cookie';
import tokenHandling from './tokenHandling';


export function checkSession(data) {
    return new Promise((resolve, reject) => {
      var options = {
        method: 'POST',
        url: `${Constant.API}/api/session/check`,
        headers: {
          accessToken: Cookies.get('accessToken'),
          'access-control-allow-origin': Constant.CORS,
        },
        data
      };
      axios
        .request(options)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          const message = error.response.data.message;
          tokenHandling(message, resolve, options);
        });
    });
  }

  export function deleteSession(TestID) {
    return new Promise((resolve, reject) => {
      var options = {
        method: 'DELETE',
        url: `${Constant.API}/api/session/${TestID}`,
        headers: {
          accessToken: Cookies.get('accessToken'),
          'access-control-allow-origin': Constant.CORS,
        },
      };
      axios
        .request(options)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          const message = error.response.data.message;
          tokenHandling(message, resolve, options);
        });
    });
  }

  export function postSession(data) {
    return new Promise((resolve, reject) => {
      var options = {
        method: 'POST',
        url: `${Constant.API}/api/session`,
        headers: {
          accessToken: Cookies.get('accessToken'),
          'access-control-allow-origin': Constant.CORS,
        },
        data
      };
      axios
        .request(options)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          const message = error.response.data.message;
          tokenHandling(message, resolve, options);
        });
    });
  }