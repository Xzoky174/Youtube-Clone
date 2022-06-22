import Head from "next/head";
import "../styles/globals.css";
import Navbar from "./components/Navbar";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/icon.svg" />
      </Head>

      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default App;
