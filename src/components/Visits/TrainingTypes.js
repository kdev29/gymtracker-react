import React from 'react'
import { Paper, ButtonGroup, Typography, Button } from '@material-ui/core'

import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import PoolIcon from '@material-ui/icons/Pool';

const getIcon = (activity) => {
    switch(activity) {
  
      case "Fuerza":  return <FitnessCenterIcon />; break;
      case "Descanso activo":  return <PoolIcon />; break;
      case "Cardio": return <DirectionsRunIcon />; break;
  
      default:
        return (<FitnessCenterIcon/>)
    }
  }
  
export default function TrainingTypes({activityTypes, classes, onActivityChange}) {
    return (<Paper elevation={2} className={classes.paper}>
        <Typography  className={classes.paperHeader}> <FitnessCenterIcon></FitnessCenterIcon>¿Qué entrenamiento?</Typography>        
            
            <div>

            <ButtonGroup style={{maxWidth: '100%'}} disableElevation variant="contained" >
                
                {                        
                    activityTypes.map(a => <Button startIcon={getIcon(a)}  onClick={() => onActivityChange(a)} key={a} value={a}>{a === "Descanso activo" ? "Activo" : a}</Button>)
                }
            </ButtonGroup>
            </div>

            
        </Paper>)
}
