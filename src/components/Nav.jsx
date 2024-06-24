import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { useContext, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";

const Nav = () => {
  const { user, loading, signOutUser } = useContext(AuthContext);
  const [mongoUser, setMongoUser] = useState(null);
  const userEmail = user?.email;
  console.log(loading);
  useEffect(() => {
    fetch(`https://practisetask-backend.vercel.app/user/${userEmail}`)
      .then((res) => res.json())
      .then((data) => {
        setMongoUser(data);
      });
  }, [userEmail]);

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {/* <li>
        <details>
          <summary>Parent</summary>
          <ul className="p-2">
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </details>
      </li> */}
      <li>
        <NavLink to="/all-arts">All Arts</NavLink>
      </li>

      <li>
        <NavLink to="/add-craft">Add Craft</NavLink>
      </li>

      <li>
        <NavLink to="/my-crafts">My Crafts</NavLink>
      </li>

      {!user && (
        <li>
          <NavLink to="/signup">SignUp</NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar min-h-10 lg:min-h-16 bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn pl-0 btn-ghost lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] space-y-4 mt-3 w-52 p-2 shadow"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          Drawing
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {!user && (
          <NavLink to="/login" className="btn">
            Login
          </NavLink>
        )}

        {user && (
          <>
            <img
              src={user?.photoURL || mongoUser?.photoURL}
              data-tooltip-id="my-tooltip"
              data-tooltip-delay-hide={2000}
              className="w-11 h-11 rounded-full object-cover"
            />

            <Tooltip id="my-tooltip" className="bg-primary p-5">
              <div className="space-y-4">
                <h3>{user?.displayName || mongoUser?.displayName}</h3>
                <button
                  className="btn btn-error"
                  onClick={() => {
                    signOutUser();
                  }}
                >
                  SignOut
                </button>
              </div>
            </Tooltip>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
