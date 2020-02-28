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



const MainDashboard = () => {

    const [visits, setVisits] = useState([]);  

    useEffect(() => {
      
      
      if(visits.length == 0) {
  
        // axios.get('http://localhost:3000/visits.json').then(resp => {
        //   console.log('App() => useEffect() =>',resp);
        //   setVisits(resp.data);
        // });
  
        axios.get(URLs.getAllURL).then(resp => {
            debugger;
          console.log('App() => useEffect().AWS =>',resp);
  
          let results = JSON.parse(resp.data.body);
  
          setVisits(results);
        });
      }
  
    })
    
    const classes = useStyles(); 

    return (
        <React.Fragment>            
            {/* <VisitaActiva /> */}
            <Counter visits={visits}></Counter>
            <TableListing visits={visits}></TableListing>
            <div className={classes.root}>
                <Fab onClick={ () => { window.location = '/addvisit?next=' + (visits.length + 1) } } color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
        </React.Fragment>
        
    );
}

export default MainDashboard;