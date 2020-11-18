import { Typography, Grid, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { getAllPlans } from "../../core/services/plans";

import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import PlanCard from "../../components/plancards/PlanCard";

function Plans(props: any) {
  const { handleNext, handleBack } = props;
  //   const [plansData, setPlansData] = useState();

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
            is_active: true,
            created_at: "2020-09-25T08:09:19.450303+05:30",
            modified_at: "2020-09-25T08:09:19.450330+05:30",
            uuid: "81a04777-8298-4c55-bad2-17a059bef9c9",
            name: "Jobs",
            unit: "jobs",
            description:
              "Number of jobs that can be published by organization.",
            is_boolean: false,
          },
          {
            id: 2,
            is_active: true,
            created_at: "2020-09-25T08:09:49.250765+05:30",
            modified_at: "2020-09-25T08:09:49.250792+05:30",
            uuid: "1a19573a-81ae-4418-bc72-3d96e2172f60",
            name: "Users",
            unit: "users",
            description: "Number of  users the organization can add.",
            is_boolean: false,
          },
          {
            id: 3,
            is_active: true,
            created_at: "2020-09-25T08:10:22.549823+05:30",
            modified_at: "2020-09-25T08:10:22.549844+05:30",
            uuid: "6fe13e58-9ad9-43f6-bc3d-97ed8a99bbab",
            name: "Video Interviews",
            unit: "calls",
            description:
              "Number of video interview call an organization can take.",
            is_boolean: false,
          },
        ],
        prices: [
          {
            id: 1,
            is_active: true,
            created_at: "2020-09-25T08:11:04.924067+05:30",
            modified_at: "2020-09-25T08:11:04.924086+05:30",
            uuid: "2e80aaa5-d231-4b69-b807-302b55de0f20",
            price: "0.00",
            period_type: 0,
            plan: 1,
          },
          {
            id: 2,
            is_active: true,
            created_at: "2020-09-25T08:11:04.927619+05:30",
            modified_at: "2020-09-25T08:11:04.927637+05:30",
            uuid: "846926b4-c525-4ac4-b1df-c1edcae3ce4a",
            price: "0.00",
            period_type: 1,
            plan: 1,
          },
        ],
        is_active: true,
        created_at: "2020-09-25T08:11:04.920988+05:30",
        modified_at: "2020-09-25T08:11:04.921015+05:30",
        uuid: "ba42868a-37c8-4c5d-b82d-9eaa859c197b",
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
            is_active: true,
            created_at: "2020-09-25T08:09:19.450303+05:30",
            modified_at: "2020-09-25T08:09:19.450330+05:30",
            uuid: "81a04777-8298-4c55-bad2-17a059bef9c9",
            name: "Jobs",
            unit: "jobs",
            description:
              "Number of jobs that can be published by organization.",
            is_boolean: false,
          },
          {
            id: 2,
            is_active: true,
            created_at: "2020-09-25T08:09:49.250765+05:30",
            modified_at: "2020-09-25T08:09:49.250792+05:30",
            uuid: "1a19573a-81ae-4418-bc72-3d96e2172f60",
            name: "Users",
            unit: "users",
            description: "Number of  users the organization can add.",
            is_boolean: false,
          },
          {
            id: 3,
            is_active: true,
            created_at: "2020-09-25T08:10:22.549823+05:30",
            modified_at: "2020-09-25T08:10:22.549844+05:30",
            uuid: "6fe13e58-9ad9-43f6-bc3d-97ed8a99bbab",
            name: "Video Interviews",
            unit: "calls",
            description:
              "Number of video interview call an organization can take.",
            is_boolean: false,
          },
        ],
        prices: [
          {
            id: 3,
            is_active: true,
            created_at: "2020-09-25T08:12:04.601591+05:30",
            modified_at: "2020-09-25T08:12:04.601623+05:30",
            uuid: "30f76bed-d6cc-43ff-a439-f7c31920a191",
            price: "20.00",
            period_type: 0,
            plan: 2,
          },
          {
            id: 4,
            is_active: true,
            created_at: "2020-09-25T08:12:04.603909+05:30",
            modified_at: "2020-09-25T08:12:04.603940+05:30",
            uuid: "990efacb-8753-4ec2-be97-ac315722afa6",
            price: "200.00",
            period_type: 1,
            plan: 2,
          },
        ],
        is_active: true,
        created_at: "2020-09-25T08:12:04.599105+05:30",
        modified_at: "2020-09-25T08:12:04.599148+05:30",
        uuid: "c93031ac-f93a-45f3-93de-68e57a9fdd87",
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
            is_active: true,
            created_at: "2020-09-25T08:09:19.450303+05:30",
            modified_at: "2020-09-25T08:09:19.450330+05:30",
            uuid: "81a04777-8298-4c55-bad2-17a059bef9c9",
            name: "Jobs",
            unit: "jobs",
            description:
              "Number of jobs that can be published by organization.",
            is_boolean: false,
          },
          {
            id: 2,
            is_active: true,
            created_at: "2020-09-25T08:09:49.250765+05:30",
            modified_at: "2020-09-25T08:09:49.250792+05:30",
            uuid: "1a19573a-81ae-4418-bc72-3d96e2172f60",
            name: "Users",
            unit: "users",
            description: "Number of  users the organization can add.",
            is_boolean: false,
          },
          {
            id: 3,
            is_active: true,
            created_at: "2020-09-25T08:10:22.549823+05:30",
            modified_at: "2020-09-25T08:10:22.549844+05:30",
            uuid: "6fe13e58-9ad9-43f6-bc3d-97ed8a99bbab",
            name: "Video Interviews",
            unit: "calls",
            description:
              "Number of video interview call an organization can take.",
            is_boolean: false,
          },
        ],
        prices: [
          {
            id: 5,
            is_active: true,
            created_at: "2020-09-25T08:12:49.466859+05:30",
            modified_at: "2020-09-25T08:12:49.466896+05:30",
            uuid: "760d347d-9fa0-4509-ab8d-052eac5c8571",
            price: "40.00",
            period_type: 0,
            plan: 3,
          },
          {
            id: 6,
            is_active: true,
            created_at: "2020-09-25T08:12:49.469669+05:30",
            modified_at: "2020-09-25T12:16:24.175005+05:30",
            uuid: "3c73cf60-604d-49c8-946a-3f1486effd15",
            price: "420.00",
            period_type: 1,
            plan: 3,
          },
        ],
        is_active: true,
        created_at: "2020-09-25T08:12:49.463796+05:30",
        modified_at: "2020-09-25T12:16:24.165317+05:30",
        uuid: "ddc4d0fd-c547-4001-88db-cee2dea2cf5f",
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

  const [pricePeriod, setPricePeriod] = React.useState("yearly");

  const handlePricePeriod = (
    event: any,
    newPricePeriod: React.SetStateAction<string>
  ) => {
    setPricePeriod(newPricePeriod);
  };

  const handleNewSubmit = () => {
    handleNext();
    alert("submitted");
  };

  return (
    <div
      style={{
        textAlign: "center",
        margin: "0 auto",
        backgroundColor: "whitesmoke",
        width: "90vw",
        border: "1px solid black",
        borderRadius: "10px",
        paddingTop: "20px",
        paddingBottom: "20px",
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
                <PlanCard plan={plan} pricePeriod={pricePeriod} />
              </Grid>
            ))}
          </Grid>
          <br />
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
            onClick={() => handleNewSubmit()}
          >
            {" "}
            Save and Next
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Plans;
