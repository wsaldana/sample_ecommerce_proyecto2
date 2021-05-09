import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import AppAdmin from './AppAdmin';
import AppUser from './AppUser';
import Login from './components/Usuarios/Login/Login';
import Ecommerce from './components/Ecommerce/Ecommerce';

//firebase config
import { auth } from "./config/firebase.config";

export default class App extends Component {

    gmailLog = () => {
        console.log("simon");
        var provider = auth.GoogleAuthProvider();
        auth().signInWithRedirect(provider)

        auth().getRedirectResult().then((result => {
            if (result.credential) {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;
          
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // ...

                auth().createUserWithEmailandPassword(result.user, result.password)                
              }
        }))
    }

    RegisterIn = (email, pass) => {
        const promise = auth.signInWithEmailAndPassword(email, pass)
        promise.catch(e => console.log(e.message));
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <Switch>
                            <Route exact path="/" render={(props) => <Login log = {() => this.gmailLog}/>}/>
                            <Route path="/user" component={AppUser} />
                            <Route path="/admin" component={AppAdmin} />
                            <Route path='/shop' component={Ecommerce} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}
//<Login credenciales = {this.SignIn} register = {this.RegisterIn}/>
