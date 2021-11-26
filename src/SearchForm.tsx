import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchForm.css";

/** Renders search bar
 *
 * Props: submitSearch (fn), initialData (str)
 * State: formData of initialData: str
 *
 * ListingList --> SearchForm
 *
 */

function SearchForm({ submitSearch, initialData }) {
  const [formData, setFormData] = useState(initialData);

  function handleChange(evt) {
    setFormData(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    submitSearch(formData);
  }

  return (
    <div className="SearchForm mb-4">
      <form className="SearchForm-form" onSubmit={handleSubmit}>
        <div className="row justify-content-center justify-content-lg-start gx-0">
          <div className="SearchForm__input input-group">
            <input
              className="form-control rounded"
              type="text"
              value={formData}
              placeholder="Where would you like to go?"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-2">
          <button type="submit" className="SearchForm-btn btn btn-primary btn-lg">
            <FaSearch />
          </button>
        </div>
      </form>
  </div>
  );
}

export default SearchForm;
