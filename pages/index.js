import fs from "fs";
import path from "path";
import Footer from '../components/Footer';
import getTitle from '../components/Title';
import { useState } from 'react';
import Head from 'next/head';
import Tabs from '../components/Tabs';

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
  return (
    <>
      <Head>
        <title>{getTitle(activeTab)}</title>
      </Head>
      <Tabs
        {...props}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Footer />
    </>
  );
}