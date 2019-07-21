import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';
import AuthHeader from '../layouts/AuthHeader';
import AuthFooter from '../layouts/AuthFooter';
import AuthNav from '../layouts/AuthNav';
import Card from '../layouts/Card';
import { fetchGovernmentOffices, expressInterest } from '@actions/office';

class Offices extends Component {
  componentDidMount() {
    const {
      fetchGovernmentOffices,
      user: { id }
    } = this.props;
    fetchGovernmentOffices(id);
  }

  expressInterest = e => {
    const { expressInterest } = this.props;
    const { officeId, partyId } = JSON.parse(e.target.id);
    if (!partyId) return toast.error('Please join a political party before contesting');
    expressInterest(partyId, officeId);
  };

  render() {
    const { offices } = this.props;
    const {
      user: { partyid: partyId }
    } = this.props;

    let officesCard = [];
    offices.map((office, ind) => {
      const {
        officeId,
        officeLogo,
        officeName,
        officeType,
        electionDate,
        count,
        candidateStatus,
        officeBtn,
        alreadyApplied
      } = office;

      const officeContent = [
        {
          title: 'Type',
          value: officeType
        },
        {
          title: 'Date',
          value: electionDate
        },
        {
          officeId,
          officeName,
          numberOfCandidates: count,
          type: 'link'
        },
        {
          text: candidateStatus,
          style: officeBtn,
          type:
            candidateStatus === 'Approved candidate' || candidateStatus === 'Awaiting approval'
              ? 'span'
              : !alreadyApplied
              ? 'button'
              : 'empty',
          onClick: !alreadyApplied ? this.expressInterest : null,
          id: JSON.stringify({ officeId, partyId })
        }
      ];

      officesCard.push(
        <Fragment key={Math.random().toString()}>
          <Card name={officeName} image={officeLogo} content={officeContent} />
          {offices.length % 2 !== 0 && ind === offices.length - 1 ? <Card hidden="true" /> : ''}
        </Fragment>
      );
    });

    return (
      <div>
        <AuthHeader />
        <main id="user-home-main">
          <div className="container">
            <AuthNav current="offices" />
            <div id="loadingIconContainer" />
            <section id="user-home-content-div">
              <div className="profile-page-section">
                <h3 id="interested-office-header">Government Offices ({officesCard.length})</h3>
                <div className="content-group" id="governmentOfficeSlot">
                  {officesCard}
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

Offices.propTypes = {
  fetchGovernmentOffices: PropTypes.func.isRequired,
  offices: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  user: state.auth.user,
  offices: state.offices.offices
});

export default connect(
  mapStateToProps,
  { fetchGovernmentOffices, expressInterest }
)(Offices);
