import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import ExpenseForm from './ExpenseForm';
import ExpenseButtons from '../components/ExpenseButtons';

class Wallet extends React.Component {
  render() {
    const { expenses } = this.props;

    return (
      <div>
        <Header />
        <ExpenseForm />

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
            {expenses.map((expense) => {
              const { value, description, tag, method, currency, exchangeRates } = expense;
              const rate = Object.entries(exchangeRates).find((er) => er[0] === currency)[1];
              return (
                <tr key={ expense.id }>
                  <td>{description}</td>
                  <td>{tag}</td>
                  <td>{method}</td>
                  <td>{Number(value).toFixed(2)}</td>
                  <td>{rate.name}</td>
                  <td>{Number(rate.ask).toFixed(2)}</td>
                  <td>{Number(value * rate.ask).toFixed(2)}</td>
                  <td>Real</td>
                  <td><ExpenseButtons /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

Wallet.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Wallet);
