import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import moment from "moment";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import { FORM_ROUTE, MESSAGES_ROUTE } from "../utils/const";
import { login } from "../http/userAPI";
import { registryUser } from "../store/userSlice";
import { getOutbox, sendMessage } from "../http/messageAPI";
import { Typography } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      {...props}
      sx={{ top: 0 }}
    />
  );
});

const FormPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser, users } = useSelector((state) => state.users);
  const [errorMessage, setErrorMessage] = useState(null);
  const [title, setTitle] = useState("");
  const [to, setTo] = useState("");
  const [body, setBody] = useState("");
  const [outbox, setOutbox] = useState([]);
  const [open, setOpen] = React.useState(false);

  const defaultProps = {
    options: users,
    getOptionLabel: (option) => (option.name ? option.name : option),
  };

  const getOutboxMessages = async (newValue) => {
    const outbox = await getOutbox(currentUser);
    const filteredOutbox = outbox.filter((item) => item.to === newValue);
    setOutbox(filteredOutbox);
  };

  const handleTo = (event, newValue) => {
    setTo(newValue);
    getOutboxMessages(newValue);
  };
  const handleTitle = (event) => {
    setTitle(event.target.value);
  };
  const handleBody = (event) => {
    setBody(event.target.value);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const click = async () => {
    try {
      await sendMessage(title, body, currentUser, to);
      setOpen(true);
      setOutbox([]);
      setTo("");
      setTitle("");
      setBody("");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Stack
          sx={{
            bgcolor: "#cfe8fc",
            display: "flex",
            paddingBottom: 4,
            borderRadius: 5,
            marginTop: 2,
            position: "relative",
          }}
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Stack spacing={1} sx={{ minWidth: 200 }}>
            <Autocomplete
              {...defaultProps}
              value={to}
              onChange={handleTo}
              renderInput={(params) => (
                <TextField {...params} label="receiver" variant="standard" />
              )}
            />
          </Stack>
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="title"
            value={title}
            onChange={handleTitle}
            sx={{ minWidth: 400 }}
          />
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="message"
            value={body}
            onChange={handleBody}
            multiline
            maxRows={10}
            minRows={5}
            sx={{ minWidth: 400 }}
          />
          <Button variant="contained" color="success" onClick={click}>
            Send message
          </Button>
          <Button
            color="success"
            onClick={() => navigate(MESSAGES_ROUTE)}
            sx={{ position: "absolute", top: 2, right: 20 }}
          >
            To inbox messages
          </Button>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Message is sent!
            </Alert>
          </Snackbar>
        </Stack>
        <Stack
          sx={{
            bgcolor: "#0a5486",
            display: "flex",
            borderRadius: 5,
            padding: 4,
            marginTop: 2,
          }}
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Typography sx={{ color: "white" }}>
            Mesages: {to ? to : "choose receipient"}
          </Typography>
          {outbox.length
            ? outbox.map((item) => {
                return (
                  <Stack key={item.createdAt}>
                    <Typography sx={{ color: "white" }}>
                      Title: {item.title}
                    </Typography>
                    <Typography>
                      {moment(`${item.createdAt || ""}`).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </Typography>
                  </Stack>
                );
              })
            : null}
        </Stack>
      </Container>
    </React.Fragment>
  );
};

export default FormPage;
