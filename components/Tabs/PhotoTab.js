export default function PhotosTab({ images, selected, setSelected }) {
  return (
    <div>
      <h2 className="tab-title">My Photography</h2>
      <div className="gallery-bio">
        Hi! I’m Karol and this is my photography portfolio.
        <div className="instagram">
          Visit my <a href="https://www.instagram.com/kl.eszczyk/" target="_blank" rel="noopener noreferrer">instagram</a> for contact and more.
        </div>
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

