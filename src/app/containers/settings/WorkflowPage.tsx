import React, { useState, useEffect, useRef } from "react";

import { Button, Layout } from "antd";
import Title from "antd/lib/typography/Title";

import Axios from "axios";

import { connect } from "react-redux";
import {
  getOrgIdFromTenantName,
  getTenantInfo,
} from "../../core/services/tenantinfo";
import AddStepForm from "../../components/workflow/AddStepForm";
import SortableList from "../../components/workflow/SortableList";

const WorkflowPage = () => {
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

  const messagesEndRef = useRef<any>(null);

  const closeAddStepForm = () => {
    setIsAddStepFormOpen(false);
  };

  const handleAddNewStep = () => {
    setIsAddStepFormOpen(false);
    setSelectedStep(null);
    setIsAddStepFormOpen(true);
  };

  const tenant = getTenantInfo();

  const org_id = getOrgIdFromTenantName();

  const getStepsAPI = () => {
    Axios.get(
      `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/workflow/1/`,
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
        `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/workflow/step/`,
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
        width: "90vw",
      }}
    >
      <div
        style={{
          overflowY: "scroll",
          width: "80vw",
          // paddingLeft: "150px",
        }}
      >
        <Title
          level={4}
          style={{
            fontWeight: "bold",
            width: "auto",
            margin: "10px 0px 10px 0px ",
            padding: "0px 0px 0px 150px",
          }}
        >
          Add Custom workflow page
        </Title>

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
            workflowId={1}
          />
        )}
        <div ref={messagesEndRef} />
        <br />
      </div>
    </Layout>
  );
};

export default WorkflowPage;
