import Constant from '@/utils/constants';
import axios from 'axios';
import Cookies from 'js-cookie';
import tokenHandling from './tokenHandling';

export function getTestList() {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: `${Constant.API}/api/creator/test`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': Constant.CORS,
      },
    };
    axios
      .request(options)
      .then((response) => {
        // handle success
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        const message = error.response?.data.message;
        tokenHandling(message, resolve, options);
      });
  });
}
export function getTestIdByCode(code) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: `${Constant.API}/api/test/code/${code}`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': Constant.CORS,
      },
    };
    axios
      .request(options)
      .then((response) => {
        // handle success
        console.log('test', response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        const message = error.response?.data.message;
        tokenHandling(message, resolve, options);
      });
  });
}
export function getTestById(id) {
  console.log(id);
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: `${Constant.API}/api/creator/test/${id}`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': Constant.CORS,
      },
    };
    axios
      .request(options)
      .then((response) => {
        // handle success
        // console.log(response.data)
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        const message = error.response?.data.message;
        tokenHandling(message, resolve, options);
        reject();
      });
  });
}
export function getTestInformationById(id) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: `${Constant.API}/api/test/information/${id}`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': Constant.CORS,
      },
    };
    axios
      .request(options)
      .then((response) => {
        // handle success
        // console.log(response.data)
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        const message = error.response?.data.message;
        tokenHandling(message, resolve, options);
        reject();
      });
  });
}
export function createNewTest({ generalInformation, listQuestion, onSuccess, onFailure }) {
  return new Promise((resolve, reject) => {
    let listEmail = [];
    console.log(listQuestion);
    if (generalInformation.listEmail) {
      listEmail = [...generalInformation?.listEmail];
      delete generalInformation.listEmail;
    }

    axios
      .post(
        `${Constant.API}/api/creator/test`,
        {
          generalInformation,
          listQuestion,
          listEmail,
        },
        {
          headers: { accessToken: Cookies.get('accessToken') },
          'access-control-allow-origin': Constant.CORS,
        },
      )
      .then((response) => {
        // handle success
        console.log(response.data);
        onSuccess(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        console.log(error);
        onFailure();
        reject();
      });
  });
}

export function deleteTest({ generalInformation, listQuestion, onSuccess, onFailure }) {
  return new Promise((resolve, reject) => {
    resolve();
    // axios
    //   .post(
    //     `${Constant.API}/api/creator/test`,
    //     {
    //       generalInformation,
    //       listQuestion,
    //     },
    //     {
    //       headers: { accessToken: Cookies.get('accessToken') },
    //       'access-control-allow-origin': Constant.CORS,
    //     },
    //   )
    //   .then((response) => {
    //     // handle success
    //     console.log(response.data);
    //     onSuccess();
    //     resolve(response.data);
    //   })
    //   .catch((error) => {
    //     // handle error
    //     console.log(error);
    //     onFailure();
    //     reject();
    //   });
  });
}

export function updateEditedTest({ generalInformation, listQuestion, id, onSuccess, onFailure }) {
  return new Promise((resolve, reject) => {
    console.log(generalInformation);
    delete generalInformation.listEmail;
    console.log(listQuestion);
    axios
      .patch(
        `${Constant.API}/api/creator/test/${id}`,
        {
          generalInformation,
          listQuestion,
        },
        {
          headers: { accessToken: Cookies.get('accessToken') },
          'access-control-allow-origin': Constant.CORS,
        },
      )
      .then((response) => {
        // handle success
        onSuccess();
        console.log(response.data);

        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        onFailure();
        console.log(error);
        reject();
      });
  });
}

export function postSubmission(data) {
  console.log('ABX');
  return new Promise((resolve, reject) => {
    var options = {
      method: 'POST',
      url: `${Constant.API}/api/submissions/test`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': Constant.CORS,
      },
      data,
    };
    axios
      .request(options)
      .then((response) => {
        // handle success
        // console.log(response.data)
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        const message = error.response?.data.message;
        tokenHandling(message, resolve, options);
        reject();
      });
  });
}

export function checkSubmission(testID) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: `${Constant.API}/api/submissions/check/${testID}`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': Constant.CORS,
      },
    };
    axios
      .request(options)
      .then((response) => {
        // handle success
        // console.log(response.data)
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        const message = error.response?.data.message;
        tokenHandling(message, resolve, options);
        reject();
      });
  });
}

export function getTestBankList() {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: `${Constant.API}/api/creator/bank`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': Constant.CORS,
      },
    };
    axios
      .request(options)
      .then((response) => {
        // handle success
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        const message = error.response?.data.message;
        tokenHandling(message, resolve, options);
      });
  });
}

export function getTestBankById(id) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: `${Constant.API}/api/creator/bank/${id}`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': Constant.CORS,
      },
    };
    axios
      .request(options)
      .then((response) => {
        // handle success
        // console.log(response.data)
        resolve(response.data);
      })
      .catch((error) => {
        // handle error
        const message = error.response?.data.message;
        tokenHandling(message, resolve, options);
        reject();
      });
  });
}
