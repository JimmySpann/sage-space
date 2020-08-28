import React from 'react';
import NoteModel from '../../models/note';
import { withRouter } from 'react-router-dom';


import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';

import './notes.css'

class AddNoteContainer extends React.Component {
  state = {
    notes: [],
    note: {},
    open: true
  };

  handleSubmit = (event) => {
    const note = {
      name: document.getElementById("name").value,
      body: document.getElementById("body").value,
    }
    NoteModel.createNote(note)
    .then((result) => {
      console.log(result);
      this.props.history.push('/notes');
    })
    .catch((err) => console.log(err))
  }

  render() {

    let date = new Date().toDateString();
  


    return (
      <div>
        <div className="container">
            <div className="row">
                  <div className="col-xs-12 col-lg-10">
                    {/* <form> */}
                        {/* Title */}
                          <h3 className="mt-4">Title: <input type="text" id="name" name="name" /></h3>
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
                                    <button className="delete-button" >
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

        <div className="mask prompt-mask">
          <div className="prompt">
            <h4>Are you sure you want to delete this post?</h4>
            <div className="prompt-buttons">
              <a href="{% url 'post_delete' post.id %}">
                <button className="btn btn-primary">Yes</button>
              </a>     
              <button className="btn btn-info cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
    </div>
    )
  }
}

export default  withRouter(AddNoteContainer);
