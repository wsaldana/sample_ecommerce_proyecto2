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

  handleSubmit = e => {
     e.preventDefault();
  }

  onChangePassword = () =>{
    auth.currentUser.updatePassword(
        document.getElementById("inputPassword").value
    ).then(()=>{
        alert("Password was changed");
    }).catch((error)=> { 
        alert("Something went wrong...");
        console.log(error.message);
    });
  }

  rename = ()=>{
    auth.currentUser.updateProfile({
      displayName: document.getElementById("inputName").value
    }).then(()=>{
      alert("Display name was changed");
    }).catch(()=>{
      alert("Something went wrong...");
    });
  }

  render(){ 
    return (
      <div className="form">
        <div className ="auth-inner">

            <h3>CHANGE DISPLAY NAME</h3>
            <label className="label">New Name</label>
            <input className = "pass form-control" id="inputName" placeholder = "Enter Name" />
            <button className="btn btn-lg btn-primary btn-block" onClick={()=>this.rename()} >Change Name</button>

            <h3>RESET PASSWORD</h3>
            <label className="label">New Password</label>
            <input className = "pass form-control" id="inputPassword" type = "password" placeholder =  "Enter Password" />
            <button className="btn btn-lg btn-primary btn-block" onClick={()=>this.onChangePassword()} >Change Password</button>

        </div>
      </div>
    );
  }
}
