import {gql} from 'apollo-boost'

export const GET_USERS = gql`
query Users {users {id, name}}
`

