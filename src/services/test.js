import Constant from '@/utils/contants';
import axios from 'axios';
import Cookies from 'js-cookie';

export function getTestList() {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: `${Constant.API}/api/creator/test`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': Constant.CORS,
      },
    };
    axios
      .request(options)
      .then((response) => {
        // handle success
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        const message = error.response.data.message;
        tokenHandling(message, resolve, options);
      });
  });
}

export function getTestById(id) {
  console.log(id);
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: `${Constant.API}/api/creator/test/${id}`,
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
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        const message = error.response.data.message;
        tokenHandling(message, resolve, options);
      });
  });
}

export function createNewTest({ generalInformation, listQuestion }) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${Constant.API}/api/creator/test`,
        {
          generalInformation,
          listQuestion,
        },
        {
          headers: { accessToken: Cookies.get('accessToken') },
          'access-control-allow-origin': Constant.CORS,
        },
      )
      .then((response) => {
        // handle success
        console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
        reject();
      });
  });
}
