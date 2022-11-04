// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { RESPONSE_API, SAVE_EXPENSE, TOTAL_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: null,
  dados: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RESPONSE_API:
    return {
      ...state,
      currencies: Object.keys(action.currencies),
    };
  case TOTAL_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
      dados: [...state.dados, action.dados],
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
};

export default wallet;
