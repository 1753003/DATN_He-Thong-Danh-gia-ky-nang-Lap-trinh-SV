import request from 'umi-request';
import axios from 'axios';

export function ForgotPassword(email) {
    //console.log(params)
    return new Promise( (resolve, reject) => {
        axios.post('http://localhost:5000/api/auth/forgotPassword', {email: email})
        .then((response) => {
            // handle success
            resolve(response.data)
        })
        .catch((error) => {
            // handle error
               
        })
    })
  }