import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import TextFieldGroup from '../common/TextFieldGroup';
import { loginUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import { isEmail, isLength } from 'validator';
import isEmpty from '../../validations/is-empty';
import passwordIcon from '@base/img/password-icon.png';
import emailIcon from '@base/img/email-icon.png';
import arrowIcon from '@base/img/arror-icon.png';
import signInBanner from '@base/img/signin-banner.png';

export class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    formValid: true,
    isLoading: false
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.errors.global) {
      this.setState({ ...this.state, isLoading: false });
      toast.error(nextProps.errors.global);
    }
  };

  onChange = e => {
    const { errors } = this.state;
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        errors.email = isEmpty(value)
          ? 'Email is required'
          : (errors.email = isEmail(value) ? '' : 'Invalid Email Address');
        break;
      case 'password':
        errors.password = isEmpty(value)
          ? 'Password is required'
          : (errors.password = isLength(value, { min: 8, max: 15 })
              ? ''
              : 'Password should be between 8 and 15 characters');
        break;
      default:
        break;
    }
    this.isValid(errors);
    this.setState({ errors, [name]: value });
  };

  validateLoginDetails = () => {
    const errors = {};
    const { email, password } = this.state;
    errors.email = isEmpty(email)
      ? 'Email is required'
      : (errors.email = isEmail(email) ? '' : 'Invalid Email Address');

    errors.password = isEmpty(password)
      ? 'Password is required'
      : (errors.password = isLength(password, { min: 8, max: 15 })
          ? ''
          : 'Password should be between 8 and 15 characters');

    this.setState({ ...this.state, errors });

    return this.isValid(errors);
  };

  isValid = errors => {
    let valid = true;

    Object.values(errors).forEach(val => {
      val.length > 0 && (valid = false);
    });

    this.setState({
      formValid: valid
    });
    return valid;
  };

  onSubmit = e => {
    e.preventDefault();

    const valid = this.validateLoginDetails();

    if (valid) {
      this.setState({ ...this.state, isLoading: true });

      const { email, password } = this.state;
      const userData = { email, password };
      this.props.loginUser(userData);
    }
  };

  render() {
    const { email, password, errors } = this.state;

    if (this.props.auth.isAuthenticated) return <Redirect to="/dashboard" />;

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
                <img src={signInBanner} />
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
                <form onSubmit={this.onSubmit} noValidate>
                  <TextFieldGroup
                    id="loginEmail"
                    placeholder="Email"
                    value={email}
                    name="email"
                    className="signin-text-field"
                    onChange={this.onChange}
                    icon={emailIcon}
                    error={errors.email}
                  />

                  <TextFieldGroup
                    id="loginPassword"
                    placeholder="Password"
                    value={password}
                    type="password"
                    name="password"
                    className="signin-text-field"
                    onChange={this.onChange}
                    icon={passwordIcon}
                    error={errors.password}
                  />

                  <button
                    type="submit"
                    disabled={this.state.isLoading ? true : !this.state.formValid}
                    className="signin-submit-btn"
                    id="loginBtn"
                  >
                    {this.state.isLoading ? 'Logging in...' : 'Login'}
                  </button>

                  <div className="create-account-div">
                    <Link to="/register">Create your Account</Link>
                    <img src={arrowIcon} />
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
  errors: state.auth.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
