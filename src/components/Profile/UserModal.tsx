import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Close from "@material-ui/icons/Close";

import { StateContext } from "../State";
import Login from "./Login";
import Signup from "./Signup";
import Profile from "./Profile";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      padding: "64px 10px 20px 10px",
      zIndex: theme.zIndex.modal,
      backgroundColor: "white",
      overflowY: "auto",
    },
    closeIconContainer: {
      position: "absolute",
      top: "94px",
      right: "30px",
      zIndex: theme.zIndex.modal + 1,
    },
    closeIcon: {
      fontSize: "1.5rem",
    },
    pane: {
      position: "fixed",
      top: 64,
      left: 0,
      right: 0,
      bottom: 0,
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      backgroundColor: "white",
    },
  })
);

const UserModal = () => {
  const {
    isSignupOpen,
    isLoginOpen,
    isProfileOpen,
    setIsProfileOpen,
    setIsLoginOpen,
    setIsSignupOpen,
  }: any = React.useContext(StateContext);

  const classes = useStyles({});

  const handleCloseClick = () => {
    setIsProfileOpen(false);
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };

  return (
    <div
      className={classes.root}
      style={{
        display: isSignupOpen || isLoginOpen || isProfileOpen ? "flex" : "none",
      }}
    >
      <IconButton
        className={classes.closeIconContainer}
        aria-label="display more actions"
        aria-controls="actions-menu"
        aria-haspopup="true"
        onClick={handleCloseClick}
        color="inherit"
      >
        <Close className={classes.closeIcon} />
      </IconButton>
      <div
        className={classes.pane}
        style={{ display: isSignupOpen ? "flex" : "none" }}
      >
        <Signup></Signup>
      </div>

      <div
        className={classes.pane}
        style={{ display: isLoginOpen ? "flex" : "none" }}
      >
        <Login></Login>
      </div>
      <div
        className={classes.pane}
        style={{ display: isProfileOpen ? "flex" : "none" }}
      >
        <Profile></Profile>
      </div>
    </div>
  );
};

export default UserModal;