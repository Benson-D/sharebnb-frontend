import { useState, useEffect } from "react";
import SearchForm from "../SearchForm";
import ListingCard from "./ListingCard";
import SharebnbApi from "../api/SharebnbApi";
import AddListingForm from "./AddListingForm";
import Loading from "../Loading";
// import Error from "./Error";

/** Lists all the listings
 *
 * Props: none
 * State: listings, isLoading, searchTerm
 *
 * Routes -> ListingList -> { SearchForm, AddListingForm, ListingCard }
 */

function ListingList() {
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  //   const [errors, setErrors] = useState([]);

  useEffect(
    function fetchListings() {
      async function getListingsFromApi() {
        try {
          const listings = await SharebnbApi.getListings(searchTerm);
          console.log(listings, "list");
          setListings(listings);
          setIsLoading(false);
        } catch (err) {
          console.error(err);
          //   setErrors((previousErrors) => [...previousErrors, ...err]);
        }
      }
      getListingsFromApi();
    },
    [isLoading, searchTerm]
  );

  function searchListings(formData) {
    setSearchTerm(formData);
    setIsLoading(true);
  }

  //   if (errors.length > 0) {
  //     return <Error errors={errors} />;
  //   }

  async function addListing(formData) {

    console.log(formData, "Listing LIST ");
    await SharebnbApi.createListing(formData);
    setIsLoading(true);
  }

  async function deleteListing(id) {
    await SharebnbApi.deleteListing(id);
    setIsLoading(true);
  }

  if (isLoading) return <Loading />;

  return (
    <div className="background-theme">
      <SearchForm submitSearch={searchListings} initialData={searchTerm} />
      {listings.map((listing) => (
        <ListingCard
          key={listing.id}
          listing={listing}
          deleteListing={deleteListing}
        />
      ))}
      <AddListingForm AddListing={addListing} />
    </div>
  );
}

export default ListingList;
