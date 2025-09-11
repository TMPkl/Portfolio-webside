import translations from "../translations";
export default function PhotosTab({ images, selected, setSelected, language }) {
  return (
    <div>
      <h2 className="tab-title" dangerouslySetInnerHTML={{ __html: translations[language].PhotosTab.title }} />
      <div className="main-content">
        <div className="short-text-block" dangerouslySetInnerHTML={{ __html: translations[language].PhotosTab.bio.p1 }} />
        <div className="short-text-block instagram" dangerouslySetInnerHTML={{ __html: translations[language].PhotosTab.bio.p2 }} />
      </div>
      <div className="masonry">
        {images.map((src, idx) => (
          <div key={idx} className="masonry-item">
            <img
              src={src}
              alt={`Photo ${idx + 1}`}
              onClick={() => setSelected(src)}
            />
          </div>
        ))}
      </div>
      {/* Lightbox */}
      {selected && (
        <div
          className="lightbox"
          onClick={() => setSelected(null)}
        >
          <img
            src={selected}
            alt="Large"
            className="lightbox-img"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

