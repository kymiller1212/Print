import { useEffect } from 'react';
import './PrintView.css';

function PrintView({ picks, onBack }) {
  useEffect(() => {
    // Auto-open print dialog after images load
    const timer = setTimeout(() => {
      window.print();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const gridClass = picks.length <= 4 ? 'print-grid-2x2' : picks.length <= 6 ? 'print-grid-3x2' : 'print-grid-4x2';

  return (
    <div className="print-view-wrapper">
      {/* Controls — hidden when printing */}
      <div className="print-controls no-print">
        <button className="back-btn" onClick={onBack}>
          Go Back
        </button>
        <button className="do-print-btn" onClick={() => window.print()}>
          Print / Save PDF
        </button>
      </div>

      {/* Printable page */}
      <div className="print-page">
        <div className={`print-grid ${gridClass}`}>
          {picks.map((pick) => (
            <div key={pick.id} className="print-cell">
              <img
                src={pick.fullImage || pick.thumbnail}
                alt={pick.title}
                crossOrigin="anonymous"
              />
              <p className="print-caption">{pick.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PrintView;
