import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { SidebarData } from '../Usuarios/sidebar';
import './navbar.css';
import { IconContext } from 'react-icons';
import { auth } from "../../config/firebase.config"
import { loginAdmin } from './someFunctions';

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
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
                    ‎‎‎‏‏‎ ‎‏‏‎ ‎‏‏‎{auth.currentUser.displayName ? auth.currentUser.displayName : auth.currentUser.email}
                  </strong>
                </h4>
              </div>
            </li>
            {SidebarData.map((item, index) => {
              if(item.onclickF){
                return (
                  // eslint-disable-next-line no-unused-expressions
                  <li key={index} className={item.cName} onClick={item.onclickF}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              }else{
                return (
                  <li key={index} className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;