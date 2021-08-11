import React, { useState, useEffect, useContext } from "react";
import VoiceRoomCard from "../../components/LiveRoomBadge";
import Header from "../../components/Header";
import { getUsers } from "../../axios/api";
import { useRouter } from "next/router";
import { GET_USERS } from "../../apollo/queries";
import { useQuery, useLazyQuery } from "@apollo/client";
import SettingsContext from "../../stores/setingsContext";

const ChatBoard = ({ query }) => {
  
  const [value, setValue] = useState("Voice Chat");

  const context = useContext(SettingsContext).settings
  const [getApiUsers, { loading, error, data }] = useLazyQuery(GET_USERS);
  //on initial state
  // const { loading, error, data } = useQuery(queryGetUsers);
  //if something should be requested on the start, better use useLazyQuery and fetch it in useEffect with []

  let newarr = data
    ? data.users.map(function (item, i) {
        return <p key={item.id}>{item.name}</p>;
      })
    : "";

  if (loading) 
  return (<div>Loading...</div>)

  if (!context.logged)
  return <div className="lead text-center mt-4">Please, Sign in for using Voice chats</div>

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
            <div>
              <VoiceRoomCard
                title="Welcome to Career Karma 🥳"
                descr="Want to learn more about how Career Karma?"
                action="Join"
                type="warning"
              />
            </div>
            <br></br>
            <VoiceRoomCard />
            <br></br>
            <button
            onClick={()=>{
              getApiUsers()}}>
              Fetch
            </button>
            {newarr}
          </div>
        </div>
      </div>
    </div>
  );
};

// ChatBoard.getInitialProps = async ({ query }) => {
//   return { query };
// };

export default ChatBoard;
