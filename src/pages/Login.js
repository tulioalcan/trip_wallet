import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userEmail } from '../redux/actions';

const minLengthPassword = 6;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  validateEmail = () => {
    const { email } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const verifyRegex = regex.test(email) && email;
    return verifyRegex;
  };

  validatePassword = () => {
    const { password } = this.state;
    return password.length >= minLengthPassword;
  };

  handleButton = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const { email, password } = this.state;
      if (this.validateEmail(email) && this.validatePassword(password)) {
        this.setState({ isDisabled: false });
      } else {
        this.setState({ isDisabled: true });
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(userEmail(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;

    return (
      <>
        <h3>Página de Login</h3>
        <form>
          <label htmlFor="email">
            <input
              data-testid="email-input"
              type="text"
              name="email"
              placeholder="email"
              onChange={ this.handleButton }
              value={ email }
            />
          </label>
          <label htmlFor="password">
            <input
              data-testid="password-input"
              type="text"
              name="password"
              placeholder="password"
              onChange={ this.handleButton }
              value={ password }
            />
            <button
              type="button"
              disabled={ isDisabled }
              onClick={ this.handleSubmit }
            >
              Entrar
            </button>
          </label>
        </form>
      </>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
