import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  const history = useHistory();

  const [logout, setLogout] = useState(false);

  const profile = () => {
    history.push("/profile");
  };

  const onLogout = () => {
    console.log("onlogout");
    localStorage.removeItem("login");
    setLogout(true);
    history.push("/");
  };

  
  return (
    <nav className="navbar navbar-dark " style={{ backgroundColor: "#29385c" }}>
      {/* <div className="container-fluid"> */}
      <div className="container-fluid d-flex mw-100">
        <a className="navbar-brand" href="/cbt">
          Computer Based Test
        </a>

        {!localStorage.getItem("login") || logout ? (
          <div className="navbar-brand d-flex text-white justify-content-end">
            <div className="mx-3">
              <a className="text-white" href="/auth/login">
                Login
              </a>
            </div>
            <div className="mx-1">
              <a className="text-white" href="/auth/register">
                Sign Up
              </a>
            </div>
          </div>
        ) : (
          <div className="d-flex">
            <div
              role="button"
              className="text-white text-capitalize"
              // onClick={profile}
            >{`Hi ${
              JSON.parse(localStorage.getItem("login")).username
            } !`}</div>
            <div
              className="text-white mx-3"
              style={{ cursor: "pointer" }}
              onClick={onLogout}
            >
              <u>Logout</u>
            </div>
          </div>
        )}
      </div>
      {/* </div> */}
    </nav>
  );
};

export default NavBar;
