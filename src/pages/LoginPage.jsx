import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

import { FORM_ROUTE } from "../utils/const";
import { getAllUsers, login } from "../http/userAPI";
import { registryUser, setUsers } from "../store/userSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const [userName, setUserName] = useState("");

  const handleChange = (event) => {
    setUserName(event.target.value);
  };

  const click = async () => {
    try {
      const user = await login(userName);
      const users = await getAllUsers();
      dispatch(registryUser({ user }));
      dispatch(setUsers({ users }));
      navigate(FORM_ROUTE);
    } catch (e) {
      setErrorMessage(e.response.data.message);
    }
  };

  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Stack
          sx={{ bgcolor: "#cfe8fc", height: "100vh", display: "flex" }}
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <TextField
            id="demo-helper-text-misaligned-no-helper"
            label="Name"
            value={userName}
            onChange={handleChange}
          />
          <Button variant="contained" color="success" onClick={click}>
            Go
          </Button>
        </Stack>
      </Container>
    </React.Fragment>
  );
};

export default LoginPage;
