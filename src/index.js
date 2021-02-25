import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'


import AuthRoute from './component/authroute'
import DashBoard from './component/dashboard'
import Chat from './component/chat';

import Login from './container/login';
import Register from './container/register';
import BossInfo from './container/bossinfo';
import GeniusInfo from './container/geniusinfo';
import reducers from './reducer';
import './index.css';

const store = createStore(reducers, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f

));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter >
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
        <Route path='/login' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
        <Route path="/geniusinfo" component={GeniusInfo}></Route>
        <Route path="/bossinfo" component={BossInfo}></Route>
        <Route path="/chat/:user" component={Chat}></Route>
        <Route component={DashBoard}></Route>  
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
