import { useState, useRef, useEffect } from "react";
import fs from "fs";
import path from "path";

/*  
TODO
- when coming back to index page, animation bar should be at the right place
- footer
- maybe everything bigger? 
*/


export async function getStaticProps() {
  const galleryDir = path.join(process.cwd(), "public/gallery");
  const files = fs.readdirSync(galleryDir);
  const images = files
    .filter((file) => /\.(jpe?g|png|gif|webp)$/i.test(file))
    .map((file) => `/gallery/${file}`);

  return { props: { images } };
}

export default function Photos({ images = [] }) {
  // Zakładki jak w index.js
  const [activeTab, setActiveTab] = useState("photos");
  const tabRefs = {
    about: useRef(null),
    projects: useRef(null),
    photos: useRef(null),
    "about Website": useRef(null),
    contact: useRef(null),
  };
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const ref = tabRefs[activeTab];
    if (ref && ref.current) {
      setUnderlineStyle({
        left: ref.current.offsetLeft,
        width: ref.current.offsetWidth,
      });
    }
  }, [activeTab]);

  const handleTabClick = (tab) => {
    if (tab === "photos") return; // już jesteś na tej stronie
    if (tab === "about") window.location.href = "/";
    if (tab === "projects") window.location.href = "/";
    if (tab === "about Website") window.location.href = "/";
    if (tab === "contact") window.location.href = "/";
  };

  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-all min-h-screen text-main relative text-sm font-medium text-center border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      {/* Zakładki */}
      <ul className="flex flex-wrap -mb-px justify-center relative">
        <li className="me-2">
          <button
            ref={tabRefs.about}
            onClick={() => handleTabClick("about")}
            className={`inline-block p-4 border-b-2 bg-transparent transition${
              activeTab === "about" ? " active" : ""
            }`}
          >
            About me
          </button>
        </li>
        <li className="me-2">
          <button
            ref={tabRefs.projects}
            onClick={() => handleTabClick("projects")}
            className={`inline-block p-4 border-b-2 bg-transparent transition${
              activeTab === "projects" ? " active" : ""
            }`}
          >
            Projects
          </button>
        </li>
        <li className="me-2">
          <a
            ref={tabRefs.photos}
            href="/photos"
            className={`inline-block p-4 border-b-2 bg-transparent transition${
              activeTab === "photos" ? " active" : ""
            }`}
            style={{ textDecoration: "none" }}
          >
            Photos
          </a>
        </li>
        <li className="me-2">
          <button
            ref={tabRefs["about Website"]}
            onClick={() => handleTabClick("about Website")}
            className={`inline-block p-4 border-b-2 bg-transparent transition${
              activeTab === "about Website" ? " active" : ""
            }`}
          >
            Website
          </button>
        </li>
        <li className="me-2">
          <button
            ref={tabRefs.contact}
            onClick={() => handleTabClick("contact")}
            className={`inline-block p-4 border-b-2 bg-transparent transition${
              activeTab === "contact" ? " active" : ""
            }`}
          >
            Contact
          </button>
        </li>
        {/* Animowane podkreślenie */}
        <span
          className={`absolute bottom-0 h-1 menu-bar transition-all duration-300  ${
            activeTab ? "menu-bar--active" : ""
          }`}
          style={{
            left: underlineStyle.left,
            width: underlineStyle.width,
            pointerEvents: "none",
          }}
        />
      </ul>

      <div className="tab-title">
    My Photography
      </div>
          
      <div className="gallery-bio">
        Hi! I’m Karol and this is my photography portfolio. Most of these photos were taken using film cameras.
      <div className="instagram">
        Visit my <a href="https://www.instagram.com/kl.eszczyk/" target="_blank" rel="noopener noreferrer">instagram</a> for more.
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