import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, accountLogout } = useAuth();

  const handleLogOut = () => {
    accountLogout().then(() => {
      console.log("logOut ");
    });
  };
  let links = (
    <>
      {user && user?.email ? (
        <>
          <li>
            <Link className="text-xl text-white" to="/">
              Home
            </Link>
          </li>
          <li>
            <button onClick={handleLogOut} className="text-xl text-white">
              LogOut
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link className="text-xl text-white" to="/login">
              Login
            </Link>
          </li>
          <li>
            <Link className="text-xl text-white" to="/register">
              Register
            </Link>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className=" bg-cyan-500">
      <div className="max-w-6xl mx-auto ">
        <div className="navbar ">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">Task ManageMent</a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">{links}</ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
