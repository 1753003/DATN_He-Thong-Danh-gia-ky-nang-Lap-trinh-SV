import axios from 'axios';
import Cookies from 'js-cookie';

export function getCollectionList() {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://codejoy.herokuapp.com/api/creator/collection`, {
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

export function getCollectionById(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`https://codejoy.herokuapp.com/api/creator/collection/${id}`, {
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

export function addTestToCollection({ testID, collectionID }) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        'https://codejoy.herokuapp.com/api/creator/collection/addTest',
        {
          testID,
          collectionID: parseInt(collectionID),
        },
        {
          headers: { accessToken: Cookies.get('accessToken') },
        },
      )
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

export function createNewCollection({ CollectionName, CollectionDescription, CoverImage }) {
  console.log(CollectionName, CollectionDescription, CoverImage);
  return new Promise((resolve, reject) => {
    axios
      .post(
        '/api/creator/collection',
        {
          CollectionName,
          CollectionDescription,
          CoverImage,
        },
        {
          headers: { accessToken: Cookies.get('accessToken') },
        },
      )
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

export function removeTestFromCollection({ testID, collectionID }) {
  console.log(testID, collectionID);
  return new Promise((resolve, reject) => {
    axios
      .delete('/api/creator/collection/removeTest', {
        headers: { accessToken: Cookies.get('accessToken') },
        data: {
          testID,
          collectionID: parseInt(collectionID),
        },
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

export function deleteCollection({ CollectionID }) {
  console.log(CollectionID);
  return new Promise((resolve, reject) => {
    axios
      .delete(`/api/creator/collection/${CollectionID}`, {
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
