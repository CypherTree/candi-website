import axios from "axios";

export const sendOTP = (phone_number: string) => {
  axios
    .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/send-otp/`, {
      phone_number: parseInt(phone_number),
    })
    .then((response) => {
      console.log("Response", response.data);
    })
    .catch((err) => {
      console.log("error", err);
    });
};

export const resendOTP = (phone_number: number) => {
  axios
    .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/user/resend-otp/`, {
      phone_number,
    })
    .then((response) => {
      console.log("Response", response.data);
    })
    .catch((err) => {
      console.log("error", err);
    });
};
