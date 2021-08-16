const express = require("express");
const cors = require("cors");
const {ApolloServer, gql} = require('apollo-server-express') 
const app = express();
const { userTypes } = require("./gql/types");
const { queryResolvers, mutationResolvers } = require("./gql/resolvers");
const { clientUrl } = require("./config")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./db");

app.use(cors());
var allowlist = [clientUrl];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; 
  } else {
    corsOptions = { origin: false }; 
  }
  callback(null, corsOptions); 
};

const typeDefs = gql`
${userTypes}
  type Query {
        login: [String]
        user: User
        users: [User],
        agoraToken (appId: String, appSert: String, channelName: String): AgoraToken,
        channels: [Channel]
  }
  type Mutation {
    createUser(input: UserInput): User
  }
  `;

const resolvers = {
  Query: {
    ...queryResolvers
  },
  Mutation: {
  ...mutationResolvers,
  }
};

const apolloServer = new ApolloServer({typeDefs, resolvers})
apolloServer.applyMiddleware({app: app})

app.listen(8081, () =>
  console.log("API is running on http://localhost:8081")
);
