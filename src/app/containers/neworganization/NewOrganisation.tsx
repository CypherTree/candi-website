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
import Navbar from "../../components/navbar/Navbar";
import Plans from "./Plans";
import CompanyDetails from "../../components/companyDetails/CompanyDetails";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
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
  handleBack: any
) {
  switch (step) {
    case 0:
      return <OrganizationalDetails handleNext={handleNext} />;
    case 1:
      return <Plans handleNext={handleNext} handleBack={handleBack} />;
    case 2:
      return <CompanyDetails handleBack={handleBack} />;
    case 3:
      return "Add roles and assign roles";
    case 4:
      return "Add workflow here";
    default:
      return "Unknown step";
  }
}

function NewOrganisation() {
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
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div>
      <Navbar />
      <br />
      This is to create new NewOrganisation
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
                handleBack
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

// const isStepOptional = (step: any) => {
//   return step === 1;
// };

//   if (isStepOptional(index)) {
//     labelProps.optional = (
//       <Typography variant="caption">Optional</Typography>
//     );
//   }

// const handleSkip = () => {
//   if (!isStepOptional(activeStep)) {
//     // You probably want to guard against something like this,
//     // it should never occur unless someone's actively trying to break something.
//     throw new Error("You can't skip a step that isn't optional.");
//   }

//   setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   setSkipped((prevSkipped) => {
//     const newSkipped = new Set(prevSkipped.values());
//     newSkipped.add(activeStep);
//     return newSkipped;
//   });
// };

{
  /* <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.button}
              >
                Back
              </Button> */
}
{
  /* {isStepOptional(activeStep) && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkip}
                  className={classes.button}
                >
                  Skip
                </Button>
              )} */
}

{
  /* <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button> */
}
