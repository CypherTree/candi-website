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
import React, { useEffect, useState } from "react";
import AddCustomWorkflow from "./AddCustomWorkflow";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AddWorkflow = (props: any) => {
  const classes = useStyles();

  const accessToken = localStorage.getItem("accessToken");

  const { handleNext, handleBack } = props;

  // const []

  //   `${process.env.REACT_APP_SERVER_URL}/api/v1/workflow/`

  const tenant = "cyphertree";
  // const tenant = "thor";

  const getExistingWorkflows = () => {
    Axios.get(`http://${tenant}.thetobbers-develop.ml/api/v1/workflow/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        console.log("workflow data from API --> ", response.data);
      })
      .catch((err) => {
        console.log("err ", err);
      });
  };

  const createWorkflow = () => {
    Axios.post(
      `http://${tenant}.thetobbers-develop.ml/api/v1/workflow/`,
      {
        name: workflowName,
        client_company: null,
        for_organization: true,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => console.log(response.data))
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    getExistingWorkflows();
  }, []);

  const [organisationType, setOrganisationType] = React.useState(1);

  const [workflowType, setWorkflowType] = React.useState(1);

  const [open, setOpen] = useState(false);

  const [selectionDone, setSelectionDone] = useState(true);

  const [workflowName, setWorkflowName] = useState("");

  const handleWorkflowTypeChange = (event: any) => {
    setWorkflowType(event.target.value);
  };

  const handleOrganisationTypeChange = (event: any) => {
    setOrganisationType(event.target.value);
  };

  const isDeleteAllowed = true;

  const styles = { width: "300px" };

  const handleSubmitForm = () => {
    createWorkflow();

    if (workflowType === 2) {
      setSelectionDone(true);
    } else {
      handleNext();
    }
  };

  return (
    <div style={{ width: "1000px" }}>
      {selectionDone ? (
        <>
          <AddCustomWorkflow />
        </>
      ) : (
        <>
          <div>
            <p style={{ fontSize: "20px", paddingLeft: "30px" }}>
              Add AddWorkflow Screen
            </p>
          </div>
          <span style={{ paddingLeft: "30px" }}>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label">
                Select Organisation
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={organisationType}
                onChange={handleOrganisationTypeChange}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                autoWidth
                variant="standard"
                disabled={!isDeleteAllowed}
                style={styles}

                // size="medium"
              >
                <MenuItem value={1} style={styles}>
                  {open ? (
                    <div
                      style={{
                        wordWrap: "break-word",
                      }}
                    >
                      <p
                        style={{ fontWeight: "bold", fontFamily: "helvetica" }}
                      >
                        {" "}
                        Default Cyphertree
                      </p>

                      <p
                        style={{
                          wordWrap: "break-word",
                          fontSize: "14px",
                          whiteSpace: "initial",
                        }}
                      >
                        random lorem - Can modify, create workflow, add, delete,
                        users, can invite/add third party members. Delete and
                        mofidy the job and tasks. Can't delete the workspace.
                      </p>
                    </div>
                  ) : (
                    <div>
                      {" "}
                      <b> Type - Default Cyphertree</b>
                    </div>
                  )}
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-helper-label">
                Add workflow
              </InputLabel>

              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={workflowType}
                onChange={handleWorkflowTypeChange}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                autoWidth
                variant="standard"
                disabled={!isDeleteAllowed}
                style={styles}

                // size="medium"
              >
                <MenuItem value={1} style={styles}>
                  {open ? (
                    <div
                      style={{
                        wordWrap: "break-word",
                      }}
                    >
                      <p
                        style={{ fontWeight: "bold", fontFamily: "helvetica" }}
                      >
                        {" "}
                        Choose Default Recruitment Template
                      </p>

                      <p
                        style={{
                          wordWrap: "break-word",
                          fontSize: "14px",
                          whiteSpace: "initial",
                        }}
                      >
                        This template consists of screening, interview, basic
                        recruitment flow.
                      </p>
                    </div>
                  ) : (
                    <div>
                      {" "}
                      <b> Default Recruitment Template</b>
                    </div>
                  )}
                </MenuItem>
                <MenuItem value={2} style={styles}>
                  {" "}
                  {open ? (
                    <div
                      style={{
                        wordWrap: "break-word",
                      }}
                    >
                      <p
                        style={{ fontWeight: "bold", fontFamily: "helvetica" }}
                      >
                        {" "}
                        Add Custom workflow
                      </p>
                    </div>
                  ) : (
                    <div> Custom workflow</div>
                  )}
                </MenuItem>
              </Select>
            </FormControl>
          </span>
          <div style={{ paddingLeft: "30px", paddingTop: "15px" }}>
            <TextField
              type="text"
              label="Add workflow name"
              required
              autoFocus={true}
              color="primary"
              size="medium"
              variant="outlined"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              //   value={role}
              //   onChange={(e) => setRole(e.target.value)}
              disabled={!isDeleteAllowed}
              style={styles}
            ></TextField>

            <div style={{ padding: "30px" }}>
              <span style={{ paddingRight: "10px" }}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleBack}
                >
                  Back
                </Button>
              </span>

              <span style={{ paddingRight: "10px" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmitForm}
                >
                  Save and Next
                </Button>
              </span>

              <span style={{ paddingRight: "10px" }}>
                <Button variant="outlined" color="secondary">
                  Skip
                </Button>
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AddWorkflow;
