import { useState, useEffect, useCallback } from 'react';
import SearchBar from './components/SearchBar';
import ImageGrid from './components/ImageGrid';
import PicksTray from './components/PicksTray';
import PrintView from './components/PrintView';
import DemoBanner from './components/DemoBanner';
import './App.css';

const MAX_PICKS_LIMIT = 8;
const MIN_PICKS_TO_PRINT = 4;

function App() {
  const [results, setResults] = useState([]);
  const [picks, setPicks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [showPrint, setShowPrint] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [maxPerPage, setMaxPerPage] = useState(5);

  useEffect(() => {
    fetch('/api/status')
      .then((r) => r.json())
      .then((data) => setIsDemo(data.demo))
      .catch(() => setIsDemo(true));
  }, []);

  const handleSearch = useCallback(async (query) => {
    setLoading(true);
    setSearched(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.items || []);
      if (data.demo !== undefined) setIsDemo(data.demo);
    } catch {
      setResults([]);
    }
    setLoading(false);
  }, []);

  const handlePick = useCallback(
    (image) => {
      setPicks((prev) => {
        if (prev.length >= maxPerPage) return prev;
        if (prev.find((p) => p.id === image.id)) return prev;
        return [...prev, image];
      });
    },
    [maxPerPage]
  );

  const handleRemove = useCallback((id) => {
    setPicks((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleClearAll = useCallback(() => {
    setPicks([]);
  }, []);

  const canPrint = picks.length >= MIN_PICKS_TO_PRINT;

  if (showPrint) {
    return (
      <PrintView
        picks={picks}
        onBack={() => setShowPrint(false)}
      />
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Pick &amp; Print</h1>
        <p className="app-subtitle">Find cool pictures and print them!</p>
      </header>

      {isDemo && <DemoBanner />}

      <SearchBar onSearch={handleSearch} loading={loading} />

      <main className="app-main">
        {!searched && !loading && (
          <div className="welcome-message">
            <div className="welcome-emoji">&#x1F50D;</div>
            <p>Search for your favorite action figures or football cards!</p>
            <p className="welcome-hint">
              Try: &quot;Patrick Mahomes football card&quot; or &quot;Spider-Man action figure&quot;
            </p>
          </div>
        )}

        {loading && (
          <div className="loading-message">
            <div className="spinner" />
            <p>Finding awesome pictures...</p>
          </div>
        )}

        {searched && !loading && results.length === 0 && (
          <div className="no-results">
            <p>No pictures found. Try a different search!</p>
          </div>
        )}

        {!loading && results.length > 0 && (
          <ImageGrid
            images={results}
            picks={picks}
            onPick={handlePick}
            maxPicks={maxPerPage}
          />
        )}
      </main>

      <PicksTray
        picks={picks}
        maxPicks={maxPerPage}
        maxLimit={MAX_PICKS_LIMIT}
        onRemove={handleRemove}
        onClearAll={handleClearAll}
        onMaxChange={setMaxPerPage}
        canPrint={canPrint}
        onPrint={() => setShowPrint(true)}
      />
    </div>
  );
}

export default App;
