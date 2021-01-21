import React, { useEffect, useState } from "react";

import { Button, Card, Steps } from "antd";
import Title from "antd/lib/typography/Title";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import AddRoles from "../../components/addRoles/AddRoles";
import AddWorkflow from "../../components/workflow/AddWorkflow";
import CompanyDetails from "../../components/companyDetails/CompanyDetails";
import OrganizationalDetails from "../../components/organizationalDetails/OrganizationalDetails";

import Plans from "./Plans";

import { StateType } from "../../../app/core/redux/types";
import { ClearCurrentOrganisation } from "../../core/redux/app/actions";
import FinalStepModal from "./FinalStepModal";

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
  handleCancelModal: any,
  loading: any,
  setLoading: any
) {
  switch (step) {
    case 0:
      return (
        <OrganizationalDetails
          handleNext={handleNext}
          currentOrganization={currentOrganization}
          loading={loading}
          setLoading={setLoading}
        />
      );
    case 1:
      return (
        <Plans
          handleNext={handleNext}
          handleBack={handleBack}
          currentOrganization={currentOrganization}
          loading={loading}
          setLoading={setLoading}
        />
      );
    case 2:
      return (
        <CompanyDetails
          handleNext={handleNext}
          handleBack={handleBack}
          loading={loading}
          setLoading={setLoading}
        />
      );
    case 3:
      return (
        <AddRoles
          handleNext={handleNext}
          handleBack={handleBack}
          loading={loading}
          setLoading={setLoading}
        />
      );
    case 4:
      return (
        <AddWorkflow
          handleNext={handleNext}
          handleBack={handleBack}
          handleCancelModal={handleCancelModal}
          loading={loading}
          setLoading={setLoading}
        />
      );
    case 5:
      return <FinalStepModal handleCancelModal={handleCancelModal} />;

    default:
      return "Unknown step";
  }
}

const NewOrganisation = (props: any) => {
  console.log(" ---------- Props in New Organization ", props);

  const {
    handleClose,
    currentOrganization,
    setCurrentOrganization,
    clearCurrentOrganisation,
  } = props;

  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const steps = getSteps();

  useEffect(() => {
    if (props.state.app.currentOrganization) {
      const { name, domain, website } = props.state.app.currentOrganization;
      setCurrentOrganization({
        name,
        website,
        domain,
      });
    }
  }, []);

  const onChange = (current: React.SetStateAction<number>) => {
    setCurrent(current);
  };

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
    console.log("modal close was called.");
    clearCurrentOrganisation(true);
    setActiveStep(0);
    setCurrent(0);
    handleClose();
  };

  return (
    <Card
      style={{
        maxHeight: "100%",
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
          height: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            borderBottom: "1px solid #c1c1c1",
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {currentOrganization.name ? (
            <Title level={4}>{currentOrganization.name}</Title>
          ) : (
            <Title level={4}>Organization Create</Title>
          )}{" "}
          <Button danger onClick={(e) => handleCancelModal()}>
            Cancel
          </Button>{" "}
        </div>
      </div>

      <div>
        <div style={{ paddingBottom: "10px" }}>
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
        </div>

        <div>
          {activeStep === steps.length + 1 ? (
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
                handleCancelModal,
                loading,
                setLoading
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

const mapStateToProps = (state: StateType) => {
  return {
    state: state,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    clearCurrentOrganisation: (clear: boolean) =>
      dispatch(ClearCurrentOrganisation(clear)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NewOrganisation);
