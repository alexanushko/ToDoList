import React from 'react';
import { NavLink } from 'react-router-dom';

export const SidebarButton = ({...props}) => {
    return (
      <NavLink to={props.to} className="sidebar-btn">
        <h3 className="sidebar-btn-text">{props.name}</h3>
      </NavLink>    
    );
}


