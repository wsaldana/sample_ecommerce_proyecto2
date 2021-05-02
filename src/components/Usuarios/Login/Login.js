import React from "react";
import './style.css';

class Login extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
    }
  
    render() {
      return (
        <div className="Main_Login">
            <form className="form-signin">
                <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                <label htmlFor="inputEmail" className="sr-only">Email address</label>
                <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus />
                <label htmlFor="inputPassword" className="sr-only">Password</label>
                <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                <div className="checkbox mb-3">
                    <label>
                    </label>
                </div>
                <button className="btn btn-lg btn-primary btn-block btn-user" type="submit">Sign in as User</button>
                <button className="btn btn-lg btn-primary btn-block btn-admin" type="submit">Sign in as Admin</button>
            </form>
        </div>
      );
    }
  }
  
  export default Login;