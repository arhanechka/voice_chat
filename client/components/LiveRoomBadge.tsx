import Link from "next/link";
import { useState, useContext } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_AGORA_TOKEN } from "../apollo/queries";
import useSettings from "../stores/useSettings";
import SettingsContext from "../stores/setingsContext";
import { useEffect } from "react/cjs/react.development";
import { getRandomAvatarName } from "../utils/utils";

const VoiceRoomCard = (props) => {
  const [roomName, setRoomName] = useState("");
  const [channel, setChannel] = useState();

  const {
    loading: load,
    error: err,
    data: dat,
  } = useQuery(GET_AGORA_TOKEN, {
    variables: {
      appId: props.channel.vendor_key,
      appSert: props.channel.sign_key,
      channelName: props.channel.name,
    },
    // onCompleted: () => setToken(dat.agoraToken.token),
  });

  const { settings, saveSettings } = useSettings();
  const context = useContext(SettingsContext).settings;

  useEffect(() => {
    if (dat) {
      let token = dat.agoraToken.token;
      let channel = { ...props.channel, token };
      setChannel(channel);
      const newChannelsList = context.channels.map((o) => {
        if (o.id === channel.id) {
          return channel;
        }
        return o;
      });
      saveSettings({
        user: context.user,
        logged: context.logged,
        channels: newChannelsList,
      });
      console.log(context)
    }
    
  }, [dat, load, err]);

  return (
    <div className="card subtle-shadow no-border">
      <div className="card-body">
        <h5 className="card-title"></h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.title}</h6>
        <p className="card-text fs-2">{props.descr}</p>
      </div>
      <div className="card-footer no-border">
        <Link
          href={{
            pathname: "/agora/call",
            query: {
              roomName: roomName ? roomName : props.title,
              channelId: props.id,
            },
          }}>
          <button className="btn btn-warning">
            <small>Join</small>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VoiceRoomCard;
