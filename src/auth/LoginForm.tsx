import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "./UserContext";
// import Errors from "../Errors";
// import "./LoginForm.css";

/** Renders Login form
 *
 * props: loginUser
 * state: formData, error
 *
 * Routes -> LoginForm
 *
 */

const INITIAL_STATE = { username: "", password: "" };

function LoginForm({ loginUser }) {

  // @ts-ignore
  const { currUser } = useContext(UserContext);
  
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);
  console.log("LoginForm", { formData, error });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((formData) => ({ ...formData, [name]: value.trim() }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await loginUser(formData);
    } catch (err) {
      console.log(err, "Catch error of Login Form");
      setError(err);
    }
  }

  if (currUser) {
    return <Redirect to="/" />;
  }

  return (
    <section className="LoginForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
      
        <h3 className="mb-3">Log In</h3>
        <div className="LoginForm-card card">
          <div className="card-body">
            <form className="LoginForm-Form" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  name="username"
                  className="form-control"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  name="password"
                  className="form-control"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              
              <button className="btn btn-primary"> Log In! </button>    
            </form>
          </div>
        </div>
      </div>  
    </section>
  );
}

export default LoginForm;