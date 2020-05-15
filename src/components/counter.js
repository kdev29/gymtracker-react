import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';

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
          <Paper style={{padding: '24px', margin: '24px'}}>
              <div>
                <Typography  variant="h4" > <SentimentVerySatisfiedIcon style={{color: '#04715d'}} fontSize="large"></SentimentVerySatisfiedIcon> {props.visits.length} rounds this week </Typography>
              </div>

              </Paper>
      </Container>
               
    );
}

export default Counter;