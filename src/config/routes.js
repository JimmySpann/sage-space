import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from '../pages/Dashboard/Dashboard';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import DashboardView from '../pages/Tasks/View'

export default ({ currentUser, setCurrentUser }) => (
  <Switch>
    <Route exact path='/' render={() => 
      currentUser
        ? <Dashboard />
        : <Redirect to='/login' />
    }/>

    <Route exact path='/tasks' render={() => 
      currentUser
        ? <DashboardView />
        : <Redirect to='/login' />
    }/>

    <Route path='/login' render={() => <Login setCurrentUser={setCurrentUser} />} />
    <Route path='/register' component={Register} />
  </Switch>
);
