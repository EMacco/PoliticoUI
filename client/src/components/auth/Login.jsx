import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import TextFieldGroup from '../common/TextFieldGroup';
import { loginUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';

class Login extends Component {
  state = {
    email: '',
    password: ''
  };

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/userhome');
    }
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/userhome');
    } else {
      if (nextProps.errors) {
        // Display the error
        toast.error(nextProps.errors.global);
      }
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const userData = { email, password };
    this.props.loginUser(userData);
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="outer">
        <div className="middle">
          <header className="signin-header">
            <center>
              <h1>
                <Link to="/">Politico</Link>
              </h1>
            </center>
          </header>
          <div className="inner">
            <div className="form-image-div">
              <div className="login-image-banner">
                <img src="img/signin-banner.png" />
              </div>
            </div>

            <div className="login-form">
              <div className="form-attributes">
                <center>
                  <h1>Member Login</h1>
                </center>
                <center>
                  <label id="errorMessage" />
                </center>
                <form onSubmit={this.onSubmit}>
                  <TextFieldGroup
                    id="loginEmail"
                    placeholder="Email"
                    value={email}
                    name="email"
                    className="signin-text-field"
                    onChange={this.onChange}
                    icon="img/email-icon.png"
                  />

                  <TextFieldGroup
                    id="loginPassword"
                    placeholder="Password"
                    value={password}
                    type="password"
                    name="password"
                    className="signin-text-field"
                    onChange={this.onChange}
                    icon="img/password-icon.png"
                  />

                  <input type="submit" value="Login" className="signin-submit-btn" id="loginBtn" />

                  <div className="create-account-div">
                    <Link to="signup.html">Create your Account</Link>
                    <img src="img/arror-icon.png" />
                  </div>
                </form>
              </div>
            </div>
          </div>

          <footer className="signin-footer">
            Politico Website Designed by Okwara Emmanuel &copy; 2019
          </footer>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
