import Constant from '@/utils/constants';
import request from '@/utils/request';
import axios from 'axios';
import Cookies from 'js-cookie';
import tokenHandling from './tokenHandling';
export async function query() {
  return request(`${Constant.API}/api/users`);
}
export async function queryCurrent() {
  return request(`${Constant.API}/api/currentUser`);
}
export async function queryNotices() {
  return null;
}
export function queryInviteList(id) {
  return [
    {
      testName:"Multiple Variables",
      testID: 1,
      author: "Mr.A"
    },
    {
      testName:"Multhahahhaaiple Variables",
      testID: 2,
      author: "Mr.A"
    },
    {
      testName:"i dunno Variables",
      testID: 3,
      author: "Mr.A"
    },
    {
      testName:"you're tirght Variables",
      testID: 4,
      author: "Mr.A"
    },
    {
      testName:"DOntkey Variables",
      testID: 5,
      author: "Mr.A"
    },
    {
      testName:"Nerve Variables",
      testID: 6,
      author: "Mr.A"
    },
    {
      testName:"Random Variables",
      testID: 7,
      author: "Mr.A"
    },
  ]
  // return new Promise((resolve, reject) => {
  //   var options = {
  //     method: 'GET',
  //     withCredentials: true,
  //     url: `${Constant.API}/api/practice/${id}`,
  //     headers: {
  //       'access-control-allow-origin': Constant.CORS,
  //       accessToken: Cookies.get('accessToken'),
  //     },
  //   };
  //   axios
  //     .request(options)
  //     .then((response) => {
  //       resolve(response.data);
  //     })
  //     .catch((error) => {
  //       const message = error.response.data.message;
  //       tokenHandling(message, resolve, options);
  //     });
  // });
}
