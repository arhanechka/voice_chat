const {RtcTokenBuilder, RtcRole} = require('agora-access-token');

const APP_ID = "68f8df76ddf14870b06c08f45c749885";
const APP_CERTIFICATE = "4ec2400f9ef1460e9d9f1f49c0033b9e";
const CHANNEL_NAME = "voice_test"

 const generateAccessToken = (req, resp) => {
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
  const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, CHANNEL_NAME, uid, role, privilegeExpireTime);
  console.log(token)
  // return the token
//   return resp.json({ 'token': token });
  return token
 };

 module.exports = {generateAccessToken}