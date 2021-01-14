import React, { useState } from "react";

import Title from "antd/lib/typography/Title";
import { Button, Card, Divider } from "antd";

import AddRoles from "../../components/addRoles/AddRoles";
import AddWorkflow from "../../components/workflow/AddWorkflow";
import CompanyDetails from "../../components/companyDetails/CompanyDetails";
import OrganizationalDetails from "../../components/organizationalDetails/OrganizationalDetails";

import Plans from "./Plans";

import { Steps } from "antd";

const { Step } = Steps;

function getSteps() {
  return [
    "Organisation Setup",
    "Choose a plan",
    "Enter Company Details",
    "Add roles",
    "Add Workflow",
  ];
}
function getStepContent(
  step: any,
  handleNext: any,
  setActiveStep: any,
  handleBack: any,
  currentOrganization: any,
  handleCancelModal: any
) {
  switch (step) {
    case 0:
      return (
        <OrganizationalDetails
          handleNext={handleNext}
          currentOrganization={currentOrganization}
        />
      );
    case 1:
      return (
        <Plans
          handleNext={handleNext}
          handleBack={handleBack}
          currentOrganization={currentOrganization}
        />
      );
    case 2:
      return <CompanyDetails handleNext={handleNext} handleBack={handleBack} />;
    case 3:
      return <AddRoles handleNext={handleNext} handleBack={handleBack} />;
    case 4:
      return (
        <AddWorkflow
          handleNext={handleNext}
          handleBack={handleBack}
          handleCancelModal={handleCancelModal}
        />
      );

    default:
      return "Unknown step";
  }
}

const NewOrganisation = (props: any) => {
  console.log("Props in New Organization ", props);
  const { handleClose, currentOrganization } = props;

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const [current, setCurrent] = useState(0);

  const onChange = (current: React.SetStateAction<number>) => {
    console.log("onChange:", current);
    setCurrent(current);
  };

  const accessToken = localStorage.getItem("accessToken");
  console.log("acc", accessToken);

  // const isStepSkipped = (step: any) => {
  //   return skipped.has(step);
  // };

  const handleNext = () => {
    console.log(" ----- handle next was called ---- ");

    setActiveStep((prevActiveStep) => prevActiveStep + 1);

    setCurrent(current + 1);

    console.log("active step --- ", activeStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setCurrent(current - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleCancelModal = () => {
    handleClose();
  };

  return (
    <Card
      style={{
        maxHeight: "85vh",
        width: "1000px",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
          width: "100%",
        }}
      >
        {" "}
        <div style={{ display: "inline-block" }}>
          {currentOrganization.name ? (
            <Title level={4}>{currentOrganization.name}</Title>
          ) : (
            <Title level={4}>Organization Create</Title>
          )}{" "}
        </div>
        <div style={{ display: "inline-block" }}>
          <Button danger onClick={(e) => handleCancelModal()}>
            Cancel
          </Button>{" "}
        </div>
      </div>
      <hr />
      <div style={{ height: "450px", overflowY: "scroll" }}>
        <Steps
          type="navigation"
          current={current}
          onChange={onChange}
          className="site-navigation-steps"
        >
          <Step status="process" title="Organisation" />
          <Step status="process" title="Plan" />
          <Step status="process" title="Company " />
          <Step status="process" title="Roles" />
          <Step status="process" title="Workflow" />
        </Steps>

        <div>
          {activeStep === steps.length ? (
            <div>
              All steps completed - you're finished
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              {getStepContent(
                activeStep,
                handleNext,
                getStepContent,
                handleBack,
                currentOrganization,
                handleCancelModal
              )}
              <div></div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default NewOrganisation;
