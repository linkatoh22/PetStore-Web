import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const SignUpAPI = async ({ email, password, username }) => {
  const response = await axios.post(`${BASE_URL}/auth/sign-up`, {
    email,
    username,
    password
  });
  return response.data;
};