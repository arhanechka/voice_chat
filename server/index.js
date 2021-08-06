const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


const db = require('./db')

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

app.get('/users', db.getUsers)
app.post('/user', db.createUser)
app.get('/user', db.getUserByName)

const data = {
    users: [
        {
          id: 1,  
          name: 'Ann',
            password: "ghjhgjhgj"
        },
        {
          id: 2,  
          name: 'Mary',
            age: 41,
            password: "ghjhgjhdfsfgj"
        },

    ]
}

const schema = buildSchema(`
type User {
    id: Int,
    name: String,
    password: String
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
    users:  () => {
      // return data.users
    let users = db.getUsers();
    console.log(users)
      
    users.then(res = console.log(res))
     return users
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
