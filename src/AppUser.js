import React from 'react';
import './AppUser.css';
import Navbar from './components/Usuarios/navbarUser';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/paginas/Users/homeUser';
import Settings from './components/paginas/Users/settingsUser';
import Logout from './components/paginas/Users/logoutUser';
import Shop from './components/Ecommerce/Shop/Shop';
import Cart from './components/Ecommerce/Cart/Cart';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} /> 
          <Route path='/settings' component={Settings} />
          <Route path='/logout' component={Logout} />
          <Route path='/user/shop' component={Shop} />
          <Route path='/user/cart' component={Cart} />
        </Switch>
      </Router>
    </>
  );
}

export default App;