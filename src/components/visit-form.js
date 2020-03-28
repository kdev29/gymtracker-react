import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import querystringreader from 'querystring-reader';
import { Redirect, useLocation } from 'react-router-dom';
import URLs from '../utils/configs';
import { bindActionCreators } from 'redux';
import  * as visitActions from '../redux/actions/visitsActions';
import {connect} from 'react-redux';

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));


const venues = [
    { id: 1, venue: 'Casa'},
    { id: 2, venue: 'Gimnasio'}
]


const VisitForm = (props) => {

    const date = new Date();   
    let query = useQuery();
    const next = query.get("next");
    
    let subActivities = [];
    
    let visitData =  { lockerId: 0, venue: '', isCheckedOut : false, activity: 0, date: date.toLocaleDateString(), time: date.getHours() + ':' + date.getMinutes(), subactivities: [] };
        
    const [formState, setFormState] = useState(visitData);    
    const [filteredSubactivities, setfilteredSubactivities] = useState([]);
    const [selectedSubactivities, setSelectedSubactivities] = useState([]);
    const [initialized, setInitialized] = useState(false);
    const [saved, setSaved] = useState(false);

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
            
            const visitid = query.get("visitid");
            const fecha = query.get("fecha");
            
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
    
    function useQuery() {
        return new URLSearchParams(useLocation().search);
      }

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
        
        visita.visitId = next;

        axios.post(URLs.addVisitUrl, visita)
          .then(function (response) {
            
            props.actions.loadVisits();

            setSaved(true);
            alert(response.data + ', redirigiendo...');
            // window.location = '/visitaguardada';
          })
          .catch(function (error) {
            console.error(error);
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
       
        <form id='mainForm' onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
            {
                formState.visitId > 0 ? (<h2>Visit #{formState.visitId} </h2>) : (<span></span>)
            }
            <div>
                <h4 className='header4'>¿Cuándo?</h4>
                <div>
                    
                    <TextField
                        id="standard-full-width"
                        label="Fecha"
                        style={{ margin: 8 }}
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
                        style={{ margin: 8 }}
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
            </div>
            <div>
                    <h4 className='header4'>Dónde?</h4>
                    <div>
                        
                    <Select
                        style={{minWidth: '200px'}}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formState.venue}
                        onChange={handleVenueChange}
                    >
                        {                        
                            venues.map(a => <MenuItem key={a.id} value={a.venue}>{a.venue}</MenuItem>)
                        }
                    
                    </Select>
                    </div>
            </div>
            <div>                
                <h4 className='header4'>¿Qué entrenamiento es?</h4>           
                <InputLabel id="demo-simple-select-label">Actividad</InputLabel>
                <Select
                style={{minWidth: '200px'}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={formState.activity}
                onChange={handleChange}
                >
                    {                        
                        activityTypes.map(a => <MenuItem key={a} value={a}>{a}</MenuItem>)
                    }
                  
                </Select>
            </div>
            
            <div>
                <h4 className='header4'>¿Qué hiciste?</h4>   
   
                {
                    filteredSubactivities.map(act => (
                        <div key={act.subType}>
                            <label>{act.subType}</label>
                            <input onChange={handleSubtypeSelection} checked={act.selected} type='checkbox' value={act.subType} />
                        </div>
                    ))
                }
            </div>
            <div>
            <h4 className='header4'>¿Usaste locker?</h4>   
                <TextField type='number' value={formState.lockerId} onChange={(e) =>handleLockerChange(e)} required id="standard-required" label="Locker"  />
            </div>
            
            <Button type='submit'  variant="contained">OK</Button>
        </form>
    );
}

// export default VisitForm;


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
  