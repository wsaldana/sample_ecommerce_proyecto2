import firebase from 'firebase/app'
import "firebase/auth"

const app = firebase.initializeApp({
    apiKey: "AIzaSyAr_nkvj6WR1-6k5hmq1TeekHaF1Tnjimc",
    authDomain: "login-admin-fa1ab.firebaseapp.com",
    projectId: "login-admin-fa1ab",
    storageBucket: "login-admin-fa1ab.appspot.com",
    messagingSenderId: "341356298780",
    appId: "1:341356298780:web:bfcbb189dd058c1eb115d9"
})

export const auth = app.auth()
export default app
