const { RtcTokenBuilder, RtcRole } = require("agora-access-token");
const axios = require("axios");
const { agoraConfig, axiosConfig } = require("../config");

const generateAccessToken = (appId, appSert, channelName) => {
  uid = 0;
  let role = RtcRole.SUBSCRIBER;
  let expireTime = 3600;
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;
  const token = RtcTokenBuilder.buildTokenWithUid(
    appId,
    appSert,
    channelName,
    uid,
    role,
    privilegeExpireTime
  );
  return token;
};

const getAgoraProjects = () => {
  const plainCredential = agoraConfig.agoraKey + ":" + agoraConfig.agoraSecret;
  encodedCredential = Buffer.from(plainCredential).toString("base64");
  authorizationField = "Basic " + encodedCredential;

  return axios({
    method: "get",
    baseURL: axiosConfig.baseURL,
    url: "/dev/v1/projects",
    headers: {
      Authorization: authorizationField,
      "Content-Type": "application/json",
    },
  });
};

const creatAgoraProject = (name) => {
  const plainCredential = customerKey + ":" + customerSecret;
  encodedCredential = Buffer.from(plainCredential).toString("base64");
  authorizationField = "Basic " + encodedCredential;

  axios({
    method: "post",
    baseURL: axiosConfig.baseURL,
    url: "/dev/v1/projects",
    headers: {
      Authorization: authorizationField,
      "Content-Type": "application/json",
    },
    data: {
      name,
      enable_sign_key: false,
    },
  })
    .then((res) => {
      return res.data.projects;
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = { generateAccessToken, getAgoraProjects, creatAgoraProject };
