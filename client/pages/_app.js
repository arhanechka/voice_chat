import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { SettingsProvider } from "../stores/setingsContext";
import { CookiesProvider } from "react-cookie";

import "../styles/index.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const client = new ApolloClient({
  uri: "http://localhost:8081/graphql",
});
function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <SettingsProvider>
        <ApolloProvider client={client}>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </ApolloProvider>
      </SettingsProvider>
    </CookiesProvider>
  );
}
export default MyApp;
