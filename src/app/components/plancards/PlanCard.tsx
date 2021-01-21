import React, { useEffect, useState } from "react";

import { Avatar, Button, Card, Divider, Typography } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

const PlanCard = (props: any) => {
  console.log("props", props);

  const { selectedPlan, setSelectedPlan } = props;
  const { pricePeriod, plan } = props;

  const [reloadRequired, setReloadRequired] = useState(false);

  console.log(" <------ SELECTED PLAN -------> ", selectedPlan);

  const handleClick = () => {
    setReloadRequired(true);
    setSelectedPlan({
      period_type: pricePeriod === "monthly" ? 0 : 1,
      plan_id: plan.id,
    });
  };

  const returnBoxShadow = () => {
    console.log("value of condition ", plan.id === selectedPlan.plan_id);
    return plan.id === selectedPlan.plan_id
      ? "5px 5px 5px 5px lightgrey"
      : "0px";
  };

  useEffect(() => {
    setReloadRequired(false);
  }, [reloadRequired]);

  return (
    <Card
      title={plan.name}
      style={{
        boxShadow: returnBoxShadow(),
        marginLeft: "10px",
        marginBottom: "10px",
      }}
    >
      <div
        style={{
          margin: "auto",
          display: "inline-flex",
        }}
      >
        <Avatar
          alt={plan.name}
          icon={<UserOutlined style={{ fontSize: "80px" }} />}
          size={64}
          src="/static/images/avatar/1.jpg"
          style={{ width: "100px", height: "100px" }}
        />
      </div>

      <div>
        <Text>{plan.description}</Text>
      </div>
      {plan.quotas.map((quota: any) => (
        <div>
          {quota.unit === "job" && (
            <Text>
              You get <b> {quota.value} jobs </b>
            </Text>
          )}
          {quota.unit === "calls" && (
            <Text>
              You get <b> {quota.value} video calls </b>
            </Text>
          )}
          {quota.unit === "users" && (
            <Text>
              You can create <b>{quota.value} users</b>
            </Text>
          )}
        </div>
      ))}

      <Divider />
      <div
        style={{ margin: "auto", display: "inline-flex", paddingTop: "0px" }}
      >
        <Button type="primary" onClick={() => handleClick()}>
          Become a member -
          {pricePeriod === "monthly" ? (
            <Text style={{ color: "#fff", paddingLeft: "2px" }}>
              {" "}
              {plan.prices[0].price} $
            </Text>
          ) : (
            <Text style={{ color: "#fff", paddingLeft: "2px" }}>
              {" "}
              {plan.prices[1].price} $
            </Text>
          )}
        </Button>
      </div>
    </Card>
  );
};

export default PlanCard;
