import React, { useEffect, useState } from 'react'
import VisitaDetail from './visit-details';
import axios from 'axios';
import config from '../../utils/configs';
import { saveVisit } from '../Visits/visits-service';

export default function DetailsPage({match}) {

    const visitID = match.params.slug;
    const date = match.params.date;

    const [visit, setVisit] = useState(null)
    
    useEffect(() => {
        const endpoint = `${config.getSingleVisitURL}?visitId=${visitID}&fecha=${date}`;

        axios.get(endpoint).then(resp => {            

            setVisit(resp.data)

        })
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
        </>
    )
}
