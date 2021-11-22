import { Link } from "react-router-dom";
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
  async function handleDelete() {
    await deleteListing(listing.id);
  }

  const price = +listing.price;

  return (
    <div className="ListingCard container">
      <div className="ListingCard card">
        <div className="card-body">
          <Link to={`listings/${listing.id}`}>
            <h2 className="card-title">{listing.name}</h2>
            <p className="card-text">{listing.address}</p>
            <p className="card-text">${price.toLocaleString()}</p>
            <p className="card-text mb-2 ">{listing.location}</p>
            <div className="ListingCard-image-container">
              {listing.image && (
                <img
                  className="float-end ms-5"
                  src={listing.image}
                  alt="logo"
                />
              )}
            </div>
          </Link>
          <div className="ListingCard-btn-container">
            <button
              className="ListingCard-btn btn btn-danger"
              onClick={handleDelete}
            >
              Delete Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingCard;
