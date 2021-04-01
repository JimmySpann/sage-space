import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from '../pages/Dashboard/Dashboard';
import Notes from '../pages/NoteContainer/NoteContainer';
import EditNotes from '../pages/EditNoteContainer/EditNoteContainer';
import AddNotes from '../pages/AddNoteContainer/AddNoteContainer';
import Schedule from '../pages/ScheduleContainer/ScheduleContainer';
import DashboardView from '../pages/Tasks/View'

import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';


export default ({ currentUser, setCurrentUser }) => (
  <Switch>
    <Route exact path='/' render={() => 
      currentUser
        ? <Dashboard />
        : <Redirect to='/login' />
    }/>

    <Route exact path='/notes/add' render={() => 
      currentUser
        ? <AddNotes />
        : <Redirect to='/login' />
    }/>

    <Route exact path='/notes' component={Notes}/>

    <Route exact path='/notes/:id' component={Notes}/>

    <Route exact path='/notes/:id/edit' component={EditNotes}/>    

    <Route path='/tasks' render={() => 
      currentUser
        ? <DashboardView />
        : <Redirect to='/login' />
    }/>

    <Route exact path='/schedule' component={Schedule}/>

    <Route path='/login' render={() => <Login setCurrentUser={setCurrentUser} />} />
    <Route path='/register' component={Register} />
  </Switch>
);
