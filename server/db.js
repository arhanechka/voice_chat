const { Pool, Client } = require('pg')

const client = new Client({
  user: 'testuser',
  host: 'localhost',
  database: 'testdb',
  password: 'root',
  port: 5432
})
client.connect()

let query = 'SELECT * FROM usersdb ORDER BY id ASC'

const getUsers = () => {
  return client.query(query);
}

const  createUser = (user) => {
  const {name, password} = user
  console.log(name)
   return client.query('INSERT INTO usersdb (name, password) VALUES ($1, $2)', [name, password])
  } 

    const getUserByName =  (user) => {
      const {name, password} = user
    return client.query('SELECT * FROM usersdb WHERE name = $1', [name])
  }


module.exports = {
  getUsers, 
  client,
  createUser,
  getUserByName
}