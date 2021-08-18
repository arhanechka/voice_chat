import { ApolloProvider } from "@apollo/client";
import { SettingsProvider } from "../stores/setingsContext";
import { CookiesProvider } from "react-cookie";
import client from "../apollo/apollo-client";

import "../styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <CookiesProvider>
        <SettingsProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </SettingsProvider>
      </CookiesProvider>
    </ApolloProvider>
  );
}
export default MyApp;
