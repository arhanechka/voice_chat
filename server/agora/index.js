const {RtcTokenBuilder, RtcRole} = require('agora-access-token');
const axios = require('axios')
const { agoraConfig } = require("../config")

 const generateAccessToken = (appId, appSert, channelName) => {

    // resp.header('Acess-Control-Allow-Origin', '*');
  // get channel name
//   const channelName = "voice_test";
//   if (!channelName) {
//     return resp.status(500).json({ 'error': 'channel is required' });
//   }
  // get uid 
//   let uid = req.query.uid;
//   if(!uid || uid == '') {
    uid = 0;
//   }
  // get role
  let role = RtcRole.SUBSCRIBER;
//   if (req.query.role == 'publisher') {
//     role = RtcRole.PUBLISHER;
//   }
  // get the expire time
//   let expireTime = req.query.expireTime;
//   if (!expireTime || expireTime == '') {
   let expireTime = 3600;
//   } else {
//     expireTime = parseInt(expireTime, 10);
//   }
  // calculate privilege expire time
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;
  // build the token
  const token = RtcTokenBuilder.buildTokenWithUid(appId, appSert, channelName, uid, role, privilegeExpireTime);
  console.log(token)
  // return the token
//   return resp.json({ 'token': token });
  return token
 };

 const getAgoraProjects = ()=>{
  const plainCredential = agoraConfig.agoraKey + ":" + agoraConfig.agoraSecret
  encodedCredential = Buffer.from(plainCredential).toString('base64')
  authorizationField = "Basic " + encodedCredential
  
  return axios({
    method: 'get',
    baseURL: 'http://api.agora.io',
    url: '/dev/v1/projects',
    headers: {'Authorization':authorizationField,
  'Content-Type': 'application/json'},  
  })
  // .then(res => {
  //   console.log(`statusCode: ${res.status}`)
  //   console.log(res.data.projects)
  //   return res.data.projects
  // })
  // .catch(error => {
  //   console.error(error)
  // })
 }

 const creatAgoraProject = (name)=>{
  const plainCredential = customerKey + ":" + customerSecret
  encodedCredential = Buffer.from(plainCredential).toString('base64')
  authorizationField = "Basic " + encodedCredential
  
  axios({
    method: 'post',
    baseURL: 'http://api.agora.io',
    url: '/dev/v1/projects',
    headers: {'Authorization':authorizationField,
  'Content-Type': 'application/json'},  
  data: {
    name: 'testPr',
    enable_sign_key: false
  },
  })
  .then(res => {
    console.log(`statusCode: ${res.status}`)
    console.log(res.data.projects)
    return res.data.projects
  })
  .catch(error => {
    console.error(error)
  })
 }


 module.exports = {generateAccessToken, getAgoraProjects, creatAgoraProject}