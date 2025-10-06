import AboutTab from '../components/Tabs/AboutTab';
import ProjectsTab from '../components/Tabs/ProjectsTab';
import PhotosTab from '../components/Tabs/PhotoTab';
import WebsiteTab from '../components/Tabs/WebsiteTab';
import ContactTab from '../components/Tabs/ContactTab';
import { useRef, useEffect, useState } from "react";
import useDynamicBackground from '../hooks/useDynamicBackground';
import translations from './translations';


export default function Tabs({
  images = [],
  commitSha = null,
  commitDate = null,
  commitMessage = null,
  activeTab,
  setActiveTab,
  language,
}) {
  const fallbackLang = translations.pl;
  const langPack = translations[language] || fallbackLang;
  const tabLabels = langPack.tabs || fallbackLang.tabs;
  const [selected, setSelected] = useState(null); 
  const [scrolled, setScrolled] = useState(false);

  const tabRefs = {
    about: useRef(null),
    projects: useRef(null),
    photos: useRef(null),
    website: useRef(null),
    contact: useRef(null),
  };
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const backgroundRef = useRef(null);

  useDynamicBackground(backgroundRef);

  // Po zamontowaniu komponentu ustaw tab z query stringa (tylko na kliencie)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) { // Próg przewinięcia
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const ref = tabRefs[activeTab];
    if (ref && ref.current) {
      setUnderlineStyle({
        left: ref.current.offsetLeft,
        width: ref.current.offsetWidth,
      });
    }
  }, [activeTab, language]);

  useEffect(() => {
    const updateUnderlinePosition = () => {
      const ref = tabRefs[activeTab];
      if (ref && ref.current) {
        setUnderlineStyle({
          left: ref.current.offsetLeft,
          width: ref.current.offsetWidth,
        });
      }
    };

    // Wywołaj funkcję na zmianę rozmiaru okna
    window.addEventListener("resize", updateUnderlinePosition);

    // Wywołaj funkcję na początkowe renderowanie
    updateUnderlinePosition();

    return () => {
      window.removeEventListener("resize", updateUnderlinePosition);
    };
  }, [activeTab]);

  function slowScrollToTop(duration = 2000) {
  const start = window.scrollY;
  const startTime = performance.now();

  function scrollStep(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, start * (1 - progress));
    if (progress < 1) requestAnimationFrame(scrollStep);
  }
  requestAnimationFrame(scrollStep);
}

  // Funkcja pomocnicza do zmiany zakładki i URL
  const handleTabChange = (tab) => {
    // Delegate state and URL handling to parent via prop
    setActiveTab(tab);
    slowScrollToTop(200); // <-- dodaj to
  };

  return (
    <div ref={backgroundRef} className="background text-main">
      <ul className={`tab-bar${scrolled ? " tab-bar--scrolled" : ""}`}>
        <li className="me-2">
          <button
            ref={tabRefs.about}
            onClick={() => handleTabChange("about")}
            className={`tab-btn${activeTab === "about" ? " active" : ""}`}
          >
            {tabLabels.about}
          </button>
        </li>
        <li className="me-2">
          <button
            ref={tabRefs.projects}
            onClick={() => handleTabChange("projects")}
            className={`tab-btn${activeTab === "projects" ? " active" : ""}`}
          >
            {tabLabels.projects}
          </button>
        </li>
        <li className="me-2">
          <button
            ref={tabRefs.photos}
            onClick={() => handleTabChange("photos")}
            className={`tab-btn${activeTab === "photos" ? " active" : ""}`}
          >
            {tabLabels.photos}
          </button>
        </li>
        <li className="me-2">
          <button
            ref={tabRefs.website}
            onClick={() => handleTabChange("website")}
            className={`tab-btn${activeTab === "website" ? " active" : ""}`}
          >
            {tabLabels.website}
          </button>
        </li>
        <li className="me-2">
          <button
            ref={tabRefs.contact}
            onClick={() => handleTabChange("contact")}
            className={`tab-btn${activeTab === "contact" ? " active" : ""}`}
          >
            {tabLabels.contact}
          </button>
        </li>
        {/* Animowane podkreślenie */}
        <span
          className={`menu-bar${activeTab ? " menu-bar--active" : ""}${scrolled ? " menu-bar--scrolled" : ""}` }
          style={{
            left: underlineStyle.left,
            width: underlineStyle.width,
            pointerEvents: "none",
          }}
        />
      </ul>
      <div className="tab-content">
        {activeTab === "about" && <AboutTab language={language}/>}
        {activeTab === "projects" && <ProjectsTab language={language}/>}
        {activeTab === "photos" && (
          <PhotosTab images={images} selected={selected} setSelected={setSelected} language={language} />
        )}
        {activeTab === "website" && (
          <WebsiteTab
            commitSha={commitSha}
            commitDate={commitDate}
            commitMessage={commitMessage}
            language={language}
          />
        )}
        {activeTab === "contact" && <ContactTab  language={language}/>}
      </div>
      
    </div>
  )
}