import Head from "next/head";
import React from "react";

globalThis.React = React;

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="http://localhost:3002/web/remoteEntry.js" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
