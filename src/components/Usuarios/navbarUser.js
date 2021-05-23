import React, { useState, useRef } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, withRouter } from 'react-router-dom';
import { SidebarData } from './sidebarUser';
import './navbarUser.css';
import { IconContext } from 'react-icons';
import { auth, firebase } from "../../config/firebase.config";
import IdleTimer from 'react-idle-timer';

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);
  const idleTimerRef = useRef(null)

  const showSidebar = () => setSidebar(!sidebar);
  const openCart = () =>{
    //Se abre el carrito
  }

  const logout = () => {
    auth.signOut().then(()=>{
      props.history.push("/");
      console.log("IDLE orale");
      window.location.reload();
    })
  }

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
          <Link to='#' className='menu-cart'>
            <AiIcons.AiOutlineShoppingCart onClick={openCart} />
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
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
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default withRouter(Navbar);