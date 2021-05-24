import React from "react";
import './style.css';
import { auth, firebase } from "../../../config/firebase.config";
import Chat from '../../Chat/Chat/Chat';
class Login extends React.Component {
    constructor(props) {
      super(props);
      this.props = props;
      this.state = { logged:null }
    }

    logear = () =>{
      var provider = new firebase.auth.GoogleAuthProvider();
      auth.signInWithRedirect(provider);
      auth
        .getRedirectResult()
        .then((result) => {
          if (result.credential) {
            /** @type {firebase.auth.OAuthCredential} */
            var credential = result.credential;
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = credential.accessToken;
            console.log(result.operationType)
          }
          // The signed-in user info.
          var user = result.user;
          console.log("simon 2")
        }).catch((error) => {
          console.log("Ha sucedido un error con la conexión")
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
        });
    }

    async loginAdmin(username,password){
      try {
          // CAMBIAR VALIDACION POR CONSULTA DE FIREBASE
          const endpoint = `http://localhost:5000/api/login?username=${username}&contrasena=${password}`;
          await fetch(endpoint)
              .then(results => results.json())
              .then(json => {
                if(json.login === true){
                  this.setState({logged:true});
                  this.props.history.push('/admin');
                }else{
                  this.setState({logged:false});
                }
              });
       } catch (e) {
           console.error(e);
       } 
    }

    render() {
      return (<Chat chatId="3U1KybtBjT3DSRcx6xjl"/>);
    }
  }
  
  export default Login;