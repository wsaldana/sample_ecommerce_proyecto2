import React from "react";
import './style.css';

import { FaSignInAlt } from "react-icons/fa";

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
    }
  
    Credencial = (x, y) =>{
      this.props.credenciales(x, y);
    }

    Registro = (x, y) =>{
      this.props.register(x, y);
    }

    render() {
      return (
        <div className="Main_Login">
            <form className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" defaultValue = "" required />
                <button className="btn btn-lg btn-primary btn-block btn-user" type="submit" onClick = {() => this.Registro(document.getElementById("inputEmail").value, document.getElementById("inputPassword").value)}>Sign in as Admin</button>
                <button className="btn btn-lg btn-primary btn-block btn-admin" type="submit" onClick = {() => this.Credencial(document.getElementById("inputEmail").value, document.getElementById("inputPassword").value)}>
                  <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="gugul"/>
                  </div>
                  <p className="btn-text"><b>Sign in with google</b></p>
                </button>
            </form>
        </div>
      );
    }
  }
  
  export default Login;