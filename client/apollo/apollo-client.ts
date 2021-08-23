import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
  ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const uri = "http://localhost:8081/graphql";

const httpLink = new HttpLink({
  uri,
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        if (err.extensions !== undefined) {
          switch (err.extensions.code) {
            case "GRAPHQL_VALIDATION_FAILED":
              const headers = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...headers,
                },
              });
              return forward(operation);
            default:
              console.log("error");
              console.log(err.extensions.code);
          }
        }
      }
    }
  }
);

const client = new ApolloClient<NormalizedCacheObject>({
  cache: new InMemoryCache(),
  headers: {
    authorization:
      typeof window !== "undefined"
        ? window.localStorage.getItem("token") || ""
        : "",
  },
  link: ApolloLink.from([errorLink, httpLink]),
});

export default client;
