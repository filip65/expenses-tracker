import axios from "axios";

import { API_KEY } from "@env";

export const authenticate = async ({ mode, email, password }) => {
  const response = await axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`,
    {
      email,
      password,
      returnSecureToken: true,
    }
  );

  return response.data;
};

export const signupWithEmailAndPassword = async ({ email, password }) => {
  return await authenticate({ mode: "signUp", email, password });
};

export const loginWithEmailAndPassword = async ({ email, password }) => {
  return await authenticate({ mode: "signInWithPassword", email, password });
};
