import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, expenses } = this.props;
    return (
      <>
        <div>Header</div>
        <header>
          <span data-testid="email-field">{ email }</span>
          <label htmlFor="total-field">
            <span data-testid="total-field">
              { expenses.reduce((acc, curr) => {
                acc += +curr.value * +curr.exchangeRates[curr.currency].ask;
                return acc;
              }, 0).toFixed(2)}
            </span>
          </label>
          <span data-testid="header-currency-field">BRL</span>
        </header>
      </>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
