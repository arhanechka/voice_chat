const express = require("express");
const cors = require("cors");
const {ApolloServer, gql} = require('apollo-server-express') 
const app = express();
const { userTypes } = require("./gql/types");
const { queryResolvers, mutationResolvers } = require("./gql/resolvers");
const {generateAccessToken} = require("./agora/index")

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

const nocache = (req, resp, next) => {
  resp.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  resp.header('Expires', '-1');
  resp.header('Pragma', 'no-cache');
  next();
};

const typeDefs = gql`
${userTypes}
  type Query {
        login: [String]
        user: User
        users: [User],
        agoraToken: AgoraToken
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

// app.get('/', ()=>{console.log("root")});

// app.get('/access_token', nocache, generateAccessToken);

const apolloServer = new ApolloServer({typeDefs, resolvers})
apolloServer.applyMiddleware({app: app})



app.listen(8081, () =>
  console.log("API is running on http://localhost:8081")
);
