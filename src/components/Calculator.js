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
		if (target.value === '.') // Ensure no multiple decimal points
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
		else if (isNewResult) // Start afresh after each calculation by resetting formula string
		{
			newFormula = target.value
		}
		else
		{
			if (target.value === "0") // No multiple leading zero
			{
				let lastNumIndex = Math.max(formula.lastIndexOf('/'), formula.lastIndexOf('*'), 
				formula.lastIndexOf('+'), formula.lastIndexOf('-')) + 1;
				if (formula.length - 1 === lastNumIndex && formula[formula.length - 1] === "0")
					return;
			}
			newFormula = formula + target.value;
		}
		setFormula(newFormula);
		setIsNewResult(false);
	}

	const handleFuncInput = ({target}) =>
	{
		let newFormula;
		if (isNewResult) // Allow new result to be included in further calculations
		{
			newFormula = result.toString() + target.value;
		}
		else if (formula === "") // Operands must come first in a formula
			return;
		else
		{
			// Disallow for consecutive operators except for - being added
			if (/[/*\-+]$/.test(formula))
			{
				let lastOperandIndex = /(\d|\.)[^\d.]*$/.exec(formula).index;// "2+3+4.6+"
				let lastOperatorSet = formula[lastOperandIndex + 1];
				if (target.value === "-" && lastOperatorSet != "-")
					newFormula = formula + target.value;
				else
					newFormula = formula.substring(0, lastOperandIndex + lastOperatorSet.length) + target.value;
			}
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
		if (!str.length)
			return;
		// eslint-disable-next-line
		setResult(Function('return (' + str + ')')());
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


document.addEventListener("keydown", e =>
{
	switch(e.code)
	{
		case "Escape": document.getElementById("clear").click(); break;
		case "Enter": document.getElementById("equals").click(); break;
		case "Period": document.getElementById("decimal").click(); break;
		case "Slash": document.getElementById("divide").click(); break;
		case "Minus": document.getElementById("subtract").click(); break;
		case "Equal": 
			if (e.shiftKey)
				document.getElementById("add").click();
			else
				document.getElementById("equals").click(); break;
		case "Digit8": 
			if (e.shiftKey)
				document.getElementById("multiply").click(); 
			else
				document.getElementById("eight").click(); break;
				break;
		case "KeyX": document.getElementById("multiply").click(); break;

		case "Digit0": document.getElementById("zero").click(); break;
		case "Digit1": document.getElementById("one").click(); break;
		case "Digit2": document.getElementById("two").click(); break;
		case "Digit3": document.getElementById("three").click(); break;
		case "Digit4": document.getElementById("four").click(); break;
		case "Digit5": document.getElementById("five").click(); break;
		case "Digit6": document.getElementById("six").click(); break;
		case "Digit7": document.getElementById("seven").click(); break;
		case "Digit9": document.getElementById("nine").click(); break;
	}

})

export default Calculator;