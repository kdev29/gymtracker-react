import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { Paper, TextField, Button, Grid } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

const VisitaDetail = ({visit, onSave}) => {
    
    const [visitLocal, setVisitLocal] = useState(visit);

    const handleOnSave = () => {
        onSave(visitLocal);
    }

    const handleChange = (e) => {
        const { value, name } = e.target;

        setVisitLocal(prev => {
            return {
                ...prev,
                [name]: value,
            }
        });
    }

    return (
        <React.Fragment>
            <Grid container>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                {
                    

                        <Paper elevation={2} style={{padding: '48px'}}>
                            <TextField name="calories" value={visitLocal.calories ?? 0} onChange={handleChange} label="Burned calories"></TextField>
                        </Paper>
                    
                }
                <Button onClick={handleOnSave} variant="contained" color="secondary" startIcon={<SaveIcon />}>SAVE</Button>

                </Grid>
                <Grid item xs={3}></Grid>

               
            </Grid>

           

        </React.Fragment>
    );
}

VisitaDetail.propTypes = {    
    visit: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired
}

export default VisitaDetail;

