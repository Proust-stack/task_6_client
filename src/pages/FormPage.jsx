import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import moment from "moment";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { io } from "socket.io-client";

import { MESSAGES_ROUTE } from "../utils/const";
import { getOutbox, sendMessage } from "../http/messageAPI";
import { Typography } from "@mui/material";

const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      {...props}
      sx={{ top: 0, marginBottom: 10 }}
    />
  );
});

const FormPage = () => {
  const navigate = useNavigate();
  const { currentUser, users } = useSelector((state) => state.users);
  const [title, setTitle] = useState("");
  const [to, setTo] = useState(null);
  const [body, setBody] = useState("");
  const [outbox, setOutbox] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrivedMessage, setArrivalMessage] = useState(null);
  const [state, setState] = useState({
    openReceived: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, openReceived } = state;

  const socket = useRef();

  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage(msg);
        handleClick({
          vertical: "top",
          horizontal: "center",
        });
      });
    }
  }, []);

  const getOutboxMessages = async (newValue) => {
    const outbox = await getOutbox(currentUser, newValue);
    setOutbox(outbox);
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

  const handleClick = (newState) => {
    setState({ openReceived: true, ...newState });
  };

  const handleCloseReceived = () => {
    setState({ ...state, openReceived: false });
  };

  const click = async () => {
    try {
      await sendMessage(title, body, currentUser, to);
      const msg = { title, body, from: currentUser };
      if (to === currentUser) {
        setArrivalMessage(msg);
        handleClick({
          vertical: "top",
          horizontal: "center",
        });
      }
      socket.current.emit("send-msg", {
        to: to,
        from: currentUser,
        msg,
      });
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
              options={users}
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
            To inbox
          </Button>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical, horizontal }}
            sx={{ marginBottom: 10 }}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Message is sent!
            </Alert>
          </Snackbar>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            autoHideDuration={3000}
            open={openReceived}
            onClose={handleCloseReceived}
          >
            <Alert
              onClose={handleCloseReceived}
              severity="success"
              sx={{ width: "100%" }}
            >
              <Stack>
                {arrivedMessage && (
                  <>
                    <Typography>{arrivedMessage.from}</Typography>
                    <Typography>{arrivedMessage.title}</Typography>
                    <Typography>{arrivedMessage.body}</Typography>
                  </>
                )}
              </Stack>
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
            Outbox mesages: {to ? to : "choose receipient"}
          </Typography>
          {outbox.length
            ? outbox.map((item) => {
                return (
                  <Stack key={item.createdAt}>
                    <Typography sx={{ color: "white" }}>
                      Title: {item.title}
                    </Typography>
                    <Typography>{item.body}</Typography>
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
