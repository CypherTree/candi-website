import axios from "axios";

export const getAllPlans = () => {
  const accessToken = localStorage.getItem("accessToken");

  const jwtToken = `Bearer ${accessToken}`;

  axios
    .get(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/plans/`,

      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
    .then((response: any) => {
      console.log(response);
      return response.data;
      // dispatch domain available msg to redux
    })
    .catch((err) => console.log("Err", err));
};
