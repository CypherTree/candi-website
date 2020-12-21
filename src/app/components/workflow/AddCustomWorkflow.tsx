import { Button } from "@material-ui/core";
import Axios from "axios";
import React, { useState, useEffect } from "react";
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
      `http://${tenant}.thetobbers-staging.ml:8000/api/v1/workflow/${workflow_id}/`,
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
    <div
      style={{
        alignContent: "center",
        alignItems: "center",
        width: "1000px",
        display: "flex",
        flexDirection: "column",
        height: "75vh",
      }}
    >
      <p
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          fontFamily: "Helvetica",
          color: "#696969	",
          width: "auto",
          margin: "10px 40px 5px 0 ",
          padding: "0",
        }}
      >
        Add Custom workflow page
      </p>

      <div
        style={{
          left: "auto",
          right: "auto",
          alignSelf: "center",
        }}
      >
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
        <Button variant="outlined" onClick={handleAddNewStep}>
          Add new Step
        </Button>
      </div>
      <hr />
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
      <hr />
      <div style={{ display: "flex", alignContent: "center" }}>
        <span style={{ paddingRight: "10px" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleCancelModal()}
          >
            Finish
          </Button>
        </span>
      </div>
    </div>
  );
};

export default AddCustomWorkflow;
