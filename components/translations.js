import PhotosTab from "./Tabs/PhotoTab";

const translations = {
  en: {
    tabs: {
      about: "About me",
      projects: "Projects",
      photos: "Photos",
      contact: "Contact",
      website: "Website",
    },
    projectsTab: {
      title: "My Projects",
      content: "Overview of selected projects.",
      details: { view: "View", close: "Close", ariaDetails: "Details", repo: "Repository" }
    },
    contactTab: {
      title: "Get in Touch",
      content: "Soon there will be contact details here."
    },
    aboutTab: {
      title: "Hi, I am Karol Leszyński",
      content: "An about me section will be here soon.",
    },
    PhotosTab: {
      title: "My Photography",
      bio: {
        p1: "Hi! I’m Karol and this is my photography portfolio.",
        p2: "Visit my <a href=\"https://www.instagram.com/kl.eszczyk/\" target=\"_blank\" rel=\"noopener noreferrer\">instagram</a> for contact and more."
      }
    },
    websiteTab: {
      title: "About Website",
      lastUpdate: "Last update:",
      updateNote: "Update note:",
      main_content: {
        p1: "This website was created mostly using the vibecoding approach – a style of software development where, instead of writing code yourself, the programmer (or in this case, the \"idea person\") formulates instructions in natural language, and artificial intelligence generates ready-made application fragments based on them. This allows you to focus more on \"what should be created\" rather than \"how to do it\".",
        p2: "This project is an experiment to see how far you can go using only this approach. It's worth noting that before starting, I had no experience in web development – all knowledge and code were created thanks to vibecoding.",
        p3: "I am aware that this method leads to some messiness in the code and project structure – and I treat it as a natural consequence of the experiment. For me, it was more important to test the boundaries and possibilities of this style of work than to create a perfect solution.",
        p4: "If you want to see \"behind the scenes\", feel free to browse the source code on <a href=\"https://github.com/TMPkl/Portfolio-webside\" target=\"_blank\" rel=\"noopener noreferrer\">GitHubie</a>."
      }
    }
  },
  pl: {
    tabs: {
      about: "O mnie",
      projects: "Projekty",
      photos: "Zdjęcia",
      contact: "Kontakt",
      website: "Strona",
    },
    projectsTab: {
      title: "Moje Projekty",
      content: "Przegląd wybranych projektów.",
      details: { view: "Zobacz", close: "Zamknij", ariaDetails: "Szczegóły", repo: "Repozytorium" }
    },
    contactTab: {
      title: "Skontaktuj się ze mną",
      content: "Wkrótce pojawią się tutaj dane kontaktowe."
    },
    aboutTab: {
      title: "Cześć, jestem Karol Leszyński",
      content: "Wkrótce pojawi się tutaj sekcja o mnie.",
    },
    PhotosTab: {
      title: "Moje Prace",
      bio: {
        p1: "Cześć! Nazywam się Karol i to jest moje portfolio fotograficzne.",
        p2: "Odwiedź mój <a href=\"https://www.instagram.com/kl.eszczyk/\" target=\"_blank\" rel=\"noopener noreferrer\">instagram</a>, aby zobaczyć więcej."
      }
    },
    websiteTab: {
      title: "O stronie",
      lastUpdate: "Ostatnia aktualizacja:",
      updateNote: "Opis zmiany:",
      main_content: {
        p1: "Ta strona powstała głównie w oparciu o podejście vibecoding - czyli styl tworzenia oprogramowania, w którym zamiast samodzielnie pisać kod, programista (a w tym przypadku raczej \"pomysłodawca\") formułuje instrukcje w języku naturalnym, a sztuczna inteligencja generuje na ich podstawie gotowe fragmenty aplikacji. Dzięki temu można skupić się bardziej na \"co ma powstać\" niż na \"jak to zrobić\".",
        p2: "Ten projekt jest eksperymentem mającym na celu sprawdzenie, jak daleko można zajść, używając tylko tego podejścia. Warto zauważyć, że przed rozpoczęciem nie miałem doświadczenia w tworzeniu stron internetowych - cała wiedza i kod powstały dzięki vibecoding.",
        p3: "Jestem świadomy, że ta metoda prowadzi do pewnego bałaganu w kodzie i strukturze projektu - traktuję to jako naturalną konsekwencję eksperymentu. Dla mnie ważniejsze było przetestowanie granic i możliwości tego stylu pracy niż stworzenie idealnego rozwiązania.",
        p4: "Jeśli chcesz zobaczyć \"za kulisami\", zapraszam do przeglądania kodu źródłowego na <a href=\"https://github.com/TMPkl/Portfolio-webside\" target=\"_blank\" rel=\"noopener noreferrer\">GitHubie</a>."
      }
    }
  }
};

export default translations;