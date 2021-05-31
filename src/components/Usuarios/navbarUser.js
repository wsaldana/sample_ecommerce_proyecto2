import React, { useState, useRef } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { BsChatDots, BsFillChatDotsFill } from 'react-icons/bs';
import { Link, withRouter, useHistory, useLocation } from 'react-router-dom';
import { SidebarData } from './sidebarUser';
import './navbarUser.css';
import { IconContext } from 'react-icons';
import { auth, firebase } from "../../config/firebase.config";
import IdleTimer from 'react-idle-timer';
import './button.css'
import { makeStyles } from '@material-ui/core/styles';



function Navbar(props) {

  const useStyles = makeStyles((theme) => ({
    margin: {
      margin: theme.spacing(1),
    },
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));



  const [sidebar, setSidebar] = useState(false);
  const idleTimerRef = useRef(null)

  const showSidebar = () => setSidebar(!sidebar);

  const history = useHistory();
  const currentLocation = useLocation();

  const showCart = () =>{
    //Se abre o cierra el carrito
    if(currentLocation.pathname !== '/user/cart'){
      history.push('/user/cart');
    }
    else if(currentLocation.pathname === '/user/cart'){
      history.goBack();
      history.goBack();
    }
  }

  const logout = () => {
    auth.signOut().then(()=>{
      props.history.push("/");
      console.log("IDLE orale");
      window.location.reload();
    })
  }

  const [name, setName] = useState("User");
  auth.onAuthStateChanged((user)=>{
    if(user){
      setName(auth.currentUser.displayName.split(" ")[0])
    }
  })

  return (
    <>
    
      <IdleTimer
        ref = {idleTimerRef}
        timeout = {5 * 60 * 1000}
        onIdle = {()=>logout()}
      />
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <Link to='/user/cart' className='menu-cart'>
            <AiIcons.AiOutlineShoppingCart onClick={showCart} />
          </Link>
         
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            <li>
              <div id="userDisplayName">
                <h4 id="displayname">
                  <strong>
                    <FaIcons.FaUserCircle /> 
                    ‎‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎{name}
                  </strong>
                </h4>
              </div>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
                <li className='nav-text'>
                  <button onClick = {() => {
                      auth.signOut().then(()=>{
                        console.log("logout usuario");
                        console.log(auth.currentUser);
                        props.history.push("/");
                        window.location.reload();
                      });
                  }}>
                    <AiIcons.AiOutlineUserDelete />
                    <span>Logout</span>
                  </button>
                </li>

                <button className="floating-button-chat" >
                  <BsFillChatDotsFill
                  size={"50px"}
                  className={"m-0"}/>
                </button>  
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default withRouter(Navbar);