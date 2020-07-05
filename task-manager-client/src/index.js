import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './App';
import { TaskAppProvider } from '../src/state/Tasks.store'


ReactDOM.render( <TaskAppProvider><App /></TaskAppProvider>, document.getElementById('root'));