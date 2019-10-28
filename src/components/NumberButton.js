import React from 'react';

const idTable = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];

const NumberButton = props =>
{
	return (
		<button id={idTable[props.value]} onClick={props.onClick} value={props.value}>
			{props.value}
		</button>);
}

export default NumberButton;