import { useState } from "react";

//TODO: include feature
/** Renders a Form for editing a listing
 *
 * Props: currListing, editListing fn
 * State: formData
 *
 * ListingDetail -> EditListingForm
 */

function EditListingForm({ editListing, currListing }) {
  const { name, description, price, image, location } = currListing;
  const [formData, setFormData] = useState({
    name,
    description,
    price,
    image,
    location,
  });
  const [selectedFile, setSelectedFile] = useState();

  function handleChange(evt) {
    // const { name, value } = evt.target;
    // setFormData((previousData) => ({ ...previousData, [name]: value }));
  }

  function handleFile(evt) {
    // setSelectedFile(evt.target.files[0]);
    // setFormData((previousData) => ({ ...previousData, image: selectedFile }));
  }

  function handleSubmit(evt) {
    // evt.preventDefault();
    // editListing(formData);
  }

  return (
    <form className="AddListingForm" onSubmit={handleSubmit}>
      <input
        required
        type="text"
        name="name"
        id="name"
        value={formData.name}
        onChange={handleChange}
        disabled
      ></input>
      <input
        required
        type="text"
        name="description"
        id="description"
        value={formData.description}
        placeholder="Description of your listing..."
        onChange={handleChange}
      ></input>
      <input
        required
        type="number"
        name="price"
        id="price"
        value={formData.price}
        placeholder="Price of your listing..."
        onChange={handleChange}
      ></input>
      <input
        required
        type="text"
        name="location"
        id="location"
        value={formData.location}
        placeholder="Location of your listing..."
        onChange={handleChange}
        disabled
      ></input>
      <input
        required
        type="file"
        name="image"
        id="image"
        placeholder="Image of your listing..."
        onChange={handleFile}
      ></input>
      <button className="AddListingForm-Button"> Add your listing </button>
    </form>
  );
}

export default EditListingForm;
