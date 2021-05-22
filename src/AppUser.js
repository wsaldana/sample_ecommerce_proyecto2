import React from 'react';
import './AppUser.css';
import Navbar from './components/Usuarios/navbarUser';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/paginas/Users/homeUser';
import Settings from './components/paginas/Users/settingsUser';
import Login from './components/Usuarios/Login/Login';
import Ecommerce from './components/Ecommerce/Ecommerce';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router>
        
        <Switch>
          {/*<Route path='/logout' render={(props) => <Login {...props} logout={true} />}/>*/}
          <Route exact path='/' component={Login} />
          <Navbar />
          <Route path='/settings' component={Settings} />
          <Route path='/home' component={Ecommerce} />
        </Switch>
      </Router>
    </>
  );
}

export default App;