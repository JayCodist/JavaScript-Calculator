import React from 'react';
import Display from './Display.js';
import NumberButton from './NumberButton.js';
import OpCodeButton from './OpCodeButton.js';
import '../styles/Calculator.css';

const Calculator = props =>
{
	const [formula, setFormula] = React.useState("");
	const [result, setResult] = React.useState("");
	const [isNewResult, setIsNewResult] = React.useState(false);

	const handleNumberInput = ({target}) =>
	{
		let newFormula;
		if (target.value === '.')
		{
			let lastNumIndex = Math.max(formula.lastIndexOf('/'), formula.lastIndexOf('*'), 
				formula.lastIndexOf('+'), formula.lastIndexOf('-')) + 1;
			if (formula.lastIndexOf('.') > lastNumIndex)
				return;
			else if (formula.length === lastNumIndex)
				newFormula = formula + '0.';
			else
				newFormula = formula + target.value;
		}
		else if (isNewResult)
		{
			newFormula = target.value
		}
		else
		{
			newFormula = formula + target.value;
		}
		setFormula(newFormula);
		setIsNewResult(false);
	}

	const handleFuncInput = ({target}) =>
	{
		let newFormula;
		if (isNewResult)
		{
			newFormula = result.toString() + target.value;
		}
		else
		{
			if (/\D$/.test(formula) || /\.$/.test(formula))
				newFormula = formula.substring(0, formula.length - 1) + target.value;
			else
				newFormula = formula + target.value;
		}
		setFormula(newFormula);
		setIsNewResult(false);
	}

	const reset = () =>
	{
		setFormula("");
		setResult("");
	}
	const performCalculation = str =>
	{
		// eslint-disable-next-line
		setResult(Function('"use strict";return (' + str + ')')());
		setIsNewResult(true);
	}

	return (
		<div id="calculator-body">
			<Display formula={formula} result={result} />
			<section id="calculator-buttons">
				<section id="first-row">
					<OpCodeButton func="AC" onClick={reset} />
					<OpCodeButton func="/" onClick={handleFuncInput} />
					<OpCodeButton func="*" onClick={handleFuncInput} />
				</section>

				<section className="btn-row">
					<NumberButton value="7" onClick={handleNumberInput} />
					<NumberButton value="8" onClick={handleNumberInput} />
					<NumberButton value="9" onClick={handleNumberInput} />
					<OpCodeButton func="-" onClick={handleFuncInput} />
				</section>

				<section className="btn-row">
					<NumberButton value="4" onClick={handleNumberInput} />
					<NumberButton value="5" onClick={handleNumberInput} />
					<NumberButton value="6" onClick={handleNumberInput} />
					<OpCodeButton func="+" onClick={handleFuncInput} />
				</section>

				<section id="last-two-rows">
					<section id="last-two-rows-left">
						<section id="penult-row-left">
							<NumberButton value="1" onClick={handleNumberInput} />
							<NumberButton value="2" onClick={handleNumberInput} />
							<NumberButton value="3" onClick={handleNumberInput} />
						</section>
						<section id="last-row-left">
							<NumberButton value="0" onClick={handleNumberInput} />
							<NumberButton value="." onClick={handleNumberInput} />
						</section>
					</section>
					<OpCodeButton func="=" onClick={() => performCalculation(formula)} />
				</section>
			</section>
		</div>)
}

export default Calculator;