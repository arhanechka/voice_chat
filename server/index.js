const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const app = express();
const { queryResolvers, mutationResolvers } = require("./gql/resolvers");
const { typeDefs } = require("./gql/typeDefs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const resolvers = {
  Query: {
    ...queryResolvers,
  },
  Mutation: {
    ...mutationResolvers,
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.applyMiddleware({ app: app });

app.listen(8081, () => console.log("Server is running on http://localhost:8081"));
