import { ClerkProvider } from '@clerk/nextjs';
import "@/styles/globals.css";
import Layout from '@/components/Layout'; // make sure this file exists

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ClerkProvider>
  );
}

export default MyApp;
