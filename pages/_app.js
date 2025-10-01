import '../styles/globals.css'
import '../styles/photos.css';
import '../styles/footer.css';
import '../styles/metro.css';


export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
