const { Pool, Client } = require("pg");
const { dbConfig } = require("../config")

const client = new Client({
  user: dbConfig.user,
  host: dbConfig.host,
  database: dbConfig.database,
  password: dbConfig.password,
  port: dbConfig.port,
});
client.connect();

let query = "SELECT * FROM usersdb ORDER BY id ASC";

const getUsers = () => {
  return client.query(query);
};

const createUser = (user) => {
  const { name, password } = user;
  return client.query("INSERT INTO usersdb (name, password) VALUES ($1, $2)", [
    name,
    password,
  ]);
};

const getUserByName = (user) => {
  const { name, password } = user;
  return client.query("SELECT * FROM usersdb WHERE name = $1", [name]);
};

module.exports = {
  getUsers,
  client,
  createUser,
  getUserByName,
};
