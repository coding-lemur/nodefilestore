import { createStore } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from './reducers/index';

const defaultState = {
    files: [],
    /*
    uploading: false,
    uploadFinished: false,
    apiResult: {
        downloadUrl: '',
        expirationDate: '',
        token: ''
    }
    */
};

const store = createStore(rootReducer, defaultState);

export const history = syncHistoryWithStore(browserHistory, store);

export default store;
