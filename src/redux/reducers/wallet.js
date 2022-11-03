// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ERROR_API, REQUEST_API, RESPONSE_API } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  error: null,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
    };
  case RESPONSE_API:
    return {
      ...state,
      currencies: Object.keys(action.currencies),
    };
  case ERROR_API:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default wallet;
