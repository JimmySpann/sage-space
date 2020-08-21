import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
  state = {
    form: {
      username: '',
      email: '',
      password: '',
    },
    errorMessage: "test",
    confirmedPassword: ""
  };

  //No longer needed but too lazy to remove
  handleChange = (event) => {
    this.setState({
      form: {
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    //Sets state again when handleChange isn't updated.
    this.setState({
      form: {
        username: document.querySelector('#username').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value,
      },
    }).then((err, succes) => {
          //Validate passwords matches with confirmed password
          console.log(document.querySelector('#password2').value, this.state.form.password, this.state.form);
          if(document.querySelector('#password2').value === this.state.form.password) {
            axios.post(`${process.env.REACT_APP_API}/auth/register`, this.state.form)
              .then((res) => {
                console.log(res);
                this.props.history.push('/login');
              })
              .catch((err) => {
                console.log(err.response.status);
                console.log(err.response.data);
                console.log(err.response.data.message);
                this.setState({errorMessage: err.response.data.message});
                console.log(this.state.errorMessage);
              });
          } else {
            this.setState({errorMessage: "Passwords do not match"});
          }
        }
          )
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input onChange={this.handleChange} type="text" id="username" name="username" value={this.state.username} />
          </div>
          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input onChange={this.handleChange} type="email" id="email" name="email" value={this.state.email} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input onChange={this.handleChange} type="password" id="password" name="password" value={this.state.password} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Confirm Password</label>
            <input type="password" id="password2" name="password2" value={this.confirmedPassword} />
          </div>
          <button className="btn btn-primary float-right" type="submit">Register</button>
        </form>
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <p>{this.state.errorMessage}</p>
        </div>
      </div>
    )
  }
};

// export default withRouter(Register);
export default (Register);
