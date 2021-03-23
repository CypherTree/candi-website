import React, { useState, useEffect } from "react";

import {
  Avatar,
  Button,
  Dropdown,
  Menu,
  Layout,
  Tag,
  Typography,
  Row,
  Col,
} from "antd";
import Title from "antd/lib/typography/Title";
import {
  SettingFilled,
  SearchOutlined,
  BellOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { connect, useDispatch } from "react-redux";

import { Link, useLocation } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import * as H from "history";

import { LogoutUser } from "../../../auth/core/redux/actions";
import { StateType } from "../../core/redux/types";

import EmailVerificationBar from "../../../auth/components/emailVerification/EmailVerificationBar";
import {
  getOrgIdFromTenantName,
  getTenantInfo,
} from "../../core/services/tenantinfo";
import axios from "axios";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";

import THEMECOLORS from "../../../shared/theme/themeColors";

const { Header } = Layout;

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

function Navbar(props: any) {
  const dispatch = useDispatch();

  const location = useLocation();

  const state = props.state;

  const userData = state.auth.userData ? state.auth.userData : null;

  const [tenant, setTenant] = useState<null | undefined | string>(null);
  const [orgData, setOrgData] = useState<any>(null);

  const [userRole, setUserRole] = useState<number>(0);

  const [isTrialExpired, setIsTrialExpired] = useState<boolean>(false);

  const clientURLs = ["/client"];

  console.log("******************** location data in navbar ", location);

  useEffect(() => {}, [userData]);

  const getOrgData = async () => {
    const { accessToken } = getCurrentSessionTokens();
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
        console.log("********* response from api --> ", response.data);

        setOrgData(response.data.data[0].organization);
        setIsTrialExpired(response.data.data[0].organization.plan_has_expired);
        setUserRole(response.data.data[0].type);
      })
      .catch((err: any) => {
        console.log("Err", err);
      });
  };

  useEffect(() => {
    const data: string | undefined = getTenantInfo();
    console.log("************************** tenant ************", data);
    setTenant(data);
    getOrgData();
    // setOrgData(getOrgIdFromTenantName());
  }, []);

  const handleLogout = () => {
    console.log("Logout user was called");
    handleClose();
    dispatch(LogoutUser());
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const days_between = (date1: any, date2: any) => {
    console.log("Date 1 : ", date1);
    console.log("Date 2 : ", date2);

    console.log("----- org data new----", orgData);

    const date3: any = new Date(date2);

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1 - date3);

    // Convert back to days and return
    const result = Math.round(differenceMs / ONE_DAY);

    console.log("total days ---> ", result);

    return result;
  };

  const redirectHomeUrl = `http://${process.env.REACT_APP_FRONTEND_HOME_URL}`;

  const menu = (
    <Menu>
      <Menu.Item>
        <a href={redirectHomeUrl}>Home</a>
      </Menu.Item>
      <Menu.Item>Profile</Menu.Item>

      <Menu.Item>My account</Menu.Item>
      <Menu.Item danger onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  const NavMenuInsideTenant = (
    <>
      <Link
        to={isTrialExpired ? "#" : "/client/all"}
        // aria-disabled={isTrialExpired}
        style={{
          textDecoration: "none",
          color: "black",
          paddingLeft: "30px",
        }}
      >
        <Title
          style={{
            color: location.pathname.includes("/client")
              ? THEMECOLORS.selected
              : "black",
          }}
          level={5}
        >
          Clients
        </Title>
      </Link>

      <Link
        to={isTrialExpired ? "#" : "/people"}
        aria-disabled={isTrialExpired}
        style={{
          textDecoration: "none",
          color: "black",
          paddingLeft: "30px",
        }}
      >
        <Title
          style={{
            color: location.pathname.includes("/people")
              ? THEMECOLORS.selected
              : "black",
          }}
          level={5}
        >
          People
        </Title>
      </Link>
      <Button
        type="primary"
        style={{
          width: "150px",
          height: "30px",
          textTransform: "none",
          marginLeft: "50px",
        }}
      >
        Add Job
      </Button>
    </>
  );

  const NavMenuInsideTenantForClient = (
    <>
      <Link
        to={isTrialExpired ? "#" : "/client/all"}
        // aria-disabled={isTrialExpired}
        style={{
          textDecoration: "none",
          color: "black",
          paddingLeft: "30px",
        }}
      >
        <Title style={{ color: "black" }} level={5}>
          Clients
        </Title>
      </Link>
    </>
  );

  const whichNavMenuToReturn = () => {
    if (tenant === "id") {
      return NavMenuForAll;
    } else {
      if (tenant !== "id" && userRole === 4) {
        return NavMenuInsideTenantForClient;
      } else {
        return NavMenuInsideTenant;
      }
    }
  };

  const NavMenuForAll = (
    <>
      <Link
        to="/organisations/all"
        style={{
          textDecoration: "none",
          color: "white",
          paddingRight: "20px",
        }}
      >
        <Title
          style={{
            color: location.pathname.includes("/organisations")
              ? THEMECOLORS.selected
              : "black",
          }}
          level={5}
        >
          Organisations
        </Title>
      </Link>
      <Link
        to="/invites/all"
        style={{
          textDecoration: "none",
          color: "white",
        }}
      >
        <Title
          style={{
            color: location.pathname.includes("/invites")
              ? THEMECOLORS.selected
              : "black",
          }}
          level={5}
        >
          My Invitations
        </Title>
      </Link>
    </>
  );

  return (
    <>
      <Row>
        <Col xs={24} md={24} sm={24} xl={24} xxl={24}>
          <Header
            style={{
              paddingTop: "15px",
              backgroundColor: "white",
              boxShadow: "0 2px 8px #f0f1f2",
            }}
            // xs={24}
          >
            <Layout
              style={{
                float: "right",
                display: "flex",
                flexDirection: "row",
                backgroundColor: "white",
                alignItems: "center",
              }}
            >
              <Tag color="magenta">
                {getTenantInfo() === "id" ? "Home" : getTenantInfo()}
              </Tag>
              <SearchOutlined
                style={{ marginLeft: "20px", color: "black", fontSize: "30px" }}
              />
              <SettingFilled
                style={{ marginLeft: "20px", color: "black", fontSize: "30px" }}
              />
              <BellOutlined
                style={{ marginLeft: "20px", color: "black", fontSize: "30px" }}
              />
              <Dropdown overlay={menu}>
                <Avatar
                  style={{ marginLeft: "20px" }}
                  icon={<UserOutlined style={{ fontSize: "20px" }} />}
                />
              </Dropdown>
            </Layout>

            <Layout
              style={{
                float: "left",
                display: "flex",
                flexDirection: "row",
                backgroundColor: "white",
                alignItems: "center",
                paddingLeft: "10px",
                paddingTop: "5px",
              }}
            >
              {/* {tenant === "id" && NavMenuForAll }
          {tenant!=="id" && } */}
              {whichNavMenuToReturn()}
            </Layout>
          </Header>

          {userData !== null && !userData.is_verified && (
            <EmailVerificationBar />
          )}

          {orgData && orgData.plan_has_expired && (
            <div
              style={{
                float: "left",
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#ffcccb",
                alignItems: "center",
                justifyContent: "center",
                // paddingLeft: "10px",
                padding: "5px",
                width: "100%",
                color: "white",
              }}
            >
              <Text style={{ fontWeight: "bold", paddingRight: "10px" }}>
                Your trial plan has expired. Kindly upgrade your plan to
                continue.
              </Text>
              {"    "}
              <Link to="#" type="primary">
                Upgrade now !
              </Link>
            </div>
          )}

          {orgData &&
            !orgData.plan_has_expired &&
            days_between(new Date(), orgData.plan_expiry_date) < 7 && (
              <div
                style={{
                  float: "left",
                  display: "flex",
                  flexDirection: "row",
                  backgroundColor: "#ffcccb",
                  alignItems: "center",
                  justifyContent: "center",
                  // paddingLeft: "10px",
                  padding: "5px",
                  width: "100%",
                  color: "white",
                }}
              >
                <Text style={{ fontWeight: "bold", paddingRight: "10px" }}>
                  Your trial plan is expiring in{" "}
                  {days_between(new Date(), orgData.plan_expiry_date)}. Kindly
                  upgrade your plan to continue.
                </Text>
                {"    "}
                <Link to="#" type="primary">
                  Upgrade now !
                </Link>
              </div>
            )}
        </Col>
      </Row>
    </>
  );
}

const mapStateToProps = (state: StateType) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    //
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
