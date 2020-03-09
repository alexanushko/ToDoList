import React from 'react';

import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import {Projects} from './Components/Projects/Projects';
import {Sidebar} from './Components/Sidebar/Sidebar';
import {Inbox} from './Components/Inbox/Inbox';
import {Focus} from './Components/Focus/Focus';


export class App extends React.Component{
  constructor(props){
    super(props);

    this._collection = props.firestore.collection("/projects");
  }

  state = {
    projects: [],
  };

  componentDidMount(){
    this._collection
      .get()
      .then(snapshot => {
        this.setState({
          projects: snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}))
        });
        }
      );
  };

  doneProject = (projects,id,fieldToUpdate) => {

    const fieldToUpdateOnBase = {done: fieldToUpdate};

    this._collection
    .doc(id)
    .update(fieldToUpdateOnBase);
 
    const indexToChange = projects.map(projects => projects.id).indexOf(id);
    const projectToUpdate = projects[indexToChange];
    const projectCopy = {...projectToUpdate,...{done: fieldToUpdate}};
    const updateProjects = [
      ...projects.slice(0,indexToChange),
      projectCopy,
      ...projects.slice(indexToChange+1)
    ];
    this.setState({projects: updateProjects});
  }

  addProject = (projects, title, description) => {
    

    const projectData = {
      title: title,
      description: description,
      done: false
    };

    this._collection
      .add({...projectData})
      .then(projectDoc => ({
        id: projectDoc.id,
        ...projectData
      }))
      .then(addedProject => (
        this.setState({
          projects: [...projects, addedProject]
        })
      ));
  }

  deleteProject = (projects, projectId) => {

    const projectIndex = projects.findIndex(project => project.id === projectId);

    this._collection
      .doc(projectId)
      .delete();

    this.setState({
      projects: [
      ...projects.slice(0, projectIndex),
      ...projects.slice(projectIndex + 1)
    ]});
  }

  editProject = (projects,id,fieldsToUpdate) => {

    const projectIndex = projects.findIndex(project => project.id === id);
    const projectToUpdate = projects[projectIndex];
    const projectCopy = {...projectToUpdate,...fieldsToUpdate};

    this._collection
      .doc(id)
      .update(fieldsToUpdate);

    const copy = [
      ...projects.slice(0, projectIndex),
      projectCopy,
      ...projects.slice(projectIndex + 1)
    ];

    this.setState({
      projects: copy
    })
  }

  render(){
    return (
      <div className="main-layout">
        <BrowserRouter>
        <Sidebar projects={this.state.projects}/>
          <Switch>
            <Route exact path="/" render={() => <Projects 
              projects={this.state.projects}
              doneProject={this.doneProject}
              deleteProject={this.deleteProject}
              addProject={this.addProject}
              editProject={this.editProject}
              />} />
            <Route path="/inbox" render={() => <Inbox/>} />
            <Route path="/focus" render={() => <Focus/>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}


// render() {
//   if (!this.state.books){
//     return "...LOADING...";
//   }
//   return (
//     <ul>
//       {this.state.books.map(p => (
//         <li key={p.id}>
//           {p.title}
//         </li>
//       ))}
//     </ul>
//   );
// }
// }
