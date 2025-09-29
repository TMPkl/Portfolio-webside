import translations from "../translations"; 
export default function WebsiteTab({ commitSha, commitDate, commitMessage, language }) {
  return (
    <div>
      <h2 className="tab-title" >
        {translations[language].websiteTab.title}
      </h2>
      <div className="main-content">
            <div className="text-block" dangerouslySetInnerHTML={{ __html: translations[language].websiteTab.main_content.p1 }}/>
            <div className="text-block" dangerouslySetInnerHTML={{ __html: translations[language].websiteTab.main_content.p2 }}/>
            <div className="text-block" dangerouslySetInnerHTML={{ __html: translations[language].websiteTab.main_content.p3 }}/>
            <div className="text-block" dangerouslySetInnerHTML={{ __html: translations[language].websiteTab.main_content.p4 }}/>
        <div className="text-block-alt">
          {translations[language].websiteTab.lastUpdate}{" "}
          <b>{commitDate ? new Date(commitDate).toLocaleDateString() : "unable to access DATE"}</b>{" "}
          {commitSha ? commitSha.slice(0, 7) : ""}{" "}
          <br/>
          {translations[language].websiteTab.updateNote}{" "}
          <b>{commitMessage ? `${commitMessage}` : "unable to access TITLE"}</b>{" "}
        </div>
      </div>
    </div>
  );
}