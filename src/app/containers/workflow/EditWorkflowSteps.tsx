import React, { useState, useEffect, useRef } from "react";

import { Button, Layout } from "antd";

import Axios from "axios";

import AddStepForm from "./AddStepForm";
import SortableList from "./SortableList";

import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { getTenantInfo } from "../../core/services/tenantinfo";

const EditWorkflowSteps = (props: any) => {
  const { workflowData } = props;

  interface Category {
    id: number;
  }

  interface ItemType {
    id: number;
    name: string;
    description: string;
    step_type: number;
    category: Category;
    order: number;
    video_enabled: boolean;
    workflow: number;
  }

  interface LocalData {
    id: number;
    name: string;
    description: string;
    step_type: number;
    category?: number | null;
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

  const messagesEndRef = useRef<any>(null);

  const tenant = getTenantInfo();

  const closeAddStepForm = () => {
    setIsAddStepFormOpen(false);
  };

  const handleAddNewStep = () => {
    setIsAddStepFormOpen(false);
    setSelectedStep(null);
    setIsAddStepFormOpen(true);
  };

  //   const { slug: tenant, id: org_id } = props.state.app.currentOrganization;

  let { workflowId } = useParams();

  const workflow_id = workflowId;

  const getStepsAPI = () => {
    console.log("--- steps api was called");

    Axios.get(
      `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/workflow/${workflow_id}/`,
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

      const dataToUpdate: {
        id: number;
        name: string;
        description: string;
        step_type: number;
        category: number;
        order: number;
        video_enabled: boolean;
        workflow: number;
      }[] = [];

      state.map((item, index) => {
        const localData = {
          id: item.id,
          name: item.name,
          description: item.description,
          step_type: item.step_type,

          category: item.category.id,
          order: item.order,
          video_enabled: item.video_enabled,
          workflow: item.workflow,
        };
        dataToUpdate.push(localData);
      });

      console.log("Data for update Steps ---> ", data);

      Axios.put(
        `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/workflow/step/`,
        dataToUpdate,
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
    // setState(workflowData.steps);
  }, []);

  useEffect(() => {
    updateStepsOrderAPI();
  }, [state]);

  useEffect(() => {
    getStepsAPI();
    setDataReload(false);
  }, [dataReload]);

  useEffect(() => {
    console.log("<---- scroll thing was called--->", isAddStepFormOpen);
    if (isAddStepFormOpen) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [isAddStepFormOpen]);

  return (
    <Layout
      style={{
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        backgroundColor: "#fff",
        width: "95%",
      }}
    >
      <div
        style={{
          maxHeight: "1000px",
          overflowY: "scroll",
          width: "90%",
          // paddingLeft: "150px",
          overflowX: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
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

        <br />
        <div
          style={
            {
              // paddingLeft: "250px",
            }
          }
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
            typeId={workflowData.workflow_type.id}
          />
        )}
        <div ref={messagesEndRef} />
        <br />
      </div>
    </Layout>
  );
};

export default EditWorkflowSteps;
