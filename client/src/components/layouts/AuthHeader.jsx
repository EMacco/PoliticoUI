import React, { Component, Fragment } from 'react';
import NavItem from '@components/common/NavItem';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { logoutUser } from '@actions/authActions';

class AuthHeader extends Component {
  state = { showOverlay: false };

  toggleMenu = () => {
    this.setState({ showOverlay: !this.state.showOverlay });
  };

  signoutBtnClicked = () => {
    this.props.logoutUser(this.props.history);
  };

  render() {
    if (!this.props.auth.isAuthenticated) return <Redirect to="/" />;
    const { firstname, lastname, isadmin } = this.props.auth.user;
    const fullname = `${firstname} ${lastname}`;
    return (
      <Fragment>
        <header className="index-header">
          <h1 className="logo">
            <a href="user-home.html">POLITICO</a>
          </h1>

          <input type="checkbox" className="nav-toggle" id="nav-toggle" onClick={this.toggleMenu} />
          <nav>
            <div className="header-nav">
              <ul id="hideDashboard">
                <NavItem name="Home" path="/dashboard" />

                {isadmin ? <NavItem name="My Dashboard" path="/admin-dashboard" /> : ''}

                <NavItem name="Political Parties" path="/parties" />
                <NavItem name="Government Offices" path="/offices" />
                <NavItem name="Vote" path="/election" />
                <li>
                  <a onClick={this.signoutBtnClicked}>Log out</a>
                </li>
              </ul>
            </div>
            <div className="header-nav-big-screen">
              <ul>
                <li>
                  Welcome, <span id="welcomeUserLbl">{fullname}</span>
                </li>
              </ul>
            </div>
          </nav>
          <label htmlFor="nav-toggle" className="nav-toggle-label">
            <span />
          </label>
        </header>
        <div id="overlay" className={this.state.showOverlay ? 'overlay' : ''} />
      </Fragment>
    );
  }
}

AuthHeader.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(AuthHeader));
