import { combineReducers } from 'redux';
import visits from './visitsReducer';


const rootReducer = combineReducers({
    visits: visits //this impacts HOW you access this chunk of state
});

export default rootReducer;