export default function WebsiteTab() {
  return (
    <div>
      <h2 className="tab-title">About Website</h2>
      <div className="gallery-bio">
        <div className="text-block">
          Ta strona powstała w całości w oparciu o podejście vibecoding - czyli styl tworzenia oprogramowania, w którym zamiast samodzielnie pisać kod, programista (a w tym przypadku raczej "pomysłodawca") formułuje instrukcje w języku naturalnym, a sztuczna inteligencja generuje na ich podstawie gotowe fragmenty aplikacji. Dzięki temu można skupić się bardziej na "co ma powstać" niż na "jak to zrobić".
        </div>
        <div className="text-block">
          Ten projekt jest eksperymentem sprawdzającym, jak daleko można zajść, używając wyłącznie takiego podejścia. Warto zaznaczyć, że przed rozpoczęciem prac nie miałem żadnego doświadczenia w web developmencie - cała wiedza i kod powstały właśnie dzięki vibecodingowi.
        </div>
        <div className="text-block">
          Mam świadomość, że taka metoda prowadzi do pewnej niechlujności w kodzie i strukturze projektu - i traktuję to jako naturalną konsekwencję eksperymentu. Dla mnie ważniejsze było przetestowanie granic i możliwości tego stylu pracy niż stworzenie perfekcyjnego rozwiązania.
        </div>
        <div className="text-block">
          Jeśli chcesz zobaczyć, jak wygląda "od kuchni", zapraszam do przejrzenia kodu źródłowego na <a href="https://github.com/TMPkl/Portfolio-webside" target="_blank" rel="noopener noreferrer">GitHubie</a>.
        </div>
      </div>
    </div>
  );
}