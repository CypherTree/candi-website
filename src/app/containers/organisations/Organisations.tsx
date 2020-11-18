import { Button, Typography } from "@material-ui/core";
import React from "react";
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";

function Organisations() {
  return (
    <div>
      <Navbar />
      <div>
        <br />
        <Typography variant="h4" component="h4" color="primary">
          My Organisations
        </Typography>
        <br />
        <br />
        <Link to="/organisation/new">
          <Button variant="contained" color="primary">
            Create new Organisation
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Organisations;
