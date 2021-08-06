const Pool = require('pg').Pool
const pool = new Pool({
  user: 'testuser',
  host: 'localhost',
  database: 'testdb',
  password: 'root',
  port: 5432,
})

pool.connect();

const getUsers = async () => {
 return pool.query('SELECT * FROM usersdb ORDER BY id ASC', (error, results) => { 

    // if (error) {
    //     console.log(error.message)
    //     // response.status(400).send(error)
    //     return error
    // }
 
    // else {
    let users = {
      users: results.rows
    }
    console.log(users)
    return users
  }
 )}
    // response.send(users)
  

const createUser = (request, response) => {
  const {name, password} = request.body.data
  if (checkIfUserExist(name, password)){
    response.status(201).send({"status": "exist"})
  }
  else {
    pool.query('INSERT INTO usersdb (name, password) VALUES ($1, $2)', [name, password], (error, results) => {
      if (error) {
        console.log("error.message")
        console.log(error.message)
        response.status(400).send(error)
      }
      else {
      response.status(201).send({"status": "created"})
      }
    })
  }
  }

  const getUserByName = (request, response) => {
    console.log(request.query.name)
    const name = request.query.name
    const password = request.query.password
    console.log(name)
    console.log(password)
    pool.query('SELECT * FROM usersdb WHERE name = $1', [name], (error, results) => {
      if (error) {
        console.log(error.message)
        response.status(400).send(error)
      }
      console.log(results)
      response.status(200).json(results)
    })
  }

  const checkIfUserExist = async (name, password) => {  
      await pool.query('SELECT * FROM usersdb WHERE name = $1 AND password = $2', [name, password], (error, results) => {
      if (error) {
        console.log(error.message)
        return false;
      }
      else {
      return true;
      }
    })
  }


module.exports = {
    getUsers,
    createUser,
    getUserByName
  }