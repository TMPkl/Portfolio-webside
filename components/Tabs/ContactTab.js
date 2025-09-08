import translations from "../translations";
export default function ContactTab({ language }) {
  return (
    <div>
      <h2 className="tab-title" dangerouslySetInnerHTML={{ __html: translations[language].contactTab.title }} />
      <div className="main-content">
        <div className="short-text-block" dangerouslySetInnerHTML={{ __html: translations[language].contactTab.content }} />
      </div>
    </div> 
  );
}