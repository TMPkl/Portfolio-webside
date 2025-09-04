import { useState, useRef, useEffect } from "react"
import fs from "fs";
import path from "path";

export async function getStaticProps() {
  const galleryDir = path.join(process.cwd(), "public/gallery");
  const files = fs.readdirSync(galleryDir);
  const images = files
    .filter((file) => /\.(jpe?g|png|gif|webp)$/i.test(file))
    .map((file) => `/gallery/${file}`);

  return { props: { images } };
}

function Tabs({ images = [] }) {
  // Domyślnie zawsze "about" (SSR)
  const [activeTab, setActiveTab] = useState("about");
  const [selected, setSelected] = useState(null);

  const tabRefs = {
    about: useRef(null),
    projects: useRef(null),
    photos: useRef(null),
    "about Website": useRef(null),
    contact: useRef(null),
  };
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  // Po zamontowaniu komponentu ustaw tab z query stringa (tylko na kliencie)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab") || "about";
    setActiveTab(tab);
  }, []);

  useEffect(() => {
    const ref = tabRefs[activeTab];
    if (ref && ref.current) {
      setUnderlineStyle({
        left: ref.current.offsetLeft,
        width: ref.current.offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <div className="bg-all text-main ">
      <ul className="tab-bar">
        <li className="me-2">
          <button
            ref={tabRefs.about}
            onClick={() => setActiveTab("about")}
            className={`tab-btn${activeTab === "about" ? " active" : ""}`}
          >
            About me
          </button>
        </li>
        <li className="me-2">
          <button
            ref={tabRefs.projects}
            onClick={() => setActiveTab("projects")}
            className={`tab-btn${activeTab === "projects" ? " active" : ""}`}
          >
            Projects
          </button>
        </li>
        <li className="me-2">
          <button
            ref={tabRefs.photos}
            onClick={() => setActiveTab("photos")}
            className={`tab-btn${activeTab === "photos" ? " active" : ""}`}
          >
            Photos
          </button>
        </li>
        <li className="me-2">
          <button
            ref={tabRefs["about Website"]}
            onClick={() => setActiveTab("about Website")}
            className={`tab-btn${activeTab === "about Website" ? " active" : ""}`}
          >
            Website
          </button>
        </li>
        <li className="me-2">
          <button
            ref={tabRefs.contact}
            onClick={() => setActiveTab("contact")}
            className={`tab-btn${activeTab === "contact" ? " active" : ""}`}
          >
          Contact
          </button>
        </li>
        {/* Animowane podkreślenie */}
        <span
          className={`menu-bar${activeTab ? " menu-bar--active" : ""}`}
          style={{
            left: underlineStyle.left,
            width: underlineStyle.width,
            pointerEvents: "none",
          }}
        />
      </ul>
      <div className="tab-content">
        {activeTab === "about" && (
          <div>
            <h2 className="tab-title">About me</h2>
            <p>Here will be your about me section – description, skills, etc.</p>
          </div>
        )}
        {activeTab === "projects" && (
          <div>
            <h2 className="tab-title">My projects</h2>
            <p>Here will be your projects section.</p>
          </div>
        )}
        {activeTab === "photos" && (
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
        )}
        {activeTab === "about Website" && (
          <div>
            <h2 className="tab-title">About Website</h2>
            <div className="gallery-bio">
              <div className="text-block">
                Ta strona powstała w całości w oparciu o podejście vibecoding - czyli styl tworzenia oprogramowania, w którym zamiast samodzielnie pisać kod, programista (a w tym przypadku raczej "pomysłodawca") formułuje instrukcje w języku naturalnym, a sztuczna inteligencja generuje na ich podstawie gotowe fragmenty aplikacji. Dzięki temu można skupić się bardziej na "co ma powstać" niż na "jak to zrobić".
              </div>
              <div className="text-block">
                Ten projekt jest eksperymentem sprawdzającym, jak daleko można zajść, używając wyłącznie takiego podejścia. Warto zaznaczyć, że przed rozpoczęciem prac nie miałem żadnego doświadczenia w web developmencie - cała wiedza i kod powstały właśnie dzięki vibecodingowi.
              </div>
              <div className="text-block">
                Mam świadomość, że taka metoda prowadzi do pewnej niechlujności w kodzie i strukturze projektu - i traktuję to jako naturalną konsekwencję eksperymentu. Dla mnie ważniejsze było przetestowanie granic i możliwości tego stylu pracy niż stworzenie perfekcyjnego rozwiązania.
              </div>
              <div className="text-block">
                Jeśli chcesz zobaczyć, jak wygląda "od kuchni", zapraszam do przejrzenia kodu źródłowego na <a href="https://github.com/TMPkl/Portfolio-webside" target="_blank" rel="noopener noreferrer">GitHubie</a>.
              </div>
            </div>
          </div>
        )}
        {activeTab === "contact" && (
          <div>
            <h2 className="tab-title">Contact</h2>
            <p>Here will be your contact information or contact form.</p>
          </div>
        )}
      </div>
      
    </div>
  )
}

// Dodaj komponent Footer na dole pliku
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div>
          © {new Date().getFullYear()} Karol Leszyński. All rights reserved.
        </div>
        <div className="footer-links">
          <a
            href="https://www.instagram.com/kl.eszczyk/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <img src="/icons/INS.svg" alt="Instagram" style={{ width: 28, height: 28 }} />
          </a>
          <span className="footer-sep">|</span>
          <a
            href="https://www.linkedin.com/in/karol-leszy%C5%84ski-1310582a9/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <img src="/icons/LIN.svg" alt="LinkedIn" style={{ width: 28, height: 28 }} />
          </a>
          <span className="footer-sep">|</span>
          <a
            href="https://github.com/TMPkl"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <img src="/icons/GH.svg" alt="GitHub" style={{ width: 28, height: 28 }} />
          </a>
        </div>
      </div>
    </footer>
  );
}

// Owiń Tabs i Footer w domyślnym eksporcie
export default function Page(props) {
  return (
    <>
      <Tabs {...props} />
      <Footer />
    </>
  );
}