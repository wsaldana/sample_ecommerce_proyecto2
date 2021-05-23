import React, { Component } from 'react';
import { auth, firebase } from '../../../config/firebase.config';
import "./settingsUser.css";

export default class settingsUser extends Component {

    constructor(props){
        super(props);
        this.state = {
            disable:true,
            name: auth.currentUser.displayName,
            photo: auth.currentUser.photoURL
        };
    }

    onTodoChangeName(value){
        this.setState({
             name: value
        });
    }

    onTodoChangePhoto(value){
        this.setState({
            photo: value
        });
    }

    updateData = ()=>{
        auth.currentUser.updateProfile({
            displayName: document.getElementById("inputName").value,
            photoURL: document.getElementById("inputPhoto").value
        }).then(()=>{
            alert("Profile was updated");
        }).catch(()=>{
            alert("Something went wrong...");
        });
    }

    render() {
        return (
            <div className="form">
                <div className ="auth-inner">

                    <img id="profilePicture" className="mx-auto d-block" src={auth.currentUser.photoURL} />
                    <h3>USER PROFILE</h3>

                    <label className="label">Name</label>
                    <input 
                        className = "pass form-control" 
                        id = "inputName" 
                        placeholder = "Enter Name" 
                        disabled = {this.state.disable} 
                        value = {this.state.name}
                        onChange={e => this.onTodoChangeName(e.target.value)}
                    />

                    <label className="label">Phone Number</label>
                    <input 
                        className="pass form-control" 
                        id="inputPhoto" 
                        placeholder="There is no photo" 
                        disabled={this.state.disable}
                        value = {this.state.photo ? this.state.photo : ""}
                        onChange={e => this.onTodoChangePhoto(e.target.value)}
                    />
                    
                    <div className="btn-group float-end" id="profileGroupBtns" role="group" aria-label="Basic mixed styles example">
                        <button 
                            className="btn btn-lg btn-primary btn-block" 
                            onClick={()=>this.setState({disable:!this.state.disable})} 
                            aria-pressed={!this.state.disable}
                        >Edit</button>
                        <button 
                            className="btn btn-lg btn-danger btn-block" 
                            onClick={()=>this.updateData() }
                            disabled={this.state.disable}
                        >Save</button>
                    </div>
                    <br/><br/><br/>
                </div>
            </div>
        )
    }
}
