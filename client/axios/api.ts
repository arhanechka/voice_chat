import axios from 'axios'
import { response } from 'express'


const API_URL = 'http://localhost:8081'

export const login = async (name: string, password: string) => {
  console.log(name)
  console.log(password)
    await axios
      .post(`${API_URL}/user`, {
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          name: name,
          password: password
        },
      })
      .then((response) => {
       console.log(response.data);
      })
      .catch((error)=>{
        console.log(error)
      });
}

export const getUsers = async (query) => {
  let res;
    return axios
      .post(`${API_URL}/graphql`, {
        query
      })
      .then(response => 
        response.data)
      .then(data => data.data)
      .then(data => data.users)
      .then(users => {
        console.log(users)
        return users})
      .catch((error)=>{
        console.log(error)
      });
      return res
}