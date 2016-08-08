import './styles/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import store, { history } from './store';
import App from './components/app';
import UploadForm from './components/upload-form';
import Imprint from './components/Imprint';

const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={App}>
                <IndexRoute component={UploadForm}/>
                <Route path="/imprint" component={Imprint} />
            </Route>
        </Router>
    </Provider>
);

ReactDOM.render(router, document.getElementById('root'));
