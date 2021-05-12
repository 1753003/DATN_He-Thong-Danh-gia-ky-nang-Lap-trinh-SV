import { resolvePlugin } from '@babel/core';
import axios from 'axios';
import { connect } from 'dva';
import Cookies from 'js-cookie'
const headers = {
  'x-rapidapi-key':'e05f2e82fbmsh521814293fd8497p1c37eejsn41455443ccca',
  // 'x-rapidapi-key':'6a9ce86be5msh47bcde19f6e53cdp175931jsn629e34418bd3',
  'x-rapidapi-host':'judge0-ce.p.rapidapi.com'
  }
export function createSubmission(data) {
 
  return new Promise( (resolve, reject) => {
    var options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions',
      params: {base64_encoded: 'true', fields: '*'},
      headers: headers,
      data
    };
    // console.log('sendcode')
    axios.request(options).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      console.error(error);
    });
  })
}
export function createSubmissionBatch(data) {
  console.log(data)
  return new Promise( (resolve, reject) => {
    var options = {
      method: 'POST',
      url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
      params: {base64_encoded: 'true', fields: '*'},
      headers: headers,
      data
    };
    // console.log('sendcodebatch')
    axios.request(options).then((response) => {
      resolve(response.data)
    }).catch((error) => {
      console.error(error);
    });
  })
}
export function getSubmissionBatch(param) {
  // console.log('getbatch')
  return new Promise( (resolve, reject) => {
    var options = {
      method: 'GET',
      url: 'https://judge0-ce.p.rapidapi.com/submissions/batch',
      params: {
        tokens: param,
        base64_encoded: 'true',
        fields: '*'
      },
      headers
    };
    axios.request(options).then(function (res) {
      let statuses = ""
      res.data.submissions.forEach(element => {
        statuses +=element.status.id+ " "
      });
      if(statuses.includes('1') || statuses.includes('2'))
            resolve(getSubmissionBatch(param))
        else
          resolve(res.data)
    }).catch(function (error) {
      console.error(error);
    });
    
  })
}
  export function saveSubmission(param) {
    // console.log('get')
    return new Promise( (resolve, reject) => {
      var options = {
        method: 'GET',
        url: `https://judge0-ce.p.rapidapi.com/submissions/${param}`,
        params: {
          base64_encoded: 'true',
          fields: '*'
        },
        headers
      };
      axios.request(options).then(function (res) {
        if("In Queue Processing".includes(res.data.status.description))
              resolve(getSubmission(param))
          else
            resolve(res.data)
      }).catch(function (error) {
        console.error(error);
      });
      
    })
}


export function getSubmission(param) {
  // console.log('get')
  return new Promise( (resolve, reject) => {
    var options = {
      method: 'GET',
      url: `https://judge0-ce.p.rapidapi.com/submissions/${param}`,
      params: {
        base64_encoded: 'true',
        fields: '*'
      },
      headers
    };
    axios.request(options).then(function (res) {
      if("In Queue Processing".includes(res.data.status.description))
            resolve(getSubmission(param))
        else
          resolve(res.data)
    }).catch(function (error) {
      console.error(error);
    });
    
  })
}