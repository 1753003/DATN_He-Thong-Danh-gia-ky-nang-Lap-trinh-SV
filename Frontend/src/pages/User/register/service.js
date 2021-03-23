import request from 'umi-request';
import axios from 'axios';

export function Register(params) {
  console.log(params)
  return new Promise( (resolve, reject) => {
      axios.post('http://localhost:5000/api/auth/signup', params)
      .then((response) => {
          // handle success
          resolve(response.data)
      })
      .catch((error) => {
          // handle error
         
      })
  })
}

export function ConfirmEmail(params) {
  console.log(params)
  return new Promise( (resolve, reject) => {
      axios.post('http://localhost:5000/api/auth/confirmEmail', params)
      .then((response) => {
          // handle success
          resolve(response.data)
      })
      .catch((error) => {
          // handle error
             
      })
  })
}

export function ConfirmCode(code, uid) {
    //console.log(params)
    return new Promise( (resolve, reject) => {
        axios.post('http://localhost:5000/api/auth/confirmCode', {code: code, uid: uid})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
               
        })
    })
  }