import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import personIcon from '@base/img/person-large.png';
import { logoutUser } from '@actions/authActions';

export class AuthNav extends Component {
  state = {
    uploadingMessage: '',
    src: ''
  };

  signoutBtnClicked = () => {
    this.props.logoutUser(this.props.history);
  };

  render() {
    const { firstname, lastname, email, phonenumber, passporturl, isadmin } = this.props.auth.user;
    const { current } = this.props;

    const { uploadingMessage, src } = this.state;
    const profileImage = passporturl === 'undefined' ? personIcon : src === '' ? passporturl : src;

    return (
      <section id="user-profile-container">
        <div>
          <img
            src={profileImage === 'https://' ? personIcon : profileImage}
            id="profile-img-preview"
          />
          <i>
            <label id="uploadingText">{uploadingMessage}</label>
          </i>
        </div>
        <div className="profile-description-text">
          <label>
            <span className="profile-answers" id="welcomeUserLbl2">
              {firstname} {lastname}
            </span>
          </label>
          <label>
            Email:{' '}
            <span className="profile-answers" id="welcomeEmailLbl">
              {email}
            </span>
          </label>
          <label>
            Phone:{' '}
            <span className="profile-answers" id="welcomePhoneLbl">
              {phonenumber}
            </span>
          </label>
        </div>

        <hr className="separate-profile-nav" />

        <Link to="/dashboard" id={current === 'profile' ? 'current-side-bar' : null}>
          <div className="nav-menu" id={current === 'profile' ? 'current-side-bar' : null}>
            My Profile
          </div>
        </Link>
        {/* {isadmin ? (
          <Link to="/admin-dashboard" id={current === 'dashboard' ? 'current-side-bar' : null}>
            <div className="nav-menu" id={current === 'dashboard' ? 'current-side-bar' : null}>
              My Dashboard
            </div>
          </Link>
        ) : (
          ''
        )} */}
        <Link to="/parties" id={current === 'parties' ? 'current-side-bar' : null}>
          <div className="nav-menu" id={current === 'parties' ? 'current-side-bar' : null}>
            Political Parties
          </div>
        </Link>
        <Link to="/offices" id={current === 'offices' ? 'current-side-bar' : null}>
          <div className="nav-menu" id={current === 'offices' ? 'current-side-bar' : null}>
            Government Offices
          </div>
        </Link>
        {/* <Link to="/elections" id={current === 'elections' ? 'current-side-bar' : null}>
          <div className="nav-menu" id={current === 'elections' ? 'current-side-bar' : null}>
            Vote
          </div>
        </Link> */}
        <Link to="/dashboard" onClick={this.signoutBtnClicked}>
          <div className="nav-menu">Log out</div>
        </Link>
      </section>
    );
  }
}

AuthNav.prototypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(AuthNav));
