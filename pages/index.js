import { useState, useRef, useEffect } from "react"

export default function Tabs() {
  const [activeTab, setActiveTab] = useState("about")
  const tabRefs = {
    about: useRef(null),
    projects: useRef(null),
    "about Website": useRef(null),
    contact: useRef(null),
  }
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 })

  useEffect(() => {
    const ref = tabRefs[activeTab]
    if (ref && ref.current) {
      setUnderlineStyle({
        left: ref.current.offsetLeft,
        width: ref.current.offsetWidth,
      })
    }
  }, [activeTab])

  return (
    <div className="bg-all min-h-screen text-main relative text-sm font-medium text-center border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul className="flex  flex-wrap -mb-px justify-center relative">
        <li className="me-2">
          <button
            ref={tabRefs.about}
            onClick={() => setActiveTab("about")}
            className={`inline-block p-4 border-b-2 bg-transparent transition${activeTab === "about" ? " active" : ""}`}
          >
            About me
          </button>
        </li>
        <li className="me-2">
          <button
            ref={tabRefs.projects}
            onClick={() => setActiveTab("projects")}
            className={`inline-block p-4 border-b-2 bg-transparent transition${activeTab === "projects" ? " active" : ""}`}
          >
            Projects
          </button>
        </li>
        <li className="me-2">
          <a
            href="/photos"
            className="inline-block p-4 border-b-2 bg-transparent transition"
            style={{ textDecoration: "none" }}
          >
            Photos
          </a>
        </li>
        <li className="me-2">
          <button
            ref={tabRefs["about Website"]}
            onClick={() => setActiveTab("about Website")}
            className={`inline-block p-4 border-b-2 bg-transparent transition${activeTab === "about Website" ? " active" : ""}`}
          >
            Website
          </button>
        </li>
        <li className="me-2">
          <button
            ref={tabRefs.contact}
            onClick={() => setActiveTab("contact")}
            className={`inline-block p-4 border-b-2 bg-transparent transition${activeTab === "contact" ? " active" : ""}`}
          >
          Contact
          </button>
        </li>
        {/* Animowane podkreślenie */}
        <span
          className={`absolute bottom-0 h-1 menu-bar transition-all duration-300  ${activeTab ? 'menu-bar--active' : ''}`}
          style={{
            left: underlineStyle.left,
            width: underlineStyle.width,
            pointerEvents: "none",
          }}
        />
      </ul>
      <div>
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
        {activeTab === "about Website" && (
          <div>
            <h2 className="tab-title">About Website</h2>
            <p>Here will be your website description, features, etc.</p>
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