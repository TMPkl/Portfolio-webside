import AboutTab from '../components/Tabs/AboutTab';
import ProjectsTab from '../components/Tabs/ProjectsTab';
import PhotosTab from '../components/Tabs/PhotoTab';
import WebsiteTab from '../components/Tabs/WebsiteTab';
import ContactTab from '../components/Tabs/ContactTab';
import { useState, useRef, useEffect } from "react"


export default function Tabs({ images = [], commitSha = null, commitDate = null }) {
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
        {activeTab === "about" && <AboutTab />}
        {activeTab === "projects" && <ProjectsTab />}
        {activeTab === "photos" && (
          <PhotosTab images={images} selected={selected} setSelected={setSelected} />
        )}
        {activeTab === "about Website" && <WebsiteTab commitSha={commitSha} commitDate={commitDate} />}
        {activeTab === "contact" && <ContactTab />}
      </div>
      
    </div>
  )
}