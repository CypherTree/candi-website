import axios from "axios";
import { toast } from "react-toastify";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";

export const getTenantInfo = () => {
  const location = window.location.href;

  const result = location.split(".");

  const first = result.shift();

  const tenent = first?.split("://");

  const last = tenent?.pop();

  return last;
};

export const getOrgIdFromTenantName = async () => {
  const { accessToken } = getCurrentSessionTokens();

  const jwtToken = `Bearer ${accessToken}`;

  const slug = getTenantInfo();

  let organizationId;

  if (slug !== "id") {
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/user/organization/?slug=${slug}
    `,
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    );
    organizationId = response.data.data[0].organization.id;
    return organizationId;
  }
};
