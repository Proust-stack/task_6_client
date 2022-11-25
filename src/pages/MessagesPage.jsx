import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import moment from "moment";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { FORM_ROUTE } from "../utils/const";
import { getInbox } from "../http/messageAPI";

const MessagePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.users);

  const [inbox, setInbox] = useState([]);

  const getInboxMessages = async () => {
    const inbox = await getInbox(currentUser);
    setInbox(inbox);
  };

  useEffect(() => {
    getInboxMessages();
  }, []);

  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <Stack
          sx={{
            bgcolor: "#cfe8fc",
            display: "flex",
            borderRadius: 5,
            padding: 4,
            marginTop: 2,
            position: "relative",
          }}
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Button
            color="success"
            onClick={() => navigate(FORM_ROUTE)}
            sx={{ position: "absolute", top: 5, left: 18 }}
          >
            Back to Form
          </Button>
          <Typography variant="h2">Inbox messages</Typography>
          {inbox.length
            ? inbox.map((item) => {
                return (
                  <Accordion
                    key={item.createdAt}
                    sx={{
                      borderRadius: 5,
                      backgroundColor: "#4069ee",
                      marginTop: 10,
                      minWidth: 400,
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Stack>
                        <Typography variant="body1">{item.from}</Typography>
                        <Typography variant="body1">{item.title}</Typography>
                        <Typography variant="body1">
                          {moment(`${item.createdAt || ""}`).format(
                            "MMMM Do YYYY, h:mm:ss a"
                          )}
                        </Typography>
                      </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{item.body}</Typography>
                    </AccordionDetails>
                  </Accordion>
                );
              })
            : null}
        </Stack>
      </Container>
    </React.Fragment>
  );
};

export default MessagePage;
