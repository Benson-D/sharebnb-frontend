import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SharebnbApi from "../api/SharebnbApi";
import "./ListingDetail.css";
import Loading from "../Loading";
import Errors from "../Errors";

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
    const [errors, setErrors] = useState(null);

  const { id }: {id: string} = useParams();

  useEffect(
    function getListing() {
      async function fetchListing() {
        try {
          const response = await SharebnbApi.getListing(id);
          setCurrentListing(response);
          setIsLoading(false);
        } catch (err) {
          console.error(err);
          setErrors(err);
        }
      }
      fetchListing();
    },
    [id]
  );

  if (errors.length < 1) return <Errors errors={errors}/>;

  if (isLoading) return <Loading />;
  
  const price = +currentListing.price;

  return (
    <div className="ListingDetail col-md-8 col-sm-8 offset-md-2 offset-sm-2">
      <h2 className="p-3">         
        {currentListing.name}
      </h2>
      <div>
        <img 
          src={currentListing.image} 
          alt="listing_image" 
          className="rounded img-fluid"
        />
      </div>
      <div className="mt-2">
        <div className="row">
          <div className="col mx-4">
            <h4>Detail</h4>
            <hr />
            <p className="text-start fs-5">
              <span className="fw-bolder">Address: </span>
              {currentListing.address}
            </p>
            <p className="text-start fs-5">
            <span className="fw-bolder">Location: </span>
              {currentListing.location}
            </p>
            <p className="text-start fs-5">
              {currentListing.description}
            </p>
            <p className="text-start fs-5">
              ${price.toLocaleString()} / night
            </p>
          </div>
        </div> 
      </div>
    </div>
  );
}

export default ListingDetail;
