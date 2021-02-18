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
        organizationId = response.data.data[0].organization.id;
        toast.success(`Welcome to ${slug}`);
        return organizationId;
      })
      .catch((err: any) => {
        console.log("Err", err);
        toast.error("Action could not be performed.");
        return 0;
      });
  }
};
