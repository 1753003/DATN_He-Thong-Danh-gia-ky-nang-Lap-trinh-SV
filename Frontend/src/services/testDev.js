import axios from 'axios';
import Cookies from 'js-cookie';
import tokenHandling from './tokenHandling';
import Constant from '@/utils/constants';

export function getTestListBySet(set) {
  return new Promise((resolve, reject) => {
      var options = {
        method: 'GET',
        withCredentials: true,
        url: `${Constant.API}/api/test/set/${set}`,
        headers: {
          'access-control-allow-origin': Constant.CORS,
          accessToken: Cookies.get('accessToken'),
        },
      };
      axios
        .request(options)
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

export function getRanking(testID) {
  console.log("service")
  return new Promise((resolve, reject) => {
      var options = {
        method: 'GET',
        withCredentials: true,
        url: `${Constant.API}/api/test/ranking/${testID}`,
        headers: {
          'access-control-allow-origin': Constant.CORS,
          accessToken: Cookies.get('accessToken'),
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