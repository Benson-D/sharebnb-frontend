import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import "./NavBar.css";
import UserContext from "../auth/UserContext";

/** Renders NavLinks
 *
 * Props: none
 * State: none
 *
 * App -> NavBar
 */

function NavBar({ logOut }) {
  // @ts-ignore
  const { currUser } = useContext(UserContext);

  const navLoggedOut = () => (
          <ul className="navbar-nav ms-auto">
            <li className="nav-item me-4">
              <NavLink className="nav-link" to="/signup">
                Signup
              </NavLink>
            </li>
            <li className="nav-item me-4">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          </ul>
  )

  const navLoggedIn = () => (
        <ul className="navbar-nav ms-auto">
          <li className="nav-item me-4">
            <NavLink className="nav-link" exact to="/listings">
              Listings
            </NavLink>
          </li>
          <li className="nav-item me-4">
            <NavLink className="nav-link" exact to="/addlisting">
              Host a place
            </NavLink>
          </li>
          <li className="nav-item me-4">
              <Link className="nav-link" to="/" onClick={logOut}>
                Log out {currUser.username}
              </Link>
            </li>
        </ul>
  )

  return (
    <nav className="NavBar navbar navbar-expand-md">
      <div className="container-fluid">
        <Link className="nav-brand" to="/">
          ShareBnB
        </Link>
        {currUser ? navLoggedIn() : navLoggedOut()}
      </div>
    </nav>
  );
}

export default NavBar;
