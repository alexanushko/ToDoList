import React from 'react';
import { NavLink } from 'react-router-dom';

export const SidebarProject = ({...props}) => {
    return (
      <NavLink to="/focus" className="sidebar-project">
        <h4 className="sidebar-project-text">{props.project.title}</h4>
      </NavLink>    
    );
}

