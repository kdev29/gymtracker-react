import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Menu from './components/menu';
import { makeStyles } from '@material-ui/core/styles';
import VisitForm from './components/visit-form';
import VisitaGuardadaa from './components/visita-guardada';
import VisitaDetail from './components/visit-details';
import Layout from './components/layout/Layout';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MainDashboard from './components/dashboard';
import { Provider } from 'react-redux';
import configureStore  from './redux/configureStore';

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

const store = configureStore();

function App() {
       
  return (
    
    <Provider store={store}>

      <div className="App">
                    
        <Router>
          <div>
          {/* <Menu /> */}
          <Layout>
          <Switch>
              <Route path="/addvisit">
                <RenderVisitForm />
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
            </Layout>
    
            
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
