import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import BoardHome from './components/BoardHome'
import IndividualBoard from './components/IndividualBoard'
import IndividualTask from './components/IndividualTask'
import * as serviceWorker from './serviceWorker';

const routing = (
  <Router>
    <div>
      <Route path="/board/home" component={BoardHome} />
      <Route path="/board/ind/:id" component={IndividualBoard} />
      <Route path="/task/ind/:id" component={IndividualTask} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
