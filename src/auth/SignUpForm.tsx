import { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import UserContext from "./UserContext";
// import Errors from "../Errors";
// import "./SignupForm.css";

/** Renders signUpForm
 *
 * props: signUpUser fn
 * state: formData, error
 *
 * Routes -> SignUpForm
 *
 */

const INITIAL_STATE = {
  username: "",
  password: "",
  email: "",
  first_name: "",
  last_name: "",
  location: ""
};

function SignUpForm({ signUpUser }) {

  // @ts-ignore
  const { currUser } = useContext(UserContext);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [error, setError] = useState(null);
  console.log("SignUpForm", { formData });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData((formData) => ({ ...formData, [name]: value.trim() }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signUpUser(formData);
    } catch (err) {
      setError(err);
    }
  }

  if (currUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="SignUpForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
      <h3>Sign Up</h3>
      <div className="SignUpForm-card card">
        <div className="card-body">
          <form className="Signup-Form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                name="username"
                className="form-control"
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
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                name="email"
                className="form-control"
                type="text"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                name="first_name"
                className="form-control"
                type="text"
                value={formData.first_name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                name="last_name"
                className="form-control"
                type="text"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                name="location"
                className="form-control"
                type="text"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          
            {error && <p>{error}</p>}
  
            <button className="SignUpForm btn btn-primary"> Sign Up! </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpForm;