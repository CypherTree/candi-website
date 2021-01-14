import React, { useState, useEffect } from "react";

import { Button, Layout } from "antd";
import Title from "antd/lib/typography/Title";

import Axios from "axios";

import AddStepForm from "./AddStepForm";
import SortableList from "./SortableList";

const AddCustomWorkflow = (props: any) => {
  interface ItemType {
    id: number;
    name: string;
    description: string;
    step_type: number;
    category: number;
    order: number;
    video_enabled: boolean;
    workflow: number;
  }

  const [state, setState] = useState<ItemType[]>([]);

  const [dataReload, setDataReload] = useState(false);

  const [open, setOpen] = useState(false);

  const [selectedStep, setSelectedStep] = useState<ItemType | null>(null);

  const accessToken = localStorage.getItem("accessToken");

  const [isAddStepFormOpen, setIsAddStepFormOpen] = useState(false);

  const [didOrderChange, setDidOrderChange] = useState(false);

  const { handleCancelModal } = props;

  const closeAddStepForm = () => {
    setIsAddStepFormOpen(false);
  };

  const handleAddNewStep = () => {
    setIsAddStepFormOpen(false);
    setSelectedStep(null);
    setIsAddStepFormOpen(true);
  };

  const tenant = "cyphertree";
  // const tenant = "thor";

  const workflow_id = props.workflowId;

  const getStepsAPI = () => {
    Axios.get(
      `http://${tenant}.thetobbers-staging.ml:8000/api/v1/workflow/1/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        console.log("workflow data from API --> ", response.data);
        const stepsData = response.data.data.steps.sort(
          (a: any, b: any) => a.order - b.order
        );
        console.log("initial data --->", response.data.data.steps);

        console.log(" data after sorting --->", stepsData);
        setState(stepsData);
      })
      .catch((err) => {
        console.log("err ", err);
      });
  };

  const updateStepsOrderAPI = () => {
    console.log("<------- UPDATE STEPS ORDER API -------->");

    if (state.length > 0) {
      const data = state.map((item, index) => {
        item.order = index;
        return item;
      });

      console.log("Data for update Steps ---> ", data);

      Axios.put(
        `http://${tenant}.thetobbers-staging.ml:8000/api/v1/workflow/step/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
        .then((response) => {
          console.log("workflow data from update API --> ", response.data);
          // setState(response.data.data.steps);
          // setDataReload(true);
        })
        .catch((err) => {
          console.log("err ", err);
        });
    }

    setDidOrderChange(false);
  };

  useEffect(() => {
    getStepsAPI();
  }, []);

  useEffect(() => {
    updateStepsOrderAPI();
  }, [state]);

  useEffect(() => {
    getStepsAPI();
    setDataReload(false);
  }, [dataReload]);

  return (
    <Layout
      style={{
        alignContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      <Title
        level={4}
        style={{
          fontWeight: "bold",
          width: "auto",
          margin: "10px 0px 10px 0px ",
          // padding: "0px 0px 0px 350px",
        }}
      >
        Add Custom workflow page
      </Title>

      <div>
        <SortableList
          state={state}
          setState={setState}
          selectedStep={selectedStep}
          setSelectedStep={setSelectedStep}
          isAddStepFormOpen={isAddStepFormOpen}
          setIsAddStepFormOpen={setIsAddStepFormOpen}
          closeAddStepForm={closeAddStepForm}
          didOrderChange={didOrderChange}
          setDidOrderChange={setDidOrderChange}
        />
      </div>
      <br />
      <div
        style={{
          textAlign: "right",
          alignItems: "right",
        }}
      >
        <Button onClick={handleAddNewStep}>Add new Step</Button>
      </div>
      <br />
      {isAddStepFormOpen && (
        <AddStepForm
          open={open}
          setOpen={setOpen}
          setIsAddStepFormOpen={setIsAddStepFormOpen}
          steps={state}
          setDataReload={setDataReload}
          selectedStep={selectedStep}
          workflowId={workflow_id}
        />
      )}
      <br />
      <div style={{ display: "flex", alignContent: "center" }}>
        <span style={{ paddingRight: "10px" }}>
          <Button type="primary" onClick={() => handleCancelModal()}>
            Finish
          </Button>
        </span>
      </div>
    </Layout>
  );
};

export default AddCustomWorkflow;
