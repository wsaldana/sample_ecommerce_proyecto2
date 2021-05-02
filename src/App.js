import React, { Component } from 'react'
import AppAdmin from './AppAdmin';
import AppUser from './AppUser';
import Login from './components/Usuarios/Login/Login';


export default class App extends Component {
    render() {
        return (
            <div>
                <Login />
            </div>
        )
    }
}
