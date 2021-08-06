import React, {useState, useEffect} from 'react'
import VoiceRoomCard  from '../../components/LiveRoomBadge'
import Header from '../../components/Header'
import { getUsers } from '../../axios/api'


const LoginForm = ()=>{

const getApiUsers = ()=>{
  const query = `query Users {users {id, name}}`
  let users = getUsers(query)
  // console.log(users)
  users.then(res => setData(res))
  // console.log(users)
  // setData(users)
  // getUsers(query).then(users => 
  //   console.log(users))
  //   // setData(res)})
}
const [value, setValue] = useState('Voice Chat')
const [data, setData] = useState()
let newarr = data? data.map(function(item, i){
  return <p key={item.id}>{item.name}</p>}): ""

return (<div>
    <section className="section-title">
    <div className="px-2">
    </div>
  </section>
  <div className="bwm-form">
    <div className="row">
      <div className="col-md-5 mx-auto">
        <h1 className="h3">Live rooms on air</h1>
        <div>
        <VoiceRoomCard 
        title="Welcome to Career Karma 🥳" 
        descr="Want to learn more about how Career Karma?" 
        action="Join"
        type="warning"/>
        </div>
        <br></br>
        <VoiceRoomCard />
        <br></br>
        <button onClick={getApiUsers}>Fetch</button>
      {newarr}
</div>
     
    </div>
  </div>
  </div>
)}

export default LoginForm