import axios from "axios";

const SERVER_URL =
  "https://expenses-app-921f1-default-rtdb.europe-west1.firebasedatabase.app";

export const saveExpense = async (expenseData) => {
  const response = await axios.post(`${SERVER_URL}/expenses.json`, expenseData);

  return response.data.name;
};

export const loadExpenses = async () => {
  const response = await axios.get(`${SERVER_URL}/expenses.json`);

  const responsesArray = Object.keys(response.data).map((item) => {
    return {
      ...response.data[item],
      id: item,
      date: new Date(response.data[item].date),
    };
  });

  return responsesArray;
};

export const updateExpenseServer = (id, expenseData) => {
  return axios.put(`${SERVER_URL}/expenses/${id}.json`, expenseData);
};

export const deleteExpenseServer = (id) => {
  return axios.delete(`${SERVER_URL}/expenses/${id}.json`);
};
