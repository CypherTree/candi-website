export const SET_LOADING = "SET_LOADING";
export const SET_AUTHENTICATED = "SET_AUTHENTICATED";
export const CHECK_DOMAIN_NAME = "CHECK_DOMAIN_NAME";
export const DOMAIN_CHECK_MESSAGE = "DOMAIN_CHECK_MESSAGE";
export const NEW_ORGANISATION_CREATE = "NEW_ORGANISATION_CREATE";
export const SET_PLAN_TO_ORGANISATION = "SET_PLAN_TO_ORGANISATION";
export const ADD_COMPANY_DETAILS_TO_ORGANISATION =
  "ADD_COMPANY_DETAILS_TO_ORGANISATION";

export interface SetLoading {
  type: typeof SET_LOADING;
  payload: {
    isLoading: boolean;
  };
}

export interface SetAuthenticated {
  type: typeof SET_AUTHENTICATED;
  payload: {
    isAuthenticated: boolean;
  };
}

export interface CheckDomainName {
  type: typeof CHECK_DOMAIN_NAME;
  payload: {};
}

export interface DomainCheckMessage {
  type: typeof DOMAIN_CHECK_MESSAGE;
  payload: {
    domainCheckMessage: string;
  };
}

export interface NewOrganisationCreate {
  type: typeof NEW_ORGANISATION_CREATE;
  payload: {
    newOrganisation: {
      id: string;
      // domain_url: string;
      slug: string;
      name: string;
      website: string;
      message: string;
    };
  };
}

export interface SetPlanToOrganisation {
  type: typeof SET_PLAN_TO_ORGANISATION;
  payload: {
    organisationPlanMessage: string;
  };
}

export interface AddCompanyDetailsToOrganisation {
  type: typeof ADD_COMPANY_DETAILS_TO_ORGANISATION;
  payload: {
    companyDetailsToOrganizationMessage: string;
  };
}

export type AppDispatchTypes =
  | SetLoading
  | SetAuthenticated
  | CheckDomainName
  | DomainCheckMessage
  | NewOrganisationCreate
  | AddCompanyDetailsToOrganisation;
