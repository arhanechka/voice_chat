import axios from 'axios'
import { response } from 'express'
// import { gql, useMutation } from '@apollo/client';


const API_URL = 'http://localhost:8081'

// const LOGIN = gql`
//   mutation createUser($name: String!, $password: String!) {
//     createUser(name: $name, password: $password) {
//       id
//       name
//       password
//     }
//   }
// `;

export const login = async (name: string, password: string) => {
  // let query = `mutation createUser {
  //   createUser(input: {name: "${name}", password: "${password}"}){
  //     name,
  //     password,
  //     id
  //   }
  // }`
  // console.log(name)
  // console.log(password)
  //  let res =  await axios
  //     .post(`${API_URL}/graphql`, {query
  //       })
  //       console.log("res.data.data.createUser")

  //       console.log(res.data.data.createUser)
  //       return res.data.data.createUser
      
      // .then((response) => {
      //  console.log(response.data);
      // })
      // .catch((error)=>{
      //   console.log(error)
      // });
}

export const getUsers = async (query) => {
  console.log(query)
  let res;
   res =  await axios
      .post(`${API_URL}/graphql`, {
        query
      })
      return res.data.data.users
}