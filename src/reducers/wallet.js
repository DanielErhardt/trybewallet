// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_CURRENCIES, GET_CURRENCIES_SUCCESS, GET_CURRENCIES_FAIL,
  REGISTER_EXPENSE, DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  loading: false,
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES:
    return {
      ...state,
      loading: true,
    };

  case GET_CURRENCIES_SUCCESS:
    return {
      ...state,
      loading: false,
      currencies: action.currencies,
      error: '',
    };

  case GET_CURRENCIES_FAIL:
    return {
      ...state,
      loading: false,
      error: action.error,
    };

  case REGISTER_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };

  case DELETE_EXPENSE: {
    const newExpenses = [];
    return {
      ...state,
      expenses: newExpenses,
    };
  }

  default:
    return state;
  }
};

export default wallet;
