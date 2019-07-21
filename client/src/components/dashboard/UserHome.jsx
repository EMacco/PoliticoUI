import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AuthHeader from '@components/layouts/AuthHeader';
import AuthFooter from '@components/layouts/AuthFooter';
import AuthNav from '@components/layouts/AuthNav';
import Card from '../layouts/Card';
import { fetchInterestedOffice, fetchPageVotes } from '@actions/dashboard';

class UserHome extends Component {
  componentDidMount() {
    const { user } = this.props.auth;
    this.props.fetchInterestedOffice({ user });
    this.props.fetchPageVotes(user);
  }

  render() {
    const { votes, interest } = this.props;
    const { officeId, officeName, image, numberOfCandidates, electionDate } = interest;

    const interestedOfficeContent = [
      {
        officeId,
        officeName,
        numberOfCandidates,
        type: 'link'
      },
      {
        title: 'Date',
        value: electionDate
      }
    ];

    let interestCard = '';

    if (officeId !== undefined) {
      interestCard = (
        <Fragment>
          <Card name={officeName} image={image} content={interestedOfficeContent} />
          <Card hidden="true" />
        </Fragment>
      );
    }

    let votesCards = [];
    this.props.votes.map((vote, ind) => {
      const { partyLogo, name, partyName, officeName, result, resultStyle, resultString } = vote;

      const voteContent = [
        {
          title: 'Party',
          value: partyName
        },
        {
          title: 'Office',
          value: officeName
        },
        {
          title: 'Result',
          value: result
        },
        {
          text: resultString,
          style: `${resultStyle}-election`,
          type: 'span'
        }
      ];

      votesCards.push(
        <Fragment key={Math.random().toString()}>
          <Card name={name} image={partyLogo} content={voteContent} />
          {votes.length % 2 !== 0 && ind === votes.length - 1 ? <Card hidden="true" /> : ''}
        </Fragment>
      );
    });

    return (
      <div>
        <AuthHeader />
        <main id="user-home-main">
          <div className="container">
            <AuthNav />

            <section id="user-home-content-div">
              <div id="loadingIconContainer" />
              <div className="profile-page-section">
                <h3 id="interested-office-header">Interested Office</h3>
                <div className="content-group" id="interestedOfficeSlot">
                  {interestCard}
                </div>
              </div>

              <div className="profile-page-section">
                <h3>My Votes ({votes.length})</h3>
                <div className="content-group" id="userVotesSlot">
                  {votesCards}
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

UserHome.propTypes = {
  fetchInterestedOffice: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  interest: PropTypes.object.isRequired,
  fetchPageVotes: PropTypes.func.isRequired,
  votes: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  interest: state.dashboard.interests,
  votes: state.dashboard.votes
});

export default connect(
  mapStateToProps,
  { fetchInterestedOffice, fetchPageVotes }
)(UserHome);
