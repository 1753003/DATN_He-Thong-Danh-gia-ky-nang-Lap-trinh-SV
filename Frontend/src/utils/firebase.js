import firebase from 'firebase'
const firebaseConfig = {
  apiKey: "AIzaSyC_FKi-svb2idZpvqsfPFWASeHUS60O9eU",
  authDomain: "devcheckpro.firebaseapp.com",
  databaseURL: "https://devcheckpro-default-rtdb.firebaseio.com",
  projectId: "devcheckpro",
  storageBucket: "devcheckpro.appspot.com",
  messagingSenderId: "594608048066",
  appId: "1:594608048066:web:19c6fa43c0bda71581f85b",
  measurementId: "G-FW4QVM78E7"
};

firebase.initializeApp(firebaseConfig);

export default firebase;