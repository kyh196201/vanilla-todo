import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/database';

// config
import firebaseConfig from './config';

const initFirebase = () => {
  console.log('firebase initialized!!');

  firebase.initializeApp(firebaseConfig);

  const database = firebase.database();

  return {
    firebase,
    database,
  };
};

export default initFirebase();
