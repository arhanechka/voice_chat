const { getUsers, client, createUser, getUserByName } = require("../../db");

exports.queryResolvers = {
  user: async (root, { input }) => {
    let user = await getUserByName(input);
    return user.rows[0];
  },
  users: async () => {
      console.log("users")
    const users = await getUsers();
    console.log(users)
    return users.rows;
  },
};

exports.mutationResolvers = {
 
    createUser: async (root, { input }) => {
      let user = await getUserByName(input);
      if (user.rows.length == 0) {
        const resp = await createUser(input);
        console.log(resp)
        user = await getUserByName(input);
      }
      return user.rows[0];
    }
  };
