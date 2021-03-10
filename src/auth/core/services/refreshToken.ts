import axios from "axios";
import { toast } from "react-toastify";

const getNewAccessToken = async (refreshToken: string) => {
  console.log("--- refreshtoken function was called ----- ");

  await axios
    .post(`${process.env.REACT_APP_SERVER_URL}/api/v1/login/refresh/`, {
      refresh: refreshToken,
    })
    .then((response: any) => {
      const { access: accessToken } = response.data;
      console.log("--- refreshtoken function was success ----- ", accessToken);

      localStorage.setItem("accessToken", accessToken);

      toast.success("Login info updated");

      window.location.href = "/dashboard";

      console.log("==== got new data ===");
    })
    .catch((err) => {
      localStorage.clear();

      window.location.href = "/login";
      toast.error("Logging out");

      console.log("refresh token api failed");
    });
};

export default getNewAccessToken;
