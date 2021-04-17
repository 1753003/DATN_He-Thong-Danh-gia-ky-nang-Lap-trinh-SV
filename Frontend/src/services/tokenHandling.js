import Cookies from 'js-cookie';
import axios from 'axios';

export default function tokenHandling(status, resolve, options) {
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');
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
      .get(`/api/token/`, { headers: { refreshToken: refreshToken } })
      .then((response) => {
        
        if (response.data.message == 'New access token') {
          const newAccessToken = response.data.data.accessToken;
          Cookies.remove('accessToken');
          Cookies.set('accessToken', newAccessToken, { expires: 1 });

          options.headers.accessToken = newAccessToken;
          
          axios
          .request(options)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            const message = error.response.data.message;
            tokenHandling(message, resolve, options);
          });
        } 
        else if (response.data.message == 'New 2 tokens') {
        
          const newAccessToken = response.data.data.accessToken;
          const newRefreshToken = response.data.data.refreshToken;

          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');

          Cookies.set('accessToken', newAccessToken, { expires: 7 });
          Cookies.set('refreshToken', newRefreshToken, { expires: 7 });
         
          options.headers.accessToken = newAccessToken;
          
          axios
          .request(options)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            const message = error.response.data.message;
            tokenHandling(message, resolve, option);
          });
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