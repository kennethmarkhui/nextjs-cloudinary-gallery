import Head from "next/head";
import Layout from "../components/Layout/Layout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Hui, Chingye Gallery</title>
        <meta name="description" content="Collection of images" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
