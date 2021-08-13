import React, { useEffect, useState, useContext } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from './useAgora';
import MediaPlayer from './MediaPlayer';
import { useRouter } from 'next/router';
import SettingsContext from "../../stores/setingsContext";




// import './Call.css';

const client = AgoraRTC.createClient({ codec: 'vp8', mode: 'rtc' });

function Call() {
  const router = useRouter();
  const roomName = router.query.roomName;
  const [ appid, setAppid ] = useState('68f8df76ddf14870b06c08f45c749885');
  const [ token, setToken ] = useState("00668f8df76ddf14870b06c08f45c749885IABop2AquNQm88RkRS2rmhz3aPxwP1VwtdglNNBG4szgRtdZvPUAAAAAEADkNcGeF3wWYQEAAQCnOBVh");
  const [ channel, setChannel ] = useState('voice_test');
  const context = useContext(SettingsContext).settings
  const [isActiveChannel, setIsActiveChannel] = useState(false)

  const {
    localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers
  } = useAgora(client);

  useEffect(()=>{
    console.log(context)
    if (token)
    setToken(context.token)
  },[])

  const joinChannel = async ()=>{
    const uid = await client.join(appid, channel, token, null);
    console.log(uid)
    setIsActiveChannel(!isActiveChannel)
    // Create an audio track from the audio sampled by a microphone.
    const localAudioTrack = await AgoraRTC.createMicrophoneAudioTrack();
// Publish the local audio track to the channel.
await client.publish([localAudioTrack]);

console.log("publish success!");
client.on("user-unpublished", uid => {
  // Get the dynamically created DIV container.
  const playerContainer = document.getElementById(uid);
  // Destroy the container.
  playerContainer.remove();
});
  }

  const leaveChannel = async ()=>{
    await leave(appid, channel, token)
    setIsActiveChannel(!isActiveChannel)
  }

  return (
    <div className='call'>
      <h1>Welcome to {roomName}!</h1>
      <form className='call-form'>
        <label>
          AppID:
          <input type='text' name='appid' value={appid} onChange={(event) => { setAppid(event.target.value) }}/>
        </label>
        <label>
          Token(Optional):
          <input type='text' name='token' value={token} onChange={(event) => { setToken(event.target.value) }} />
        </label>
        <label>
          Channel:
          <input type='text' name='channel' value={channel} onChange={(event) => { setChannel(event.target.value) }} />
        </label>
      </form>
      <div className='player-container'>
        <div className='local-player-wrapper'>
          <button disabled={!isActiveChannel} onClick={()=>joinChannel()}>Join</button>
          <button disabled={isActiveChannel} onClick={()=>leaveChannel()}>Leave</button>

      </div>
    </div>
    </div>
  );
}

export default Call;
