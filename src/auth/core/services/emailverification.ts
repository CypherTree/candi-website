import axios from "axios";

export const resendVerificationEmail = async () => {
  const accessToken = localStorage.getItem("accessToken");

  const jwtToken = `Bearer ${accessToken}`;

  let messageFromServer;

  let response;

  try {
    response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/user/resend-verification-email/`,
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    );
    messageFromServer = response.data.message;
  } catch (err) {
    console.log("err", err.response);
    messageFromServer = err.response.data.message;
  }

  return messageFromServer;
};
