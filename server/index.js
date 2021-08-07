const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const app = express();
const { userTypes } = require("./gql/types");
const { resolvers } = require("./gql/resolvers");

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

// app.get('/users', db.getUsers)
// app.post('/user', db.createUser)
// app.get('/user', db.getUserByName)

const schema = buildSchema(`
${userTypes}
  type Query {
        login: [String]
        user: User
        users: [User]
  }
  type Mutation {
    createUser(input: UserInput): User
  }
  `);

const root = {
  ...resolvers,
};

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.use("/login", cors(corsOptionsDelegate), (req, res) => {
  res.send({
    token: "test123",
  });
});

app.listen(8081, () =>
  console.log("API is running on http://localhost:8081/login")
);
