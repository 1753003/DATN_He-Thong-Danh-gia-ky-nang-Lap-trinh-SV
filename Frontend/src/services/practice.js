import axios from 'axios';
import Cookies from 'js-cookie'
import {history} from 'dva';

function tokenHandling(status) {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    console.log("handle")
    if (status == 'Access token not found.') {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('antd-pro-authority');
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/user/login?errorCode=1'
        
    }
    if (status == 'Refresh token not found.') {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('antd-pro-authority');
        Cookies.remove('accessToken');
        Cookies.remove('refreshToken');
        window.location.href = '/user/login?errorCode=2'
    }
    if (status == 'Invalid access token.') {
        axios.get(`http://localhost:5000/api/auth/`,
        {headers: {'refreshToken': refreshToken}})
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            console.log(error.response.data.message)
        })
    }
}
export function getPracticeListDetail(id) {
  return new Promise( (resolve, reject) => {
      axios.get(`http://localhost:5000/api/practice/${id}`, {headers:{'accessToken':Cookies.get('accessToken')}})
      .then((response) => {
          // handle success
          console.log(response.data)
          resolve(response.data)
         
      })
      .catch((error) => {
          // handle error
          if (error.response) {
              const message = error.response.data.message;
              tokenHandling(message);
          }
      })
  })
}


