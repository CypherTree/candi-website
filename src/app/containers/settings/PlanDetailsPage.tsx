import React, { useState, useEffect } from "react";

import Title from "antd/lib/typography/Title";
import { Button, Form, Input, Layout, Radio, Spin } from "antd";
import PlanCard from "../../components/plancards/PlanCard";

import { getTenantInfo } from "../../core/services/tenantinfo";

import { getCurrentPlan, plansData } from "../../core/services/plans";
import AntSpinner from "../../components/spinner/AntSpinner";

const PlanDetailsPage = () => {
  const [loading, setLoading] = useState(true);
  const [pricePeriod, setPricePeriod] = React.useState("yearly");

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
    period_type: 1,
    plan_id: 1,
  });

  const handlePricePeriod = (newPricePeriod: React.SetStateAction<string>) => {
    setPricePeriod(newPricePeriod);
  };

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

              {/* <Title
                level={4}
                style={{
                  fontWeight: "bold",
                  width: "auto",
                  margin: "10px 40px 10px 0 ",
                  // padding: "0px 0px 0px 350px",
                  textAlign: "center",
                  paddingLeft: "30px",
                }}
              >
                Your current license plan
              </Title> */}

              <div style={{ display: "flex", justifyContent: "center" }}>
                <Radio.Group
                  options={[
                    { label: "Monthly", value: "monthly" },
                    { label: "Yearly", value: "yearly" },
                  ]}
                  onChange={(e) => handlePricePeriod(e.target.value)}
                  value={pricePeriod}
                  optionType="button"
                  buttonStyle="solid"
                />
              </div>

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
