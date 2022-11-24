import axios from "axios";

export const login = async (name) => {
  const { data } = await axios.post(process.env.REACT_APP_POST_LOGIN, { name });
  return data;
};
export const getAllUsers = async () => {
  const { data } = await axios.get(process.env.REACT_APP_GET_ALL_USERS);
  return data;
};
