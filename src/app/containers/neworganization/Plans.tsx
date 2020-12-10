import { Typography, Grid, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getAllPlans } from "../../core/services/plans";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import PlanCard from "../../components/plancards/PlanCard";

import { AssignPlanToOrganisation } from "../../core/redux/app/actions";

import { useDispatch } from "react-redux";

import { connect } from "react-redux";
import Axios from "axios";

function Plans(props: any) {
  const { handleNext, handleBack, currentOrganization } = props;
  //   const [plansData, setPlansData] = useState();

  const [isSubmitted, setIsSubmitted] = useState(false);

  console.log("props ---->", props);

  const plansData = {
    count: 3,
    next: null,
    previous: null,
    data: [
      {
        id: 1,
        quotas: [
          {
            id: 1,
            uuid: "72e8d823-b7b2-4f88-b9c5-b04d3708e1f7",
            name: "Jobs",
            unit: "job",
            description:
              "Number of jobs that can be published by organization.",
            is_boolean: false,
            value: 3,
          },
          {
            id: 2,
            uuid: "6927cfff-fc7b-4321-8448-0c3daf3781ae",
            name: "Video Interviews",
            unit: "calls",
            description:
              "Number of video interview call an organization can take.",
            is_boolean: false,
            value: 5,
          },
          {
            id: 3,
            uuid: "2cd72ddf-faef-42ec-aec3-c3d10f46fef9",
            name: "Users",
            unit: "users",
            description: "Number of users the organization can add.",
            is_boolean: false,
            value: 0,
          },
        ],
        prices: [
          {
            id: 1,
            is_active: true,
            created_at: "2020-11-19T10:32:19.988706+05:30",
            modified_at: "2020-11-19T10:32:19.988728+05:30",
            uuid: "aa42996f-5072-4cc6-9d79-fd297f852908",
            price: "0.00",
            period_type: 0,
            currency: 1,
            plan: 1,
          },
          {
            id: 2,
            is_active: true,
            created_at: "2020-11-19T10:32:19.990329+05:30",
            modified_at: "2020-11-19T10:32:19.990349+05:30",
            uuid: "c0bd62c1-0992-4ef1-b486-fda399921fc5",
            price: "0.00",
            period_type: 1,
            currency: 1,
            plan: 1,
          },
        ],
        is_active: true,
        created_at: "2020-11-19T10:32:19.985988+05:30",
        modified_at: "2020-11-19T10:32:19.986016+05:30",
        uuid: "0c8e9e3c-dc67-48f6-9c99-a6579e228828",
        name: "Free",
        description: "A plan best suited for bootstrapped startups",
        default: false,
        order: 0,
        customized: null,
      },
      {
        id: 2,
        quotas: [
          {
            id: 1,
            uuid: "72e8d823-b7b2-4f88-b9c5-b04d3708e1f7",
            name: "Jobs",
            unit: "job",
            description:
              "Number of jobs that can be published by organization.",
            is_boolean: false,
            value: 10,
          },
          {
            id: 2,
            uuid: "6927cfff-fc7b-4321-8448-0c3daf3781ae",
            name: "Video Interviews",
            unit: "calls",
            description:
              "Number of video interview call an organization can take.",
            is_boolean: false,
            value: 15,
          },
          {
            id: 3,
            uuid: "2cd72ddf-faef-42ec-aec3-c3d10f46fef9",
            name: "Users",
            unit: "users",
            description: "Number of users the organization can add.",
            is_boolean: false,
            value: 5,
          },
        ],
        prices: [
          {
            id: 3,
            is_active: true,
            created_at: "2020-11-19T10:33:03.099382+05:30",
            modified_at: "2020-11-19T10:33:03.099445+05:30",
            uuid: "9a4dd951-5706-4ef5-877f-d25ccfeb7d7a",
            price: "20.00",
            period_type: 0,
            currency: 1,
            plan: 2,
          },
          {
            id: 4,
            is_active: true,
            created_at: "2020-11-19T10:33:03.102152+05:30",
            modified_at: "2020-11-19T10:33:03.102180+05:30",
            uuid: "34cc779d-0521-484c-b996-d54b315f89f6",
            price: "200.00",
            period_type: 1,
            currency: 1,
            plan: 2,
          },
        ],
        is_active: true,
        created_at: "2020-11-19T10:33:03.096952+05:30",
        modified_at: "2020-11-19T10:34:00.913525+05:30",
        uuid: "4057df48-9abd-42fc-adf3-d5e4c57b3a4b",
        name: "Internal Hiring Plan",
        description: "A plan suited for people doing internal hiring.",
        default: false,
        order: 1,
        customized: null,
      },
      {
        id: 3,
        quotas: [
          {
            id: 1,
            uuid: "72e8d823-b7b2-4f88-b9c5-b04d3708e1f7",
            name: "Jobs",
            unit: "job",
            description:
              "Number of jobs that can be published by organization.",
            is_boolean: false,
            value: 30,
          },
          {
            id: 2,
            uuid: "6927cfff-fc7b-4321-8448-0c3daf3781ae",
            name: "Video Interviews",
            unit: "calls",
            description:
              "Number of video interview call an organization can take.",
            is_boolean: false,
            value: 40,
          },
          {
            id: 3,
            uuid: "2cd72ddf-faef-42ec-aec3-c3d10f46fef9",
            name: "Users",
            unit: "users",
            description: "Number of users the organization can add.",
            is_boolean: false,
            value: 10,
          },
        ],
        prices: [
          {
            id: 5,
            is_active: true,
            created_at: "2020-11-19T10:33:50.386802+05:30",
            modified_at: "2020-11-19T10:33:50.386819+05:30",
            uuid: "1a1f191d-6870-4589-beae-5e6564aa038e",
            price: "40.00",
            period_type: 0,
            currency: 1,
            plan: 3,
          },
          {
            id: 6,
            is_active: true,
            created_at: "2020-11-19T10:33:50.387818+05:30",
            modified_at: "2020-11-19T10:33:50.387834+05:30",
            uuid: "98c6cc49-230a-473c-92a0-ff49978bef64",
            price: "420.00",
            period_type: 1,
            currency: 1,
            plan: 3,
          },
        ],
        is_active: true,
        created_at: "2020-11-19T10:33:50.385564+05:30",
        modified_at: "2020-11-19T10:33:50.385585+05:30",
        uuid: "9a88089e-884a-4ef0-8a87-737deedc5d8e",
        name: "Team Plan",
        description:
          "A plan suited for organizations that are hiring for others and itself.",
        default: false,
        order: 2,
        customized: null,
      },
    ],
  };

  //   useEffect(() => {
  //     // get all plans
  //     getAllPlans();
  //     // setPlansData(getAllPlans());
  //     console.log("All plans", plansData);
  //   }, []);

  const dispatch = useDispatch();

  const [pricePeriod, setPricePeriod] = React.useState("yearly");

  const [selectedPlan, setSelectedPlan] = React.useState({
    period_type: 0,
    plan_id: 0,
  });

  const [organization_id, setOrganizationId] = useState<number>(0);

  useEffect(() => {
    if (currentOrganization.selectedPlan) {
      setSelectedPlan(currentOrganization.selectedPlan);
      setIsSubmitted(true);
      setOrganizationId(currentOrganization.id);
    }

    if (props.state.app.newOrganization) {
      if (props.state.app.newOrganisation.id) {
        setOrganizationId(props.state.app.newOrganisation.id);
      }
    }

    if (props.state.app.currentOrganization) {
      console.log("current org", props.state.app.currentOrganization.id);
      if (props.state.app.currentOrganization.id) {
        setOrganizationId(props.state.app.currentOrganization.id);
      }
    }
  }, []);

  const accessToken = localStorage.getItem("accessToken");

  const jwtToken = `Bearer ${accessToken}`;

  useEffect(() => {
    if (organization_id !== 0) {
      Axios.get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/plans/organization/?organization_id=${organization_id}/`,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
        .then((response: any) =>
          console.log("Response data from api ----->", response.data)
        )
        .catch((err: any) => console.log("err--->", err.response));
    }
  }, [organization_id]);

  const handlePricePeriod = (
    event: any,
    newPricePeriod: React.SetStateAction<string>
  ) => {
    setPricePeriod(newPricePeriod);
  };

  const handleSaveAndNext = () => {
    currentOrganization.selectedPlan = selectedPlan;

    // if (!isSubmitted) {
    //   dispatch(
    //     AssignPlanToOrganisation(
    //       // props.state.app.newOrganisation.id ||
    //       organization_id,
    //       selectedPlan.plan_id,
    //       selectedPlan.period_type
    //     )
    //   );
    // }

    handleNext();
  };

  return (
    <div
      style={{
        textAlign: "center",
        margin: "0",
        backgroundColor: "whitesmoke",
        width: "85vw",
        // border: "1px solid black",
        // borderRadius: "10px",
      }}
    >
      <Grid container>
        <Grid item xs={12} justify="center">
          <Typography variant="h4" component="h4">
            Choose a plan
          </Typography>
          <div>
            <ToggleButtonGroup
              value={pricePeriod}
              exclusive
              onChange={handlePricePeriod}
              aria-label="Plan price period"
            >
              <ToggleButton value="monthly" aria-label="monthly plans">
                Monthly
              </ToggleButton>
              <ToggleButton value="yearly" aria-label="yearly plans">
                Yearly
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <br />
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
          >
            {plansData.data.map((plan) => (
              <Grid item xs={3}>
                <PlanCard
                  plan={plan}
                  pricePeriod={pricePeriod}
                  selectedPlan={selectedPlan}
                  setSelectedPlan={setSelectedPlan}
                />
              </Grid>
            ))}
          </Grid>
          <br />
          {props.state.app && props.state.app.organisationPlanMessage && (
            <Typography variant="h5" component="h5" color="primary">
              {props.state.app.organisationPlanMessage}
            </Typography>
          )}
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            //   autoFocus={true}
            onClick={() => handleBack()}
          >
            {" "}
            Back
          </Button>{" "}
          <Button
            variant="contained"
            color="primary"
            type="submit"
            //   autoFocus={true}
            onClick={() => handleSaveAndNext()}
            disabled={selectedPlan.plan_id !== 0 ? false : true}
          >
            {" "}
            {isSubmitted ? "Next" : "Save and Next"}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return { state };
};

export default connect(mapStateToProps)(Plans);
