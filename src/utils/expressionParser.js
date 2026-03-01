/**
 * Expression Parser Utility
 * 
 * A safe mathematical expression evaluator that avoids using eval().
 * Implements the Shunting Yard algorithm for proper operator precedence.
 * 
 * Functions:
 *   - parseExpression(expr): Evaluates a mathematical expression string
 * 
 * Supported:
 *   - Operators: +, -, *, /
 *   - Parentheses: ( )
 *   - Decimal numbers: 1.5, 3.14, etc.
 *   - BODMAS/PEMDAS operator precedence
 * 
 * Returns:
 *   - Result as a number or string 'Error' for invalid expressions
 */

/**
 * Tokenizes the input string into tokens
 * @param {string} expr - Mathematical expression
 * @returns {array} Array of tokens
 */
const tokenize = (expr) => {
  const tokens = [];
  let currentNumber = '';

  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];

    if (/[0-9.]/.test(char)) {
      currentNumber += char;
    } else if ('+-*/()'.includes(char)) {
      if (currentNumber) {
        tokens.push(currentNumber);
        currentNumber = '';
      }
      tokens.push(char);
    } else if (char === ' ') {
      if (currentNumber) {
        tokens.push(currentNumber);
        currentNumber = '';
      }
    }
  }

  if (currentNumber) {
    tokens.push(currentNumber);
  }

  return tokens;
};

/**
 * Converts infix notation to postfix (RPN) using Shunting Yard algorithm
 * @param {array} tokens - Array of tokens
 * @returns {array} Postfix notation tokens
 */
const infixToPostfix = (tokens) => {
  const output = [];
  const operators = [];

  // Define operator precedence and associativity
  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  };

  const isOperator = (char) => char in precedence;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    // If token is a number, add to output
    if (!isOperator(token) && token !== '(' && token !== ')') {
      const num = parseFloat(token);
      if (isNaN(num)) {
        throw new Error('Invalid number: ' + token);
      }
      output.push(num);
    }
    // If token is an operator
    else if (isOperator(token)) {
      while (
        operators.length > 0 &&
        operators[operators.length - 1] !== '(' &&
        isOperator(operators[operators.length - 1]) &&
        precedence[operators[operators.length - 1]] >= precedence[token]
      ) {
        output.push(operators.pop());
      }
      operators.push(token);
    }
    // If token is left parenthesis
    else if (token === '(') {
      operators.push(token);
    }
    // If token is right parenthesis
    else if (token === ')') {
      let foundLeftParen = false;
      while (operators.length > 0) {
        const op = operators.pop();
        if (op === '(') {
          foundLeftParen = true;
          break;
        }
        output.push(op);
      }
      if (!foundLeftParen) {
        throw new Error('Mismatched parentheses');
      }
    }
  }

  // Pop remaining operators
  while (operators.length > 0) {
    const op = operators.pop();
    if (op === '(' || op === ')') {
      throw new Error('Mismatched parentheses');
    }
    output.push(op);
  }

  return output;
};

/**
 * Evaluates postfix notation expression
 * @param {array} postfixTokens - Tokens in postfix notation
 * @returns {number} Result of evaluation
 */
const evaluatePostfix = (postfixTokens) => {
  const stack = [];

  for (let i = 0; i < postfixTokens.length; i++) {
    const token = postfixTokens[i];

    // If token is a number, push to stack
    if (typeof token === 'number') {
      stack.push(token);
    }
    // If token is an operator
    else if (typeof token === 'string' && '+-*/'.includes(token)) {
      if (stack.length < 2) {
        throw new Error('Invalid expression');
      }

      const b = stack.pop();
      const a = stack.pop();

      let result;
      switch (token) {
        case '+':
          result = a + b;
          break;
        case '-':
          result = a - b;
          break;
        case '*':
          result = a * b;
          break;
        case '/':
          if (b === 0) {
            throw new Error('Division by zero');
          }
          result = a / b;
          break;
        default:
          throw new Error('Unknown operator: ' + token);
      }

      stack.push(result);
    }
  }

  if (stack.length !== 1) {
    throw new Error('Invalid expression');
  }

  return stack[0];
};

/**
 * Main function to parse and evaluate expression
 * @param {string} expr - Mathematical expression
 * @returns {string | number} Result or 'Error'
 */
export const parseExpression = (expr) => {
  try {
    // Handle empty input
    if (!expr || expr.trim() === '') {
      return 'Error';
    }

    // Tokenize the expression
    const tokens = tokenize(expr);

    // Validate tokens
    if (tokens.length === 0) {
      return 'Error';
    }

    // Convert to postfix notation
    const postfixTokens = infixToPostfix(tokens);

    // Evaluate postfix expression
    const result = evaluatePostfix(postfixTokens);

    // Round to avoid floating point errors
    return Math.round(result * 100000000) / 100000000;
  } catch (e) {
    return 'Error';
  }
};

export default {
  parseExpression,
  tokenize,
  infixToPostfix,
  evaluatePostfix
};
