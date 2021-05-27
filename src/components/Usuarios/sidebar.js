import React from 'react';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import { logout } from './someFunctions'

export const SidebarData = [
  {
    title: 'Home',
    path: '/admin/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
  {
    title: 'Reports',
    path: '/admin/reports',
    icon: <IoIcons.IoIosPaper />,
    cName: 'nav-text'
  },
  {
    title: 'Shop',
    path: '/admin/shop',
    icon: <AiIcons.AiFillShopping />,
    cName: 'nav-text'    
  },
  {
    title: 'Settings',
    path: '/admin/settings',
    icon: <AiIcons.AiTwotoneSetting />,
    cName: 'nav-text'
  },
  {
    title: 'LogOut',
    path: '/',
    icon: <AiIcons.AiOutlineUserDelete />,
    cName: 'nav-text',
    onclickF: logout
  },
  
  
];