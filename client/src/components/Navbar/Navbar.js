import React, { useState } from "react";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import { Link, useHistory } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("userProfile"))
  );
  const history = useHistory();
  const dispatch = useDispatch();

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    setUser(null);
    history.push("/");
  };

  const token = user?.token;
  if (token) {
    const decodedToken = decode(token);
    if (decodedToken.exp * 1000 < new Date().getTime()) logout();
  }

  return (
    <nav className="navbar-container">
      <span className="navbar-title">
        <Link to="/" className="title-link">
          Hostel Management System
        </Link>
      </span>
      {user ? (
        <span className="logout">
          {user?.localProfile?.selectedFile === "" ? (
            <span className="profile-image">
              {user?.localProfile?.name.charAt(0)}
            </span>
          ) : user?.localProfile?.selectedFile ? (
            <img
              src={user?.localProfile?.selectedFile}
              alt="Avatar"
              className="profile-avatar"
            />
          ) : null}
          <span className="student-name">{user?.localProfile?.name}</span>
          <button className="logout-btn" onClick={logout}>
            LOGOUT
          </button>
        </span>
      ) : (
        <span className="signin-users">
          <span className="signin">
            <Link className="signin-btn" to="/auth">
              SIGN IN
            </Link>
          </span>
          <span className="admin-signup">
            <Link className="signup-btn" to="/admin-signup">
              ADMIN SIGN UP
            </Link>
          </span>
        </span>
      )}
    </nav>
  );
};

export default Navbar;
