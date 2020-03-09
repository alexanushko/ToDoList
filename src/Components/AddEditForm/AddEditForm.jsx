import React from 'react';

export class AddEditForm extends React.Component{
  state = {
    addTitle: "",
    addDescription: "",
    editTitle: this.props.projectTitle,
    editDescription: this.props.projectDescription
  };

  render(){
    if (this.props.onEdit){
      return (
        <form onSubmit={e => e.preventDefault()} className="form-add-edit">
          <div className="form-label-cancel-container">
            <label>Edit a Project</label>
            <button 
              type="button"
              onClick={() => this.props.onCancel()}
              className="form-add-edit-cancel-btn"
            >Cancel</button>
          </div>
          <div>
            <p>Title:</p>
            <input 
              type="text"
              value={this.state.editTitle}
              onChange={e => {
                this.setState({
                  editTitle: e.target.value
                })
              }}
            />
            <button
              type="submit"
              onClick={() => { 
                if(this.state.editTitle && this.state.editTitle.trim() && this.state.editDescription && this.state.editDescription.trim()){
                  this.props.onSave(this.state.editTitle, this.state.editDescription);
                  this.setState({ editTitle: "", editDescription: "" });
                }
              }}
            >
              Submit
            </button>
          </div>
          <div>
            <p>Description:</p>
            <textarea 
              type="text"
              value={this.state.editDescription}
              onChange={e => {
                this.setState({
                  editDescription: e.target.value
                })
              }}
            />
          </div>
        </form>
      );
    }

    return (
      <form onSubmit={e => e.preventDefault()} className="form-add-edit">
        <div className="form-label-cancel-container">
          <label>Add a Project</label>
          <button 
            type="button"
            onClick={() => this.props.onCancel()}
            className="form-add-edit-cancel-btn"
          >Cancel</button>
        </div>
        <div>
          <p>Title:</p>
          <input 
            type="text"
            value={this.state.addTitle}
            onChange={e => {
              this.setState({
                addTitle: e.target.value
              })
            }}
          />
          <button
            type="submit"
            onClick={() => {
              if(this.state.addTitle && this.state.addTitle.trim() && this.state.addDescription && this.state.addDescription.trim()){
                this.props.toAdd(this.state.addTitle, this.state.addDescription);
                this.setState({ addDescription: "", addTitle: "" });
              }
            }}
          >
            Submit
          </button>
        </div>
        <div>
          <p>Description:</p>
          <textarea 
            type="text"
            value={this.state.addDescription}
            onChange={e => {
              this.setState({
                addDescription: e.target.value
              })
            }}
          />
        </div>
      </form>
    );
  }
}