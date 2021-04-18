import axios from 'axios';
import Cookies from 'js-cookie';

export function getTestList() {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/creator/test`, {
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
      .get(`/api/creator/test/${id}`, {
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

export function createNewTest({ generalInformation, listQuestion }) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        'http://localhost:5000/api/creator/test',
        {
          generalInformation,
          listQuestion,
        },
        {
          headers: { accessToken: Cookies.get('accessToken') },
        },
      )
      .then((response) => {
        // handle success
        console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
        reject();
      });
  });
}
