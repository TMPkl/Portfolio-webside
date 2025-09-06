import '../styles/globals.css'
import '../styles/photos.css';
import '../styles/footer.css';


export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
