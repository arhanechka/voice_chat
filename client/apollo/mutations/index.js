import { gql } from "apollo-boost";

export const LOGIN_USER = gql`
  mutation createUser($name: String!, $password: String!) {
    createUser(input: { name: $name, password: $password }) {
      name
      password
      id
ß    }
  }
`;
