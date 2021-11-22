// import { useContext } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import HomePage from "../HomePage";
import ListingList from "../listing/ListingList";
import ListingDetail from "../listing/ListingDetail";
import SignUpForm from "../auth/SignUpForm";
import LoginForm from "../auth/LoginForm";
// import AddListingForm from './AddListingForm'

/**Renders Routes
 *
 * Props: none
 * State: none
 * Context: none
 *
 * App -> Routes -> {
 *              HomePage,
 *              ListingList,
 *              ListingDetail,
 *              AddListingForm
 *          }
 */

function Routes({signUpUser, loginUser, currUser,}: any) {
  return (
    <Switch>
      <Route exact path="/signup">
        <SignUpForm signUpUser={signUpUser} />
      </Route>
      <Route exact path="/login">
        <LoginForm loginUser={loginUser} />
      </Route>
      <Route exact path="/">
        <HomePage />
      </Route>
      
      {currUser && (
        <>
          <Route exact path="/listings">
            <ListingList />
          </Route>
          <Route exact path="/listings/:id">
            <ListingDetail />
          </Route>
        </>
      )}

      <Redirect to="/" />
    </Switch>
  );
}

export default Routes;
