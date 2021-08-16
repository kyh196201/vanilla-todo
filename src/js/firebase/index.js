import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/firestore';

// config
import firebaseConfig from './config';

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export default firebase;
