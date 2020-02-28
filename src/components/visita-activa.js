import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';



  
function VisitaActiva(){

    const handleAlertClick = () => {
        window.location = '/visitadetail';
    }

    return(
        <Alert onClick={handleAlertClick} severity="warning">Hay una visita sin check out  </Alert>
    );
}

export default VisitaActiva;