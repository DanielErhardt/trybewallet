import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    let total = 0;
    expenses.forEach((expense) => {
      const { exchangeRates, currency } = expense;
      const rateInfo = Object.entries(exchangeRates).find((r) => r[0] === currency)[1];
      total += expense.value * rateInfo.ask;
    });

    total = total.toFixed(2);

    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ total }</p>
        <p data-testid="header-currency-field">BRL</p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
