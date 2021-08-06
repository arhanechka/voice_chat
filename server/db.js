const Pool = require('pg').Pool
const pool = new Pool({
  user: 'testuser',
  host: 'localhost',
  database: 'testdb',
  password: 'root',
  port: 5432,
})

pool.connect();


const getUsers = (request, response) => {
  pool.query('SELECT * FROM usersdb ORDER BY id ASC', (error, results) => {
    if (error) {
        console.log(error.message)
        response.status(400).send(error)
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
    const { name, password } = request.body

    pool.query('INSERT INTO usersdb (name, password) VALUES ($1, $2)', [name, password], (error, results) => {
      if (error) {
        console.log(error.message)
        response.status(400).send(error)
      }
      else {
          console.log(results)
      response.status(201).send(results)
      }
    })
  }

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
        console.log(error.message)
        response.status(400).send(error)
      }
      response.status(200).json(results)
    })
  }


module.exports = {
    getUsers,
    createUser,
    getUserById
  }