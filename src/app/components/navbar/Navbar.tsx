import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { useDispatch } from "react-redux";
import { LogoutUser } from "../../../auth/core/redux/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleClick = () => {
    dispatch(LogoutUser());
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            The Onboarders
          </Typography>
          <Button
            color="secondary"
            onClick={() => handleClick()}
            variant="contained"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
