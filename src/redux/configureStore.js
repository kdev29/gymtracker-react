import { createStore, applyMiddleware, compose,  } from 'redux';
import rootReducer from './reducers/rootReducer';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {

    //add support to react dev tools
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    
    return createStore(
        rootReducer, 
        initialState, 
        //warn if state is tried to be altered
        composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant())
    ));
} 