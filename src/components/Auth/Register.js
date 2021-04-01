import React, { Component } from 'react';
// import { withRouter } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
  state = {
    form: {
      username: '',
      email: '',
      password: '',
    },
    errorMessage: "",
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
    //Validate passwords matches with confirmed password
    if(document.querySelector('#password2').value === document.querySelector('#password').value) {
      let form = {
        username: document.querySelector('#username').value,
        email: document.querySelector('#email').value,
        password: document.querySelector('#password').value
      }
      axios.post(`${process.env.REACT_APP_API}/auth/register`, form)
        .then((res) => {
          this.props.history.push('/login');
        })
        .catch((err) => {
          this.setState({errorMessage: err.response.data.message});
        });
    } else {
      this.setState({errorMessage: "Passwords do not match"});
    }
}

  render() {
    console.log(this.props);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input onChange={this.handleChange} type="text" id="username" name="username" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input onChange={this.handleChange} type="email" id="email" name="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input onChange={this.handleChange} type="password" id="password" name="password" />
          </div>
          <div className="form-group">
            <label htmlFor="password2">Password</label>
            <input onChange={this.handleChange} type="password" id="password2" name="password2" />
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
