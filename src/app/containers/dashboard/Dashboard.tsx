import React, { useEffect, useState } from "react";

import { Col, Layout, Row, Spin, Typography } from "antd";
import Title from "antd/lib/typography/Title";

import { ThunkDispatch } from "redux-thunk";
import { connect, useDispatch } from "react-redux";
import { AnyAction } from "redux";

import * as H from "history";

import PrivacyPolicy from "../privacypolicy/PrivacyPolicy";
import { StateType } from "../../core/redux/types";
import { getTenantInfo } from "../../core/services/tenantinfo";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";
import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";

import { LoadingOutlined } from "@ant-design/icons";
import AccessDenied from "./AccessDenied";

import TrialExpired from "./TrialExpired";

import { LoginDispatchTypes } from "../../../auth/core/redux/types";
import { GetNewToken, LogoutUser } from "../../../auth/core/redux/actions";
import { Redirect } from "react-router-dom";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const { Text } = Typography;

export type UserDataProps = {
  email: string;
  first_name: string;
  id: number;
  is_active: boolean;
  is_verified: boolean;
  last_login: string;
  last_name: string;
  phone_number: string;
  phone_number_extenstion: string;
  privacy_policy_accepted: boolean;
  profile_picture: string;
  profile_picture_process_status: string;
};

type AuthProps = {
  isAuthenticated: boolean;
  error?: string;
  success?: boolean;
  message?: string;
  userData?: UserDataProps;
};

type StateProps = {
  auth: AuthProps;
};

type Props = {
  history: H.History;
  setAuthenticated: () => void;
  state: StateProps;
  logoutUser: () => void;
  getNewToken: (accessToken: string, refreshToken: string) => void;
};

const Dashboard: React.FC<Props> = ({ state }) => {
  const [loading, setLoading] = useState(true);

  const [tenant, setTenant] = useState<string | undefined>();
  const [isTrialExpired, setIsTrialExpired] = useState<boolean>(false);
  const [isAccessDenied, setIsAccessDenied] = useState<boolean>(false);

  const [shouldReload, setShouldReload] = useState(false);

  const userData = state.auth.userData ? state.auth.userData : null;

  useEffect(() => {
    if (userData?.first_name) {
      setLoading(false);
    }
  }, [userData]);

  // useEffect(() => {
  //   if (shouldReload) {
  //     return <Redirect to="/dashboard"></Redirect>;
  //   }
  // }, [shouldReload]);

  let orgData;

  const dispatch = useDispatch();

  const getOrgData = async () => {
    const { accessToken, refreshToken } = getCurrentSessionTokens();
    const jwtToken = `Bearer ${accessToken}`;
    const slug = getTenantInfo();

    await axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/user/organization/?slug=${slug}
  `,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("response from api --> ", response.data);
        setIsTrialExpired(response.data.data[0].organization.plan_has_expired);
      })
      .catch((err: any) => {
        console.log("Err", err);
      });

    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/profile/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response: any) => {
        console.log("&&&&&&&&&& respons data ---------> ", response);
      })
      .catch((err: any) => {
        console.log("--- erro", err.response);
        if (err.response) {
          if (err.response.status == 401) {
            setIsAccessDenied(true);
            toast.error("You dont have access to this resource.");
            setLoading(false);
            // dispatch(LogoutUser());f (err.response && err.response.status === 401) {
            // console.log("--- yes --- error is 401.", refreshToken);
            // if (refreshToken) {

            if (refreshToken) {
              toast.error("calling refresh token");
              console.log("+++ calleing for refresh token");
              dispatch(GetNewToken(refreshToken, setShouldReload));
            }
            // }
            // }
          }
        } else {
          toast.error("Some other error occoured.");
        }
      });
  };

  useEffect(() => {
    const data: string | undefined = getTenantInfo();
    setTenant(data);
    getOrgData();
  }, []);

  if (shouldReload) {
    setShouldReload(false);
    return <Redirect to="/dashboard"></Redirect>;
  }

  if (loading) {
    return (
      <Layout
        style={{
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Spin />
      </Layout>
    );
  } else {
    if (isAccessDenied) {
      return <AccessDenied />;
    }
    return (
      <div>
        {userData && userData.privacy_policy_accepted ? (
          <>
            <br />
            {tenant !== "id" ? (
              <Title level={3}>Welcome to "{tenant}"</Title>
            ) : (
              <>
                <Title level={4}>Welcome</Title>
                <br />
                <Title level={4}>
                  {userData !== null && userData.last_name},{" "}
                  {userData !== null && userData.first_name}
                </Title>
              </>
            )}
            <img
              src="https://image.freepik.com/free-vector/flat-design-colorful-characters-welcoming_23-2148271988.jpg"
              height="500px"
              width="800px"
              alt="welcome"
            />
          </>
        ) : (
          <div style={{ padding: "20px 50px 50px 50px" }}>
            <Row>
              <Col span={24}>
                <PrivacyPolicy />
              </Col>
            </Row>
            <br />
          </div>
        )}
        {/* {isTrialExpired && <TrialExpired />} */}
      </div>
    );
  }
};

const mapStateToProps = (state: StateType) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    // logoutUser: () => LogoutUSer
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
