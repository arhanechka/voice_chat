import React, { useEffect, useState, useContext } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import useAgora from './useAgora';
import MediaPlayer from './MediaPlayer';
import { useRouter } from 'next/router';
import SettingsContext from "../../stores/setingsContext";




// import './Call.css';

const client = AgoraRTC.createClient({ codec: 'h264', mode: 'rtc' });

function Call() {
  const router = useRouter();
  const roomName = router.query.roomName;
  const [ appid, setAppid ] = useState('68f8df76ddf14870b06c08f45c749885');
  const [ token, setToken ] = useState("00668f8df76ddf14870b06c08f45c749885IABop2AquNQm88RkRS2rmhz3aPxwP1VwtdglNNBG4szgRtdZvPUAAAAAEADkNcGeF3wWYQEAAQCnOBVh");
  const [ channel, setChannel ] = useState('voice_test');
  const context = useContext(SettingsContext).settings

  const {
    localAudioTrack, localVideoTrack, leave, join, joinState, remoteUsers
  } = useAgora(client);

  useEffect(()=>{
    console.log(context)
    if (token)
    setToken(context.token)
  },[])

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
        <div className='button-group'>
          <button id='join' type='button' className='btn btn-warning btn-sm' disabled={joinState} onClick={() => {join(appid, channel, token)}}>Join</button>
          <button id='leave' type='button' className='btn btn-warning btn-sm' disabled={!joinState} onClick={() => {leave()}}>Leave</button>
        </div>
      </form>
      <div className='player-container'>
        <div className='local-player-wrapper'>
          <p className='local-player-text'>{localVideoTrack && `localTrack`}{joinState && localVideoTrack ? `(${client.uid})` : ''}</p>
          <MediaPlayer videoTrack={localVideoTrack} audioTrack={localAudioTrack}></MediaPlayer>
        </div>
        {remoteUsers.map(user => (<div className='remote-player-wrapper' key={user.uid}>
            <p className='remote-player-text'>{`remoteVideo(${user.uid})`}</p>
            <MediaPlayer videoTrack={user.videoTrack} audioTrack={user.audioTrack}></MediaPlayer>
          </div>))}
      </div>
    </div>
  );
}

export default Call;
