import React from 'react';
import './AppUser.css';
import Navbar from './components/Usuarios/navbarUser';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Settings from './components/paginas/Users/settingsUser';
import Login from './components/Usuarios/Login/Login';
//import Ecommerce from './components/Ecommerce/Ecommerce';
import Shop from './components/Ecommerce/Shop/Shop';
import Cart from './components/Ecommerce/Cart/Cart';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <div>
            <Navbar />
            <Route path='/user/settings' component={Settings} />
            <Route path='/user/shop' component={Shop} />
            <Route path='/user/cart' component={Cart} />
          </div>
        </Switch>
      </Router>
    </>
  );
}

export default App;