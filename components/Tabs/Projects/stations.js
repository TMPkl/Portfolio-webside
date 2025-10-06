const baseStations = [
  {
    id: "p1",
    name: "Start",
  },
  {
    id: "p2",
    name: "NotifyHub",
    repoUrl: "https://github.com/TMPkl/NotifyHub",
    year: 2024,
    techStack: ["C", "Linux"],
  },
  {
    id: "p3",
    name: "PUTboy",
    repoUrl: "https://github.com/stanislawkrowicki/put-ask",
    year: 2025,
    techStack: ["PCB design", "KiCad", "ESP32", "SPI"]
  },
  {
    id: "p4",
    name: "KaRoast",
    year: "pending",
    techStack: ["PCB design", "ESP32", "FreeRTOS", "IoT"],
  },
  {
    id: "p5",
    name: "Lorem Ipsum 5",
    repoUrl: "https://github.com/TMPkl/gallery",
  },
  {
    id: "p6",
    name: "End Point",
  },
];

const localizedDescriptions = {
  en: {
    p1: {
      description: "Start of the project line",
      longDescription: "Initial stop, please prepare for the journey.",
    },
    p2: {
      description: "C-based IPC notification system with producer, dispatcher, and clients",
      longDescription: "A system written in C for inter-process communication (IPC) using notifications. It consists of three main components: producers that send notifications, a dispatcher that manages and routes these notifications, and clients that receive and handle them. The project aims to facilitate efficient communication between different processes on the same machine.",
    },
    p3: {
      description: "Portable retro gaming console with ESP32 and custom PCB",
      longDescription: "A compact, portable gaming console inspired by classic handheld devices. Built around the ESP32 microcontroller, it features a custom-designed PCB with OTA game launcher for seamless games changes.",
    },
    p4: {
      description: "Coffee Roaster Controller",
      longDescription: "Controller for a coffee roaster machine, managing power on heating elements, and recording temperature data for roasting logger. Wireless connectivity for remote monitoring and control.",
    },
    p5: { 
      description: "Lorem Ipsum 5",
    },
    p6: {
      description: "End Point",
      longDescription: "Project line in progress, hopefully more soon.",
    },
  },
  pl: {
    p1: {
      description: "Początek linii projektów",
      longDescription: "Przystanek początkowy, proszę przygotować się na podróż.",
    },
    p2: {
      description: "System powiadomień w C z producentem, dystrybutorem i klientami",
      longDescription: "Projekt związany z kursem Projektowanie Systemowe i Współbieżne. Opisana procedura propagacji informacji Producent->Dystrybutor<->Klient oparta na kolejkach IPC dla napisana dla Linuxa  ",
    },
    p3: {
      description: "Przenośna konsola do gier retro z ESP32 i zaprojektowanym i wykonanym PCB",
      longDescription: "Konsola zbudowana na bazie mikrokontrolera ESP32, z funkcją OTA do zmiany gier za pomocą przeglądarkowego launchera..",
    },
    p4: {
      description: "Lorem Ipsum 4",
    },
    p5: { 
      description: "Lorem Ipsum 5",
    },
    p6: {
      description: "End Point",
      longDescription: "Project line in progress, will be more hopefully soon.",
    },
  },
};

const FALLBACK_LANGUAGE = "pl";

function mergeStationWithLanguage(station, language) {
  const langDict = localizedDescriptions[language] || {};
  const fallbackDict = localizedDescriptions[FALLBACK_LANGUAGE] || {};
  const langEntry = langDict[station.id] || {};
  const fallbackEntry = fallbackDict[station.id] || {};

  return {
    ...station,
    description: langEntry.description ?? fallbackEntry.description ?? "",
    longDescription: langEntry.longDescription ?? fallbackEntry.longDescription,
  };
}

export function getStations(language = FALLBACK_LANGUAGE) {
  return baseStations.map((station) => mergeStationWithLanguage(station, language));
}

export function getAllStations() {
  const languages = Object.keys(localizedDescriptions);
  return languages.reduce((acc, lang) => {
    acc[lang] = getStations(lang);
    return acc;
  }, {});
}

export { baseStations, localizedDescriptions };
