import React from 'react';

class ExpenseButtons extends React.Component {
  render() {
    return (
      <div>
        <button
          type="button"
        >
          Editar
        </button>
        <button
          type="button"
        >
          Excluir
        </button>
      </div>
    );
  }
}

export default ExpenseButtons;
