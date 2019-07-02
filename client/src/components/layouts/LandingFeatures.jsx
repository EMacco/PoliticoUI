import React from 'react';
import electronicVote from '@base/img/electronic-vote.png';
import searchIcon from '@base/img/search-icon.png';
import readyIcon from '@base/img/ready-icon.png';
import calendarIcon from '@base/img/calendar-icon.png';
import petitionIcon from '@base/img/petition-icon.png';

const LandingFeatures = () => {
  return (
    <section className="container">
      <div className="app-feature-div" id="aboutUs">
        <img src={electronicVote} />
        <div className="feature-description">
          <h2>Vote</h2>
          <p>
            Politico allows voters to be able to cast their ballots using an internet connected
            device from anywhere in the world.
          </p>
        </div>
      </div>

      <hr />

      <div className="app-feature-div">
        <div className="feature-description">
          <h2>Search</h2>
          <p>
            Using Politico, you are able to view a complete list of Polical Parties as well as
            Candidates that are contesting for a particular office.
          </p>
        </div>
        <img src={searchIcon} />
      </div>

      <hr />

      <div className="app-feature-div">
        <img src={readyIcon} />
        <div className="feature-description">
          <h2>Express Interest</h2>
          <p>
            Are you planning to run for an office in the Government? <br />
            Politico allows you to easily declare interest against any Government Office.
          </p>
        </div>
      </div>

      <hr />

      <div className="app-feature-div">
        <div className="feature-description">
          <h2>Election Dates</h2>
          <p>With Poilitco, you can now view the dates of all pending and past elections.</p>
        </div>
        <img src={calendarIcon} />
      </div>

      <hr />

      <div className="app-feature-div">
        <img src={petitionIcon} />
        <div className="feature-description">
          <h2>Petitions</h2>
          <p>You can now create a petition against any concluded election.</p>
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;
