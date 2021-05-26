import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { auth } from "./config/firebase.config";

function isLogin() {
    if(auth.currentUser !== null){
        return true;
    }return false;
}

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/" />
        )} />
    );
};

export default PrivateRoute;