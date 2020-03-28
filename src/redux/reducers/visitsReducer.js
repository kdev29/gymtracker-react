import * as types from '../actions/actionTypes';

export default function courseReducer(state = [], action) {
    
    switch(action.type) {
        case types.LOAD_VISITS: 
            return action.visits;
        default:
            return state;
    }
}