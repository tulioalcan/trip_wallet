import React, { Component } from 'react';

class WalletForm extends Component {
  render() {
    return (
      <>
        <div>WalletForm</div>
        <label htmlFor="value">
          <input data-testid="value-input" />
        </label>
        <label htmlFor="description">
          <input data-testid="description-input" />
        </label>
        <label htmlFor="slects">
          <select data-testid="currency-input">
            {/* <option key={ coin } /> */}
          </select>
          <select data-testid="method-input">
            <option value="dinheiro">Dinheiro</option>
            <option value="credito">Cartão de crédito</option>
            <option value="debito">Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option value="alimentação">Alimentação</option>
            <option value="lazer">Lazer</option>
            <option value="trabalho">Trabalho</option>
            <option value="transporte">Transporte</option>
            <option value="saude">Saúde</option>
          </select>
        </label>
      </>
    );
  }
}

export default WalletForm;
