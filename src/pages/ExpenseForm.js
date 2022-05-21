import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrenciesThunk, fetchRatesThunk, registerExpense } from '../actions';

const DEFAULT_CURRENCY = 'USD';
const DEFAULT_METHOD = 'Dinheiro';
const DEAFULT_TAG = 'Alimentação';

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.state = {
      value: 0,
      currency: DEFAULT_CURRENCY,
      method: DEFAULT_METHOD,
      tag: DEAFULT_TAG,
      description: '',
    };
  }

  componentDidMount() {
    const { fetchCurrencies } = this.props;
    fetchCurrencies();
  }

  onExpenseRegistered = async () => {
    const { fetchRates } = this.props;
    await fetchRates();
    const { value, currency, method, tag, description } = this.state;
    const { expenses, registerNewExpense, exchangeRates } = this.props;
    const id = expenses.length === 0 ? 0 : expenses[expenses.length - 1].id + 1;

    const expense = {
      id,
      value,
      currency,
      method,
      tag,
      description,
      exchangeRates,
    };

    this.setState({
      value: 0,
      currency: DEFAULT_CURRENCY,
      method: DEFAULT_METHOD,
      tag: DEAFULT_TAG,
      description: '',
    });

    registerNewExpense(expense);
  }

  handleInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <label htmlFor="value-input">
          Valor
          <input
            id="value-input"
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            onChange={ this.handleInputChange }
          />
        </label>

        <label htmlFor="currency-input">
          Moeda
          <select
            id="currency-input"
            data-testid="currency-input"
            name="currency"
            value={ currency }
            onChange={ this.handleInputChange }
          >
            {currencies.map((c) => (
              <option key={ c }>{ c }</option>
            ))}
          </select>
        </label>

        <label htmlFor="method-input">
          Método de Pagamento
          <select
            id="method-input"
            data-testid="method-input"
            name="method"
            value={ method }
            onChange={ this.handleInputChange }
          >
            <option>Dinheiro</option>
            <option>Cartão de crédito</option>
            <option>Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag-input">
          Categoria
          <select
            id="tag-input"
            data-testid="tag-input"
            name="tag"
            value={ tag }
            onChange={ this.handleInputChange }
          >
            <option>Alimentação</option>
            <option>Lazer</option>
            <option>Trabalho</option>
            <option>Transporte</option>
            <option>Saúde</option>
          </select>
        </label>

        <label htmlFor="description-input">
          Descrição
          <input
            id="description-input"
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            onChange={ this.handleInputChange }
          />
        </label>

        <button
          type="button"
          onClick={ this.onExpenseRegistered }
        >
          Adicionar despesa
        </button>
      </div>
    );
  }
}

ExpenseForm.propTypes = {
  fetchCurrencies: PropTypes.func.isRequired,
  fetchRates: PropTypes.func.isRequired,
  registerNewExpense: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
  exchangeRates: PropTypes.shape.isRequired,
};

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  exchangeRates: state.wallet.exchangeRates,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCurrencies: () => dispatch(fetchCurrenciesThunk()),
  fetchRates: () => dispatch(fetchRatesThunk()),
  registerNewExpense: (expense) => dispatch(registerExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);
