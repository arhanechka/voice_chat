import Link from "next/link"
import { useState } from "react"

const VoiceRoomCard = (props) => {
  const [roomName, setRoomName] = useState('')


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
          <button className={`btn btn-${props.type}`}><small >{props.action}</small></button>
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