import React, { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import {
  FormControl,
  OutlinedInput,
  InputLabel,
  Button,
} from "@material-ui/core";

import { UserContext } from "../User";
import { StateContext } from "../State";
import PasswordField from "./PasswordField";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      flexWrap: "wrap",
      justifyContent: "space-around",
      margin: "60px 0 0 0",
      width: "384px",
    },
    header: {
      fontFamily: theme.typography.fontFamily[0],
      fontWeight: 500,
      textAlign: "center",
      margin: "80px 0 0 0",
    },
    textField: {
      width: "100%",
      maxWidth: "384px",
      margin: "20px 8px 10px 8px",
    },
    errorMsg: {
      textAlign: "center",
      fontSize: "18px",
      color: "red",
    },
    button: {
      alignSelf: "flex-end",
      margin: "50px 8px 0 8px",
    },
  })
);

const Login = (props) => {
  const classes = useStyles({});
  const { login }: any = React.useContext(UserContext);
  const {
    setIsLoginOpen,
    setIsSidebarDisabled,
    setIsSidebarOpen,
  }: any = React.useContext(StateContext);

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [bigError, setBigError] = useState("");

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleValueChange = (event) => {
    const newValues = { ...values };
    const id = event.target.id.split("_")[1];
    const value = event.target.value;

    newValues[id] = value;
    setValues(newValues);

    bigError && setBigError("");

    if (newValues.password && newValues.email) {
      isButtonDisabled && setIsButtonDisabled(false);
    }
  };

  const handleClick = async () => {
    setIsButtonDisabled(true);
    bigError && setBigError("");

    try {
      await login(values);

      setIsLoginOpen(false);
      setIsSidebarDisabled(false);
      setIsSidebarOpen(true);
      setValues({
        email: "",
        password: "",
      });
    } catch (err) {
      if (err.status && err.status === 401) {
        setBigError("Invalid username or password.");
      } else {
        setBigError("Sorry, something went wrong.");
      }

      setIsButtonDisabled(false);
      return;
    }
  };

  return (
    <div className={classes.root}>
      <h2 className={classes.header}>Log in to your account</h2>
      <form className={classes.form} noValidate autoComplete="off">
        <FormControl className={classes.textField} variant="outlined">
          <InputLabel color={"secondary"} htmlFor="password">
            Email address
          </InputLabel>
          <OutlinedInput
            id="login_email"
            onChange={handleValueChange}
            color={"secondary"}
            labelWidth={96}
          />
        </FormControl>
        <PasswordField
          required={false}
          onChange={handleValueChange}
          value={values.password}
          error={false}
          id={"login_password"}
        ></PasswordField>
        <p className={classes.errorMsg}>{bigError}</p>
        <Button
          variant={"contained"}
          disableElevation
          onClick={handleClick}
          className={classes.button}
          disabled={isButtonDisabled}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;