import React, { useEffect, useState } from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import VisitForm from './components/visit-form';
import VisitaDetail from './components/visit-details';
import VisitaGuardada from './components/visita-guardada';
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
              <Route path="/addvisit" component={VisitForm} />
                
              <Route path="/visitaguardada" component={VisitaGuardada} />              
              <Route path="/visitadetail" component={VisitaDetail} />
              <Route path="/dashboard" component={MainDashboard} />             
              <Route path="/"  component={MainDashboard} />
            </Switch>
            </Layout>
    
            
          </div>
        </Router>
      </div>
    </Provider>
  );
}

export default App;
