import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUserEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isButtonDisabled: true,
    };
  }

  isLoginValid = () => {
    // Regex tirado do link https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
    const EMAIL_VALIDATION_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const PW_MINIMUM_LENGTH = 6;
    const { email, password } = this.state;
    return EMAIL_VALIDATION_REGEX.test(email) && password.length >= PW_MINIMUM_LENGTH;
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => {
      this.setState({
        isButtonDisabled: !this.isLoginValid(),
      });
    });
  }

  onLoggedIn = () => {
    const { history, registerEmail } = this.props;
    const { email } = this.state;
    registerEmail(email);
    history.push('/carteira');
  }

  render() {
    const { email, password, isButtonDisabled } = this.state;

    return (
      <div>
        <input
          type="email"
          data-testid="email-input"
          name="email"
          value={ email }
          onChange={ this.handleInputChange }
        />

        <input
          type="password"
          data-testid="password-input"
          name="password"
          value={ password }
          onChange={ this.handleInputChange }
        />

        <button
          type="button"
          disabled={ isButtonDisabled }
          onClick={ this.onLoggedIn }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape.isRequired,
  registerEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  registerEmail: (email) => dispatch(registerUserEmail(email)),
});

export default connect(null, mapDispatchToProps)(Login);
