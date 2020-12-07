import { Button, Typography, Modal, Fade, Backdrop } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import NewOrganisation from "../neworganization/NewOrganisation";

import Spinner from "../../components/spinner/Spinner";

import { connect } from "react-redux";
import OrganizationList from "../../components/organizationList/OrganizationList";
import NewOrganizationModal from "./NewOrganizationModal";

function Organisations(props: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
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
        <Link to="/organisation/new"></Link>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleOpen}
        >
          Add new Organisation
        </Button>
        <NewOrganizationModal
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
          setOpen={setOpen}
          props={props}
        />
      </div>
      <hr />
      <OrganizationList />
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return { state };
};

export default connect(mapStateToProps)(Organisations);
