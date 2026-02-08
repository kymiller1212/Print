import './ImageGrid.css';

function ImageGrid({ images, picks, onPick, maxPicks }) {
  const pickedIds = new Set(picks.map((p) => p.id));
  const isFull = picks.length >= maxPicks;

  return (
    <div className="image-grid">
      {images.map((img) => {
        const isPicked = pickedIds.has(img.id);
        return (
          <div key={img.id} className={`image-card ${isPicked ? 'picked' : ''}`}>
            <div className="image-wrapper">
              <img
                src={img.thumbnail}
                alt={img.title}
                loading="lazy"
                onError={(e) => {
                  e.target.src = `https://picsum.photos/seed/${img.id}/400/400`;
                }}
              />
            </div>
            <p className="image-title">{img.title}</p>
            {isPicked ? (
              <button className="pick-btn picked-btn" disabled>
                Picked!
              </button>
            ) : (
              <button
                className="pick-btn"
                onClick={() => onPick(img)}
                disabled={isFull}
              >
                {isFull ? 'Full!' : 'Pick This!'}
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ImageGrid;
