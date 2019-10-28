import React from 'react';


const idTable = 
{
	"AC": "clear",
	"/": "divide",
	"-": "subtract",
	"+": "plus",
	"*": "multiply",
	".": "decimal",
	"=": "equals"
}
const OpCodeButton = props =>
{
	return (
		<button 
			id={idTable[props.func]} 
			className="opcode-button" 
			value={props.func} 
			onClick={props.onClick}
		>
		{/(\*|\/)/.test(props.func) ? (props.func === '*' ? 'x' : '÷') : props.func}
		</button>);
}

export default OpCodeButton;