
const VoiceRoomCard = ({portfolio}) => {
  return (
    <div className="card subtle-shadow no-border">
      <div className="card-body">
        <h5 className="card-title">Welcome to Career Karma 🥳</h5>
        <h6 className="card-subtitle mb-2 text-muted">Live room on air</h6>
        <p className="card-text fs-2">Want to learn more about how Career Karma?</p>
      </div>
      <div className="card-footer no-border">
      <button className="btn btn-warning"><small className="text-muted">Join</small></button>
      </div>
    </div>
  )
}

export default VoiceRoomCard;