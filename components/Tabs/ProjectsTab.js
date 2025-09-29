import translations from "../translations";
export default function ProjectsTab({ language }) {
  return (
    <div>
      <h2 className="tab-title" dangerouslySetInnerHTML={{ __html: translations[language].projectsTab.title }} />
      <div className="main-content">
        <div className="short-text-block" dangerouslySetInnerHTML={{ __html: translations[language].projectsTab.content }} />
      </div>
    </div>
  );
}