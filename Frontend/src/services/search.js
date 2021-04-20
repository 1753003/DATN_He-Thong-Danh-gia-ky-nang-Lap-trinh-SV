import axios from 'axios';
import Cookies from 'js-cookie';
import tokenHandling from './tokenHandling';

export function search(word) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: `https://codejoy.herokuapp.com/api/search?keyword=${word}`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': 'https://devcheckpro.web.app/',
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
