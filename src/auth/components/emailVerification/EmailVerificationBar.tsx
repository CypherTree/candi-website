import React, { useState } from "react";

import { Button } from "@material-ui/core";

import { resendVerificationEmail } from "../../core/services/emailverification";

function EmailVerificationHeader() {
  const [disabledButton, setDisabledButton] = useState(false);

  const [message, setMessage] = useState<string | null>(null);

  const snackbarMessage = (
    <>
      {message ? (
        <p>{message} If you do not find it in Inbox, check in Spam folder.</p>
      ) : (
        <p>Your Email verification is pending. Please verify your e-mail.</p>
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
        border: "1px solid teal",
        borderRadius: "10px",
        padding: "10px",
        backgroundColor: "#dbe9e9",
      }}
    >
      {snackbarMessage}
      <Button
        size="small"
        variant="outlined"
        onClick={handleSendVerificationEmail}
        disabled={disabledButton}
        style={{ borderRadius: "10px" }}
      >
        <b> Get Verification Link </b>
      </Button>
    </div>
  );
}

export default EmailVerificationHeader;
