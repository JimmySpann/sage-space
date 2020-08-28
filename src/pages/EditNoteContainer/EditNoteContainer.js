import React from 'react';
import NoteModel from '../../models/note';
import { withRouter } from 'react-router-dom';


import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

import './notes.css'

class EditNoteContainer extends React.Component {
  state = {
    note: {},
  };

  
  componentDidMount() {
    NoteModel.getNoteById(this.props.match.params.id)
      .then((result) => {
        console.log(result);
        this.setState({note: result});
        document.getElementById("name").value = result.name;
        document.getElementById("body").value = result.body;
      })
      .catch((err) => console.log(err))
  }


  handleSubmit = (event) => {
    const note = {
      _id: this.state.note._id,
      name: document.getElementById("name").value,
      body: document.getElementById("body").value,
    }
    NoteModel.updateNote(note)
    .then((result) => {
      console.log(result);
      this.props.history.push(`/notes/${this.state.note._id}`);
    })
    .catch((err) => console.log(err))
  }

  render() {

    let date = new Date(this.state.note.createdAt).toDateString();

    return (
      <div>
        <div className="container">
            <div className="row">
                  <div className="col-xs-12 col-lg-10">
                    {/* <form> */}
                        {/* Title */}
                          <h3 className="mt-4">Title: <input type="text" id="name" name="name"/></h3>
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
                                    <button className="delete-button" onClick={() => this.props.history.push(`/notes/${this.state.note._id}`)}>
                                        <CloseIcon />
                                    </button>

                                    <button className="edit-button" onClick={(e) => this. handleSubmit(e)}>
                                        <CheckIcon />
                                    </button>
                                </div>
                            </div>
                            <hr />
                        </div>
                        {/* Post Content */}
                        <textarea rows="20" className="form-control textarea" id="body"  name="body"> </textarea>  
                    {/* </form> */}
                  </div>
            </div>
        </div>
    </div>
    )
  }
}

export default  withRouter(EditNoteContainer);
