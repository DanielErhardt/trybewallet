export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
export const FETCH_CURRENCIES_FAIL = 'FETCH_CURRENCIES_FAIL';
export const FETCH_RATES = 'FETCH_RATES';
export const FETCH_RATES_SUCCESS = 'FETCH_RATES_SUCCESS';
export const FETCH_RATES_FAIL = 'FETCH_RATES_FAIL';
export const REGISTER_EXPENSE = 'REGISTER_EXPENSE';
export const REMOVE_EXPENSE = 'DELETE_EXPENSE';
export const REGISTER_USER_EMAIL = 'REGISTER_USER_EMAIL';

export const registerUserEmail = (email) => ({
  type: REGISTER_USER_EMAIL,
  email,
});

export const registerExpense = (expense) => ({
  type: REGISTER_EXPENSE,
  expense,
});

export const removeExpense = (expenseId) => ({
  type: REMOVE_EXPENSE,
  expenseId,
});

const CURRENCIES_API = 'https://economia.awesomeapi.com.br/json/all';

export const fetchCurrencies = () => ({
  type: FETCH_CURRENCIES,
});

export const fetchCurrenciesSuccess = (currencies) => ({
  type: FETCH_CURRENCIES_SUCCESS,
  currencies,
});

export const fetchCurrenciesFail = (error) => ({
  type: FETCH_CURRENCIES_FAIL,
  error,
});

export const fetchCurrenciesThunk = () => async (dispatch) => {
  dispatch(fetchCurrencies());
  try {
    const response = await fetch(CURRENCIES_API);
    const currencies = await response.json();
    const currencyArray = Object.keys(currencies)
      .filter((currency) => currency !== 'USDT');
    dispatch(fetchCurrenciesSuccess(currencyArray));
  } catch (error) {
    dispatch(fetchCurrenciesFail(error));
  }
};

export const fetchRates = () => ({
  type: FETCH_RATES,
});

export const fetchRatesSuccess = (rates) => ({
  type: FETCH_RATES_SUCCESS,
  rates,
});

export const fetchRatesFail = (error) => ({
  type: FETCH_RATES_FAIL,
  error,
});

export const fetchRatesThunk = () => async (dispatch) => {
  dispatch(fetchRates());
  try {
    const response = await fetch(CURRENCIES_API);
    const rates = await response.json();
    dispatch(fetchRatesSuccess(rates));
  } catch (error) {
    dispatch(fetchRatesFail(error));
  }
};
