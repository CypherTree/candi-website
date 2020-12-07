import {
  makeStyles,
  Stepper,
  Typography,
  Step,
  StepLabel,
  Button,
} from "@material-ui/core";
import React from "react";
import OrganizationalDetails from "../../components/organizationalDetails/OrganizationalDetails";
import Plans from "./Plans";
import CompanyDetails from "../../components/companyDetails/CompanyDetails";
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    // marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
  },
}));

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
  currentOrganization: any
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
      return "Add roles and assign roles";
    case 4:
      return "Add workflow here";
    default:
      return "Unknown step";
  }
}

function NewOrganisation(props: any) {
  console.log("Props in New Organization ", props);
  const { handleClose, currentOrganization } = props;

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const steps = getSteps();

  const accessToken = localStorage.getItem("accessToken");
  console.log("acc", accessToken);

  const isStepSkipped = (step: any) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    console.log(" ----- handle next was called ---- ");
    // let newSkipped = skipped;
    // if (isStepSkipped(activeStep)) {
    //   newSkipped = new Set(newSkipped.values());
    //   newSkipped.delete(activeStep);
    // }

    // TODO: change later
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    // setSkipped(newSkipped);
    console.log("active step --- ", activeStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleCancelModal = () => {
    handleClose();
  };

  return (
    <div style={{ maxHeight: "90vh", overflowY: "auto" }}>
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
          // backgroundColor: "red",
          width: "100%",
        }}
      >
        {" "}
        <div style={{ display: "inline-block" }}>
          {currentOrganization.name ? (
            <Typography variant="h5" component="h5" color="primary">
              {currentOrganization.name}
            </Typography>
          ) : (
            <Typography variant="h5" component="h5" color="primary">
              Organization Create
            </Typography>
          )}{" "}
        </div>
        <div style={{ display: "inline-block" }}>
          <Button
            color="secondary"
            variant="outlined"
            onClick={(e) => handleCancelModal()}
          >
            Cancel <CloseIcon />
          </Button>{" "}
        </div>
      </div>
      <hr />
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label, index) => {
          const stepProps: any = {};
          const labelProps: any = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
            <Typography className={classes.instructions}>
              All steps completed - you&apos;re finished
            </Typography>
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(
                activeStep,
                handleNext,
                getStepContent,
                handleBack,
                currentOrganization
              )}
            </Typography>
            <div></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewOrganisation;
