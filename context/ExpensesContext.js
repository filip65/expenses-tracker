import { createContext, useContext, useReducer } from "react";

const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpenses: (expenses) => {},
  deleteExpense: ({ id }) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      return action.payload;
    case "UPDATE":
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return { ...item, ...action.payload.expenseData };
        } else {
          return { ...item };
        }
      });

    case "DELETE":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

const ExpensesContextProvider = ({ children }) => {
  const [expenses, dispatch] = useReducer(expensesReducer, []);

  const addExpense = (expenseData) => {
    dispatch({
      type: "ADD",
      payload: expenseData,
    });
  };

  const setExpenses = (expenses) => {
    dispatch({
      type: "SET",
      payload: expenses,
    });
  };

  const deleteExpense = (id) => {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({
      type: "UPDATE",
      payload: {
        id,
        expenseData,
      },
    });
  };

  return (
    <ExpensesContext.Provider
      value={{
        expenses,
        addExpense,
        setExpenses,
        deleteExpense,
        updateExpense,
      }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;

export const useExpensesContext = () => useContext(ExpensesContext);
