// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  FETCH_CURRENCIES, FETCH_CURRENCIES_SUCCESS, FETCH_CURRENCIES_FAIL,
  FETCH_RATES, FETCH_RATES_SUCCESS, FETCH_RATES_FAIL,
  REGISTER_EXPENSE, REMOVE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  exchangeRates: {},
  loading: false,
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_CURRENCIES || FETCH_RATES:
    return {
      ...state,
      loading: true,
      error: '',
    };

  case FETCH_CURRENCIES_SUCCESS:
    return {
      ...state,
      loading: false,
      currencies: action.currencies,
      error: '',
    };

  case FETCH_RATES_SUCCESS:
    return {
      ...state,
      loading: false,
      exchangeRates: action.rates,
      error: '',
    };

  case FETCH_CURRENCIES_FAIL || FETCH_RATES_FAIL:
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

  case REMOVE_EXPENSE: {
    const expenses = state;
    return {
      ...state,
      expenses: expenses.filter((e) => e.id !== action.expenseId),
    };
  }

  default:
    return state;
  }
};

export default wallet;
