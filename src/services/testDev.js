import axios from 'axios';
import Cookies from 'js-cookie';
import tokenHandling from './tokenHandling';
import Constant from '@/utils/contants';

export function getTestListBySet(set) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${Constant.API}/api/test/set/${set}`, {
        withCredentials: true,
        headers: {
          'access-control-allow-origin': 'https://devcheckpro.web.app/',
          accessToken: Cookies.get('accessToken'),
        },
      })
      .then((response) => {
        console.log(response.data)
        resolve(response.data);
      })
      .catch((error) => {
        const message = error.response.data.message;
        tokenHandling(message, resolve, options);
      });
  });
}