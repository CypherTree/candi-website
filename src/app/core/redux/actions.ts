import { CONSTANTS } from "./types";
import axios from "axios";

export const loginUser = (userData: any, history: any) => (dispatch: any) => {
  const { LOGIN_USER } = CONSTANTS;

  dispatch({ type: LOGIN_USER });
};

export const CheckDomainName = async (
  domain: string,
  accessToken: string
) => async (dispatch: any) => {
  console.log("----------------------- ACCESS TOKEN", accessToken);

  const jwtToken = `Bearer ${accessToken}`;

  console.log("----------------------- JWT TOKEN", jwtToken);

  // Axios.get(
  //   `${process.env.REACT_APP_SERVER_URL}/api/v1/organization/check-domain/?domain_name=${domain}`,
  //   {
  //     headers: {
  //       Authorization:
  //         "Bearer da.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjA2NTU1NTQzLCJqdGkiOiIyYWZhMmQ1NTUyYTc0MjBjOGFhNTY2MTMxNmRiYzgyZCIsInVzZXJfaWQiOjEyfQ.nUVyWiZ1gvBdrmY9CPzvlEclk1Xw-Xod8JdMdL-He6Q",
  //     },
  //   }
  // )
  //   .then((response: any) => {
  //     console.log(response);
  //   })
  //   .catch((err) => console.log("Err", err));

  const res = await axios.get(
    `${process.env.REACT_APP_SERVER_URL}/api/v1/organization/check-domain/?domain_name=${domain}`,
    {
      headers: {
        Authorization: `${jwtToken}`,
      },
    }
  );
  console.log("res data", res.data.headers);
};
