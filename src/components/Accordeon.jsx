import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import moment from "moment";

export default function SimpleAccordion() {
  const { currentUser } = useSelector((state) => state.users);
  return (
    <div>
      <Accordion key={item.createdAt}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{item.from}</Typography>
          <Typography>{item.title}</Typography>
          <Typography>
            {moment(`${item.createdAt || ""}`).format(
              "MMMM Do YYYY, h:mm:ss a"
            )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{item.body}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
