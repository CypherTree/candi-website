import React, { useEffect, useState } from "react";

import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

import { Link } from "react-router-dom";

import { connect } from "react-redux";

import { ThunkDispatch } from "redux-thunk";

import { AnyAction } from "redux";

import { ClearState, ForgotPassword } from "../../core/redux/actions";

type AuthProps = {
  isAuthenticated: boolean;
  error?: string;
  success?: boolean;
  message?: string;
};

type Props = {
  forgotPassword: (email: string) => void;
  clearState: () => void;
  auth: AuthProps;
};

const ForgotPasswordForm: React.FC<Props> = ({
  forgotPassword,
  clearState,
  auth,
}) => {
  const [email, setEmail] = useState<string>("");
  const [status, setStatus] = useState<boolean | string>("");

  useEffect(() => {
    auth && auth.success ? setStatus(auth.success) : setStatus("");
  }, [auth, status]);

  useEffect(() => {
    // to clear any previous error
    clearState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let successMessage;

  const handleFormSubmit = () => {
    successMessage = "Check your email for password reset link";
    forgotPassword(email);
  };

  return (
    <div>
      <Card style={{ backgroundColor: "whitesmoke", height: "500px" }}>
        <CardHeader title="Forgot Password" />{" "}
        <CardContent>
          <div>
            {successMessage !== null && (
              <Typography color="primary">{successMessage}</Typography>
            )}
            <TextField
              fullWidth
              id="email"
              type="email"
              label="Email"
              placeholder="Email Id "
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </CardContent>
        <CardActions style={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            onClick={handleFormSubmit}
          >
            Get password reset link
          </Button>
        </CardActions>{" "}
        {auth && auth.hasOwnProperty("success") && auth.success === true ? (
          <div>
            <Typography variant="h5" component="h5" color="primary">
              {auth.message}
            </Typography>
          </div>
        ) : (
          <div>
            <Typography variant="h5" component="h5" color="error">
              {auth.message}
            </Typography>
          </div>
        )}
        <CardContent>
          <div>
            Already a user?<Link to="/login">Go to login </Link>
          </div>
          <br />
          <div>
            Not a member? <Link to="/register">Sign Up</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    clearState: () => dispatch(ClearState()),
    forgotPassword: (email: string) => dispatch(ForgotPassword(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordForm);
