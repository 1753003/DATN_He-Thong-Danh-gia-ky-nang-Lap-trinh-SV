import axios from 'axios';
import Cookies from 'js-cookie';
import { history } from 'dva';

function tokenHandling(status, api, method, resolve) {
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');
  console.log(status);
  if (status == 'Access token not found.') {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('antd-pro-authority');
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    window.location.href = '/user/login?errorCode=1';
  }
  if (status == 'Refresh token not found.') {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('antd-pro-authority');
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
    window.location.href = '/user/login?errorCode=2';
  }
  if (status == 'Invalid access token.') {
    axios
      .get(`http://localhost:5000/api/token/`, { headers: { refreshToken: refreshToken } })
      .then((response) => {
        console.log(response);
        if (response.data.message == 'New access token') {
          const newAccessToken = response.data.data.accessToken;
          Cookies.remove('accessToken');
          Cookies.set('accessToken', newAccessToken, { expires: 1 });
        } else if (response.data.message == 'New 2 tokens') {
          const newAccessToken = response.data.data.accessToken;
          const newRefreshToken = response.data.data.refreshToken;

          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');

          Cookies.set('accessToken', newAccessToken, { expires: 7 });
          Cookies.set('refreshToken', newRefreshToken, { expires: 7 });
          console.log(method)
          if (method == 'GET') {
            axios
              .get(api, {
                headers: {
                  accessToken: Cookies.get('accessToken'),
                },
              })
              .then((response) => {
                console.log("ABC")
                resolve(response.data);
              })
              .catch((error) => {
                const message = error.response.data.message;
                tokenHandling(message, `http://localhost:5000/api/practice/${id}`, 'GET');
              });
          }
        } else if (response.data.message == 'Wrong refresh token') {
          localStorage.removeItem('currentUser');
          localStorage.removeItem('antd-pro-authority');
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          window.location.href = '/user/login?errorCode=3';
        }
      })
      .catch((error) => {
        
      });
  }
}
export function getPracticeListDetail(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:5000/api/practice/${id}`, {
        headers: {
          accessToken: Cookies.get('accessToken'),
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        const message = error.response.data.message;
        tokenHandling(message, `http://localhost:5000/api/practice/${id}`, 'GET', resolve);
      });
  });
}
export function getPracticeSet(set) {
  return new Promise((resolve, reject) => {
  axios.get(`http://localhost:5000/api/practice?set=${set}`, {
    headers: {
      'accessToken': Cookies.get('accessToken')
    }
    })
    .then((response) => {
    // handle success
    // console.log(response.data)
    resolve(response.data)
    })
    .catch((error) => {
    // handle error
    console.log(error)
    })
  })
}
export function getSubmissionList(pid, uid) {
  uid = 'zcwVw4Rjp7b0lRmVZQt6ZXmspql1'; //chromevi123+1@gmail.com
  return new Promise((resolve, reject) => {
    axios
      .get(`http://localhost:5000/api/practice/submissions?pid=${pid}&uid=${uid}`, {
        headers: {
          accessToken: Cookies.get('accessToken'),
        },
      })
      .then((response) => {
        // handle success
        // console.log(response.data)
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        const message = error.response.data.message;
        tokenHandling(message);
        console.log(error);
      });
  });
}

export function saveSubmission(pid, uid, jsonData) {
  let tcPassed = 0;
  let total = 0;
  console.log('afslkdfnm,xcvnksajdtoireatjtlkasdfglkasda', jsonData);
  for (var res of jsonData) {
    total += 1;
    res.status_id == 3 ? (tcPassed += 1) : (tcPassed = tcPassed);
  }
  uid = 'zcwVw4Rjp7b0lRmVZQt6ZXmspql1'; //chromevi123+1@gmail.com
  const submission = {
    SubmissionType: 'Coding',
    PracticeID: pid,
    CorrectPercent: Number((tcPassed / total).toFixed(4)) * 100,
    DoingTime: '100',
    Score: Number(tcPassed / total) * 100,
    Answer: JSON.stringify(jsonData),
    AnsweredNumber: 1,
  };
  return new Promise((resolve, reject) => {
    var options = {
      method: 'POST',
      url: 'http://localhost:5000/api/practice/submissions',
      headers: {
        accessToken: Cookies.get('accessToken'),
        refreshToken: Cookies.get('refreshToken'),
      },
      data: submission,
    };
    // console.log('sendcode')
    axios
      .request(options)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        const message = error.response.data.message;
        tokenHandling(message);
        console.error(error);
      });
  });
}
