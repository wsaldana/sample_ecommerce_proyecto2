
import { ScrollView, StyleSheet, Text, View, TextInput, Button, Linking, Alert, } from 'react-native';

import React,{Component} from 'react';
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
    user.updatePassword(this.state.newPassword).then(()=>{
      Alert.alert("Password was changed");
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
              <TextInput className = "pass" type = "password" value ={this.state.newPassword} placeholder =  "Enter Password" 
           secureTextEntry={true} onChangeText={(text) => {this.setState ({newPassword:  text})}} ></TextInput>
            </div>

        <div className = "btn">
      <Button  title="Change Password" onPress={this.onChangePassword} />
      </div>
    </div>
    </div>
    
    );


    }
}
