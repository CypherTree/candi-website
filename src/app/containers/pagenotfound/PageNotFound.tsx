import React from "react";

import { Typography } from "@material-ui/core";

const PageNotFound = () => {
  return (
    <div>
      <Typography variant="h5" component="h5">
        404: Page you requested was not found on this server.
      </Typography>
    </div>
  );
};

export default PageNotFound;
