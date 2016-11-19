import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import files from './files';

const rootReducer = combineReducers({
    files,
    routing: routerReducer
});

export default rootReducer;
