import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import debugLog from '../../utils/customDebugging';

class Login extends Component {
  state = {
    form: {
      email: '',
      password: '',
    },
    errorMessage: ""
  };

  handleChange = (event) => {
    this.setState({
      form: {
        [event.target.name]: event.target.value,
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let form = {
      email: document.querySelector('#email').value,
      password: document.querySelector('#password').value
    }
    axios.post(`${process.env.REACT_APP_API}/auth/login`, form)
      .then((res) => {
        console.log(res);
        this.props.setCurrentUser(res.data.token);
        this.props.history.push('/notes');
      })
      .catch((err) => {
        debugLog(err.response);
        debugLog(err.response.data);
        debugLog(err.response.data.message);
        this.setState({errorMessage: err.response.data.message});
        debugLog(this.state.errorMessage);
      });

  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Email</label>
            <input onChange={this.handleChange} type="email" id="email" name="email" value={this.state.email} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input onChange={this.handleChange} type="password" id="password" name="password" value={this.state.password} />
          </div>
          <button className="btn btn-primary float-right" type="submit">Login</button>
        </form>
        <br/>
        <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}>
          <p>{this.state.errorMessage}</p>
        </div>
      </div>
    )
  }
};

export default withRouter(Login);
