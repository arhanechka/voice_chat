import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const uri = "http://localhost:8081/graphql";

const client = new ApolloClient({
  link: new HttpLink({
    uri,
  }),
  cache: new InMemoryCache(),
  onError: ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case "GRAPHQL_VALIDATION_FAILED":
            const headers = operation.getContext().headers;
            operation.setContext({
              headers: {
                ...headers,
                authorization: getNewToken(),
              },
            });
            return forward(operation);
          default:
            console.log("error");
            console.log(err.extensions.code);
        }
      }
    }
  },
});

export default client;
