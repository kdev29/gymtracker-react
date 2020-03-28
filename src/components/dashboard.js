import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TableListing from './visitas-listing-table';
import Counter from './counter';
import VisitaActiva from './visita-activa';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import axios from 'axios';
import URLs from '../utils/configs';
import {Link as RouterLink, BrowserRouter as Router} from 'react-router-dom';
import * as visitActions from '../redux/actions/visitsActions';
import { connect } from 'react-redux';
import { bindActionCreators }  from 'redux';


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



const MainDashboard = (props) => {

    //use effect hook
    useEffect(() => {
                    
        if(props.visits.length === 0) {

          props.actions.loadVisits();
        }
  
    })
    
    const classes = useStyles(); 

    return (
        <React.Fragment>            
            {/* <VisitaActiva /> */}
            <Counter visits={props.visits}></Counter>
            <TableListing visits={props.visits}></TableListing>
            <div className={classes.root}>
                <Fab  component={RouterLink} to={ '/addvisit?next=' + (props.visits.length + 1) } color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
        </React.Fragment>
        
    );
}

//state gets injected by redux
const mapStateToProps = (state) => {
  return {
      visits: state.visits
  }
}

//dispatch gets injected by redux
const mapDispatchToProps = (dispatch) => {
  return {
    //dispatch is what notifies redux about an action
    actions: {
        loadVisits: bindActionCreators(visitActions.loadVisits, dispatch)       
    }        
}
}

//connect the component to redux store and export it
export default connect(mapStateToProps, mapDispatchToProps)(MainDashboard);
