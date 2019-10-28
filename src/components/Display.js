import React from 'react';

const Display = props =>
{
	let output = props.result;
	let digits;
	if (output / 1000000000000 >= 1)
	{
		digits = Math.ceil(Math.log10(output + 1));
		output = (Math.round(output / Math.pow(10, digits - 1) * 100).toFixed(2) / 100).toString() + ` x 10`
	}
	else
	{
		let shiftValue = 12 - Math.ceil(Math.log10(output + 1));
		output = Math.round(output * Math.pow(10, shiftValue)) / Math.pow(10, shiftValue);
	}
	return (
		<section id="display">
		<div id="expression">
			{props.formula || 0}
		</div>
		<div id="result">
			<span>{output || 0}</span>{digits && <sup>{digits}</sup>}
		</div>
		</section>);
}

export default Display;