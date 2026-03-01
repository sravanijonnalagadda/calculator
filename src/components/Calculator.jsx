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

import { useState, useEffect } from 'react';
import Button from './Button';
import Display from './Display';
import History from './History';
import { parseExpression } from '../utils/expressionParser';
import '../styles/calculator.css';

const Calculator = () => {
  const [expression, setExpression] = useState('0');
  const [history, setHistory] = useState([]);

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
      const resStr = String(result);
      setExpression(resStr);

      // update history
      const entry = { expr: expression, result: resStr };
      setHistory((prev) => {
        const next = [entry, ...prev];
        if (next.length > 5) next.pop();
        return next;
      });
    } catch (e) {
      setExpression('Error');
    }
  };

  // load history on mount
  useEffect(() => {
    const stored = localStorage.getItem('calcHistory');
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {}
    }
  }, []);

  // persist history when it changes
  useEffect(() => {
    localStorage.setItem('calcHistory', JSON.stringify(history));
  }, [history]);

  // keyboard input support
  useEffect(() => {
    const keyMap = {
      '0':'0','1':'1','2':'2','3':'3','4':'4','5':'5','6':'6','7':'7','8':'8','9':'9',
      '+':'+','-':'-','*':'*','/':'/','(':'(',')':')','.':'.'
    };
    const onKey = (e) => {
      const { key } = e;
      if (key === 'Enter') {
        handleEquals();
        e.preventDefault();
      } else if (key === 'Backspace') {
        setExpression((expr) => expr.slice(0, -1) || '0');
        e.preventDefault();
      } else if (key === 'Escape') {
        handleClear();
        e.preventDefault();
      } else if (keyMap[key]) {
        handleButtonClick(keyMap[key]);
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expression]);

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
      <History
        history={history}
        onSelect={(expr) => setExpression(expr)}
        onClear={() => setHistory([])}
      />
    </div>
  );
};

export default Calculator;
