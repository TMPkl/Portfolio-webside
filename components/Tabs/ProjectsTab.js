import translations from "../translations";
import MetroWithDetails from "./Projects/MetroWithDetails";

export default function ProjectsTab({ language = "pl" }) {
  const t = translations[language]?.projectsTab || translations.pl.projectsTab;

  const fallbackStations = [
    { id: "p1", name: "Portfolio", year: "2024", description: "Next.js + Tailwind", longDescription: "Pełne portfolio z SSR i CI/CD." },
    { id: "p2", name: "Blog", description: "MDX, SSR" },
    { id: "p3", name: "Galeria", description: "Lazy-loading zdjęć" }
  ];

  const stations = Array.isArray(t?.stations) && t.stations.length ? t.stations : fallbackStations;

  return (
    <div>
      <h2 className="tab-title">{t?.title || "Projekty"}</h2>
      <div className="main-content">
        <div className="short-text-block">{t?.content || ""}</div>
        <div style={{ marginTop: 24 }}>
          <MetroWithDetails
            key={`metro-${language}`}
            language={language}
            stations={stations}
          />
        </div>
      </div>
    </div>
  );
}