import React from "react";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import AddIcon from "@material-ui/icons/Add";

import OrganizationList from "../../components/organizationList/OrganizationList";
import NewOrganizationModal from "./NewOrganizationModal";

const Organisations = (props: any) => {
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
                fontSize: "24px",
                fontWeight: "bold",
                fontFamily: "Helvetica",
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
                marginTop: "10px",
                // bormui der: "1px solid black",
                height: "28px",
                width: "28px",
                // alignItems: "center",
                // alignContent: "center",
                textAlign: "center",
                // padding: "0px",
                justifyContent: "center",
              }}
            >
              <AddIcon
                onClick={handleOpen}
                style={{
                  alignSelf: "center",
                  height: "20px",
                  width: "20px",
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

{
  /* <Fab
              aria-label="add"
              size="small"
              style={{
                // bormui der: "1px solid black",
                // height: "28px",
                // width: "28px",

                textAlign: "center",
                backgroundColor: "#F9650D",
                padding: "0px",
                margin: "0px",
              }}
            >

<AddIcon onClick={handleOpen} />
            </Fab> */
}
