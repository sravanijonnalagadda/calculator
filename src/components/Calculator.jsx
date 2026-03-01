/**
 * Calculator Component
 * 
 * Main calculator logic and state management.
 * Manages expression state, button clicks, and evaluation.
 * 
 * State:
 *   - expression: string - Current mathematical expression
 * 
 * Features:
 *   - Builds expressions with number and operator buttons
 *   - Prevents invalid operator stacking
 *   - Evaluates expressions using expressionParser
 *   - Handles clear (C) and equals (=) operations
 */

import { useState } from 'react';
import Button from './Button';
import Display from './Display';
import { parseExpression } from '../utils/expressionParser';
import '../styles/calculator.css';

const Calculator = () => {
  const [expression, setExpression] = useState('0');

  const handleButtonClick = (value) => {
    // When the current expression is an error, reset before adding
    if (expression === 'Error') {
      setExpression(value);
      return;
    }

    // Prevent leading zeros
    if (expression === '0' && /[0-9.]/.test(value)) {
      setExpression(value);
      return;
    }

    const lastChar = expression.slice(-1);
    const isOperator = (ch) => /[+\-*/]/.test(ch);

    // Prevent two operators in a row
    if (isOperator(lastChar) && isOperator(value)) {
      // Replace last operator with new one
      setExpression(expression.slice(0, -1) + value);
      return;
    }

    setExpression(expression + value);
  };

  const handleClear = () => {
    setExpression('0');
  };

  const handleEquals = () => {
    try {
      const result = parseExpression(expression);
      setExpression(String(result));
    } catch (e) {
      setExpression('Error');
    }
  };

  return (
    <div className="calculator">
      <Display value={expression} />
      <div className="calculator-buttons">
        {/* row 1 */}
        <Button value="C" type="special" onClick={handleClear} />
        <Button value="(" type="operator" onClick={() => handleButtonClick('(')} />
        <Button value=")" type="operator" onClick={() => handleButtonClick(')')} />
        <Button value="/" type="operator" onClick={() => handleButtonClick('/')} />

        {/* row 2 */}
        <Button value="7" onClick={() => handleButtonClick('7')} />
        <Button value="8" onClick={() => handleButtonClick('8')} />
        <Button value="9" onClick={() => handleButtonClick('9')} />
        <Button value="*" type="operator" onClick={() => handleButtonClick('*')} />

        {/* row 3 */}
        <Button value="4" onClick={() => handleButtonClick('4')} />
        <Button value="5" onClick={() => handleButtonClick('5')} />
        <Button value="6" onClick={() => handleButtonClick('6')} />
        <Button value="-" type="operator" onClick={() => handleButtonClick('-')} />

        {/* row 4 */}
        <Button value="1" onClick={() => handleButtonClick('1')} />
        <Button value="2" onClick={() => handleButtonClick('2')} />
        <Button value="3" onClick={() => handleButtonClick('3')} />
        <Button value="+" type="operator" onClick={() => handleButtonClick('+')} />

        {/* row 5 */}
        <Button value="0" onClick={() => handleButtonClick('0')} />
        <Button value="." onClick={() => handleButtonClick('.')} />
        <Button value="=" type="special" onClick={handleEquals} />
        <div></div> {/* empty placeholder to keep grid alignment */}
      </div>
    </div>
  );
};

export default Calculator;
