const express = require("express");
const cors = require("cors");
const {ApolloServer, gql} = require('apollo-server-express') 
const app = express();
const { userTypes } = require("./gql/types");
const { queryResolvers, mutationResolvers } = require("./gql/resolvers");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./db");

app.use(cors());
var allowlist = ["http://localhost:3000"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

const typeDefs = gql`
${userTypes}
  type Query {
        login: [String]
        user: User
        users: [User]
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
  console.log("API is running on http://localhost:8081/login")
);
