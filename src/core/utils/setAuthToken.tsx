import axios from "axios";

const setAuthToken = (token: string) => {
  if (token) {
    axios.defaults.headers.common["accessToken"] = token;
  } else {
    delete axios.defaults.headers.common["accessToken"];
  }
};

export default setAuthToken;
