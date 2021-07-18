import Constant from '@/utils/constants';
import axios from 'axios';
import Cookies from 'js-cookie';
import jwt from 'jwt-decode'
import tokenHandling from './tokenHandling';
export async function getUid() {
  const token = Cookies.get('accessToken');
  const user = jwt(token);
  return user.uid;
}
export function queryInviteList(id) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      withCredentials: true,
      url: `${Constant.API}/api/developer/invite`,
      headers: {
        'access-control-allow-origin': Constant.CORS,
        accessToken: Cookies.get('accessToken'),
      },
    };
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
