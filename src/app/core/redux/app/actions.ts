import axios from "axios";
import { Dispatch } from "redux";

import {
  AppDispatchTypes,
  SET_AUTHENTICATED,
  DOMAIN_CHECK_MESSAGE,
} from "./types";

export const SetAuthenticated = () => async (
  dispatch: Dispatch<AppDispatchTypes>
) => {
  try {
    dispatch({
      type: SET_AUTHENTICATED,
      payload: {
        isAuthenticated: true,
      },
    });
  } catch (e) {
    console.log("an error occoured ", e);
  }
};
export const CheckDomainName = (domain: string, accessToken: string) => (
  dispatch: any
) => {
  const jwtToken = `Bearer ${accessToken}`;

  axios
    .get(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/organization/check-domain/?domain_name=${domain}`,
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
    .then((response: any) => {
      console.log(response.data.message);
      // dispatch domain available msg to redux
      dispatch({
        type: DOMAIN_CHECK_MESSAGE,
        payload: {
          domainCheckMessage: response.data.message,
        },
      });
    })
    .catch((err) => console.log("Err", err));
};

// const SetOrganisationalDetails;

export const SetOrganisationalDetails = (
  organisationName: string,
  organisationWebsite: string,
  domain: string
) => (dispatch: any) => {
  const accessToken = localStorage.getItem("accessToken");

  const jwtToken = `Bearer ${accessToken}`;

  const organisationData = {
    name: organisationName,
    website: `http://www.${organisationWebsite}.theonboarders.com`,
    schema_name: domain,
    domain_url: `http://www.${domain}.theonboarders.com`,
  };

  axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/organization/create/`,
      organisationData,
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
    .then((response: any) => {
      console.log(response);
      // dispatch domain available msg to redux
    })
    .catch((err) => console.log("Err", err));
};
