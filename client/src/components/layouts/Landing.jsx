import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Banner from './Banner';
import Features from './LandingFeatures';
import Footer from './Footer';
import NavBar from '../layouts/NavBar';

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) return <Redirect to="/dashboard" />;
  return (
    <Fragment>
      <NavBar />
      <main>
        <Banner />
        <Features />
        <Footer />
      </main>
    </Fragment>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  {}
)(Landing);
