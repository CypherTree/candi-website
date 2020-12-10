import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { LogoutUser } from "../../../auth/core/redux/actions";
import {
  Avatar,
  Badge,
  Grid,
  InputBase,
  Menu,
  MenuItem,
} from "@material-ui/core";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import SettingsIcon from "@material-ui/icons/Settings";
import SearchIcon from "@material-ui/icons/Search";
import PublicIcon from "@material-ui/icons/Public";
import { deepOrange, deepPurple } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },
  menuButton: {
    // marginRight: theme.spacing(2),
  },
  title: {
    // flexGrow: 1,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));

function Navbar() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleLogout = () => {
    handleClose();
    dispatch(LogoutUser());
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar
        position="static"
        style={{ backgroundColor: "white", color: "black" }}
      >
        <Toolbar>
          <Grid container>
            <Grid
              item
              xs={6}
              style={{
                border: "1px solid black",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <IconButton
                edge="start"
                // className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              >
                <MenuIcon />
              </IconButton>

              <p
                style={{
                  padding: "none",
                  margin: "none",
                  width: "auto",
                  fontSize: "20px",
                  border: "1px solid black",
                }}
              >
                <b>The Onboarders</b>
              </p>
            </Grid>

            <Grid
              item
              xs={6}
              style={{
                border: "1px solid black",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
              }}
            >
              <div style={{ border: "1px solid black", padding: "5px" }}>
                <SearchIcon />
                <IconButton>
                  <Badge badgeContent={4} color="secondary">
                    <PublicIcon />
                  </Badge>
                </IconButton>

                <SettingsIcon />

                <Button
                  aria-controls="simple-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <Avatar className={classes.purple}>MK</Avatar>
                </Button>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose} disabled={true}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleClose} disabled={true}>
                    My account
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
{
  /* <Button
                color="secondary"
                onClick={() => handleLogout()}
                variant="contained"
              >
                Logout
              </Button> */
}

{
  /* <div>
                <Link to="/dashboard">
                  <Button color="primary" variant="contained">
                    Home
                  </Button>{" "}
                </Link>
              </div> */
}

{
  /* <div>
                <Link to="/organisations/all">
                  <Button color="primary" variant="contained">
                    Organisation
                  </Button>{" "}
                </Link>
              </div> */
}
