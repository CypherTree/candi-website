import React, { useState, useEffect } from "react";

import Title from "antd/lib/typography/Title";
import { Button, Form, Input, Layout, Spin } from "antd";
import PlanCard from "../../components/plancards/PlanCard";

import { getTenantInfo } from "../../core/services/tenantinfo";

import { getCurrentPlan, plansData } from "../../core/services/plans";
import AntSpinner from "../../components/spinner/AntSpinner";

const PlanDetailsPage = () => {
  const [loading, setLoading] = useState(true);

  const getAndSetPlanDetails = async () => {
    const currentPlan = await getCurrentPlan(55, setLoading);

    console.log("current plan --->", currentPlan);

    // if (currentPlan.hasOwnProperty("period_type")) {
    //   setSelectedPlan(currentPlan);
    // }
  };

  useEffect(() => {
    const ten = getTenantInfo();

    getAndSetPlanDetails();

    console.log("tenant -->", ten);
  }, []);

  const [selectedPlan, setSelectedPlan] = React.useState({
    period_type: 0,
    plan_id: 0,
  });

  if (loading) {
    return <AntSpinner />;
  } else {
    return (
      <Layout>
        <Form name="basic">
          <Layout
            style={{
              padding: "30px 30px 30px 30px",
              margin: "30px",
              borderRadius: "10px",
              backgroundColor: "#fff",
            }}
          >
            <div
              style={{
                margin: "0 auto",
                lineHeight: "40px",

                paddingTop: "0px",
                paddingBottom: "0px",
              }}
            >
              <Title
                level={4}
                style={{
                  fontWeight: "bold",
                  alignSelf: "center",
                  textAlign: "center",
                  paddingBottom: "20px",
                }}
              >
                Organisation Plan
              </Title>

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingBottom: "10px",
                }}
              >
                {plansData.data.map((plan) => (
                  <div
                    style={{
                      width: "300px",
                      marginLeft: "30px",
                      padding: "10px 5px 5px 10px",
                      textAlign: "center",
                    }}
                  >
                    <PlanCard
                      key={plan.id}
                      plan={plan}
                      pricePeriod={2}
                      selectedPlan={selectedPlan}
                      setSelectedPlan={setSelectedPlan}
                    />
                  </div>
                ))}
              </div>
            </div>
          </Layout>
        </Form>
      </Layout>
    );
  }
};

export default PlanDetailsPage;
