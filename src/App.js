import React, { Component } from 'react'
import AppAdmin from './AppAdmin';
import AppUser from './AppUser';
import Login from './components/Usuarios/Login/Login';

// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyCiIBhxCtGK1HyEbl8tlZmww6R2XOzs_-w",
    authDomain: "usuariosweb-64078.firebaseapp.com",
    projectId: "usuariosweb-64078",
    storageBucket: "usuariosweb-64078.appspot.com",
    messagingSenderId: "174839661815",
    appId: "1:174839661815:web:25d0b439e46f7ea50d7ff2"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default class App extends Component {


    SignIn = (email, pass) =>{
        const auth = firebase.auth();

        const promise = auth.createUserWithEmailAndPassword(email, pass)
        promise.catch(e => console.log(e.message));
    }

    RegisterIn = (email, pass) =>{
        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, pass)
        promise.catch(e => console.log(e.message));
    }

    render() {
        return (
            <div>
                <Login credenciales = {this.SignIn} register = {this.RegisterIn}/>
            </div>
        )
    }
}
