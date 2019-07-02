import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import personIcon from '@base/img/person-large.png';
import { logoutUser } from '@actions/authActions';
import { updateProfilePicture } from '@actions/dashboard';

class AuthNav extends Component {
  state = {
    uploadingMessage: '',
    src: ''
  };

  signoutBtnClicked = () => {
    this.props.logoutUser(this.props.history);
  };

  profileImageChanged = event => {
    this.setState({ uploadingMessage: 'Uploading...' });

    if (event.target.files.length > 0) {
      this.setState({ src: URL.createObjectURL(event.target.files[0]) });
      this.props.updateProfilePicture(this.state.src);
    }
  };

  render() {
    const { firstname, lastname, email, phonenumber, passporturl, isadmin } = this.props.auth.user;

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
          <input
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            className="select-btn"
            id="profile-file-upload"
            onChange={this.profileImageChanged}
          />
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

        <Link to="/dashboard" id="current-side-bar">
          <div className="nav-menu" id="current-side-bar">
            My Profile
          </div>
        </Link>
        {isadmin ? (
          <Link to="/admin-dashboard" id="hideDashboardDiv">
            <div className="nav-menu">My Dashboard</div>
          </Link>
        ) : (
          ''
        )}
        <Link to="/parties">
          <div className="nav-menu">Political Parties</div>
        </Link>
        <Link to="/offices">
          <div className="nav-menu">Government Offices</div>
        </Link>
        <Link to="/elections">
          <div className="nav-menu">Vote</div>
        </Link>
        <Link to="/dashboard" onClick={this.signoutBtnClicked}>
          <div className="nav-menu">Log out</div>
        </Link>
      </section>
    );
  }
}

AuthNav.prototypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  updateProfilePicture: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser, updateProfilePicture }
)(withRouter(AuthNav));
