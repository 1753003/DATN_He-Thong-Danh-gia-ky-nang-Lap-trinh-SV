import axios from 'axios';
import Cookies from 'js-cookie';
import tokenHandling from './tokenHandling';
import Constant from '@/utils/contants';

export function getCollectionList() {
  console.log(Constant);
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: `${Constant.API}/api/creator/collection`,
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
        const message = error;
        tokenHandling(message, resolve, options);
      });
  });
}

export function getCollectionById(id) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'GET',
      url: `${Constant.API}/api/creator/collection/${id}`,
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
        const message = error.response.data.message;
        tokenHandling(message, resolve, options);
      });
  });
}

export function addTestToCollection({ testID, collectionID }) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'POST',
      url: `${Constant.API}/api/creator/collection/addTest`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': Constant.CORS,
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
      url: `${Constant.API}/api/creator/collection`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': Constant.CORS,
      },
      data: {
        CollectionName,
        CollectionDescription,
        CoverImage,
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
        const message = error.response?.data?.message;
        tokenHandling(message, resolve, options);
      });
  });
}

export function editCollection({
  CollectionName,
  CollectionDescription,
  CoverImage,
  CollectionID,
}) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'PATCH',
      url: `${Constant.API}/api/creator/collection`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': Constant.CORS,
      },
      data: {
        collectionID: CollectionID,
        editCollection: {
          CollectionName,
          CollectionDescription,
          CoverImage,
        },
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
        const message = error.response?.data?.message;
        tokenHandling(message, resolve, options);
      });
  });
}

export function removeTestFromCollection({ testID, collectionID }) {
  return new Promise((resolve, reject) => {
    var options = {
      method: 'DELETE',
      url: `${Constant.API}/api/creator/collection/removeTest`,
      headers: {
        accessToken: Cookies.get('accessToken'),
        'access-control-allow-origin': Constant.CORS,
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
      url: `${Constant.API}/api/creator/collection/${CollectionID}`,
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
        const message = error.response.data.message;
        tokenHandling(message, resolve, options);
      });
  });
}
