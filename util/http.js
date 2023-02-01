import axios from "axios";
import { SERVER_URL } from "@env";

export const saveExpense = async ({ data, token, localId }) => {
  const response = await axios.post(
    `${SERVER_URL}/users/${localId}/expenses.json?auth=${token}`,
    data
  );

  return response.data.name;
};

export const loadExpenses = async ({ token, localId }) => {
  const userResponse = await axios.get(
    `${SERVER_URL}/users/${localId}.json?auth=${token}`
  );

  if (!userResponse.data) {
    return [];
  }

  const response = await axios.get(
    `${SERVER_URL}/users/${localId}/expenses.json?auth=${token}`
  );

  const responsesArray = Object.keys(response.data).map((item) => {
    return {
      ...response.data[item],
      id: item,
      date: new Date(response.data[item].date),
    };
  });

  return responsesArray;
};

export const updateExpenseServer = ({ id, data, token, localId }) => {
  return axios.put(
    `${SERVER_URL}/users/${localId}/expenses/${id}.json?auth=${token}`,
    data
  );
};

export const deleteExpenseServer = ({ id, token, localId }) => {
  return axios.delete(
    `${SERVER_URL}/users/${localId}/expenses/${id}.json?auth=${token}`
  );
};
