import React from 'react';
import {render} from 'react-dom';
import {HashRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import Routes from './routes.jsx';
import store from './store/store';
import {Notifications} from 'lori-bites';
// get app element
var app = document.getElementById("app");
// render to view
render(
    <HashRouter>
        <Provider store={store}>
            <div className='app-container'>
                <Routes/>
                <Notifications animation="notif" delay={15000}/>
            </div>
        </Provider>
    </HashRouter>, app
);