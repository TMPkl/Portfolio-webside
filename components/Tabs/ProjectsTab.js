import translations from "../translations";
import MetroWithDetails from "./Projects/MetroWithDetails";
import { getStations } from "./Projects/stations";

export default function ProjectsTab({ language = "pl" }) {
  const t = translations[language]?.projectsTab || translations.pl.projectsTab;
  const stations = getStations(language);
  const detailLabels = t?.details || translations.pl.projectsTab.details;

  return (
    <div>
      <h2 className="tab-title">{t?.title || "Projekty"}</h2>
      <div className="main-content">
        <div className="short-text-block">{t?.content || ""}</div>
      </div>
      <div className="projects-metro-section">
        <MetroWithDetails
          key={`metro-${language}`}
          language={language}
          stations={stations}
          detailLabels={detailLabels}
        />
      </div>
    </div>
  );
}