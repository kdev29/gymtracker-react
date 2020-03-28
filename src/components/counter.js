import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const Counter = (props) => {
    
    const useStyles = makeStyles(theme => ({
        root: {
          display: 'flex',
          flexWrap: 'wrap',
          '& > *': {
            margin: 'auto',
            padding: '5% 5%'
          },
        },
        material: {
          header4: 'header4'
        }
      }));

      const classes = useStyles();
          

    return (
        
      <Container fixed>
          <Paper>
              <div>
                <h4 className={classes.material.header4}>Visitas esta semana</h4>
                <h4 className={classes.material.header4}>{props.visits.length}</h4>
              </div>

              </Paper>
      </Container>
               
    );
}

export default Counter;