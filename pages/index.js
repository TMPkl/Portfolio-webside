import fs from "fs";
import path from "path";
import Footer from '../components/Footer';
// TABS

//
import Tabs from '../components/Tabs';

export async function getStaticProps() {
  const galleryDir = path.join(process.cwd(), "public/gallery");
  const files = fs.readdirSync(galleryDir);
  const images = files
    .filter((file) => /\.(jpe?g|png|gif|webp)$/i.test(file))
    .map((file) => `/gallery/${file}`);
  let commitSha = null;
  let commitDate = null;
  try {
    const res = await fetch(
      "https://api.github.com/repos/TMPkl/Portfolio-webside/commits/master"
    );
    const data = await res.json();
    commitSha = data.sha ?? null;
    commitDate = data.commit?.committer?.date ?? null;
  } catch (e) {
    // fallback jeśli API nie działa
    commitSha = null;
    commitDate = null;
  }

  return { props: { images, commitSha, commitDate } };
}


export default function Page(props) {
  return (
    <>
      <Tabs {...props} />
      <Footer />
    </>
  );
}