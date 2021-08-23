import Link from "next/link";
import { Navbar, Nav } from "react-bootstrap";
import React, { useContext } from "react";
import SettingsContext from "../stores/setingsContext";
import useSettings from "../stores/useSettings";
import { useCookies } from "react-cookie";
import client from "../apollo/apollo-client";

const Header = () => {
  const context = useContext(SettingsContext).settings;
  const { settings, saveSettings } = useSettings();
  const [cookies, removeCookie] = useCookies(["user"]);
  const handleLogin = () => {
    try {
      client.cache.clearContext();
    } catch (e) {
      console.log(e.message);
    }
    clearContext();
    removeCookie("user", null);
  };

  const clearContext = () => {
    saveSettings({ user: null, logged: false, channels: null });
  };

  const signIn = context.logged ? "Logout" : "Sign In";
  return (
    <div className="navbar-wrapper">
      <Navbar expand="lg" className="navbar-dark fj-mw9">
        <Navbar.Brand className="link-light" as={Link} href="/">
          <div className="h4 text-white-50">Voice chats</div>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="mr-auto">
            <Link href="/board">
              <a className="nav-link" href="#">
                Voice room
              </a>
            </Link>
          </Nav>
          <Nav>
            <Link href="/">
              <a className="nav-link" onClick={handleLogin}>
                {signIn}
              </a>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
