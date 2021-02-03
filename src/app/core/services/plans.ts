import axios from "axios";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";

export const getCurrentPlan = (organisation_id: number, setLoading: any) => {
  const { accessToken } = getCurrentSessionTokens();

  const jwtToken = `Bearer ${accessToken}`;

  axios
    .get(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/plans/organization/?organization_id=${organisation_id}`,
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
    .then((response: any) => {
      console.log("Current plan details from api ----->", response.data);
      setLoading(false);
      return {
        period_type: 2,
        plan_id: response.data.data.plan.id,
      };
      // setIsSubmitted(true);
    })
    .catch((err: any) => console.log("err--->", err.response));
};

export const plansData = {
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
          description: "Number of jobs that can be published by organization.",
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
          description: "Number of jobs that can be published by organization.",
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
          description: "Number of jobs that can be published by organization.",
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

export const getAllPlans = () => {
  const accessToken = localStorage.getItem("accessToken");

  const jwtToken = `Bearer ${accessToken}`;

  axios
    .get(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/plans/`,

      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
    .then((response: any) => {
      console.log(response);
      return response.data;
      // dispatch domain available msg to redux
    })
    .catch((err) => console.log("Err", err));
};
