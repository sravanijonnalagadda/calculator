import { parseExpression } from './expressionParser';

describe('expressionParser', () => {
  test('basic addition', () => {
    expect(parseExpression('2+2')).toBe(4);
  });

  test('basic subtraction', () => {
    expect(parseExpression('5-3')).toBe(2);
  });

  test('basic multiplication', () => {
    expect(parseExpression('3*4')).toBe(12);
  });

  test('basic division', () => {
    expect(parseExpression('10/2')).toBe(5);
  });

  test('operator precedence', () => {
    expect(parseExpression('2+3*4')).toBe(14);
    expect(parseExpression('2*3+4')).toBe(10);
  });

  test('parentheses', () => {
    expect(parseExpression('(2+3)*4')).toBe(20);
    expect(parseExpression('2*(3+4)')).toBe(14);
  });

  test('decimal numbers', () => {
    expect(parseExpression('1.5+2.25')).toBe(3.75);
  });

  test('division by zero', () => {
    expect(parseExpression('5/0')).toBe('Error');
  });

  test('invalid expressions', () => {
    expect(parseExpression('2++2')).toBe('Error');
    expect(parseExpression('abc')).toBe('Error');
    expect(parseExpression('')).toBe('Error');
  });
});
