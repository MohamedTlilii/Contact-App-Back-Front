import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

function NavBar() {
  const navigate = useNavigate();
  let activeStyle = "font-bold text-sky-400 border-b-[1px] border-sky-400 pb-2";
  let token = localStorage.getItem("token");
  let isUser = localStorage.getItem("isUser");
  let isAdmin = localStorage.getItem("isAdmin");
  return (
    <div className="flex justify-between items-center px-[50px] py-4 bg-violet-950 text-sky-200 sticky top-0 z-10">
      <h1 className="text-2xl text-sky-400 font-extrabold m-0">ContactAPP</h1>
      <ul className="flex justify-between  w-[40%]">
        <li>
          <NavLink
            className={({ isActive }) => {
              return isActive ? activeStyle : null;
            }}
            to="/"
          >
            Home
          </NavLink>
        </li>
        {token && isUser === "true" && !isAdmin ? (
          <>
            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? activeStyle : null;
                }}
                to="/profile"
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? activeStyle : null;
                }}
                to="/contacts"
              >
                Contacts
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? activeStyle : null;
                }}
                to="/posts"
              >
                Posts
              </NavLink>
            </li>
          </>
        ) : (
          token &&
          isAdmin === "true" &&
          !isUser && (
            <>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? activeStyle : null;
                  }}
                  to="/dashboard"
                >
                  Dashboard
                </NavLink>
              </li>
              <li>
                <NavLink
                  className={({ isActive }) => {
                    return isActive ? activeStyle : null;
                  }}
                  to="/posts"
                >
                  Posts
                </NavLink>
              </li>
            </>
          )
        )}

        {token ? (
          <li>
            <NavLink
              onClick={() => {
                localStorage.clear();
                setTimeout(() => {
                  navigate("/login");
                }, 2000);
              }}
            >
              Logout
            </NavLink>
          </li>
        ) : (
          <>
            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? activeStyle : null;
                }}
                to="/login"
              >
                Login
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? activeStyle : null;
                }}
                to="/register"
              >
                Register
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default NavBar;
