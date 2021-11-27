import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import "./AddListingForm.css";
import UserContext from "../auth/UserContext";
import SharebnbApi from "../api/SharebnbApi";

/** Renders a Form for new listing
 *
 * Props: AddListing fn
 * State: 
 *    formData { name, address, price, description, location,     
 *               created }
 *    submitSuccess: boolean
 *
 * Routes -> AddListingForm
 */

function AddListingForm() {

  const { currUser } = useContext(UserContext);
  
  const INITIAL_DATA = {
    name: "",
    address: "",
    price: 0,
    description: "",
    location: "",
    created: currUser.username
  };
  
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState(INITIAL_DATA);

  async function addListing(formData) {
    console.log(formData, "Listing LIST ");
    await SharebnbApi.createListing(formData);
  }

  /**Handles change for name, address, price, description, location, created */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = evt.target;
    setFormData((previousData) => ({ ...previousData, [name]: value, }));
  }

  /**Handles file upload.
   * Sets formData state to include selected file  */
  function handleFile(evt: React.ChangeEvent<HTMLInputElement>) {
    const image = evt.target.files[0];
    setFormData((previousData) => ({ ...previousData, image: image }));
  }

  /**Handles form submission. Builds instance of FormData class
   * and calls addListing fn
   */
  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault();
    const sendData = new FormData();

    for (let key in formData) {
      sendData.append(key, formData[key]);
    }

    try {
      await addListing(sendData)
      setSubmitSuccess(true)
    } catch(err) {
      console.error(err.message)
    }
    
  }

  if (submitSuccess) {
    return <Redirect to="/listings"/>
  }

  return (
    <div className="AddListingForm col-sm-8  col-md-6 col-lg-4 offset-sm-2 offset-md-3 offset-lg-4">
      <h3>Add a new listing!</h3>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name of Listing</label>
              <input
                required
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input
                required
                type="text"
                className="form-control"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                required
                type="text"
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price</label>
              <input
                required
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                required
                type="text"
                className="form-control"
                name="location"          
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Image of place</label>
              <input
                required
                type="file"
                className="form-control"
                name="image"
                onChange={handleFile}
              />
            </div>
            <div className="d-grid">
              <button className="AddListingForm-btn btn btn-primary">
                Add your listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddListingForm;
