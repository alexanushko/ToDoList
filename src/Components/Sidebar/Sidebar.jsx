import React from 'react';

import {SidebarButton} from './SidebarButton';
import {SidebarProject} from './SidebarProject';

export class Sidebar extends React.Component{

  render(){
    const projects = this.props.projects;

    return (
      <div className="sidebar">
        <SidebarButton to="/inbox" name="Inbox"/>
        <SidebarButton to="/focus" name="Focus"/>
        <SidebarButton to="/" name="Projects:"/>
        {projects.map(project => (
          <SidebarProject 
            key={project.id} 
            project={project}
            isDone={project.done}
          />
        ))}
      </div>
    );
  }
}


