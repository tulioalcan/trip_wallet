export const USER_EMAIL = 'USER_EMAIL';
export const RESPONSE_API = 'RESPONSE_API';
export const TOTAL_EXPENSE = 'TOTAL_EXPENSE';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const CLEAR_BUTTON = 'CLEAR_BUTTON';

export const userEmail = (email) => ({
  type: USER_EMAIL,
  email,
});

export const responseAPI = (currencies) => ({
  type: RESPONSE_API,
  currencies,
});

export const saveExpense = (expenses) => ({
  type: SAVE_EXPENSE,
  expenses,
});

export const clearButton = (payload) => ({
  type: CLEAR_BUTTON,
  payload,
});

export function fetchAPI() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const result = await response.json();
      delete result.USDT;
      dispatch(responseAPI(result));
      return result;
    } catch (error) {
      dispatch(getError(error.message));
    }
  };
}

export function totalExpenses(expenses) {
  return async (dispatch) => {
    const exchangeRates = await dispatch(fetchAPI());
    const { value, currency } = expenses;
    const data = Object.values(exchangeRates).find((exp) => exp.code === currency);
    const { ask, name } = data;
    const infoCurrency = (Number(ask) * value).toFixed(2);
    const objeto = { ...expenses, exchangeRates };
    dispatch(saveExpense(objeto));
    return {
      type: SAVE_EXPENSE,
      expenses: objeto,
      dados: {
        name,
        ask,
        infoCurrency,
      },
    };
  };
}
