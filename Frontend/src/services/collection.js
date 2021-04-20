import axios from 'axios';
import Cookies from 'js-cookie';
import tokenHandling from './tokenHandling';

export function getCollectionList() {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: `https://codejoy.herokuapp.com/api/creator/collection`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': 'https://devcheckpro.web.app/',
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
        const message = error.response.data.message;
        tokenHandling(message, resolve, options);
      });
  });
}

export function getCollectionById(id) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: `https://codejoy.herokuapp.com/api/creator/collection/${id}`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': 'https://devcheckpro.web.app/',
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
        const message = error.response.data.message;
        tokenHandling(message, resolve, options);
      });
  });
}

export function addTestToCollection({ testID, collectionID }) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'POST',
      url: `https://codejoy.herokuapp.com/api/creator/collection/addTest`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': 'https://devcheckpro.web.app/',
      },
      data: {
        testID,
        collectionID: parseInt(collectionID),
      }
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
        const message = error.response.data.message;
        tokenHandling(message, resolve, options);
      });
  });
}

export function createNewCollection({ CollectionName, CollectionDescription, CoverImage }) {
  
  return new Promise((resolve, reject) => {
    var options = {
      method: 'POST',
      url: `https://codejoy.herokuapp.com/api/creator/collection`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': 'https://devcheckpro.web.app/',
      },
      data: {
        CollectionName,
          CollectionDescription,
          CoverImage,
      }
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
        const message = error.response.data.message;
        tokenHandling(message, resolve, options);
      });
  });
}

export function removeTestFromCollection({ testID, collectionID }) {
  console.log(testID, collectionID);
  return new Promise((resolve, reject) => {
    var options = {
      method: 'DELETE',
      url: `https://codejoy.herokuapp.com/api/creator/collection/removeTest`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': 'https://devcheckpro.web.app/',
      },
      data: {
        testID,
        collectionID: parseInt(collectionID),
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
        const message = error.response.data.message;
        tokenHandling(message, resolve, options);
      });
  });
}

export function deleteCollection({ CollectionID }) {
  console.log(CollectionID);
  return new Promise((resolve, reject) => {
    var options = {
      method: 'DELETE',
      url: `/api/creator/collection/${CollectionID}`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': 'https://devcheckpro.web.app/',
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
        const message = error.response.data.message;
        tokenHandling(message, resolve, options);
      });
  });
}
