import Link from 'next/link'
import { Navbar, NavDropdown, Nav } from 'react-bootstrap';
import React, { useContext } from "react";
import SettingsContext from "../stores/setingsContext";
import useSettings from "../stores/useSettings";

const Header = ()=> {
  const context = useContext(SettingsContext).settings
  const { settings, saveSettings } = useSettings();
  const handleLogin = ()=>{
    if (signIn === "Logout"){
    console.log("Logout")
    clearContext()
    }
  }

  const clearContext = () => {
    saveSettings({user: null, logged: false});
  };

  const signIn = context.logged? "Logout": "Sign In"
    return (
    <div className="navbar-wrapper">
        <Navbar expand="lg" className="navbar-dark fj-mw9">
        <Navbar.Brand className="mr-3 font-weight-bold" href="/">Voice chats</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
          <Link href="/board">
            <a className="nav-link" href="#">Voice room</a>
            </Link>
          </Nav>
          <Nav>
            <Link href="/">
            <a 
            className="nav-link" href="#"
            onClick={handleLogin}
            >{signIn}</a>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    {/* <nav className="navbar navbar-expand-lg navbar-dark fj-mw9">
    <Link href="/">
      <a className="navbar-brand mr-3 font-weight-bold" href="#">Voice chats</a>
      </Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
          <li className="nav-item mr-3">
          <Link href="/board">
            <a className="nav-link" href="#">Voice room</a>
            </Link>
          </li>
        </ul>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item mr-3">
          <Link href="/">
            <a className="nav-link" href="#">Sign Up</a>
            </Link>
          </li>
          <li className="nav-item mr-3">
            <a className="nav-link btn btn-success bg-green-2 bright" href="#">Sign In</a>
          </li>
        </ul>
      </div>
    </nav> */}
  </div>
    )}

export default Header