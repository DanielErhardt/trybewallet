export const REGISTER_EXPENSE = 'REGISTER_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const registerExpense = (expense) => ({
  type: REGISTER_EXPENSE,
  expense,
});

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});
