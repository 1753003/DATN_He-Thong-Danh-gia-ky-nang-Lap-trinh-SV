import Constant from '@/utils/constants';
import axios from 'axios';
import Cookies from 'js-cookie';
import tokenHandling from './tokenHandling';

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
        const message = error.response?.data.message;
        tokenHandling(message, resolve, options);
        reject();
      });
  });
}

export function getUserReport({ reportID, username }) {
  console.log(reportID);
  console.log(username);
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${Constant.API}/api/creator/report/user/${reportID}`,
        {
          username,
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

export function getUserCodeCompare({ reportID, username }) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        `${Constant.API}/api/creator/report/compare/${reportID}`,
        {
          username,
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
        const message = error.response?.data.message;
        tokenHandling(message, resolve, options);
        reject();
      });
  });
}

export function getSummaryUser(id) {
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
        const message = error.response?.data.message;
        tokenHandling(message, resolve, options);
        reject();
      });
  });
}

export function getSummaryQuestion(id) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: `${Constant.API}/api/creator/report/question/${id}`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': Constant.CORS,
      },
    };

    axios
      .request(options)
      .then((response) => {
        // handle success
        resolve(response);
      })
      .catch((error) => {
        // handle error
        const message = error.response?.data.message;
        tokenHandling(message, resolve, options);
        reject();
      });
  });
}
