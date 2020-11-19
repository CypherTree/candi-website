import { Button, Typography, Modal, Fade, Backdrop } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";
import NewOrganisation from "../neworganization/NewOrganisation";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
    // minHeight: "80vh",
    // maxHeight: "80vh",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid black",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "10px",
  },
}));

function Organisations() {
  const classes = useStyles();
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
        <Link to="/organisation/new">
          {/* <Button variant="contained" color="primary">
            Create new Organisation
          </Button> */}
        </Link>
        <Button
          type="button"
          variant="contained"
          color="primary"
          onClick={handleOpen}
        >
          Add new Organisation
        </Button>
        <div style={{ margin: "auto", display: "inline-flex" }}>
          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className={classes.paper}>
                <NewOrganisation />
              </div>
            </Fade>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Organisations;
