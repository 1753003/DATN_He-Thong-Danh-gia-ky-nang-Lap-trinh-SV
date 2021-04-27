import Constant from '@/utils/contants';
import axios from 'axios';
import Cookies from 'js-cookie';

export function getReportList() {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: `${Constant.API}/api/creator/report/getList`,
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

export function getSummaryReport(id) {
  console.log(id);
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: `${Constant.API}/api/creator/report/summary/${id}`,
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

export function getSummaryUser(id) {
  console.log(id);
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: `${Constant.API}/api/creator/report/user/${id}`,
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
