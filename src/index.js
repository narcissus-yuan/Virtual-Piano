import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/index.css';
import './styles/selector.css';
import './styles/switch.css'
import './styles/piano.css'
// import './styles/tools.css'
import './styles/controls.css'
import './styles/notepad.css'
// import './styles/display-opts.css'

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
