import React from 'react';
import NoteModel from '../../models/note';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import '../AddNoteContainer/notes.css'

import "./NoteContainer.css"

class NoteContainer extends React.Component {
  state = {
    notes: [],
    note: {},
    open: true
  };

  componentDidMount() {
    NoteModel.getAllNotes()
      .then((result) => {
        console.log(result);
        this.setState({notes: result});
        if(this.props.match.params.id) {
          this.setState({note: result.find(element => element._id === this.props.match.params.id)});
        } else {
          const recentNote = this.state.notes.reduce((a, b) => (a.updatedAt > b.updatedAt ? a : b));
          this.setState({note: recentNote});
          this.props.history.push(`/notes/${recentNote._id}`);
        }
      })
      .catch((err) => console.log(err))
  }

  handleListItemClick(note) {
    this.props.history.push(`/notes/${note._id}`);
    this.setState({note: note});
  }

  deleteNote() {
    NoteModel.deleteNote(this.state.note)
    .then((result) => {
      console.log(result);
      document.querySelector('.prompt-mask').classList.remove('show');
      NoteModel.getAllNotes()
      .then((result) => {
        console.log(result);
        this.setState({notes: result});
        const recentNote = this.state.notes.reduce((a, b) => (a.updatedAt > b.updatedAt ? a : b));
        this.setState({note: recentNote});
        this.props.history.push(`/notes/${recentNote._id}`);
        })
      })
      .catch((err) => console.log(err))
  }

  render() {
    const notesList = this.state.notes.map((note) => {
      return (
          <ListItem button key={note._id} onClick={() => this.handleListItemClick(note)}>
            <ListItemText primary={note.name} />
          </ListItem>
      ) 
    });

    let date = "unknown"
    if(this.state.note.createdAt) {
      date = new Date(this.state.note.createdAt).toDateString();
    }


    function findElement(query, isMulti = false) {
      return (!isMulti) ?
              document.querySelector(query) :
              document.querySelectorAll(query);
    }

    if(findElement('.prompt-mask') !== null) {
        findElement('.prompt-mask').addEventListener('click', (e) => {
            if (e.target !== findElement('.prompt-mask')) return;
            findElement('.prompt-mask').classList.remove('show');   
        })
    }
    if(findElement('.delete-button') !== null) {
        findElement('.delete-button').addEventListener('click', () =>{
            findElement('.prompt-mask').classList.add('show');   
        })
    }
    if(findElement('.cancel-btn') !== null) {
        findElement('.cancel-btn').addEventListener('click', (e) => {
            findElement('.prompt-mask').classList.remove('show');   
        })
    }

    return (
      <div className="note-container">
          <div className="wrapper">
              <nav id="sidebar">
                  <div className="sidebar-header">
                      <h3>Notes</h3>
                      <List>
                        {notesList}
                      </List>
                      <div style={{height: "60px"}}></div>
                  </div>
              </nav>
          </div>
          <div className="note">
            <div className="container">
                <div className="row">
                    <div className="col-xs-12 col-lg-10">
                        {/* Title */}
                          <h3 className="mt-4">{this.state.note.name}</h3>
                        {/* Author */}
                        <div className="lead">
                            by
                            <a href="{% url 'profile' post.user.id %}"> jimmy spann</a>
                            <br />
                            <div className="post-title-header">
                                {/* Date/Time */}
                                Posted on {date}

                                {/* Post Button */}
                                    <div className="action-btns">
                                        <button className="delete-button">
                                            <DeleteIcon />
                                        </button>

                                        <a href={`${this.state.note._id}/edit`}>
                                        <button className="edit-button">
                                            <EditIcon />
                                        </button>
                                        </a>
                                    </div>
                            </div>
                            <hr />
                        </div>
                        {/* Post Content */}
                        <p>{this.state.note.body}</p>
                    </div>
                </div>
            </div>

            <div className="mask prompt-mask">
              <div className="prompt">
                <h4>Are you sure you want to delete this post?</h4>
                <div className="prompt-buttons">
                    <button className="btn btn-danger" onClick={() => this.deleteNote()}>
                      Yes
                    </button>  
                  <button className="btn btn-info cancel-btn">Cancel</button>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default NoteContainer;
