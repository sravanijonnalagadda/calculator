/**
 * Display Component
 * 
 * Shows the current input or result on the calculator screen.
 * 
 * Props:
 *   - value: string - Current expression or result to display
 * 
 * Features:
 *   - Displays current input while user is typing
 *   - Shows result after evaluation
 *   - Shows "Error" for invalid expressions
 *   - Responsive sizing for long expressions
 */

const Display = ({ value = '0' }) => {
  return (
    <div className="calculator-display">
      <div className="calculator-display__content">{value}</div>
    </div>
  );
};

export default Display;
