import axios from "axios";
import { SERVER_URL } from "@env";

export const saveExpense = async ({ expenseData, token }) => {
  const response = await axios.post(
    `${SERVER_URL}/expenses.json?auth=${token}`,
    expenseData
  );

  return response.data.name;
};

export const loadExpenses = async ({ token }) => {
  const response = await axios.get(`${SERVER_URL}/expenses.json?auth=${token}`);

  const responsesArray = Object.keys(response.data).map((item) => {
    return {
      ...response.data[item],
      id: item,
      date: new Date(response.data[item].date),
    };
  });

  return responsesArray;
};

export const updateExpenseServer = ({ id, expenseData, token }) => {
  return axios.put(
    `${SERVER_URL}/expenses/${id}.json?auth=${token}`,
    expenseData
  );
};

export const deleteExpenseServer = ({ id, token }) => {
  return axios.delete(`${SERVER_URL}/expenses/${id}.json?auth=${token}`);
};
