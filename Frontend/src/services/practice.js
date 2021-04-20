import axios from 'axios';
import Cookies from 'js-cookie';
import tokenHandling from './tokenHandling';

export function getPracticeListDetail(id) {
  console.log(Cookies.get('accessToken'));
  return new Promise((resolve, reject) => {
    axios
      .get(`https://codejoy.herokuapp.com/api/practice/${id}`, {
        withCredentials: true,
        headers: {
          'access-control-allow-origin': 'https://devcheckpro.firebaseapp.com/',
          'accessToken': Cookies.get('accessToken')
        },
      })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        const message = error.response.data.message;
        tokenHandling(message, resolve, options);
      });
  });
}
export function getPracticeSet(set) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      withCredentials: true,
      url: `https://codejoy.herokuapp.com/api/practice?set=${set}`,
      headers: {
        'access-control-allow-origin': 'https://devcheckpro.web.app',
        'accessToken': Cookies.get('accessToken') 
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
export function getSubmissionList(pid, uid) {
  uid = 'zcwVw4Rjp7b0lRmVZQt6ZXmspql1'; //chromevi123+1@gmail.com
  return new Promise((resolve, reject) => {
    axios
      .get(`https://codejoy.herokuapp.com/api/practice/submissions?pid=${pid}&uid=${uid}`, {
        withCredentials: true,
        headers: {
          'access-control-allow-origin': 'https://devcheckpro.firebaseapp.com',
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
      });
  });
}
export function saveSubmission(pid, jsonData) {
  let tcPassed = 0;
  let total = 0;

  for (var res of jsonData) {
    total += 1;
    res.status_id == 3 ? (tcPassed += 1) : (tcPassed = tcPassed);
  }
//chromevi123+1@gmail.com
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
      withCredentials: true,
      method: 'POST',
      url: 'https://codejoy.herokuapp.com/api/practice/submissions',
      headers: {
        'access-control-allow-origin': 'https://devcheckpro.firebaseapp.com',
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
        tokenHandling(message, resolve, options);
      });
  });
}
