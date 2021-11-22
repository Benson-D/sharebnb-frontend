import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SharebnbApi from "../api/SharebnbApi";
import "./ListingDetail.css";
import Loading from "../Loading";
// import Error from "./Error";

/** Renders detail of one Listing
 *
 * Props: none
 * State: currentListing, isLoading
 * 
 * Routes --> ListingDetail
 */

function ListingDetail() {
  const [currentListing, setCurrentListing] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  //   const [errors, setErrors] = useState(null);

  const { id } = useParams();

  useEffect(
    function getListing() {
      async function fetchListing() {
        try {
          const response = await SharebnbApi.getListing(id);
          setCurrentListing(response);
          setIsLoading(false);
        } catch (err) {
          console.error(err);
          //   setErrors(err);
        }
      }
      fetchListing();
    },
    [id]
  );

  //   if (errors.length < 1) return <Error errors={errors} />;
  if (isLoading) return <Loading />;
  const price = +currentListing.price;

  return (
    <div className="ListingDetail col-md-8 offset-md-2">
      <h2 className="ListingDetail">{currentListing.name}</h2>
      <p className="ListingDetail">{currentListing.address}</p>
      <p className="ListingDetail">{currentListing.description}</p>
      <p className="ListingDetail">${price.toLocaleString()}</p>
      <p className="ListingDetail">{currentListing.location}</p>
      <div>
        <img src={currentListing.image} alt="listing_image" />
      </div>
    </div>
  );
}

export default ListingDetail;
