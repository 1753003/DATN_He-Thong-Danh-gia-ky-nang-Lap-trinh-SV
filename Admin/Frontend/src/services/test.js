import axios from 'axios';
import Cookies from 'js-cookie';

export function getRequest() {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: `http://localhost:5001/admin/test/invalid`,
      /*headers: {
        accessToken: Cookies.get('accessToken'),
      },*/
    };
    axios
      .request(options)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        const message = error.response.data.message;
      });
  });
}

export function acceptRequest(testID, userID) {
    return new Promise((resolve, reject) => {
      var options = {
        method: 'POST',
        url: `http://localhost:5001/admin/test/setvalid/${testID}`,
        data: {
            "userID": userID
        }
        /*headers: {
          accessToken: Cookies.get('accessToken'),
        },*/
      };
      axios
        .request(options)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          const message = error.response.data.message;
        });
    });
  }