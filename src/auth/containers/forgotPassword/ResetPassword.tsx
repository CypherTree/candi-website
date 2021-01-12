import React, { useEffect } from "react";

import { Row, Col, Layout } from "antd";

import { APP_NAME } from "../../../app/core/constants";

import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import * as H from "history";

import ResetPasswordForm from "../../components/forgotPassword/ResetPasswordForm";
import SideImage from "../../components/sideImage/SideImage";
import { getCurrentSessionTokens } from "../../core/services/session";

import { StateType } from "../../../app/core/redux/types";
import { SetAuthenticated } from "../../../app/core/redux/app/actions";

const qs = require("query-string");

type AuthProps = {
  isAuthenticated: boolean;
  error?: string;
  success?: boolean;
  message?: string;
};

type StateProps = {
  auth: AuthProps;
};

type Props = {
  history: H.History;
  location: H.Location;
  setAuthenticated: () => void;
  state: StateProps;
};

const ResetPassword: React.FC<Props> = ({
  history,
  location,
  setAuthenticated,
  state,
}) => {
  const data = qs.parse(location.search);

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

  const { token } = data;

  return (
    <Layout>
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Col span={12}>
          <SideImage />
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Layout
            style={{
              margin: "0",
              marginTop: "10%",
              top: "20%",
              width: "200px",
              maxWidth: "80%",
            }}
          >
            <p style={{ fontSize: "40px" }}>
              <b> {APP_NAME}</b>
            </p>
            <ResetPasswordForm token={token} auth={state.auth} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
