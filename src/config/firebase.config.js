import firebase from "firebase";

var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebase.firestore()


export {
    auth,
    db,
    firebase
};
