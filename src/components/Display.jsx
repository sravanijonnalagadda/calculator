/**
 * Display Component
 *
 * Shows the current input or result on the calculator screen.
 *
 * Props:
 *   - value: string - Current expression or result to display
 *
 * Behavior:
 *   - Displays the current value (defaults to '0')
 *   - Applies error styling when the value indicates an error
 *   - Adds `title` attribute so long expressions are readable on hover
 *   - Uses `aria-live` for screen reader updates
 */

const Display = ({ value = '0' }) => {
  const text = value === null || value === undefined ? '0' : String(value);
  const isError = text === 'Error' || /divis|error|nan|infinite/i.test(text);

  return (
    <div className="calculator-display" aria-live="polite">
      <div
        className={`calculator-display__content ${isError ? 'calculator-error' : ''}`}
        title={text}
      >
        {text}
      </div>
    </div>
  );
};

export default Display;
