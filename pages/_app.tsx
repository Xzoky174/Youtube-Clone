import Head from "next/head";
import "../styles/globals.css";
import Navbar from "./components/Navbar";
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Head>
        <link rel="icon" href="/icon.svg" />
      </Head>

      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default App;
