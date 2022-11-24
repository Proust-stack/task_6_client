import * as React from "react";
import TextField from "@mui/material/TextField";

export default function Input() {
  const [name, setName] = React.useState("");
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <TextField
      id="demo-helper-text-misaligned-no-helper"
      label="Name"
      value={name}
      onChange={handleChange}
    />
  );
}
