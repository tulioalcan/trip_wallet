import React from 'react';

class Login extends React.Component {
  render() {
    return (
      <>
        <h3>Página de Login</h3>
        <form>
          <label htmlFor="email">
            <input
              data-testid="email-input"
              type="email"
              name="email"
              placeholder="email"
              onChange={ () => {} }
            />
          </label>
          <label htmlFor="password">
            <input
              data-testid="password-input"
              type="password"
              name="password"
              placeholder="password"
              onChange={ () => {} }
            />
            <button
              data-testid="password-input"
              type="button"
              onClick={ () => {} }
            >
              Entrar
            </button>
          </label>
        </form>
      </>
    );
  }
}

export default Login;
