import React, { useEffect } from "react";

import { ThunkDispatch } from "redux-thunk";

import { AnyAction } from "redux";

import { connect } from "react-redux";

import { Link } from "react-router-dom";

import * as H from "history";

import { EmailVerification } from "../../core/redux/actions";
import { Button, Card, Divider, Layout } from "antd";
import Title from "antd/lib/typography/Title";

// import SideImage from "../../components/sideImage/SideImage";

const qs = require("query-string");

type AuthProps = {
  isAuthenticated: boolean;
  error?: string;
  success?: boolean;
  message?: string;
  emailVerificationMessage?: string;
};

type StateProps = {
  auth: AuthProps;
};

type Props = {
  emailVerification: (token: string) => void;
  state: StateProps;
  location: H.Location;
};

const EmailVerificationPage: React.FC<Props> = ({
  emailVerification,
  location,
  state,
}) => {
  const data = qs.parse(location.search);
  const { token } = data;

  useEffect(() => {
    if (token) {
      emailVerification(token);
    }
  }, [token]);

  return (
    <Layout
      style={{
        alignContent: "center",
        paddingTop: "100px",
        width: "100%",
        height: "75vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Card title="Email Verification">
          {!state.auth.emailVerificationMessage && !state.auth.error && (
            <Title level={4}>Please wait while we verify your account</Title>
          )}
          {state.auth.error && <Title level={4}>{state.auth.error}</Title>}
          {state.auth.emailVerificationMessage && (
            <Title level={4}>Your e-mail is verified</Title>
          )}
          <br /> <br />
          <Link to="/forgot-password">
            <Button type="primary">Continue to website</Button>
          </Link>
        </Card>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    emailVerification: (token: string) => dispatch(EmailVerification(token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmailVerificationPage);
