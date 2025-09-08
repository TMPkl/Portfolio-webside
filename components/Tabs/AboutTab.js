import translations from "../translations";
export default function AboutTab({ language }) {
  return (
    <div>
      <h2 className="tab-title" dangerouslySetInnerHTML={{ __html: translations[language].aboutTab.title }} />
      <div className="main-content">
      <div className="short-text-block" dangerouslySetInnerHTML={{ __html: translations[language].aboutTab.content }} />
    </div>
    </div>
  );
}
