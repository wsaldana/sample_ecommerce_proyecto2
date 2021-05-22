import React, { Component } from 'react';
import './settings.css';
import { auth, firebase } from "../../../config/firebase.config";


export default class  Settings extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      currentPassword:"",
      newPassword: "",
    };
  }

  handleSubmit =e =>{
     e.preventDefault();

  };

  // reauth = (currentPassword)  =>{
  //   var user = firebase.auth().currentUser;
  //   var cred = firebase.auth.signInWithEmailAndPassword.credential(user.email,currentPassword);
  //   return user.reauthenticateWithCredential(cred);
  // }

  

  onChangePassword = () =>{

   // this.reauth(this.state.currentPassword).then(() =>{
      var user  = firebase.auth().currentUser;
    user.updatePassword(document.getElementById("inputPassword").value).then(()=>{
      alert("Password was changed");
      console.log('password was changed')
    }).catch((error)=> { console.log(error.message);});
    //}).catch((error) => { console.log(error.message)});


    
  }

  render(){ 
    return (
      
        <div className="form">

        <div className ="auth-inner">    
        <h3>RESET PASSWORD</h3>

              <label className="label">New Password</label>
              <div className = "txt">
              <input className = "pass" id="inputPassword" type = "password" placeholder =  "Enter Password" />
            </div>

        <div className = "btn">
      <button onClick={()=>this.onChangePassword()} >Change Password</button>
      </div>
    </div>
    </div>
    
    );


    }
}
