import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './components/menu';
import { makeStyles } from '@material-ui/core/styles';
import VisitForm from './components/visit-form';
import VisitaGuardadaa from './components/visita-guardada';
import VisitaDetail from './components/visit-details';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MainDashboard from './components/dashboard';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function Users() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}

function VisitaGuardada() {
  return(<VisitaGuardadaa></VisitaGuardadaa>);
}

const RenderVisitForm = () => {
  return (
    <VisitForm />
  );
}

function App() {
       

  return (
    <div className="App">
      
      <Menu />      
      <Router>
      <div>
        
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/addvisit">
            <RenderVisitForm />
          </Route>
          <Route path="/users">
            <Users />
          </Route>          
          <Route path="/visitaguardada">
            <VisitaGuardada />
          </Route>
          <Route path="/visitadetail">
            <VisitaDetail />
          </Route>
          <Route path="/dashboard">
            <MainDashboard />
          </Route>
          <Route path="/">
            <MainDashboard />
          </Route>
        </Switch>
      </div>
    </Router>
    </div>
  );
}

export default App;
