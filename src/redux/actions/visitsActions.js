import * as types from './actionTypes';
import axios from 'axios';
import URLs from '../../utils/configs';


export function loadVisits() {
    //wrap the function 
    return function(dispatch) {

            debugger;

           return axios.get(URLs.getAllURL).then(resp => {
    
              let results = JSON.parse(resp.data.body);
      
              dispatch(loadVisitsSuccess(results));
            });                  
    }
}

//Success suffix as convention
export function loadVisitsSuccess(visits){
    return { type: types.LOAD_VISITS, visits };
}