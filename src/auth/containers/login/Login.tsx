import React, { useEffect } from "react";

import { Typography, Grid } from "@material-ui/core";

import { connect } from "react-redux";

import { ThunkDispatch } from "redux-thunk";

import { AnyAction } from "redux";

import * as H from "history";

import "./login.css";

import { APP_NAME } from "../../../app/core/constants";

import LoginForm from "../../components/login/LoginForm";

import { SetAuthenticated } from "../../../app/core/redux/app/actions";

import SideImage from "../../components/sideImage/SideImage";

import { getCurrentSessionTokens } from "../../core/services/session";

import { StateType } from "../../../app/core/redux/types";
import { Col, Layout, Row } from "antd";

type AuthProps = {
  isAuthenticated: boolean;
  error?: string;
};

type StateProps = {
  auth: AuthProps;
};

type Props = {
  history: H.History;
  setAuthenticated: () => void;
  state: StateProps;
};

const Login: React.FC<Props> = ({ setAuthenticated, state, history }) => {
  const { isAuthenticated } = state.auth;

  const { accessToken } = getCurrentSessionTokens();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
    }
    if (accessToken) {
      setAuthenticated();
    }
  });

  return (
    <Layout>
      <Row>
        <Col span={12}>
          <SideImage />
        </Col>
        <Col
          span={11}
          style={{
            display: "flex",
          }}
        >
          <Layout
            style={{
              margin: "0",
              marginTop: "20%",
              top: "20%",
            }}
          >
            <p style={{ fontSize: "40px" }}>
              <b> {APP_NAME}</b>
            </p>
            <LoginForm auth={state.auth} />
          </Layout>
        </Col>
      </Row>
    </Layout>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    setAuthenticated: () => dispatch(SetAuthenticated()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

{
  /* <div>
      <Grid container spacing={0}>
        <Grid item xs={1} sm={6} md={6}>
          <SideImage />
        </Grid>
        <Grid item xs={11} sm={6} md={6} color="red">
          <br />
          <p style={{ fontSize: "40px" }}>
            <b> {APP_NAME}</b>
          </p>
          <LoginForm auth={state.auth} />
        </Grid>
      </Grid>
    </div> */
}
