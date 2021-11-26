import { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import NavBar from "./routes/NavBar";
import Routes from "./routes/Routes";
import UserContext from "./auth/UserContext";
import SharebnbApi from "./api/SharebnbApi";
import Loading from "./Loading";
import jwt from "jsonwebtoken";
import { 
  UserInterface, 
  LoginFormInterface, 
  SignUpFormInterface 
} from "./interfaces/auth";


/** Renders Sharebnb App
 *
 * Props: none
 * State: none
 *
 * App -> {Routes, Navbar}
 */

function App() {

  const [currUser, setCurrUser] = useState<UserInterface | null>(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(false);

  console.log("App", { currUser, token });

  useEffect(
    function getCurrUser() {
      async function fetchCurrUser() {
        if (token) {
          SharebnbApi.token = token;
          
          console.log(token, "token")
          // @ts-ignore
          const { username }  = jwt.decode(token);
          console.log(username, "username")

          try {
            const user = await SharebnbApi.getUser(username);
            console.log({ user }, "User info from fetchCurrUser");
            setCurrUser(user);
          } catch (err) {
            console.error(err.message);
          }
        }
        setIsLoading(true);
      }

      setIsLoading(false);
      fetchCurrUser();
    },
    [token]
  );

  async function signUpUser(formData: SignUpFormInterface) {
    const token = await SharebnbApi.signUp(formData);
    console.log("token from signUpUser has passed", { token });
    localStorage.setItem("token", token);
    setToken(token);
  }

  async function loginUser(formData: LoginFormInterface) {
    console.log({formData}, "login formdata")
    const token = await SharebnbApi.login(formData);
    console.log("token from loginUser has passed", { token });
    localStorage.setItem("token", token);
    setToken(token);
  }

  function logOut() {
    console.log("The logout was clicked");
    setCurrUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }

  if (!isLoading) return <Loading/>;

  return (
      <div className="App">
        <BrowserRouter>
          <UserContext.Provider value={{ currUser }}>
            <NavBar logOut={logOut} />
            <Routes
              signUpUser={signUpUser}
              loginUser={loginUser}
              currUser={currUser}
            />
          </UserContext.Provider>
        </BrowserRouter>
      </div>
    )
}

export default App;
