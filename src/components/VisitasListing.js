import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    Redirect
  } from "react-router-dom";
import { Grid, Divider, Fab } from '@material-ui/core';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import PoolIcon from '@material-ui/icons/Pool';

const icons = {
  "Fuerza": FitnessCenterIcon,
  "Descanso activo": PoolIcon,
  "Cardio": DirectionsRunIcon
}

const classesRelationship = {
  "Fuerza": 'fuerza',
  "Descanso activo": 'cardio',
  "Cardio": 'descanso'
}


const useStyles = makeStyles({
    table: {
      minWidth: 650      
    },
    fuerza: {
      backgroundColor: '#2c2a8a'
    },
    cardio: {
      backgroundColor: '#a90b0b'
    },
    descanso: {
      backgroundColor: '#168e08'
    }
  });

  /*Main functional component*/
export default function TableFolderListing(props)  {

    const classes = useStyles();
    const visits = props.visits;
    const [redirect, setRedirect] = useState({ isRedirect: false, location: ""});

    /*inner functions*/

  
    const handleRedirect = (e, visit) => {
      setRedirect({isRedirect: true, location: '/visitadetail/' + visit.visitId + '/' + visit.date });
    }

    if(redirect.isRedirect) {
      
      return (<Redirect to={redirect.location} />)
    }

    const getIcon = (activity) => {
      switch(activity) {

        case "Fuerza":  return <FitnessCenterIcon />; break;
        case "Descanso activo":  return <PoolIcon />; break;
        case "Cardio": return <DirectionsRunIcon />; break;

        default:
          return (<FitnessCenterIcon/>)
      }
    }
    

    /*end inner functions*/

    return (
      <Grid container justify={"center"}>
        
        <Grid item xs ={10} md={6}>

          <List className={classes.root}>
            {visits.map(v => (
                          <div key={v.visitId}>
                          <ListItem  button onClick={(e) => handleRedirect(e, v) }>
                          <ListItemAvatar>
                            <Avatar className={classes[classesRelationship[v.activity]]}>
                              {
                                getIcon(v.activity)
                              }
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={v.activity} secondary={`${v.venue ?? ""}  ${v.date}`}  />
                          <ListItemText primary={v.visitId} secondary={v.calories + " cals "} />
                          <ArrowForwardIosIcon />
                        </ListItem>
                        <Divider />
                        </div>

                        ))}
                              
        
        </List>
        
          {
                        visits.length == 0 && (<LinearProgress />)
                      }
        </Grid>
      </Grid>
        

                

        
      
  );
}

