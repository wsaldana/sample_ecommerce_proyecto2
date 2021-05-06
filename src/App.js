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

//firebase config
import {db} from './config/firebase.config';
import Chat from "./components/Chat/Chat/Chat";


export default class App extends Component {


    // SignIn = (email, pass) =>{
    //     const promise = auth.createUserWithEmailAndPassword(email, pass)
    //     promise.catch(e => console.log(e.message));
    // }
    //
    // RegisterIn = (email, pass) => {
    //     const promise = auth.signInWithEmailAndPassword(email, pass)
    //     promise.catch(e => console.log(e.message));
    // }

    render() {
        return (
            <div>
                <Chat chatId="3U1KybtBjT3DSRcx6xjl" />
            </div>
        )
    }
}
