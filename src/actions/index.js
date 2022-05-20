export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
export const FETCH_CURRENCIES_FAIL = 'FETCH_CURRENCIES_FAIL';
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

export const deleteExpense = (expense) => ({
  type: REMOVE_EXPENSE,
  expense,
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
