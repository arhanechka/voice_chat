const { getUsers, client, createUser, getUserByName } = require("../../db");
const { generateAccessToken } = require("../../agora/index");
const { getRandomAvatarName } = require("../../utils/utils");
const { ValidationError } = require("apollo-server-express");
const { getAgoraProjects } = require("../../agora/index");

exports.queryResolvers = {
  user: async (root, { input }) => {
    let resp = await getUserByName(input);
    let user = resp.rows[0];
    user.avatar = getRandomAvatarName();
    console.log(user);
    return user;
  },
  users: async () => {
    const users = await getUsers();
    return users.rows;
  },

  agoraToken: async (root, args) => {
    const token = await generateAccessToken(
      args.appId,
      args.appSert,
      args.channelName
    );
    return { token: token };
  },

  channels: async () => {
    const channels = await getAgoraProjects();
    return channels.data.projects;
  },
};

exports.mutationResolvers = {
  createUser: async (root, { input }) => {
    let user = await getUserByName(input);
    if (user.rows.length == 0) {
      const resp = await createUser(input);
      user = await getUserByName(input);
    }
    if (user.rows[0].password !== input.password)
      throw new ValidationError("Invalid password value!").message;
    else {
      let newUser = user.rows[0];
      newUser.avatar = getRandomAvatarName();
      return newUser;
    }
  },
};
