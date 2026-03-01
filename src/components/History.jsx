/**
 * History Component
 *
 * Displays a list of past calculations (up to 5) stored in localStorage.
 * Allows user to click an item to restore its expression.
 * Includes a "Clear" button to wipe history.
 *
 * Props:
 *   - history: Array<{expr:string,result:string}>
 *   - onSelect: function(expr) - called when a history item is clicked
 *   - onClear: function() - clears history
 */

const History = ({ history = [], onSelect, onClear }) => {
  return (
    <div className="calculator-history">
      <div className="history-header">
        <span>History</span>
        {history.length > 0 && (
          <button className="history-clear" onClick={onClear} aria-label="Clear history">
            Clear
          </button>
        )}
      </div>
      {history.length === 0 ? (
        <div className="history-empty">No history</div>
      ) : (
        <ul className="history-list">
          {history.map((item, idx) => (
            <li key={idx} onClick={() => onSelect(item.expr)}>
              {item.expr} = {item.result}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;
