import firebase from "firebase";

const {
    REACT_APP_FIREBASE_API_KEY,
    REACT_APP_FIREBASE_AUTH_DOMAIN,
    REACT_APP_FIREBASE_PROJECT_ID,
    REACT_APP_FIREBASE_STORAGE_BUCKET,
    REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    REACT_APP_FIREBASE_APP_ID,
    REACT_APP_FIREBASE_MEASUREMENT_ID,
} = process.env;

/*var firebaseConfig = {
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: REACT_APP_FIREBASE_APP_ID,
    measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,
};*/

var firebaseConfig = {
    apiKey: "AIzaSyCiIBhxCtGK1HyEbl8tlZmww6R2XOzs_-w",
    authDomain: "usuariosweb-64078.firebaseapp.com",
    projectId: "usuariosweb-64078",
    storageBucket: "usuariosweb-64078.appspot.com",
    messagingSenderId: "174839661815",
    appId: "1:174839661815:web:25d0b439e46f7ea50d7ff2"
  };

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebase.firestore()


export {
    auth,
    db,
    firebase,
};
