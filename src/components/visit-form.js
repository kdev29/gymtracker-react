import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import querystringreader from 'querystring-reader';
import URLs from '../utils/configs';

const useStyles = makeStyles(theme => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));

const subActivities = [
    { type: 'Fuerza', subType: 'Brazo' },
    { type: 'Fuerza', subType: 'Pierna' },
    { type: 'Fuerza', subType: 'Hombro' },
    { type: 'Descanso activo', subType: 'Natación' },
    { type: 'Descanso activo', subType: 'Baile' },
    { type: 'Descanso activo', subType: 'Otra clase' },
    { type: 'Cardio', subType: 'Caminadora' },
    { type: 'Cardio', subType: 'Escaladora' },
    { type: 'Cardio', subType: 'Bicicleta' },
    { type: 'Cardio', subType: 'Otro' }
];


const VisitForm = (props) => {

    const date = new Date();   
    const { next } = querystringreader.showURLQueryString();    
    
    let visitData =  { lockerId: 0, isCheckedOut : false, activity: 0, date: date.toLocaleDateString(), time: date.getHours() + ':' + date.getMinutes(), subactivities: [] };
        
    const [formState, setFormState] = useState(visitData);    
    const [filteredSubactivities, setfilteredSubactivities] = useState([]);
    const [selectedSubactivities, setSelectedSubactivities] = useState([]);
    const [initialized, setInitialized] = useState(false);

    const classes = useStyles();
    const activityTypes = [ 'Cardio', 'Fuerza', 'Descanso activo' ];
    
    /*Effects*/

    useEffect(() => {
        console.log('useEffect()');
        
        if(!initialized) {
            setInitialized(true);
            const { visitid, fecha } = querystringreader.showURLQueryString();
            console.log('useEffect()-> querystring', querystringreader.showURLQueryString())        ;
            
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
            console.log(response);
            alert(response.data + ', redirigiendo...');
            window.location = '/visitaguardada';
          })
          .catch(function (error) {
            console.error(error);
            alert(error);
          });

    }

    const handleLockerChange = (e) => {
        e.persist();
        debugger;
        setFormState((previous) => ({ ...previous, lockerId: e.target.value})); 
    }

    return(
        <form id='mainForm' onSubmit={handleSubmit} className={classes.root} noValidate autoComplete="off">
            {
                formState.visitId > 0 ? (<h2>Visit #{formState.visitId} </h2>) : (<span></span>)
            }
            <div>
                <h2>¿Cuándo?</h2>
                <div>
                    <TextField required id="standard-required" label="Fecha" defaultValue={formState.date} />
                </div>
                <div>
                    <TextField required id="standard-required" label="Hora" defaultValue={formState.time} />
                </div>
            </div>
            <div>
                <h2>¿Qué entrenamiento es?</h2>                
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
                <h2>¿Qué hiciste?</h2>
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
            <h2>Locker</h2>
                <TextField value={formState.lockerId} onChange={(e) =>handleLockerChange(e)} required id="standard-required" label="Locker"  />
            </div>
            
            <Button type='submit'  variant="contained">OK</Button>
        </form>
    );
}

export default VisitForm;