import React from "react";
import { Typography } from "@material-ui/core";
import { APP_NAME } from "../../core/constants";

import { connect } from "react-redux";

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

function Login(props: any) {
  const message = props.state.app.message;
  console.log("props data ", props);
  return (
    <div>
      <Typography variant="h3" component="h2">
        {APP_NAME}
        <br />
        {message}
      </Typography>
      This is login page.
    </div>
  );
}

export default connect(mapStateToProps)(Login);
