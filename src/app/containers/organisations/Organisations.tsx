import {
  Button,
  Typography,
  Modal,
  Fade,
  Backdrop,
  Fab,
} from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import NewOrganisation from "../neworganization/NewOrganisation";

import Spinner from "../../components/spinner/Spinner";

import { connect } from "react-redux";
import OrganizationList from "../../components/organizationList/OrganizationList";
import NewOrganizationModal from "./NewOrganizationModal";

import AddIcon from "@material-ui/icons/Add";

function Organisations(props: any) {
  const [open, setOpen] = React.useState(false);
  const [orgData, setOrgData] = React.useState({
    domain: null,
    name: null,
    selectedPlan: null,
    website: null,
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          // border: "1px solid black",
          alignItems: "left",
          textAlign: "left",
          paddingLeft: "150px",
          paddingTop: "20px",
        }}
      >
        <br />

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "300px",

            textAlign: "center",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                fontFamily: "Helvetica",
                color: "#696969	",

                width: "auto",
                margin: "10px 40px 5px 0 ",
                padding: "0",
              }}
            >
              {" "}
              ORGANISATION
            </p>
            {"  "}
          </div>
          <div
            style={{
              lineHeight: "40px",
            }}
          >
            {" "}
            <Fab
              aria-label="add"
              style={{
                // border: "1px solid black",
                height: "40px",
                width: "40px",
                textAlign: "center",
                backgroundColor: "#F9650D",
              }}
            >
              <AddIcon fontSize="small" onClick={handleOpen} />
            </Fab>
          </div>
        </div>

        <Link to="/organisation/new"></Link>

        {/* <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleOpen}
        >
          Add new Organisation
        </Button> */}

        <NewOrganizationModal
          handleOpen={handleOpen}
          handleClose={handleClose}
          open={open}
          setOpen={setOpen}
          props={props}
        />
      </div>

      <OrganizationList handleOpen={handleOpen} />
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return { state };
};

export default connect(mapStateToProps)(Organisations);
