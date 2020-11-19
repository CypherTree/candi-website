import axios from "axios";
import { Dispatch } from "redux";

import {
  AppDispatchTypes,
  SET_AUTHENTICATED,
  DOMAIN_CHECK_MESSAGE,
  SET_LOADING,
  NEW_ORGANISATION_CREATE,
  SET_PLAN_TO_ORGANISATION,
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
  domain: string,
  handleNext: Function
) => (dispatch: any) => {
  dispatch({
    type: SET_LOADING,
    payload: { isLoading: true },
  });

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
      console.log("response", response.data);

      const { data } = response.data;

      dispatch({
        type: NEW_ORGANISATION_CREATE,
        payload: {
          newOrganisation: {
            id: data.id,
            slug: data.slug,
            name: data.name,
            website: data.website,
            message: response.data.message,
          },
        },
      });
    })
    .catch((err) => console.log("Err", err));

  dispatch({
    type: SET_LOADING,
    payload: { isLoading: false },
  });

  handleNext();
};

export const AssignPlanToOrganisation = (
  organization_id: number,
  plan_id: number,
  period_type: number
) => (dispatch: any) => {
  const accessToken = localStorage.getItem("accessToken");
  const jwtToken = `Bearer ${accessToken}`;

  axios
    .post(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/plans/organization/`,
      {
        organization_id,
        plan_id,
        period_type,
      },
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
    .then((response: any) => {
      console.log(response.data);
      // dispatch domain available msg to redux
      dispatch({
        type: SET_PLAN_TO_ORGANISATION,
        payload: {
          organisationPlanMessage: response.data.message,
        },
      });
    })
    .catch((err) => console.log("Err", err));
};
