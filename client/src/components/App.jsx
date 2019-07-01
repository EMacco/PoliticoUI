import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/style.css';
import Landing from './layouts/Landing';
import Login from './auth/Login';
import Register from './auth/Register';
import store from '../store';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from '../actions/authActions';

// Check for token
if (localStorage.jwtToken) {
  // Set the auth token header auth
  setAuthToken(localStorage.jwtToken);

  // Decode the token and get user info and expiration
  const decoded = jwt_decode(localStorage.jwtToken);

  // Set the current user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout the user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = '/login';
  }
}

const App = () => {
  return (
    <Provider store={store}>
      <ToastContainer hideProgressBar />
      <Router>
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
