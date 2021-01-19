export enum Types {
  SET_LOADING = "SET_LOADING",
  SET_AUTHENTICATED = "SET_AUTHENTICATED",
  CHECK_DOMAIN_NAME = "CHECK_DOMAIN_NAME",
  DOMAIN_CHECK_MESSAGE = "DOMAIN_CHECK_MESSAGE",
  NEW_ORGANISATION_CREATE = "NEW_ORGANISATION_CREATE",
  SET_CURRENT_ORGANISATION = "SET_CURRENT_ORGANISATION",
  SET_PLAN_TO_ORGANISATION = "SET_PLAN_TO_ORGANISATION",
  ADD_COMPANY_DETAILS_TO_ORGANISATION = "ADD_COMPANY_DETAILS_TO_ORGANISATION",
  ADD_COMPANY_DETAILS_TO_CURRENT_ORGANISATION = "ADD_COMPANY_DETAILS_TO_CURRENT_ORGANISATION",
  CLEAR_CURRENT_ORGANISATION = "CLEAR_CURRENT_ORGANISATION",
}

export interface SetLoadingPayload {
  type: typeof Types.SET_LOADING;
  payload: {
    isLoading: boolean;
  };
}

export interface SetAuthenticated {
  type: typeof Types.SET_AUTHENTICATED;
  payload: {
    isAuthenticated: boolean;
  };
}

export interface CheckDomainName {
  type: typeof Types.CHECK_DOMAIN_NAME;
  payload: {};
}

export interface DomainCheckMessage {
  type: typeof Types.DOMAIN_CHECK_MESSAGE;
  payload: {
    domainCheckMessage: string;
  };
}

export interface NewOrganisationCreate {
  type: typeof Types.NEW_ORGANISATION_CREATE;
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

export interface SetCurrentOrganization {
  type: typeof Types.SET_CURRENT_ORGANISATION;
  payload: {
    currentOrganization: {
      id: string;
      name: string;
      website: string;
      domain: string;
    };
  };
}

export interface SetPlanToOrganisation {
  type: typeof Types.SET_PLAN_TO_ORGANISATION;
  payload: {
    organisationPlanMessage: string;
  };
}

export interface AddCompanyDetailsToOrganisation {
  type: typeof Types.ADD_COMPANY_DETAILS_TO_ORGANISATION;
  payload: {
    companyDetailsToOrganizationMessage: string;
  };
}

export interface AddCompanyDetailsToCurrentOrganization {
  type: typeof Types.ADD_COMPANY_DETAILS_TO_CURRENT_ORGANISATION;
  payload: {
    currentOrganization: any;
  };
}

export interface ClearCurrentOrganisation {
  type: typeof Types.CLEAR_CURRENT_ORGANISATION;
  payload: {};
}

export type AppDispatchTypes =
  | SetLoadingPayload
  | SetAuthenticated
  | CheckDomainName
  | DomainCheckMessage
  | NewOrganisationCreate
  | AddCompanyDetailsToOrganisation
  | SetCurrentOrganization
  | AddCompanyDetailsToCurrentOrganization
  | ClearCurrentOrganisation;
