// Coloque aqui suas actions
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const GET_CURRENCIES_SUCCESS = 'GET_CURRENCIES_SUCCESS';
export const GET_CURRENCIES_FAIL = 'GET_CURRENCIES_FAIL';

const CURRENCIES_API = 'https://economia.awesomeapi.com.br/json/all';

export const getCurrencies = () => ({
  type: GET_CURRENCIES,
});

export const getCurrenciesSuccess = ({ currencies }) => ({
  type: GET_CURRENCIES_SUCCESS,
  currencies,
});

export const getCurrenciesFail = (error) => ({
  type: GET_CURRENCIES_FAIL,
  error,
});

export const getCurrenciesThunk = () => async (dispatch) => {
  dispatch(getCurrencies());
  try {
    const response = await fetch(CURRENCIES_API);
    const currencies = await response.json();
    const currencyArray = Object.keys(currencies);
    dispatch(getCurrenciesSuccess(currencyArray));
  } catch (error) {
    dispatch(getCurrenciesFail(error));
  }
};
