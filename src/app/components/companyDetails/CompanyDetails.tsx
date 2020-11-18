import { Typography, Button } from "@material-ui/core";
import React from "react";

function CompanyDetails(props: any) {
  const { handleBack } = props;
  return (
    <div>
      <Typography>Enter company details here</Typography>
      <br />
      <br />
      <div>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          //   autoFocus={true}
          onClick={() => handleBack()}
        >
          {" "}
          Back
        </Button>{" "}
      </div>
    </div>
  );
}

export default CompanyDetails;
