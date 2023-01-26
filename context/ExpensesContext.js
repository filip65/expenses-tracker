import { createContext, useContext, useReducer, useState } from "react";

const DUMMY_EXPENSES = [
  {
    id: 1,
    title: "A pair of shoes",
    amount: 59.99,
    date: new Date("2023-01-23"),
  },
  {
    id: 2,
    title: "Macbook",
    amount: 1259.99,
    date: new Date("2022-02-19"),
  },
  {
    id: 3,
    title: "Chocolate Protein",
    amount: 12.99,
    date: new Date("2022-07-01"),
  },
  {
    id: 4,
    title: "Book",
    amount: 32.99,
    date: new Date("2022-09-01"),
  },
];

const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: ({ id }) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const { title, amount, date } = action.payload;
      const id = new Date().toString() + Math.random().toString();
      return [
        {
          id,
          title,
          amount,
          date,
        },
        ...state,
      ];
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
  const [expenses, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({
      type: "ADD",
      payload: expenseData,
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
      value={{ expenses, addExpense, deleteExpense, updateExpense }}
    >
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpensesContextProvider;

export const useExpensesContext = () => useContext(ExpensesContext);
