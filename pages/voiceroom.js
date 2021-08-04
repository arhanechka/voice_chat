import React, {useState, useEffect} from 'react'
import VoiceRoomCard  from '../components/LiveRoomBadge'

const LoginForm = ()=>{
const [value, setValue] = useState('Voice Chat')
return (<div>
    <section className="section-title">
    <div className="px-2">
    </div>
  </section>
  <div className="bwm-form">
    <div className="row">
      <div className="col-md-5 mx-auto">
        <h1 className="h3">Live rooms on air</h1>
        <VoiceRoomCard/>
      </div>
     
    </div>
  </div>
  </div>
)}

export default LoginForm