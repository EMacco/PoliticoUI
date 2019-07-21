import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AuthHeader from '../layouts/AuthHeader';
import AuthFooter from '../layouts/AuthFooter';
import AuthNav from '../layouts/AuthNav';
import Card from '../layouts/Card';
import { fetchPoliticalParties, changeUserParty } from '@actions/party';

class Parties extends Component {
  componentDidMount() {
    const { fetchPoliticalParties } = this.props;
    fetchPoliticalParties();
  }

  joinParty = e => {
    const { changeUserParty } = this.props;
    changeUserParty(e.target.id);
  };

  render() {
    const {
      parties,
      user: { partyid }
    } = this.props;

    let partiesCard = [];
    parties.map((party, ind) => {
      const { partyId, partyLogo, partyName, hqAddress } = party;

      const member = partyid === partyId ? true : false;
      let partyBtn = 'add-party-btn';
      let partyText = 'Join Party';
      // Check if this user is a member of this party
      if (partyid === partyId) {
        partyBtn = 'casted-vote';
        partyText = 'Member';
      }

      const partyContent = [
        {
          title: 'HQ Address',
          value: hqAddress
        },
        {
          text: partyText,
          style: partyBtn,
          type: member ? 'span' : 'button',
          onClick: !member ? this.joinParty : null,
          id: partyId
        }
      ];

      partiesCard.push(
        <Fragment key={Math.random().toString()}>
          <Card name={partyName} image={partyLogo} content={partyContent} />
          {parties.length % 2 !== 0 && ind === parties.length - 1 ? <Card hidden="true" /> : ''}
        </Fragment>
      );
    });

    return (
      <div>
        <AuthHeader />
        <main id="user-home-main">
          <div className="container">
            <AuthNav current="parties" />
            <div id="loadingIconContainer" />
            <section id="user-home-content-div">
              <div className="profile-page-section">
                <h3>Political Parties ({parties.length})</h3>
                <div className="content-group" id="userVotesSlot">
                  {partiesCard}
                </div>
              </div>
            </section>
          </div>
          <AuthFooter />
        </main>
      </div>
    );
  }
}

Parties.propTypes = {
  parties: PropTypes.array.isRequired,
  fetchPoliticalParties: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  parties: state.parties.parties,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { fetchPoliticalParties, changeUserParty }
)(Parties);
