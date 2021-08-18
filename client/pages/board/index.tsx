import React, { useState, useEffect, useContext } from "react";
import VoiceRoomCard from "../../components/LiveRoomBadge";
import { GET_CHANNELS } from "../../apollo/queries";
import { useQuery } from "@apollo/client";
import SettingsContext from "../../stores/setingsContext";
import useSettings from "../../stores/useSettings";

const ChatBoard = () => {
  const { settings, saveSettings } = useSettings();
  const [value, setValue] = useState("Voice Chat");
  const [channels, setChannels] = useState();

  const context = useContext(SettingsContext).settings;

  const {
    loading: load,
    error: err,
    data: datachannels,
  } = useQuery(GET_CHANNELS, {
    onCompleted: () => setChannels(datachannels.channels),
  });

  useEffect(() => {
    if (datachannels)
      saveSettings({
        user: context.user,
        logged: context.logged,
        channels: datachannels.channels,
      });
  }, [datachannels]);

  if (load) return <div>Loading...</div>;

  const channelslist = datachannels ? (
    datachannels.channels.map((el) => (
      <div className="mb-3" key={el.id}>
        <VoiceRoomCard
          title={el.name}
          descr="Want to learn more about how Career Karma?"
          id={el.id}
          channel={el}
        />
      </div>
    ))
  ) : (
    <div></div>
  );

  if (!context.logged)
    return (
      <div className="lead text-center mt-4">
        Please, Sign in for using Voice chats
      </div>
    );

  return (
    <div>
      <section className="section-title">
        <div className="px-2"></div>
      </section>
      <h1>Welcome, {context.user.name}</h1>
      <div className="bwm-form">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="h3">Live rooms on air</h1>
            {channelslist}
          </div>
        </div>
      </div>
    </div>
  );
};

ChatBoard.getInitialProps = async ({ query }) => {
  return { query };
};

export default ChatBoard;
