import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import AppAdmin from './AppAdmin';
import AppUser from './AppUser';
import Login from './components/Usuarios/Login/Login';

//firebase config
import { auth } from "./config/firebase.config";

export default class App extends Component {


    SignIn = (email, pass) =>{
        const promise = auth.createUserWithEmailAndPassword(email, pass)
        promise.catch(e => console.log(e.message));
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
                            <Route exact path="/" component={Login} />
                            <Route path="/user" component={AppUser} />
                            <Route path="/admin" component={AppAdmin} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }
}
//<Login credenciales = {this.SignIn} register = {this.RegisterIn}/>
