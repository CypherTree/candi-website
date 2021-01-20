import axios from "axios";
import { Dispatch } from "redux";

import { AppDispatchTypes, Types } from "./types";

const {
  SET_AUTHENTICATED,
  DOMAIN_CHECK_MESSAGE,
  SET_LOADING,
  NEW_ORGANISATION_CREATE,
  SET_PLAN_TO_ORGANISATION,
  ADD_COMPANY_DETAILS_TO_ORGANISATION,
  SET_CURRENT_ORGANISATION,
  ADD_COMPANY_DETAILS_TO_CURRENT_ORGANISATION,
  CLEAR_CURRENT_ORGANISATION,
} = Types;

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
  handleNext: Function,
  setLoading: Function
) => (dispatch: any) => {
  dispatch({
    type: SET_LOADING,
    payload: { isLoading: true },
  });

  const accessToken = localStorage.getItem("accessToken");

  const jwtToken = `Bearer ${accessToken}`;

  const organisationData = {
    name: organisationName,
    website: `http://www.${organisationWebsite}`,
    schema_name: domain,
    domain_url: `${domain}.thetobbers-staging.ml`,
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
    .then(() => {
      handleNext();
      setLoading(false);
    })
    .catch((err) => console.log("Err", err));

  dispatch({
    type: SET_LOADING,
    payload: { isLoading: false },
  });
};

export const PassDataToModal = (
  id: number,
  name: string,
  website: string,
  slug: string,
  domain: string,
  gst: string,
  country: string,
  state: string,
  city: string,
  pincode: string,
  address: string,
  email: string,
  billing_address: string,
  logo: string
) => (dispatch: any) => {
  dispatch({
    type: SET_CURRENT_ORGANISATION,
    payload: {
      currentOrganization: {
        id,
        name,
        website,
        slug,
        domain,
        gst,
        country,
        state,
        city,
        pincode,
        address,
        email,
        billing_address,
        logo,
      },
    },
  });
};

export const AssignPlanToOrganisation = (
  organization_id: number,
  plan_id: number,
  period_type: number,
  setLoading: Function
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
    .then(() => {
      setLoading(false);
    })
    .catch((err) => console.log("Err", err));
};

export const AddCompanyDetailsToOrganization = (
  data: any,
  organization_id: number,
  setLoading: Function
) => (dispatch: any) => {
  const accessToken = localStorage.getItem("accessToken");
  const jwtToken = `Bearer ${accessToken}`;

  const newData = data;

  setLoading(true);

  axios
    .put(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/organization/${organization_id}/`,
      newData,
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
    .then((response: any) => {
      console.log("hello world ----> ", response.data);
      dispatch({
        type: ADD_COMPANY_DETAILS_TO_ORGANISATION,
        payload: {
          companyDetailsToOrganizationMessage: response.data.message,
        },
      });
    })
    .then(() => setLoading(false))
    .catch((err) => console.log("Err", err));
};

export const AddCompanyDetailsToCurrentOrganization = (data: any) => (
  dispatch: any
) => {
  dispatch({
    type: ADD_COMPANY_DETAILS_TO_CURRENT_ORGANISATION,
    payload: {
      currentOrganization: data,
    },
  });
};

export const ClearCurrentOrganisation = (clear: boolean) => async (
  dispatch: Dispatch<AppDispatchTypes>
) => {
  console.log(" ------- clear current org was called ------- ");

  dispatch({ type: CLEAR_CURRENT_ORGANISATION, payload: {} });
};
