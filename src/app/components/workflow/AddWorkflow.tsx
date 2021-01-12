import React, { useEffect, useState } from "react";

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

import { connect } from "react-redux";

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

  const org_id = props.state.app.currentOrganization.id;

  const accessToken = localStorage.getItem("accessToken");

  const { handleNext, handleBack, handleCancelModal } = props;

  const [workflowAlreadyAdded, setWorkflowAlreadyAdded] = useState(false);

  // const []

  //   `${process.env.REACT_APP_SERVER_URL}/api/v1/workflow/`

  const tenant = "cyphertree";
  // const tenant = "thor";

  const getExistingWorkflows = () => {
    Axios.get(`http://${tenant}.thetobbers-staging.ml:8000/api/v1/workflow/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => {
        console.log("workflow data from API --> ", response.data);
        if (response.data.data.length !== 0) {
          setWorkflowAlreadyAdded(true);
          console.log("workflow data 1 ---->", response.data.data);
          console.log("workflow data 2 ---->", response.data.data[0]);
          console.log("workflow data 3 ---->", response.data.data[0].id);

          setWorkflowId(response.data.data[0].id);
        }
      })
      .catch((err) => {
        console.log("err ", err);
      });
  };

  const [workflowId, setWorkflowId] = useState<null | number>(null);

  const createWorkflow = () => {
    Axios.post(
      `http://${tenant}.thetobbers-staging.ml:8000/api/v1/workflow/`,
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
      .then((response) => {
        console.log(response.data);
        setWorkflowId(response.data.data.id);
      })
      .then(() => {
        setSelectionDone(true);
        // handleNext();
      })
      .catch((err) => console.log("err", err));
  };

  useEffect(() => {
    getExistingWorkflows();
  }, []);

  const [organisationType, setOrganisationType] = React.useState(1);

  const [workflowType, setWorkflowType] = React.useState(1);

  const [open, setOpen] = useState(false);

  const [selectionDone, setSelectionDone] = useState(false);

  const [workflowName, setWorkflowName] = useState("");

  const handleWorkflowTypeChange = (event: any) => {
    setWorkflowType(event.target.value);
  };

  const handleOrganisationTypeChange = (event: any) => {
    setOrganisationType(event.target.value);
  };

  const handleSkip = () => {
    updateOrganisation(2);
    handleCancelModal();
  };

  const isDeleteAllowed = true;

  const styles = { width: "300px" };

  const handleSubmitForm = () => {
    createWorkflow();
    updateOrganisation(1);

    if (workflowType !== 2) {
      handleNext();
    }
  };

  const updateOrganisation = (value: number) => {
    const accessToken = localStorage.getItem("accessToken");

    const data = props.state.app.currentOrganization;

    data.workflow_added = value;

    const jwtToken = `Bearer ${accessToken}`;

    Axios.put(
      `http://id.thetobbers-staging.ml:8000/api/v1/organization/${org_id}/`,
      data,
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
      .then((response) => console.log("data", response.data))

      .catch((e) => console.log("err", e));
  };

  return (
    <>
      {workflowAlreadyAdded ? (
        <div style={{ width: "1000px", paddingLeft: "30px", height: "75vh" }}>
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
            Workflow Already Added{" "}
          </p>
          <p> You can edit workflow steps in tenent settings.</p>

          <span
            style={{
              paddingRight: "10px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              paddingTop: "20px",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleCancelModal()}
            >
              Finish
            </Button>
          </span>
        </div>
      ) : (
        <div style={{ width: "1000px", paddingLeft: "30px", height: "75vh" }}>
          {selectionDone ? (
            <>
              <AddCustomWorkflow
                workflowId={workflowId}
                handleCancelModal={handleCancelModal}
              />
            </>
          ) : (
            <>
              <div>
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    fontFamily: "Helvetica",
                    color: "#696969	",
                    width: "auto",
                    margin: "10px 40px 5px 0 ",
                    padding: "0",
                    paddingLeft: "30px",
                  }}
                >
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
                            style={{
                              fontWeight: "bold",
                              fontFamily: "helvetica",
                            }}
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
                            random lorem - Can modify, create workflow, add,
                            delete, users, can invite/add third party members.
                            Delete and mofidy the job and tasks. Can't delete
                            the workspace.
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
                            style={{
                              fontWeight: "bold",
                              fontFamily: "helvetica",
                            }}
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
                            This template consists of screening, interview,
                            basic recruitment flow.
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
                            style={{
                              fontWeight: "bold",
                              fontFamily: "helvetica",
                            }}
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

                <div
                  style={{
                    padding: "30px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
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
                      Save and Finish
                    </Button>
                  </span>

                  <span style={{ paddingRight: "10px" }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleSkip}
                    >
                      Skip
                    </Button>
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(AddWorkflow);
