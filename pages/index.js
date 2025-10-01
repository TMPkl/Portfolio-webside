import fs from "fs";
import path from "path";
import Footer from '../components/Footer';
import getTitle from '../components/Title';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Tabs from '../components/Tabs';
import { useRouter } from 'next/router'; // dodaj ten import

export async function getStaticProps() {
  const galleryDir = path.join(process.cwd(), "public/gallery");
  const files = fs.readdirSync(galleryDir);
  const images = files
    .filter((file) => /\.(jpe?g|png|gif|webp)$/i.test(file))
    .map((file) => `/gallery/${file}`);
  let commitSha = null;
  let commitDate = null;
  let commitMessage = null;
  try {
    const res = await fetch(
      "https://api.github.com/repos/TMPkl/Portfolio-webside/commits/master"
    );
    const data = await res.json();
    commitSha = data.sha ?? null;
    commitDate = data.commit?.committer?.date ?? null;
    commitMessage = data.commit?.message ?? null;
  } catch (e) {
    // fallback jeśli API nie działa
    commitSha = null;
    commitDate = null;
    commitMessage = null;
  }

  return { props: { images, commitSha, commitDate, commitMessage } };
}


export default function Page(props) {
  const [activeTab, setActiveTab] = useState('about');
  const [language, setLanguage] = useState('pl');
  const router = useRouter();

  // Ustaw język i zakładkę na podstawie query stringa przy pierwszym renderze
  useEffect(() => {
    if (router.isReady) {
      const { tab, lang } = router.query;
      if (tab && typeof tab === "string") setActiveTab(tab);
      if (lang && typeof lang === "string") setLanguage(lang);
    }
  }, [router.isReady, router.query]);

  // Funkcja do zmiany języka i aktualizacji URL
  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, lang, tab: activeTab },
      },
      undefined,
      { shallow: true }
    );
  };

  // Funkcja do zmiany zakładki i aktualizacji URL (przekaż ją do Tabs)
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, tab, lang: language },
      },
      undefined,
      { shallow: true }
    );
  };

  // Background preloader: gently warm the cache after page becomes idle
  useEffect(() => {
    const imgs = props.images || [];
    if (!imgs.length) return;

    // Respect user preferences and very slow connections
    const conn = typeof navigator !== 'undefined' && navigator.connection;
    const saveData = conn && (conn.saveData || false);
    const isVerySlow = conn && typeof conn.effectiveType === 'string' && /(^|\b)(slow-2g|2g)(\b|$)/i.test(conn.effectiveType);
    if (saveData || isVerySlow) return;

    const preloadRest = () => {
      // Skip the ones we already preloaded in <Head>
      imgs.slice(4).forEach((src) => {
        const img = new Image();
        try { img.fetchPriority = 'low'; } catch (e) {}
        img.decoding = 'async';
        img.loading = 'eager';
        img.src = src;
      });
    };

    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(preloadRest, { timeout: 3000 });
      return () => window.cancelIdleCallback && window.cancelIdleCallback(id);
    }
    const t = window.setTimeout(preloadRest, 800);
    return () => window.clearTimeout(t);
  }, [props.images]);

  return (
    <>
      <Head>
        <title>{getTitle(activeTab)}</title>
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="description" content="Karol Leszyński photography portfolio and IT projects. Explore creative photos and innovative tech solutions in one place." />

        {/* Preload a few top gallery images for faster first paint when opening Photos tab */}
        {(props.images || []).slice(0, 4).map((src, i) => (
          <link key={`preload-img-${i}`} rel="preload" as="image" href={src} />
        ))}
      </Head>

      <div className="language-button-container">
        <button
          className={`language-switch-btn${language === 'pl' ? ' active' : ''}`}
          onClick={() => handleLanguageChange('pl')}
          type="button"
        >
          PL
        </button>
        
        <button
          className={`language-switch-btn${language === 'en' ? ' active' : ''}`}
          onClick={() => handleLanguageChange('en')}
          type="button"
        >
          EN
        </button>
      </div>

      <Tabs
        {...props}
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        language={language}
      />
      <Footer />
    </>
  );
}