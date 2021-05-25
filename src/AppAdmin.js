import React from 'react';
import './AppAdmin.css';
import Navbar from './components/Usuarios/navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/paginas/Admin/home';
import Reports from './components/paginas/Admin/reports';
import Settings from './components/paginas/Admin/settings';
import Logout from './components/paginas/Admin/logout';
import Login from './components/Usuarios/Login/Login';
import EcommerceAdmin from './components/Ecommerce/ShopAdmin/ShopAdmin';
import AddForm from './components/Ecommerce/ShopAdmin/FormAdd';
import EditForm from './components/Ecommerce/ShopAdmin/FormEdit';

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
            <Route path='/admin/addProduct' component={AddForm} />
            <Route path='/admin/shop' component={EcommerceAdmin}/>
          </div>
        </Switch>
      </Router>
    </>
  );
}

export default App;