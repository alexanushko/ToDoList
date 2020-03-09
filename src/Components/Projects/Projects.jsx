import React from 'react';

import { Project } from './Project';
import { AddEditForm } from '../AddEditForm/AddEditForm';

export class Projects extends React.Component{
  state = {
    projectToAddOrEdit: false,
    isEdit: false,
    idToEdit: 0
  }

  render(){
    const projects = this.props.projects;
    const {isEdit} = this.state;

    console.log('Projects: ',projects);  

    if (this.state.projectToAddOrEdit){
      return (
        <AddEditForm

          onEdit={isEdit}
          
          toAdd={(title, description) => {

            this.props.addProject(projects, title, description);

            this.setState({
              projectToAddOrEdit: false
            });
          }}

          projectTitle = {
            (Array.isArray(projects) && projects.length && isEdit) ? (projects.find(project => project.id === this.state.idToEdit).title) : ('')
          }

          projectDescription = {
            (Array.isArray(projects) && projects.length && isEdit) ? (projects.find(project => project.id === this.state.idToEdit).description) : ('')
          }

          onSave={(title, description) => {
            this.props.editProject(projects, this.state.idToEdit, {title, description});

            this.setState({
              projectToAddOrEdit: false,
              isEdit: false,
              idToEdit: 0
            })
          }}

          onCancel={() => this.setState({
            projectToAddOrEdit: false,
            isEdit: false
          })}
        />
      );
    }
  	else if (Array.isArray(projects) && projects.length) {
      return (
        <>
          <div className="App">
            <h1 className="top">Projects:</h1>
            <div className="add-project">
              <span 
                role="img"
                aria-label="add a Project"
                className="add-project-btn"
                onClick={() => this.setState({
                  projectToAddOrEdit: true
                })}
              >➕<span className="add-project-btn-text">Добавить проект</span>
              </span>
            </div>
              {projects.map(project => (
                <Project 
                  key={project.id} 
                  project={project}
                  doneProject={() => this.props.doneProject(projects, project.id, !project.done)}
                  goToDeleteProject={() => this.props.deleteProject(projects, project.id)}
                  goToEditProject={() => this.setState({
                    projectToAddOrEdit: true,
                    isEdit: true,
                    idToEdit: project.id
                  })}
                />
              ))}
            <div className="owner-photo">
              <p>Профиль</p>
            </div>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="App">
          <h1 className="top">Projects:</h1>
          <div className="add-project">
            <span 
              role="img"
              aria-label="add a Project"
              className="add-project-btn"
              onClick={() => this.setState({
                projectToAddOrEdit: true
              })}
            >➕<span className="add-project-btn-text">Добавить проект</span>
            </span>
          </div>
          <div className="owner-photo">
            <p>Профиль</p>
          </div>
          <h2>Самое время добавить проекты!</h2>
        </div>
      </>
    );
  }
}


