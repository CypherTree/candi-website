import React, { useEffect } from "react";

import { Col, Layout, Row } from "antd";

import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import * as H from "history";

import RegisterForm from "../../components/register/RegisterForm";
import SideImage from "../../components/sideImage/SideImage";
import { getCurrentSessionTokens } from "../../core/services/session";

import { APP_NAME } from "../../../app/core/constants";
import { SetAuthenticated } from "../../../app/core/redux/app/actions";
import { StateType } from "../../../app/core/redux/types";

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

const Register: React.FC<Props> = ({ setAuthenticated, state, history }) => {
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
      <Row
        style={{
          display: "flex",
          justifyContent: "center",
          // overflowY: "scroll",
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
            height: "100vh",
            overflowY: "scroll",
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
            <RegisterForm auth={state.auth} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Register);
