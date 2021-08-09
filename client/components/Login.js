import Link from "next/link";
import { useRouter } from "next/router";
import { useState, createContext, useContext } from "react";
import { login } from "../axios/api";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN_USER } from "../apollo/mutations";
import { useEffect } from "react";
import useSettings from "../stores/useSettings";
import SettingsContext from "../stores/setingsContext";

const LoginForm = () => {
  const { settings, saveSettings } = useSettings();
  const context = useContext(SettingsContext).settings
  console.log(context)
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [user, setUser] = useState();
  const [isDisabled, setIsDisabled] = useState(true)

  const [handleClick, { data }] = useMutation(LOGIN_USER);

  useEffect(() => {
    console.log("useEffect")
    if (data) {
      setUser(data.createUser);
      console.log(data.createUser)
      setContext();
    }
  });

  // useEffect(() => {
      
  // }, [isDisabled]);

  const setContext = () => {
    saveSettings({user: data.createUser, logged: true});
  };

  useEffect(()=>{
    if (name!==undefined && password !== undefined){
      setIsDisabled(false)
    }
  }, [name, password])

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
                href={{
                  pathname: "/board",
                  query: {
                    name: name,
                  },
                }}
              >
                <button
                  type="submit"
                  className="btn btn-warning"
                  disabled={isDisabled}
                  onClick={()=>handleClick({ variables: { name: name, password: password }})}
                >
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
