exports.userTypes = `
type User {
    id: Int,
    name: String!,
    password: String!,
    avatar: Int
}

input UserInput {
    name: String!,
    password: String!
}

type AgoraToken {
    token: String!
},


type Channel {
    id: String!,
    name: String!,
    status: Int,
    sign_key: String!,
    vendor_key: String!,
    created: Int
}
`;
