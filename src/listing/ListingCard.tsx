import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./ListingCard.css";

/** Renders an individual listing item
 *
 * Props: 
 *     listing (obj of a listing: {name, description, location, img})
 *     deleteListing fn
 * State: none
 *
 * ListingList --> ListingCard
 */


function ListingCard({ listing, deleteListing }) {

  const { currUser } = useContext(UserContext);

  async function handleDelete() {
    await deleteListing(listing.id);
  }

  const price = +listing.price;

  return (
    <section className="d-flex flex-column align-items-center">
      <div className="ListingCard card mb-3">
          <div className="row g-0">
              <div className="col-md-4">
                {listing.image && (
                  <img
                    className="img-fluid img-thumbnail"
                    src={listing.image}
                    alt="logo"
                  />
                )}
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <div>
                    <Link to={`listings/${listing.id}`}>
                      <h5 className="card-title ">{listing.name}</h5>
                      <hr/>
                      <p className="card-text">${price.toLocaleString()} / night</p>
                      <p className="card-text">Location: {listing.location}</p>
                    </Link>
                  </div>
                  { currUser.username === listing.created && 
                  <div className="ListingCard-btn-container mt-2">
                    <button
                      className="ListingCard-btn btn btn-danger mb-3"
                      onClick={handleDelete}>
                      Delete Listing
                    </button>
                  </div>
                  }
                </div>          
              </div>
          </div>
      </div>
    </section>
    
  );
}

export default ListingCard;
