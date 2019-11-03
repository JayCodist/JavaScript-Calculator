import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './components/Calculator.js';
import './styles/index.css';


const App = props => (
	<div>
		<h1 id="intro" className="center-text"> JavaScript Calculator </h1>
		<Calculator />
	</div>
	)

ReactDOM.render(<App />, document.getElementById("root"));