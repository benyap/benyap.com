import { AppProps } from "next/app";
import Head from "next/head";

import { useAnalytics, useFirebase } from "~/hooks/firebase";

import "../styles/global.css";

export default function App({ Component, pageProps }: AppProps) {
  useFirebase();
  useAnalytics();

  return (
    <>
      <Head>
        <title>Ben Yap - benyap.com</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
