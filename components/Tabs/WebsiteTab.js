import translations from "../translations";

export default function WebsiteTab({ commitSha, commitDate, commitMessage, language }) {
  const fallbackLang = translations.pl;
  const langPack = translations[language] || fallbackLang;
  const websiteCopy = langPack.websiteTab || fallbackLang.websiteTab;
  const content = websiteCopy.main_content || {};

  const paragraphs = [content.p1, content.p2, content.p3, content.p4].filter(Boolean);
  const formattedDate = commitDate ? new Date(commitDate).toLocaleDateString() : null;
  const shortSha = commitSha ? commitSha.slice(0, 7) : null;
  const updateLabel = websiteCopy.lastUpdate || fallbackLang.websiteTab.lastUpdate;
  const noteLabel = websiteCopy.updateNote || fallbackLang.websiteTab.updateNote;

  return (
    <div>
      <h2 className="tab-title">
        {websiteCopy.title}
      </h2>
      <div className="main-content">
        {paragraphs.map((html, idx) => (
          <div
            key={`website-copy-${idx}`}
            className="text-block"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        ))}
        <div className="text-block-alt">
          {updateLabel}{" "}
          <b>{formattedDate ?? "unable to access DATE"}</b>{shortSha ? ` (${shortSha})` : ""}
          <br />
          {noteLabel}{" "}
          <b>{commitMessage || "unable to access TITLE"}</b>
        </div>
      </div>
    </div>
  );
}