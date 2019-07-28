import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import TextFieldGroup from '../common/TextFieldGroup';
import { registerUser } from '../../actions/authActions';
import { withRouter } from 'react-router-dom';
import { isEmail, isLength } from 'validator';
import isEmpty from '../../validations/is-empty';
import signupBanner from '@base/img/signup-banner.png';
import personIcon from '@base/img/person-icon.png';
import phoneIcon from '@base/img/phone-icon.png';
import arrowIcon from '@base/img/arror-icon.png';
import emailIcon from '@base/img/email-icon.png';
import passwordIcon from '@base/img/password-icon.png';

export class Register extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
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

  validateLoginDetails = () => {
    const errors = {};
    const { firstName, lastName, phoneNumber, email, password } = this.state;
    errors.firstName = isEmpty(firstName)
      ? 'First name is required'
      : (errors.firstName = isLength(firstName, { min: 3, max: 15 })
          ? ''
          : 'First name should be between 3 and 15 characters');
    errors.lastName = isEmpty(lastName)
      ? 'Last name is required'
      : (errors.lastName = isLength(lastName, { min: 3, max: 15 })
          ? ''
          : 'Last name should be between 3 and 15 characters');
    errors.phoneNumber = isEmpty(phoneNumber)
      ? 'Phone number is required'
      : (errors.phoneNumber = isLength(phoneNumber, { min: 11, max: 11 })
          ? ''
          : 'Phone number should be 11 characters');
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

  onChange = e => {
    const { errors } = this.state;
    const { name, value } = e.target;
    switch (name) {
      case 'firstName':
        errors.firstName = isEmpty(value)
          ? 'First name is required'
          : (errors.firstName = isLength(value, { min: 3, max: 15 })
              ? ''
              : 'First name should be between 3 and 15 characters');
        break;
      case 'lastName':
        errors.lastName = isEmpty(value)
          ? 'Last name is required'
          : (errors.lastName = isLength(value, { min: 3, max: 15 })
              ? ''
              : 'Last name should be between 3 and 15 characters');
        break;
      case 'phoneNumber':
        errors.phoneNumber = isEmpty(value)
          ? 'Phone number is required'
          : (errors.phoneNumber = isLength(value, { min: 11, max: 11 })
              ? ''
              : 'Phone number should be 11 characters');
        break;
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

      const { firstName, lastName, phoneNumber, email, password } = this.state;
      const userData = { firstName, lastName, phoneNumber, email, password };
      this.props.registerUser(userData);
    }
  };

  render() {
    const { firstName, lastName, phoneNumber, email, password, errors } = this.state;

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
                <img src={signupBanner} />
              </div>
            </div>

            <div className="login-form">
              <div className="form-attributes-registration">
                <center>
                  <h1>Create Account</h1>
                </center>
                <center>
                  <label id="errorMessage" />
                </center>
                <form onSubmit={this.onSubmit} noValidate>
                  <TextFieldGroup
                    id="firstNameField"
                    placeholder="First Name"
                    value={firstName}
                    name="firstName"
                    className="signin-text-field"
                    onChange={this.onChange}
                    icon={personIcon}
                    error={errors.firstName}
                  />

                  <TextFieldGroup
                    id="lastNameField"
                    placeholder="Last Name"
                    value={lastName}
                    name="lastName"
                    className="signin-text-field"
                    onChange={this.onChange}
                    icon={personIcon}
                    error={errors.lastName}
                  />

                  <TextFieldGroup
                    id="phoneField"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    name="phoneNumber"
                    className="signin-text-field"
                    onChange={this.onChange}
                    icon={phoneIcon}
                    error={errors.phoneNumber}
                  />

                  <TextFieldGroup
                    id="emailField"
                    placeholder="Email"
                    value={email}
                    name="email"
                    className="signin-text-field"
                    onChange={this.onChange}
                    icon={emailIcon}
                    error={errors.email}
                  />

                  <TextFieldGroup
                    id="passwordField"
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
                    {this.state.isLoading ? 'Registering...' : 'Join Us'}
                  </button>

                  <div className="create-account-div">
                    <Link to="/login">Already have an account?</Link>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.auth.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
