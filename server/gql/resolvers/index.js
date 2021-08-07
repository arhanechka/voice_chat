const { getUsers, client, createUser, getUserByName } = require("../../db");

exports.resolvers = {
  user: async ({ input }) => {
    let user = await getUserByName(input);
    return user.rows[0];
  },
  createUser: async ({ input }) => {
    let user = await getUserByName(input);
    if (user.rows.length == 0) {
      await createUser(input);
      user = await getUserByName(input);
    }
    return user.rows[0];
  },
  users: async () => {
    const users = await getUsers();
    return users.rows;
  },
};
