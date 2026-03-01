/**
 * Button Component
 * 
 * A reusable button component for the calculator.
 * 
 * Props:
 *   - value: string - The button label/value
 *   - onClick: function - Handler for button click
 *   - type: string - Button type: 'number' | 'operator' | 'special'
 * 
 * Types:
 *   - 'number': Numeric buttons (0-9, decimal)
 *   - 'operator': Operation buttons (+, -, *, /)
 *   - 'special': Special buttons (C, =, %)
 */

const Button = ({ value, onClick, type = 'number' }) => {
  return (
    <button
      className={`calculator-button calculator-button--${type}`}
      onClick={onClick}
      aria-label={value}
    >
      {value}
    </button>
  );
};

export default Button;
