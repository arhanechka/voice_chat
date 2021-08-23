const { userTypes } = require("./types/index")
const {gql} = require('apollo-server-express') 

const typeDefs = gql`
${userTypes}
  type Query {
        login: [String]
        user: User
        users: [User],
        agoraToken (appId: String, appSert: String, channelName: String): AgoraToken,
        channels: [Channel]
  }
  type Mutation {
    createUser(input: UserInput): User
  }
  `;

  module.exports = {typeDefs}