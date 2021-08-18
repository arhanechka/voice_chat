import React, { useEffect, useState, useContext } from 'react';
import useAgora from './useAgora';
import MediaPlayer from './MediaPlayer';
import { useRouter } from 'next/router';
import SettingsContext from "../../stores/setingsContext.js";
import { getRandomAvatarName } from '../../utils/utils';
import Image from 'next/image'
import { client } from '../../agora/index'
import{ IAgoraRTCRemoteUser } from 'agora-rtc-sdk-ng';

interface IChannel {
  id: string,
  name: string,
  sign_key: string,
  vendor_key: string,
  status: number,
  token: string
}


function Call() {
  const router = useRouter();
  const roomName = router.query.roomName;
  const channelId = router.query.channelId
  const context = useContext(SettingsContext).settings
  const [users, setUsers] = useState<IAgoraRTCRemoteUser[]>()
  const [channel, setChannel] = useState<IChannel>()

  const {
    localAudioTrack, leave, join, joinState, remoteUsers
  } = useAgora(client);

  useEffect(()=>{
    const channelF = context.channels.filter(el => {
      return el.id === channelId
    })
    setChannel(channelF[0])
  },[])

  useEffect(()=>{
    setUsers(client.remoteUsers)
  })

  const joinChannel = ()=>{
      join(channel.vendor_key, channel.name, channel.token)
  }

  return (
    <div className='call'>
      <h1>Welcome to {roomName}!</h1>
      <div className='button-group'>
          <button id='join' type='button' className='btn btn-warning btn-sm' disabled={joinState} onClick={() => joinChannel()}>Join</button>
          <button id='leave' type='button' className='btn btn-warning btn-sm' disabled={!joinState} onClick={() => {leave()}}>Leave</button>
        </div>
      <div className='player-container'>
        <div className='local-player-wrapper'>
          <p className='local-player-text'>{joinState ? `(${client.uid})` : ''}</p>
          <Image 
            src={require(`../../assets/${context.user.avatar}.png`)}
            width={50}
            height={50} />
          <MediaPlayer audioTrack={localAudioTrack}></MediaPlayer>
        </div>
        {remoteUsers.map(user => (<div className='remote-player-wrapper' key={user.uid}>
            <p className='remote-player-text'>{`User(${user.uid})`}</p>
            <Image key={user.uid} 
            src={require(`../../assets/${getRandomAvatarName()}.png`)}
            width={50}
            height={50} />
            <MediaPlayer audioTrack={user.audioTrack}></MediaPlayer>
          </div>))}
      </div>
    </div>
  );
}

export default Call;
