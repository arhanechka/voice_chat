import Link from "next/link"
import { useState, useContext } from "react"
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_AGORA_TOKEN } from "../apollo/queries";
import useSettings from "../stores/useSettings";
import SettingsContext from "../stores/setingsContext";
import { useEffect } from "react/cjs/react.development";

const VoiceRoomCard = (props) => {
  const [roomName, setRoomName] = useState('')

  const [getAgoraToken, { loading, error, data }] = useLazyQuery(GET_AGORA_TOKEN);
  const { settings, saveSettings } = useSettings();
  const context = useContext(SettingsContext).settings
  const getToken = () => {
    console.log("context")
    console.log(context)
    getAgoraToken();
  }

  useEffect(()=>{
    if (data){
      console.log(data.agoraToken.token)
      saveSettings({user: context.user, logged: context.logged, avatar: context.avatar, token: data.agoraToken.token})
      console.log(context)
      }
  })


  return (
    <div className="card subtle-shadow no-border">
      <div className="card-body">
        <h5 className="card-title"></h5>
        <h6 className="card-subtitle mb-2 text-muted">{props.title}</h6>
        <p className="card-text fs-2">{props.descr}</p>
        {props.descr ? null : <input type="text"
          placeholder="Give it a name"
          value={roomName}
          onChange={e => {
            setRoomName(e.target.value)
            console.log(roomName)
          }}
        >
        </input>}
      </div>
      <div className="card-footer no-border">
        <Link 
        href={{
          pathname: "/agora/call",
          query: {
              roomName: roomName? roomName: props.title
          }
      }}>
          <button className={`btn btn-${props.type}`} onClick={()=>getToken()}><small >{props.action}</small></button>
        </Link>
      </div>
    </div>
  )
}

VoiceRoomCard.defaultProps = {
  title: "Create new voice room 🥳",
  action: "Start",
  type: "danger"

}

export default VoiceRoomCard;