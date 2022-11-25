import axios from "axios";

export const login = async (name) => {
  try {
    const { data } = await axios.post(process.env.REACT_APP_POST_LOGIN, {
      name,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_GET_ALL_USERS);
    return data;
  } catch (error) {
    console.log(error);
  }
};
