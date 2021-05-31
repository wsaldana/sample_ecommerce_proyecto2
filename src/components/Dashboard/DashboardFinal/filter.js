import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import './dropdown.css'
import Ranking from './ranking';
import ChatReport from './ChatReport'
import All from './dash'
import VentasChart from './ventasChart'

export default function Dropdown(){
    return(
        <Router>
            <div class="dropdown-container">
            <label for="openDropdown" class="dropdown">
             Graficas
            <i class="fas fa-angle-down"></i>
            </label>
            <input type="checkbox" id="openDropdown" hidden/>

            <div class="dropdown-menu">
            <span><Link className="rank"to="/Dashboard">Dashboard</Link></span>
                <span>
            <Link className="rank"to="/Rankings">Rankings</Link>
            </span>
            <span><Link className="rank"to="/Chats">Chats</Link></span>
            
            <span><Link className="rank"to="/Ventas">Ventas</Link></span>
            </div>
            </div>

            <Switch>
                <Route path="/Rankings">
                    <Ranking/>
                </Route>
                <Route path="/Chats">
                    <ChatReport/>
                </Route>
                <Route path="/Dashboard">
                    <All/>
                </Route>
                <Route path="/Ventas">
                    <VentasChart/>
                </Route>
            </Switch>
        </Router>
    )
}