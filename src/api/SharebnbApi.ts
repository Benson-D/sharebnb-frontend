import axios from "axios";
import { 
  UserInterface, 
  LoginFormInterface, 
  SignUpFormInterface 
} from "../interfaces/auth";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class SharebnbApi {

  static token: string; 

  static async request(endpoint: string, data = {}, method = "get"): Promise<any> {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${SharebnbApi.token }`};
    const params = method === "get" ? data : {};

    try {
      // @ts-ignore
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err: any) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }
  
  /** Function signs up users. Returns { token } */
  static async signUp(
    { username, password, email, first_name, last_name, location }: SignUpFormInterface): Promise<string> {
    const res = await this.request(
      "signup",
      { username, password, email, first_name, last_name, location },
      "post"
    );
    return res.token;
  }

   /** Function logs in a user. Returns { token } */
   static async login(data: LoginFormInterface): Promise<string> {
    const res = await this.request(
      "login",
      data,
      "post"
    );
    return res.token;
  }

  /** Get user info by username */
  static async getUser(username: string): Promise<UserInterface> {
    const res = await this.request(`users/${username}`);
    console.log(res.user, "has been passed through to API");
    return res.user;
  }


  /** Get list of Listings. Returns [{listing}}, {listing}, {listing}]*/
  static async getListings(searchTerm: string ) {
    const res = await this.request("listings", {location: searchTerm});
    return res.listings;
  }

  /** Get a specific listing. Returns {listing}*/
  static async getListing(id: string) {
    const res = await this.request(`listings/${id}`);
    return res.listing;
  }

  /** Registers a new listing
   * 
   * Takes an object { name, description, image, price, location } 
   * Returns listing = { name, address, description, image, price, location }
  */

  static async createListing(formData) {
    const res = await this.request("listings", formData, "post");
    return res.listing;
  }

  /** Function that updates a listing's information,
   * 
   * Takes an object { listingId, address, image, price, description }
   * Returns listing: { listingId, address, name, image, price, description, location }
   */

  static async updateListing({ listingId, image, price, description }) {
    const patchData = { image, price, description };

    const res = await this.request(
      `listings/${listingId}`,
      patchData,
      "patch"
    );

    return res.listing;
  }

  /** Function deletes a listing. Returns "ListingId successfully deleted"*/
  static async deleteListing(listingId: string) {
    const res = await this.request(`listings/${listingId}`, {}, "delete");

    return res.deleted;
  }
}

export default SharebnbApi;
