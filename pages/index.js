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

  return { props: { images } };
}


export default function Page(props) {
  return (
    <>
      <Tabs {...props} />
      <Footer />
    </>
  );
}