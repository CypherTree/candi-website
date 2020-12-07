import { Fade, makeStyles, Modal } from "@material-ui/core";
import React, { useState } from "react";
import Spinner from "../../components/spinner/Spinner";
import NewOrganisation from "../neworganization/NewOrganisation";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid black",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "10px",
  },
}));

const NewOrganizationModal = (props: any) => {
  const classes = useStyles();

  console.log("Props in New Organization Moadal", props);

  const { isLoading } = props.props.state.app;

  const { handleOpen, handleClose, open, setOpen } = props;

  console.log("Loading...", isLoading);

  type currentOrg = {
    name: string | null;
    website: string | null;
    domain: string | null;
  };

  const [currentOrganization, setCurrentOrganization] = useState({
    name: null,
    website: null,
    domain: null,
    selectedPlan: null,
  });

  return (
    <div style={{ margin: "0 auto", display: "inline-flex" }}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        // BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            {isLoading ? (
              <Spinner />
            ) : (
              <NewOrganisation
                handleClose={handleClose}
                currentOrganization={currentOrganization}
              />
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default NewOrganizationModal;
