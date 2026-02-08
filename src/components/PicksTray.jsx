import './PicksTray.css';

function PicksTray({ picks, maxPicks, maxLimit, onRemove, onClearAll, onMaxChange, canPrint, onPrint }) {
  return (
    <div className="picks-tray">
      <div className="picks-tray-inner">
        <div className="picks-header">
          <div className="picks-count">
            <span className="picks-count-number">{picks.length}</span>
            <span className="picks-count-label"> of {maxPicks} picked</span>
          </div>

          <div className="picks-controls">
            <label className="max-picker-label">
              Max per page:
              <select
                className="max-picker"
                value={maxPicks}
                onChange={(e) => onMaxChange(Number(e.target.value))}
              >
                {Array.from({ length: maxLimit - 3 }, (_, i) => i + 4).map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </label>

            {picks.length > 0 && (
              <button className="clear-btn" onClick={onClearAll}>
                Clear All
              </button>
            )}

            <button
              className="print-btn"
              disabled={!canPrint}
              onClick={onPrint}
            >
              {canPrint ? 'Make My Page!' : `Pick ${4 - picks.length} more`}
            </button>
          </div>
        </div>

        {picks.length > 0 && (
          <div className="picks-thumbnails">
            {picks.map((pick) => (
              <div key={pick.id} className="picks-thumb">
                <img src={pick.thumbnail} alt={pick.title} />
                <button
                  className="picks-thumb-remove"
                  onClick={() => onRemove(pick.id)}
                  aria-label={`Remove ${pick.title}`}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PicksTray;
