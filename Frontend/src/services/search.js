import axios from 'axios';
import Cookies from 'js-cookie';
import tokenHandling from './tokenHandling';

export function search(word) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: `http://localhost:5000/api/search?keyword=${word}`,
      headers: {
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
