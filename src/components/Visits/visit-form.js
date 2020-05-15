import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Redirect, useLocation } from 'react-router-dom';
import URLs from '../../utils/configs';
import { bindActionCreators } from 'redux';
import  * as visitActions from '../../redux/actions/visitsActions';
import {connect} from 'react-redux';
import SaveIcon from '@material-ui/icons/Save';
import { Paper, Grid, Typography, Divider, Checkbox, ButtonGroup, FormControlLabel } from '@material-ui/core';
import EventIcon from '@material-ui/icons/Event';
import RoomIcon from '@material-ui/icons/Room';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import LockIcon from '@material-ui/icons/Lock';
import HomeIcon from '@material-ui/icons/Home';
import StoreMallDirectoryIcon from '@material-ui/icons/StoreMallDirectory';
import PropTypes from 'prop-types';
import TrainingTypes from './TrainingTypes';
import { saveVisit } from './visits-service';

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
    paper: {
        margin: '10px 0', 
        padding: theme.spacing(3)        
    },
    paperHeader: {
        display: 'inline-flex',
        color: '#585353'
    }
  }));

const venues = [
    { id: 1, venue: 'Casa'},
    { id: 2, venue: 'Gimnasio'}
]

const VisitForm = ({history, actions, visits, match, ...props}) => {

    const date = new Date();       
    let subActivities = [];
    
    let visitData =  { lockerId: 0, venue: '', calories: 0,
                         isCheckedOut : false, activity: 0, 
                         date: date.toLocaleDateString(), time: date.getHours() + ':' + date.getMinutes(), subactivities: [] };
        
    const [formState, setFormState] = useState(visitData);    
    const [filteredSubactivities, setfilteredSubactivities] = useState([]);
    const [selectedSubactivities, setSelectedSubactivities] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const [saved, setSaved] = useState(false);
    const [saveState, setSaveState] = useState("Save");

    const classes = useStyles();
    const activityTypes = [ 'Cardio', 'Fuerza', 'Descanso activo' ];
    
    /*Effects*/

    useEffect(() => {        
        
        if(subActivities.length == 0) {

            axios.get(URLs.subActivitiesUrl).then(result => {
                subActivities = result.data.sort();
            });

        }

        if(!initialized) {
            setInitialized(true);
            
             const visitid = match.params.next;
             const fecha = match.params.date;
            
            if(visitid && visitid > 0) {
            
              axios.get(`${URLs.getSingleVisitURL}?visitId=${visitid}&fecha=${fecha}`).then(resp => {              
                  setFormState(resp.data);
    
                  let filtered = [];
    
                    subActivities.forEach(act =>{                                                                    

                        if(resp.data.activity != act.type)
                            return;

                        if(resp.data.subactivities.find(s => s == act.subType) ){
                            filtered.push({...act, selected: true});
                        } else {
                            filtered.push({...act, selected: false});
                            
                        }            
                    });
    
                    setfilteredSubactivities(filtered); 
                });
            }
        }

        
    });
    
    /*Event handlers*/

    function handleChange(event) {
        formState.activity = event.target.value;
        setFormState(formState);

        let filtered = [];

        subActivities.forEach(act =>{
            
            if(act.type === event.target.value){
                filtered.push(act);
            }            
        });
        setfilteredSubactivities(filtered);                
    }

    function handleActivityChange(activity) {

        formState.activity = activity;
        setFormState(formState);

        let filtered = [];

        subActivities.forEach(act =>{
            
            if(act.type === activity){
                filtered.push(act);
            }            
        });
        setfilteredSubactivities(filtered);                
    }

    function handleSubtypeSelection(event){
        const target = event.target;
        const subActivity = subActivities.find(s => s.subType == target.value);
        
        if(target.checked) {     
            if(subActivity)
                selectedSubactivities.push(subActivity.subType);
        } else {
            const removeIndex = selectedSubactivities.findIndex(s => s.subType == target.value);

            selectedSubactivities.splice(removeIndex)
        }   
        
        formState.subactivities = selectedSubactivities;
        setFormState(formState);
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        
        let visita = formState;        
        visita.visitId = visits.length + 1;

        if(visita.activity == 0)
            return false;

        if(visita.subactivities.length == 0)
            return false;

        if(visita === undefined || visita.venue === "")
            return false;

        setSaveState("Saving...");

        saveVisit(visita)
          .then(function (response) {
            
            actions.loadVisits();
            setSaveState("Saved");
            setSaved(true);
          })
          .catch(function (error) {
            console.error(error);
            setSaveState("Save");
            alert(error);
          });
    }

    const handleLockerChange = (e) => {
        e.persist();        
        setFormState((previous) => ({ ...previous, lockerId: e.target.value})); 
    }

    const handleVenueChange = (e) => {
        setFormState((previous) => ({ ...previous, venue: e.target.value})); 
    }

    if(saved) {
        return <Redirect to='/visitaguardada' />
    }

    return(
       <Grid container>
           <Grid item xs={1} md={4}></Grid>
           <Grid item xs={10} md={4}>
           <form style={{marginBottom: '30px'}} id='mainForm' onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
            {
                formState.visitId > 0 ? (<h2>Visit #{formState.visitId} </h2>) : (<span></span>)
            }
            <div>
                <Paper elevation={2} className={classes.paper}>
                
                <Typography className={classes.paperHeader}> <EventIcon></EventIcon>¿Cuándo?</Typography>
                
                <div>
                    
                    <TextField
                        id="standard-full-width"
                        label="Fecha"
                        style={{maxWidth: '90%'}}
                        placeholder="Placeholder"          
                        fullWidth
                        margin="normal"
                        type='date'
                        defaultValue={formState.date}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                </div>
                <div>
                    
                    <TextField
                        id="standard-full-width"
                        label="Hora"                        
                        style={{maxWidth: '90%'}}
                        placeholder="Placeholder"          
                        fullWidth
                        margin="normal"
                        type='time'
                        defaultValue={formState.date}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                </Paper>
                
            </div>
            
            <Paper elevation={2} className={classes.paper}>
                        
            <Typography className={classes.paperHeader}> <RoomIcon></RoomIcon>¿Dónde?</Typography>
                    <div>
                        
                    <Select
                        style={{maxWidth: '90%', minWidth: '50%'}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formState.venue}
                        onChange={handleVenueChange}
                    >
                        {                        
                            venues.map(a => <MenuItem  key={a.id} value={a.venue}> {a.venue == "Casa" ? <HomeIcon /> : <StoreMallDirectoryIcon/>} <Typography style={{margin: '0 8px'}}>{a.venue}</Typography></MenuItem>)
                        }
                    
                    </Select>
                    </div>
            </Paper>

  
            <TrainingTypes onActivityChange={handleActivityChange} activityTypes={activityTypes} classes={classes} />

            <Paper elevation={2} className={classes.paper}>
                <Typography  className={classes.paperHeader}> <AccessibilityIcon></AccessibilityIcon>¿Qué hiciste?</Typography>         
                <Grid container justify="center">
                            
                {
                    filteredSubactivities.map(act => (
                        <div key={act.subType}>
                            
                            <FormControlLabel 
                                control={ <Checkbox 
                                    onChange={handleSubtypeSelection}
                                    checked={act.selected}
                                    value={act.subType}                                
                                    color="primary"
                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />}
                                label={act.subType}
                            />
                           
                                {/* <label>{act.subType}</label> */}
                        </div>
                    ))
                }
                            </Grid>
            </Paper>
            <Paper elevation={2} className={classes.paper}>
            <Typography  className={classes.paperHeader}> <LockIcon></LockIcon>¿Usaste Locker?</Typography>     
            <div>
                <TextField type='number' value={formState.lockerId} onChange={(e) =>handleLockerChange(e)} required id="standard-required" label="Locker"  />
                </div>    
            </Paper>
            
     
            <Button startIcon={<SaveIcon />} color="primary" type='submit' disabled={saveState != "Save"} variant="contained">{saveState}</Button>
        </form>
           </Grid>
           <Grid item xs={1} md={4}></Grid>
        
       </Grid>
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
  export default connect(mapStateToProps, mapDispatchToProps)(VisitForm);
  