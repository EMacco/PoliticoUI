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

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {},
    formValid: false,
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
    // this.validateLogin();
    switch (name) {
      case 'email':
        errors.email = isEmpty(value)
          ? 'Email is required'
          : (errors.email = isEmail(value) ? '' : 'Invalid Email Address');
        break;
      case 'password':
        errors.password = isEmpty(value) ? 'Password is required' : '';
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

    this.setState({ ...this.state, isLoading: true });

    const { email, password } = this.state;
    const userData = { email, password };
    this.props.loginUser(userData, this.props.history);
  };

  render() {
    const { email, password, errors } = this.state;

    if (this.props.auth.isAuthenticated) return <Redirect to="/userhome" />;

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
                <form onSubmit={this.onSubmit} noValidate>
                  <TextFieldGroup
                    id="loginEmail"
                    placeholder="Email"
                    value={email}
                    name="email"
                    className="signin-text-field"
                    onChange={this.onChange}
                    icon="img/email-icon.png"
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
                    icon="img/password-icon.png"
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
  errors: state.auth.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(withRouter(Login));
