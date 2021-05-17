import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import AppAdmin from './AppAdmin';
import AppUser from './AppUser';
import Login from './components/Usuarios/Login/Login';
import Ecommerce from './components/Ecommerce/Ecommerce';
import Panel from './components/Panel/Panel';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/user" component={AppUser} />
          <Route path="/admin" component={AppAdmin} />
          <Route path='/shop' component={Ecommerce} />
          <Route path='/panel' component={Panel} />
        </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
