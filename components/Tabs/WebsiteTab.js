export default function WebsiteTab({ commitSha, commitDate, commitMessage, language }) {
  return (
    <div>
      <h2 className="tab-title">
        {language === 'en' ? 'About Website' : 'O stronie'}
      </h2>
      <div className="gallery-bio">
        {language === 'en' ? (
          <>
            <div className="text-block">
              This website was created mostly using the vibecoding approach – a style of software development where, instead of writing code yourself, the programmer (or in this case, the "idea person") formulates instructions in natural language, and artificial intelligence generates ready-made application fragments based on them. This allows you to focus more on "what should be created" rather than "how to do it".
            </div>
            <div className="text-block">
              This project is an experiment to see how far you can go using only this approach. It's worth noting that before starting, I had no experience in web development – all knowledge and code were created thanks to vibecoding.
            </div>
            <div className="text-block">
              I am aware that this method leads to some messiness in the code and project structure – and I treat it as a natural consequence of the experiment. For me, it was more important to test the boundaries and possibilities of this style of work than to create a perfect solution.
            </div>
            <div className="text-block">
              If you want to see "behind the scenes", feel free to browse the source code on{" "}
              <a
                href="https://github.com/TMPkl/Portfolio-webside"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </div>
          </>
        ) : (
          <>
            <div className="text-block">
              Ta strona powstała głównie w oparciu o podejście vibecoding - czyli styl
              tworzenia oprogramowania, w którym zamiast samodzielnie pisać kod, programista (a
              w tym przypadku raczej "pomysłodawca") formułuje instrukcje w języku naturalnym, a
              sztuczna inteligencja generuje na ich podstawie gotowe fragmenty aplikacji. Dzięki
              temu można skupić się bardziej na "co ma powstać" niż na "jak to zrobić".
            </div>
            <div className="text-block">
              Ten projekt jest eksperymentem sprawdzającym, jak daleko można zajść, używając
              wyłącznie takiego podejścia. Warto zaznaczyć, że przed rozpoczęciem prac nie miałem
              żadnego doświadczenia w web developmencie - cała wiedza i kod powstały właśnie
              dzięki vibecodingowi.
            </div>
            <div className="text-block">
              Mam świadomość, że taka metoda prowadzi do pewnej niechlujności w kodzie i
              strukturze projektu - i traktuję to jako naturalną konsekwencję eksperymentu. Dla
              mnie ważniejsze było przetestowanie granic i możliwości tego stylu pracy niż
              stworzenie perfekcyjnego rozwiązania.
            </div>
            <div className="text-block">
              Jeśli chcesz zobaczyć, jak wygląda "od kuchni", zapraszam do przejrzenia kodu
              źródłowego na{" "}
              <a
                href="https://github.com/TMPkl/Portfolio-webside"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHubie
              </a>
              .
            </div>
            <div className="text-block" style={{
                textIndent: 0
            }}>
              <div style={{ fontSize: 20, opacity: 0.8, marginBottom: 8 }}>
                ToDo:

                <div style={{ height: 8 }}></div>

                <ul>
                  <li> - Dodać translations.js</li>
                  <li> - Zakładka "About me"</li>
                  <li> - Zakładka "Projects"</li>
                  <li> - Zakładka "Contact"</li>
                  <li> - Poprawić kolorki</li>
                  <li> - Wyłączyć indeksowanie dal cloud</li>
                  <li> - Dodać ciemny motyw</li>
                </ul>
                </div>
            </div>
          </>
        )}
        <div className="text-block-alt">
          {language === 'en' ? 'Last update:' : 'Ostatnia aktualizacja:'}{" "}
          <b>{commitDate ? new Date(commitDate).toLocaleDateString() : "unable to access DATE"}</b>{" "}
          {commitSha ? commitSha.slice(0, 7) : ""}{" "}
          <br/>
          {language === 'en' ? "Update note:" : "Opis zmiany:"}{" "}
          <b>{commitMessage ? `${commitMessage}` : "unable to access TITLE"}</b>{" "}
        </div>
      </div>
    </div>
  );
}