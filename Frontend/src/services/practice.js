import axios from 'axios';
import Cookies from 'js-cookie'

export function getPracticeListDetail(id) {
  return new Promise((resolve, reject) => {
  axios.get(`http://localhost:5000/api/practice/${id}`, {
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
  uid ='zcwVw4Rjp7b0lRmVZQt6ZXmspql1' //chromevi123+1@gmail.com
  return new Promise((resolve, reject) => {
  axios.get(`http://localhost:5000/api/practice/submissions?pid=${pid}&uid=${uid}`, {
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

export function saveSubmission(pid, uid, jsonData) {
  let tcPassed = 0;
  let total = 0
  console.log('afslkdfnm,xcvnksajdtoireatjtlkasdfglkasda',jsonData)
  for(var res of jsonData){
    total +=1;
    res.status_id == 3 ? tcPassed +=1: tcPassed=tcPassed;
  };
  uid ='zcwVw4Rjp7b0lRmVZQt6ZXmspql1' //chromevi123+1@gmail.com
  const submission = {
    'SubmissionType':'Coding',
    'PracticeID':pid,
    'CorrectPercent': Number((tcPassed/total).toFixed(4))*100,
    'DoingTime':'100',
    "Score":Number((tcPassed/total))*100,
    'Answer':JSON.stringify(jsonData),
    'AnsweredNumber':1
  }
  return new Promise((resolve, reject) => {
    var options = {
      method: 'POST',
      url: 'http://localhost:5000/api/practice/submissions',
      headers: {
        'accessToken': Cookies.get('accessToken'),
        'refreshToken': Cookies.get('refreshToken')
      },
      data:submission
    };
    // console.log('sendcode')
    axios.request(options).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      console.error(error);
    });
  
  })
}