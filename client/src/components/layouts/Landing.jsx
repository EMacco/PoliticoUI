import React, { Fragment } from 'react';
import Banner from './Banner';
import Features from './LandingFeatures';
import Footer from './Footer';
import NavBar from '../layouts/NavBar';

const Landing = () => {
  return (
    <Fragment>
      <NavBar />
      |<main>
        <Banner />
        <Features />
        <Footer />
      </main>
    </Fragment>
  )
}

export default Landing;