import {
  Typography,
  Grid,
  Checkbox,
  FormControlLabel,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";

import PrivacyPolicyText from "../../components/privacyPolicy/PrivacyPolicyText";

import { acceptPrivacyPolicy } from "../../../auth/core/services/privacypolicy";

const mainImage = require("../../../shared/assets/images/welcome-illustration.jpg");

function PrivacyPolicy() {
  const [disabled, setDisabled] = useState(false);

  const accessToken = localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : sessionStorage.getItem("accessToken");

  const handleAcceptPrivacyPolicy = () => {
    if (accessToken !== null) {
      acceptPrivacyPolicy(accessToken);
      setDisabled(true);
      setTimeout(() => {
        window.location.reload(true);
      }, 6000);
    }
  };

  const [acceptPermissionChecked, setAcceptPermissionChecked] = useState(false);
  return (
    <div
      style={{
        border: "1px solid black",
        padding: "10px 50px 50px 50px",
        borderRadius: "10px",
      }}
    >
      <Typography variant="h5" component="h5" color="error">
        You need to accept Privacy policy before continuing.
      </Typography>
      <br />
      <br />

      <Grid container spacing={5}>
        <Grid item xs={6}>
          <img
            alt="logo"
            style={{ width: "100%", height: "500px" }}
            src={String(mainImage)}
          />
          <a href="https://www.freepik.com/vectors/banner">
            Banner vector created by stories - www.freepik.com
          </a>
        </Grid>
        <Grid item xs={6}>
          <div
            style={{
              backgroundColor: "whitesmoke",
              width: "100%",
              height: "100%",
            }}
          >
            <Grid container direction="column" spacing={3}>
              {disabled ? (
                <div
                  style={{
                    backgroundColor: "white",
                    height: "400px",
                    padding: "10px",
                    margin: "10px",
                    overflowY: "hidden",
                  }}
                >
                  <img
                    src="https://media0.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif"
                    alt="loading"
                    width="90%"
                  ></img>
                </div>
              ) : (
                <>
                  <Grid item>
                    <div
                      style={{
                        backgroundColor: "#D3D3D3",
                        height: "400px",
                        padding: "10px",
                        margin: "10px",
                        overflowY: "scroll",
                      }}
                    >
                      <PrivacyPolicyText />
                    </div>
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={
                        <Checkbox
                          color="primary"
                          checked={acceptPermissionChecked}
                          onChange={(e) =>
                            setAcceptPermissionChecked(!acceptPermissionChecked)
                          }
                        ></Checkbox>
                      }
                      label="I accept all conditions."
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleAcceptPrivacyPolicy}
                      disabled={!acceptPermissionChecked}
                    >
                      Accept privacy policy
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default PrivacyPolicy;
