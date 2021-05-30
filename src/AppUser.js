import React from 'react';
import './AppUser.css';
import Navbar from './components/Usuarios/navbarUser';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Settings from './components/paginas/Users/settingsUser';
import Logout from './components/paginas/Users/logoutUser';
import Login from './components/Usuarios/Login/Login';
import Shop from './components/Ecommerce/Shop/Shop';
import Cart from './components/Ecommerce/Cart/Cart';
import Receipt from './components/Ecommerce/Receipt/Receipt';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Reports from './components/Usuarios/button';

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
            <Route path='/logout' component={Logout} />
            <Route path='/user/receipt' component={Receipt} />
          </div>
        </Switch>
      </Router>

      
    </>
  );
}

export default App;