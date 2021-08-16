import Link from "next/link";
import { useState, useContext } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../apollo/mutations";
import { useEffect } from "react";
import useSettings from "../stores/useSettings";
import SettingsContext from "../stores/setingsContext";
import { useCookies } from 'react-cookie';

const LoginForm = () => {
  const { settings, saveSettings } = useSettings();
  const context = useContext(SettingsContext).settings
  const [cookies, setCookie] = useCookies(['user']);
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState();
  const [isDisabled, setIsDisabled] = useState(true)

  const [handleClick, { error, loading, data }] = useMutation(LOGIN_USER,
    { fetchPolicy: "network-only" });

  const handleLogin = async ()=>{
    try {
     const res = await handleClick({ variables: { name: name, password: password }})
     setUser(res.data.createUser);
     saveSettings({user: res.data.createUser, logged: true});
     setCookie('user', res.data.createUser.id, {path: '/'})
  } catch(e) {
    alert(e.message)
    setIsDisabled(true)
}
  }

  useEffect(()=>{
    if (name!==undefined && password !== undefined){
      setIsDisabled(false)
    }
  }, [name, password])

  if (loading)
  return <div><h2>Loading...</h2></div>
  if (context.logged)
  return <div><h2>Hello, {context.user.name}! Now you can use Voice chats!</h2></div>  

  return (
    <div>
      <section className="section-title">
        <div className="px-2"></div>
      </section>      
      <div className="bwm-form">
        <div className="row">
          <div className="col-md-5 mx-auto">
            <h1 className="h3">Sign in</h1>
            <form>
              <div className="form-group">
                <label htmlFor="email">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  placeholder="Type your name"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Type your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Link
                href="/board">
                <button
                  type="submit"
                  className="btn btn-warning"
                  disabled={isDisabled}
                  onClick={()=>{handleLogin()}}>
                  Submit
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
