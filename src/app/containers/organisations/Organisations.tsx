import React from "react";

import AddIcon from "@material-ui/icons/Add";

import { Link } from "react-router-dom";
import { connect } from "react-redux";

import OrganizationList from "../../components/organizationList/OrganizationList";
import NewOrganizationModal from "./NewOrganizationModal";

const Organisations = (props: any) => {
  const [open, setOpen] = React.useState(false);

  // const [orgData, setOrgData] = React.useState({
  //   domain: null,
  //   name: null,
  //   selectedPlan: null,
  //   website: null,
  // });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div
        style={{
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
                fontSize: "26px",
                fontWeight: "bold",
                // fontFamily: "Helvetica",
                color: "#696969	",
                width: "auto",
                margin: "10px 20px 5px 0 ",
                padding: "0",
              }}
            >
              ORGANISATION
            </p>
          </div>
          <div>
            <div
              style={{
                borderRadius: "14px",
                backgroundColor: "#F9650D",
                margin: "0px",
                display: "flex",
                marginTop: "18px",
                height: "22px",
                width: "22px",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              <AddIcon
                onClick={handleOpen}
                style={{
                  alignSelf: "center",
                  height: "19px",
                  width: "19px",
                  color: "white",
                }}
              />
            </div>
          </div>
        </div>

        <Link to="/organisation/new"></Link>

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
};

const mapStateToProps = (state: any) => {
  return { state };
};

export default connect(mapStateToProps)(Organisations);
