import axios from 'axios';
import Cookies from 'js-cookie';

export function getTestList() {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://codejoy.herokuapp.com/api/creator/test`, {
        headers: { accessToken: Cookies.get('accessToken') },
      })
      .then((response) => {
        // handle success
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        reject();
        console.log(error);
      });
  });
}

export function getTestById(id) {
  console.log(id);
  return new Promise((resolve, reject) => {
    axios
      .get(`https://codejoy.herokuapp.com/api/creator/test/${id}`, {
        headers: { accessToken: Cookies.get('accessToken') },
      })
      .then((response) => {
        // handle success
        // console.log(response.data)
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        reject();
        console.log(error);
      });
  });
}

// export function createNewCollection(payload) {
//   return new Promise((resolve, reject) => {
//     axios
//       .post(`https://codejoy.herokuapp.com/api/creator/collection`, {
//         headers: { accessToken: Cookies.get('accessToken') },
//         body: payload,
//       })
//       .then((response) => {
//         // handle success
//         // console.log(response.data)
//         resolve(response.data);
//       })
//       .catch((error) => {
//         // handle error
//         reject();
//         console.log(error);
//       });
//   });
// }
