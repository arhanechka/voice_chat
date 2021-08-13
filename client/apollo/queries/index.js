import {gql} from 'apollo-boost'

export const GET_USERS = gql`
query Users {users {id, name}}
`

export const GET_AGORA_TOKEN = gql`
query agoraToken {
  agoraToken {
      token
    }
}
`

