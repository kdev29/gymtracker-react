import axios from 'axios';
import config from '../../utils/configs'

export function saveVisit(visita) {

    return axios.post(config.addVisitUrl, visita);
    
    var promise = new Promise((resolve, reject) => {
        return resolve({message: 'ok'})
    })

    return promise;
}