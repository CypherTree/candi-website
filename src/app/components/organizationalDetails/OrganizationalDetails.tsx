import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@material-ui/core";
import { Label } from "@material-ui/icons";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

function OrganizationalDetails() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(data);
  const [domain, setDomain] = useState("");

  const { control, errors: fieldsErrors } = useForm();

  return (
    <div>
      Enter details of your organisation.
      <div
        style={{
          //   border: "1px solid black",
          margin: "0 auto",
          lineHeight: "40px",
          width: "800px",
          padding: "100px",
          paddingTop: "0px",
          paddingBottom: "0px",
        }}
      >
        {/* <InputLabel htmlFor="my-input">Company Name</InputLabel> */}
        <TextField
          type="text"
          label="Organisation Name"
          fullWidth
          required
          //   helperText="Name of your organisation"
          autoFocus={true}
          color="primary"
          size="medium"
          variant="outlined"
        ></TextField>
        <br /> <br />
        <TextField
          type="text"
          label="Website"
          fullWidth
          required
          //   helperText="Your organization's website URL"
          autoFocus={true}
          color="primary"
          size="medium"
          variant="outlined"
        ></TextField>
        <br /> <br />
        <TextField
          type="text"
          label="Domain"
          fullWidth
          required
          //   helperText="Name of your company"
          autoFocus={true}
          color="primary"
          size="medium"
          variant="outlined"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        ></TextField>
        {/* {domain !== "" && ( */}
        <div>
          <span>
            Your domain will be
            <Typography variant="h5" component="h5" color="primary">
              {domain === "" ? "your-domain" : domain}.cyphertree.com
            </Typography>
          </span>
        </div>
        {/* )} */}
        {domain !== "" && (
          <div>
            <p>
              This domain is available.{" "}
              <CheckCircleIcon fontSize="small" style={{ color: "green" }} />
            </p>
          </div>
        )}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          //   autoFocus={true}
        >
          {" "}
          Save and Continue
        </Button>
      </div>
    </div>
  );
}

export default OrganizationalDetails;
