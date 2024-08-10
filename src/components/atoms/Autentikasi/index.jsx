import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Avatar from "react-avatar";
import { FaRegCircleUser } from "react-icons/fa6";


const Autentikasi = ({ closeMenu, className = "" }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const checkToken = () => {
    const token = Cookies.get("token");
    if (token) {
      const decodedToken = atob(token);
      const [decodedUsername] = decodedToken.split(":");
      setUsername(decodedUsername);
      setIsLoggedIn(true);
    } else {
      setUsername("");
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkToken();
    // Listen for changes to the token cookie
    const cookieChangeInterval = setInterval(checkToken, 1000);
    return () => clearInterval(cookieChangeInterval);
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    setIsLoggedIn(false);
    closeMenu();
    navigate("/signin"); // Redirect to sign in page
  };

  return (
    <div className={`flex flex-col gap-2 md:flex-row ${className}`}>
      {isLoggedIn ? (
        <div className="flex items-center gap-2">
           <FaRegCircleUser className="text-4xl mr-26" />
          {/* <Avatar name={username} size="40" round={true} /> */}
          {/* btn-lg btn-sm btn-primary*/}
          <button className="text-sm btn btn-secondary px-4 py-2 " onClick={handleLogout}>
            Keluar
          </button>
        </div>
      ) : (
        <>
          <NavLink
            to="/signup"
            className="btn btn-secondary px-4 py-2"
            onClick={closeMenu}
          >
            Daftar
          </NavLink>
          <NavLink
            to="/signin"
            className="md:ml-2 btn btn-primary px-4 py-2 "
            onClick={closeMenu}
          >
            Masuk
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Autentikasi;
