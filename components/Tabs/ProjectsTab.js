import translations from "../translations";
import MetroLine from "../MetroLine";

export default function ProjectsTab({ language }) {
  const demoStations = [
    { id: "p1", name: "Portfolio", description: "Next.js + Tailwind" },
    { id: "p2", name: "Blog", description: "MDX, SSR" },
    { id: "p3", name: "Galeria", description: "Lazy-loading zdjęć" },
    { id: "p4", name: "API", description: "Node/Express" },
    { id: "p5", name: "Aplikacja Mobilna", description: "React Native" },
    { id: "p6", name: "Panel Admina", description: "Auth, RBAC" },
    { id: "p7", name: "Monitoring", description: "Grafana/Prometheus" },
    { id: "p8", name: "CI/CD", description: "GitHub Actions" },
  ];

  return (
    <div>
      <h2
        className="tab-title"
        dangerouslySetInnerHTML={{ __html: translations[language].projectsTab.title }}
      />
      <div className="main-content">
        <div
          className="short-text-block"
          dangerouslySetInnerHTML={{ __html: translations[language].projectsTab.content }}
        />

        {/* Metro-style timeline for projects */}
        <div style={{ marginTop: 24 }}>
          <MetroLine stations={demoStations} cols={4} />
        </div>
      </div>
    </div>
  );
}