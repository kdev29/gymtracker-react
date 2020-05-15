import React, { useEffect, useState } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import VisitForm from './components/Visits/visit-form';
import VisitaGuardada from './components/visita-guardada';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MainDashboard from './components/dashboard';
import { Provider } from 'react-redux';
import configureStore  from './redux/configureStore';
import DetailsPage from './components/Details/DetailsPage';
import withLayout from './components/layout/LayoutHOC';
import { Button } from '@material-ui/core';

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

const store = configureStore();

const DashBoardWrapper = withLayout(MainDashboard, {title: 'Home', helperButton: { component: Button, location: '/addvisit/0/0', label:"NEW VISIT" }})
const VisitFormWrapper = withLayout(VisitForm, {title: 'New visit', helperButton: { component: Button, location: '/', label:"CANCEL" }})
const DetailsPageWrapper = withLayout(DetailsPage, {title: 'Details', helperButton: { component: Button, location: '/', label:"HOME" }})
const VisitaGuardadaWrapper = withLayout(VisitaGuardada, {title: 'Saved', helperButton: { component: Button, location: '/', label:"HOME" }})

function App() {
       
  return (
    <Provider store={store}>
      <div className="App">                    
        <Router>         
          <Switch> 
              <Route path="/addvisit/:next/:date" component={VisitFormWrapper} />
              <Route path="/visitaguardada" component={VisitaGuardadaWrapper} />              
              <Route path="/visitadetail/:slug/:date" component={DetailsPageWrapper} />
              <Route path="/dashboard" component={DashBoardWrapper} />             
              <Route path="/"  component={DashBoardWrapper} />
            </Switch>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
