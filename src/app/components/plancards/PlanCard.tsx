import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import React, { useEffect } from "react";

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

  const { selectedPlan, setSelectedPlan } = props;
  const { pricePeriod, plan } = props;

  const handleClick = () => {
    setSelectedPlan({
      period_type: pricePeriod === "monthly" ? 0 : 1,
      plan_id: plan.id,
    });
  };

  const classes = useStyles();

  return (
    <div>
      <Card
        variant="outlined"
        style={{
          backgroundColor: plan.id === selectedPlan.plan_id ? "teal" : "white",
          color: plan.id === selectedPlan.plan_id ? "white" : "black",
        }}
      >
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
              {quota.unit === "job" && (
                <div>
                  {" "}
                  You get <b> {quota.value} jobs </b>
                </div>
              )}
              {quota.unit === "calls" && (
                <div>
                  {" "}
                  You get <b> {quota.value} video calls </b>{" "}
                </div>
              )}
              {quota.unit === "users" && (
                <div>
                  {" "}
                  You can create <b>{quota.value} users</b>{" "}
                </div>
              )}
            </div>
          ))}
        </CardContent>
        <CardActions>
          <div style={{ margin: "auto", display: "inline-flex" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleClick()}
            >
              <div> Become a member - {"   "}</div>
              {pricePeriod === "monthly" ? (
                <p>{plan.prices[0].price} $</p>
              ) : (
                <p>{plan.prices[1].price} $</p>
              )}
            </Button>
          </div>
        </CardActions>
      </Card>
    </div>
  );
}

export default PlanCard;
