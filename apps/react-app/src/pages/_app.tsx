import { AppProps } from 'next/app';
import Head from 'next/head';
import Providers from '@/components/Providers/Providers';

import '@/styles/globals.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Earthquake Stats</title>
      </Head>
      <main className="app">
        <Providers>
          <Component {...pageProps} />
        </Providers>
      </main>
    </>
  );
}

export default CustomApp;
