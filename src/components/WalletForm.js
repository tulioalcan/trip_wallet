import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchAPI, totalExpenses } from '../redux/actions';
import '../pages/wallet.css';

class WalletForm extends Component {
  state = {
    value: 0,
    currency: 'USD',
    description: '',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
    exchangeRates: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAPI());
  }

  handleChangeInput = ({ target }) => {
    const { name, value } = target;
    this.setState((prev) => ({ ...prev,
      [name]: value }));
  };

  addExpenses = async (event) => {
    event.preventDefault();
    const { dispatch } = this.props;
    const { id } = this.state;
    dispatch(totalExpenses(this.state));
    this.setState({
      id: id + 1,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      exchangeRates: '',
    });
  };

  render() {
    const { value, currency, description, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <>
        {/* <h3>WalletForm</h3> */}
        <form className="walletForm">
          <label htmlFor="value">
            <input
              data-testid="value-input"
              name="value"
              type="number"
              placeholder="valor despesa"
              value={ value }
              onChange={ this.handleChangeInput }
            />
          </label>
          <label htmlFor="description">
            <input
              data-testid="description-input"
              name="description"
              type="text"
              placeholder="descrição despesa"
              value={ description }
              onChange={ this.handleChangeInput }
            />
          </label>
          <label htmlFor="currency">
            <select
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChangeInput }
              name="currency"
            >
              { currencies.map((currencie) => (
                <option key={ currencie } value={ currencie }>{ currencie }</option>))}
            </select>
          </label>
          <label htmlFor="method">
            <select
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChangeInput }
              name="method"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag">
            <select
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChangeInput }
              name="tag"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
        <button
          type="button"
          // disabled={ isDisabled }
          onClick={ this.addExpenses }
          className="buttonAdd"
        >
          Adicionar despesa
        </button>
      </>
    );
  }
}

WalletForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    currencies: state.wallet.currencies,
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     fetchApiDispatch: dispatch(fetchAPI()),
//   };
// }

export default connect(mapStateToProps)(WalletForm);
