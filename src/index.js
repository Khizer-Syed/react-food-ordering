import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose, combineReducers} from "redux";
import burger from './store/reducers/burgerBuilder';
import order from './store/reducers/orders';
import auth from './store/reducers/auth';
import registerServiceWorker from './registerServiceWorker';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import {watchAuth, watchBurger, watchOrder} from "./store/sagas";

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const rootReducer = combineReducers({burger, order, auth});
const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurger);
sagaMiddleware.run(watchOrder);
ReactDOM.render(<Provider
    store={store}><BrowserRouter><App/></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
