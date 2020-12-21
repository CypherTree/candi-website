import React, { useState } from "react";

import { Button, Grid } from "@material-ui/core";

import { resendVerificationEmail } from "../../core/services/emailverification";

const EmailVerificationBar = () => {
  const [disabledButton, setDisabledButton] = useState(false);

  const [message, setMessage] = useState<string | null>(null);

  const snackbarMessage = (
    <>
      {message ? (
        <p style={{ padding: "0px", margin: "5px" }}>
          {message} If you do not find it in Inbox, check in Spam folder.
        </p>
      ) : (
        <p style={{ padding: "0px", margin: "5px" }}>
          Your Email verification is pending. Please verify your e-mail.
        </p>
      )}
    </>
  );

  const handleSendVerificationEmail = () => {
    resendVerificationLink();
    setDisabledButton(true);
  };

  const resendVerificationLink = async () => {
    const responseFromAPi = await resendVerificationEmail();
    setMessage(responseFromAPi);
  };

  return (
    <div
      style={{
        alignContent: "center",
        justifyContent: "space-around",
        display: "flex",
        flexDirection: "row",

        backgroundColor: "#FBC4C4",
      }}
    >
      <Grid
        container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item xs={12} sm={10} md={8}>
          <div
            style={{
              alignContent: "center",
              justifyContent: "space-around",
              display: "flex",
              flexDirection: "row",
              paddingTop: "5px",
              paddingBottom: "5px",
            }}
          >
            {snackbarMessage}
            <Button
              size="small"
              variant="outlined"
              onClick={handleSendVerificationEmail}
              disabled={disabledButton}
              style={{
                borderRadius: "10px",
                border: "1px solid #4A4A4A",
                padding: "5px",
              }}
            >
              <b> Get Verification Link </b>
            </Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default EmailVerificationBar;
