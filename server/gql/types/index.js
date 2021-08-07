exports.userTypes = `
type User {
    id: Int,
    name: String,
    password: String
}

input UserInput {
    name: String!,
    password: String!
}
`;
