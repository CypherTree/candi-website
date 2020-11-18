import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function PlanCard(props: any) {
  console.log("props", props);
  //   consol;

  const { pricePeriod, plan } = props;

  const classes = useStyles();

  return (
    <div>
      <Card variant="outlined">
        <CardHeader title={plan.name}></CardHeader>
        <CardContent>
          <div
            style={{
              margin: "auto",
              display: "inline-flex",
            }}
          >
            <Avatar
              alt={plan.name}
              src="/static/images/avatar/1.jpg"
              className={classes.large}
              style={{ width: "100px", height: "100px" }}
            />
          </div>
          <br />

          <div>{plan.description}</div>
          {plan.quotas.map((quota: any) => (
            <div>
              <br />
              <b> {quota.name}</b>: {quota.description}
            </div>
          ))}
          <br />
          {pricePeriod === "monthly" ? (
            <div>
              <b> Monthly Price: </b>
              {plan.prices[0].price}
            </div>
          ) : (
            <div>
              {" "}
              <b> Yearly Price: </b>
              {plan.prices[1].price} $
            </div>
          )}
        </CardContent>
        <CardActions>
          <div style={{ margin: "auto", display: "inline-flex" }}>
            <Button variant="contained" color="primary">
              Become a member
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

export default PlanCard;
