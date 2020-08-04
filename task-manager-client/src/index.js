import React from 'react';
import ReactDOM from 'react-dom';
import './App_styles.scss';
import 'font-awesome/css/font-awesome.min.css';
import App from './App';
import { TaskAppProvider } from '../src/state/Tasks.store'


ReactDOM.render( <TaskAppProvider><App /></TaskAppProvider>, document.getElementById('root'));