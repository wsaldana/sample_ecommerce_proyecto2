import { auth } from "../../config/firebase.config"

const logout = () =>{
    auth.signOut().then(() => {
        console.log('sign out')
        window.location.reload();
    })
}

const loginAdmin = (username,password, props) => {
    console.log(username, password)
    auth
    .signInWithEmailAndPassword(username, password)
    .then(userCredential => {
      console.log('sign up')
    }).catch((error) => {
        var errorMessage = error.message;
        alert(errorMessage)
    });

}

export {loginAdmin,
        logout}