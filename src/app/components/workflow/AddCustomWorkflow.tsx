import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
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

  const closeAddStepForm = () => {
    console.log("this was called ---? ");

    setIsAddStepFormOpen(false);
  };

  const handleAddNewStep = () => {
    console.log("<--------- THIS WAS CALLED ------------>");
    setIsAddStepFormOpen(false);
    setSelectedStep(null);
    setIsAddStepFormOpen(true);
  };

  const tenant = "cyphertree";
  // const tenant = "thor";

  const workflow_id = 2;

  const getStepsAPI = () => {
    Axios.get(
      `http://${tenant}.thetobbers-develop.ml/api/v1/workflow/${workflow_id}/`,
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
        `http://${tenant}.thetobbers-develop.ml/api/v1/workflow/step/`,
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
      }}
    >
      <p style={{ fontSize: "20px" }}> Add Custom workflow page</p>

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
        />
      )}
    </div>
  );
};

export default AddCustomWorkflow;

// {
//     "id":1,
//     "name":"Screening",
//     "step_type":0,
//     "description":"In this round the applicant is shortlisted.",
//     "category":0,
//     "order":0,
//     "video_enabled":false,
//     "workflow":2
//  },

// const addToList = (name: string, description: string) => {
// setState([...state, { name, description, id: state.length }]);
// };
