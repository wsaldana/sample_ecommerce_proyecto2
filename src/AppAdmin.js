import React from 'react';
import './AppAdmin.css';
import Navbar from './components/Usuarios/navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/paginas/Admin/home';
import Reports from './components/paginas/Admin/reports';
import Settings from './components/paginas/Admin/settings';
import Logout from './components/paginas/Admin/logout';
import Login from './components/Usuarios/Login/Login';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <div>
            <Navbar />
            <Route path='/admin' exact component={Home} /> 
            <Route path='/reports' component={Reports} />
            <Route path='/settings' component={Settings} />
            <Route path='/logout' component={Logout} />
          </div>
        </Switch>
      </Router>
    </>
  );
}

export default App;