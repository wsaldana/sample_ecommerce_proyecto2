import React from 'react';
import * as AiIcons from 'react-icons/ai';

export const SidebarData = [
  {
    title: 'Home',
    path: '/user',
    icon: <AiIcons.AiFillShopping />,
    cName: 'nav-text'
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <AiIcons.AiTwotoneSetting />,
    cName: 'nav-text'
  }/*,
  {
    title: 'LogOut',
    path: '/logout',
    icon: <AiIcons.AiOutlineUserDelete />,
    cName: 'nav-text'
  },*/
];