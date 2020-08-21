import React from 'react';
import { withRouter } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import Routes from './config/routes';
import NavBar from './components/NavBar/NavBar';
import setAuthHeader from './utils/setAuthHeader';
import './App.css';

class App extends React.Component {
  state = {
    currentUser: localStorage.getItem('token'),
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      // Set Auth Header
      setAuthHeader(token);
      // Decode Token
      const decodedToken = jwt_decode(token);
      // Set State
      this.setState({currentUser: decodedToken.id})
    }
  }

  setCurrentUser = (token) => {
    // Store Token
    localStorage.setItem('token', token);
    // Set Auth Header
    setAuthHeader(token);
    // Decode Token
    const decodedToken = jwt_decode(token);
    // Set State
    this.setState({currentUser: decodedToken.id})
  };

  logout = () => {
    // Remove Token
    localStorage.removeItem('token');
    // Remove Auth Header
    setAuthHeader();
    // Set State
    this.setState({currentUser: ''});
    // Redirect
    this.props.history.push('/login');
  }

  render() {
    return (
      <React.Fragment>
        <NavBar currentUser={this.state.currentUser} logout={this.logout} />
         <div className="container">
           <Routes currentUser={this.state.currentUser} setCurrentUser={this.setCurrentUser} />
         </div>
      </React.Fragment>
    );
  }
}


// withRouter = Higher Order Component
// It's a function that returns a function that
// returns a component loaded up with new info
export default withRouter(App);
// export default App;
