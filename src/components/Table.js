import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearButton } from '../redux/actions';

class Table extends Component {
  clearExpense = ({ target }) => {
    const { expenses, dispatch } = this.props;
    const remove = expenses.filter((exp) => +target.id !== +exp.id);
    dispatch(clearButton(remove));
  };

  render() {
    const { expenses } = this.props;
    // console.log(expenses);
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
            {expenses.map((expense) => (
              <tr key={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(2) }</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>
                  { Number(expense.exchangeRates[expense.currency].ask).toFixed(2) }
                </td>
                <td>
                  {
                    Number(expense.value
                        * expense.exchangeRates[expense.currency].ask)
                      .toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td
                  key="delete-btn"
                >
                  <button
                    id={ expense.id }
                    type="button"
                    data-testid="delete-btn"
                    onClick={ this.clearExpense }
                  >
                    Excluir
                  </button>
                </td>
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
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
