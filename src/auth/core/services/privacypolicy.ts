import axios from "axios";

export const acceptPrivacyPolicy = (accessToken: string) => {
  const jwtToken = `Bearer ${accessToken}`;
  axios
    .patch(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/user/privacy-policy/`,
      {},
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
    .then((response) => {
      console.log("Response", response.data);
    })
    .catch((err) => {
      console.log("error", err);
      return false;
    });
  return true;
};
