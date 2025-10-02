import PhotosTab from "./Tabs/PhotoTab";

const translations = {
  en: {
    tabs: {
      about: "About me",
      projects: "Projects",
      photos: "Photos",
      contact: "Contact",
    },
    projectsTab: {
      title: "My Projects",
      content: "Overview of selected projects.",
      details: { view: "View", close: "Close", ariaDetails: "Details" },
      stations: [
        { id: "p1", name: "Portfolio", year: "2024", description: "Next.js + Tailwind", longDescription: "Portfolio with SSR and CI/CD." },
        { id: "p2", name: "Blog", description: "MDX, SSR" },
        { id: "p3", name: "Gallery", description: "Image lazy-loading" }
      ]
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
    }
  },
  pl: {
    tabs: {
      about: "O mnie",
      projects: "Projekty",
      photos: "Zdjęcia",
      contact: "Kontakt",
    },
    projectsTab: {
      title: "Moje Projekty",
      content: "Przegląd wybranych projektów.",
      details: { view: "Zobacz", close: "Zamknij", ariaDetails: "Szczegóły" },
      stations: [
        { id: "p1", name: "Portfolio", year: "2024", description: "Next.js + Tailwind", longDescription: "Pełne portfolio z SSR i CI/CD." },
        { id: "p2", name: "Blog", description: "MDX, SSR" },
        { id: "p3", name: "Galeria", description: "Lazy-loading zdjęć" }
      ]
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
    }
  }
};

export default translations;