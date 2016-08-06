import './styles/style.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import { Provider } from 'react-redux';

import Main from './components/main';
import store, { history } from './store';

const router = (
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={Main} />
        </Router>
    </Provider>
);

ReactDOM.render(router, document.getElementById('content'));
