import axios from "axios";

export const sendMessage = async (title, body, from, to) => {
  const { data } = await axios.post(process.env.REACT_APP_POST_NEW_MESSAGE, {
    title,
    body,
    from,
    to,
  });
  return data;
};
export const getInbox = async (name) => {
  const { data } = await axios.get(process.env.REACT_APP_GET_INBOX, {
    params: {
      name,
    },
  });
  return data;
};
export const getOutbox = async (name) => {
  const { data } = await axios.get(process.env.REACT_APP_GET_OUTBOX, {
    params: {
      name,
    },
  });
  return data;
};
