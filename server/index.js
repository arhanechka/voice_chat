const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();
const bodyParser = require('body-parser')
const db = require('./db')

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/users', db.getUsers)
app.post('/user', db.createUser)
app.get('/user', db.getUserById)

app.use(cors());
var allowlist = ['http://localhost:3000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}



const data = {
    users: [
        {
            name: 'Ann',
            address: "ghjhgjhgj"
        },
        {
            name: 'Igoe',
            age: 40,
            address: "ghjhgjhdfsfgj"
        },

    ]
}

const schema = buildSchema(`
type User {
    name: String!,
    password: String!,
    id: Int
}

      type Query {
        login: [String]
        user: User
        users: [User]
      }
  `);

const root = {
    login: () => {
      return 'bob', 'jake'
    },
    user: () => {
        return data.users[0]
    },
    users: () => {
        return db.getUsers
    }
  }

  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  }));

app.use('/login', cors(corsOptionsDelegate), (req, res) => {
    res.send({
      token: 'test123'
    });
  });
  
  app.listen(8081, () => console.log('API is running on http://localhost:8081/login'));
