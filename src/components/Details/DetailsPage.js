import React, { useEffect, useState } from 'react'
import VisitaDetail from './visit-details';
import axios from 'axios';
import config from '../../utils/configs';
import { saveVisit } from '../Visits/visits-service';
import { CircularProgress } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';


export default function DetailsPage({match}) {

    const visitID = match.params.slug;
    const date = match.params.date;

    const [visit, setVisit] = useState(null);
    const [error, setError] = useState({ isError: false, message: "This is the error"});
    
    useEffect(() => {
        const endpoint = `${config.getSingleVisitURL}?visitId=${visitID}&fecha=${date}`;

        axios.get(endpoint).then(resp => {            

            setVisit(resp.data);

        }).catch(err => {             
            setError({ isError: true, message: "An error ocurred, try later"})
        });
    }, [])


    const handleSave = (visit) => {

        saveVisit(visit)
            .then(resp => { 
                alert('Finalizado')
            })
            .catch(err => { 
                alert('Error ' + err)
            })
    }


    return (        
        <>
            {visit && (<VisitaDetail onSave={handleSave} visit={visit}/>)}
            {
                visit == null && !error.isError && (
                    <CircularProgress />                    
                )
            }

            {
               error.isError && (<Alert style={{textAlign: 'center'}} severity="error"><span>&#128531; {error.message}</span></Alert>)
            }
            
        </>
    )
}
