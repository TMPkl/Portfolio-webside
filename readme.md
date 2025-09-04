# Portfolio Website

## About the project

This is an experimental portfolio website built with Next.js and Tailwind CSS.  
The project was created as a practical test of building web applications by someone with no prior experience in web development.  
The entire site was made in the spirit of **"vibecoding"** – coding without a strict plan, relying heavily on AI tools for code generation, problem solving, and learning on the go.

## Features

- **Tabs:** Switch between sections (About me, Projects, Website, Contact, Photos).
- **Photo gallery:** Responsive masonry-style gallery with lightbox.
- **Responsive design:** The site adapts to different screen sizes.
- **Clean, readable code:** Most styles are moved to CSS files.
- **GitHub API integration:** The website fetches and displays the latest commit SHA and date from the GitHub repository using the GitHub API.

## The "vibecoding" experiment

This project is an **experiment** – I’m testing how far you can go in web development relying almost entirely on AI (e.g., GitHub Copilot, ChatGPT, Cloud and many more) without previous experience in this field.  
The goal is to see if you can create a functional website "mindlessly", relying on suggestions and automation rather than your own knowledge.

## How to run the project

1. Clone the repository:
   ```
   git clone https://github.com/TMPkl/Portfolio-webside.git
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Run the project:
   ```
   npm run dev
   ```
4. Open in your browser: [http://localhost:3000](http://localhost:3000)

## Project structure

- `pages/` – Next.js page files (`index.js`, `_app.js`)
- `styles/` – global and page-specific CSS files
- `public/gallery/` – images for the gallery
- `components/` – React components used throughout the project:
  - `Footer.js`
  - `Tabs.js`
  - `Tabs/`
    - `AboutTab.js`
    - `ContactTab.js`
    - `PhotoTab.js`
    - `ProjectsTab.js`
    - `WebsiteTab.js`

## Note

This project is **experimental** and was created mainly for educational and testing purposes.  
The code may contain unusual solutions, and the whole thing was made in the spirit of "learning by doing" with AI.

**GitHub API:**  
The website uses the GitHub API to automatically display the latest commit information (SHA and date) from the repository. If the API is unavailable, fallback information is shown.

---

**Author:** TMPkl