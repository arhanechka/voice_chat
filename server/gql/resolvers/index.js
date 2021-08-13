const { getUsers, client, createUser, getUserByName } = require("../../db");
const { generateAccessToken } = require("../../agora/index")

exports.queryResolvers = {
  user: async (root, { input }) => {
    let user = await getUserByName(input);
    return user.rows[0];
  },
  users: async () => {
    console.log("users");
    const users = await getUsers();
    console.log(users);
    return users.rows;
  },
  agoraToken: async () => {
    const token = await generateAccessToken();
    return {token: token}
  },
};

exports.mutationResolvers = {
  createUser: async (root, { input }) => {
    let user = await getUserByName(input);
    if (user.rows.length == 0) {
      const resp = await createUser(input);
      user = await getUserByName(input);
    }
    return user.rows[0];
  },
};
