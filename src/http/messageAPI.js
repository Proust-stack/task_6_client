import axios from "axios";

export const sendMessage = async (title, body, from, to) => {
  try {
    const { data } = await axios.post(process.env.REACT_APP_POST_NEW_MESSAGE, {
      title,
      body,
      from,
      to,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getInbox = async (name) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_GET_INBOX, {
      params: {
        name,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOutbox = async (name, to) => {
  try {
    const { data } = await axios.get(process.env.REACT_APP_GET_OUTBOX, {
      params: {
        name,
        to,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
