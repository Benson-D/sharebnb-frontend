import "./HomePage.css";
import { useContext } from "react";
import UserContext from "./auth/UserContext";

/** Renders HomePage
 *
 * Props: none
 * State: none
 *
 * Routes --> HomePage
 */

function HomePage() {

  const { currUser } = useContext(UserContext);

  return (
    <main className="Homepage">
      <div className="container text-center">
        <h1 className="mb-4 fw-bold">Welcome To ShareBnB!</h1>
        <p className="lead">Check out a place to visit!</p>
        {currUser && (
          <p 
            className="Homepage-welcome lead">
              Welcome Back, {currUser.first_name}!
          </p>
        )}
      </div>
    </main>
  );
}

export default HomePage;
