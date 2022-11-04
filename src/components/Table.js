import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    console.log(expenses);
    return (
      <>
        <h3>Table</h3>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, id) => (
              <tr key={ id }>
                <td key={ expense.description }>{expense.description}</td>
                <td key={ expense.tag }>{expense.tag}</td>
                <td key={ expense.method }>{expense.method}</td>
                <td key={ expense.value }>{Number(expense.value).toFixed(2) }</td>
                <td
                  key={ expense.exchangeRates[expense.currency].name }
                >
                  {expense.exchangeRates[expense.currency].name}
                </td>
                <td
                  key={ expense.exchangeRates[expense.currency].ask }
                >
                  { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
                </td>
                <td
                  key={ expense.value * id }
                >
                  {
                    Number(expense.value
                        * expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)
                  }
                </td>
                <td key={ expense.currency }>Real</td>
                {/* <td
                  key="delete-btn"
                >
                  <button
                    type="button"
                    data-testid="delete-btn"
                  >
                    Excluir despesa

                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
export default connect(mapStateToProps)(Table);
