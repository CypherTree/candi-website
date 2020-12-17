import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";

import React, { useState, useEffect } from "react";

import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AddStepForm = (props: any) => {
  const styles = { width: "300px" };
  const isDeleteAllowed = true;
  const classes = useStyles();

  const [checkVideoEnabled, setCheckVideoEnabled] = useState(true);

  const [stepName, setStepName] = useState("");

  const [stepDescription, setStepDescription] = useState("");

  const {
    open,
    setOpen,
    setIsAddStepFormOpen,
    steps,
    setDataReload,
    selectedStep,
  } = props;

  const [formType, setFormType] = useState(1);

  const [categoryType, setCategoryType] = useState(1);

  const [editMode, setEditMode] = useState(false);

  const handleFormTypeChange = (e: any) => {
    setFormType(e.target.value);
  };

  const handleCategoryTypeChange = (e: any) => {
    setCategoryType(e.target.value);
  };

  const tenant = "cyphertree";
  // const tenant = "thor";

  const workflow_id = 2;

  const handleFormSubmit = () => {
    if (editMode) {
      const data = {
        name: stepName,
        description: stepDescription,
        video_enabled: checkVideoEnabled,
      };

      console.log("data submitted for step update----->", data);

      updateStepsApi(data);
    } else {
      const data = {
        name: stepName,
        description: stepDescription,
        category: categoryType,
        video_enabled: checkVideoEnabled,
        workflow: workflow_id,
        order: steps.length,
      };

      console.log("data submitted----->", data);

      createStepApi(data);
    }
  };

  const accessToken = localStorage.getItem("accessToken");

  const createStepApi = (data: any) => {
    Axios.post(
      `http://${tenant}.thetobbers-develop.ml/api/v1/workflow/step/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        console.log(" data from add step API --> ", response.data);
      })
      .catch((err) => {
        console.log("err ", err);
      });

    setIsAddStepFormOpen(false);

    setDataReload(true);
  };

  const updateStepsApi = (data: any) => {
    Axios.put(
      `http://${tenant}.thetobbers-develop.ml/api/v1/workflow/step/${selectedStep.id}/`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    )
      .then((response) => {
        console.log(" data from add step API --> ", response.data);
      })
      .catch((err) => {
        console.log("err ", err);
      });

    setIsAddStepFormOpen(false);

    setDataReload(true);
  };

  useEffect(() => {
    if (selectedStep !== null) {
      console.log("<------ COOL UNTIL HERE ------->", selectedStep);

      setEditMode(true);

      setStepDescription(selectedStep.description);
      setStepName(selectedStep.name);
      setFormType(selectedStep.step_type);
      setCheckVideoEnabled(selectedStep.video_enabled);
    }

    if (selectedStep === null) {
      setEditMode(false);

      setStepDescription("");
      setStepName("");
      setFormType(1);
      setCheckVideoEnabled(true);
    }
  }, [selectedStep]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div> Add/Edit Step</div>
      <hr />
      <span>
        <TextField
          type="text"
          label="Step name"
          required
          autoFocus={true}
          color="primary"
          size="medium"
          variant="outlined"
          value={stepName}
          onChange={(e) => setStepName(e.target.value)}
          //   value={role}
          //   onChange={(e) => setRole(e.target.value)}
          //   disabled={!isDeleteAllowed}
          style={styles}
        ></TextField>
        <TextField
          type="text"
          label="Step Description"
          required
          color="primary"
          size="medium"
          variant="outlined"
          value={stepDescription}
          onChange={(e) => setStepDescription(e.target.value)}
          //   value={role}
          //   onChange={(e) => setRole(e.target.value)}
          //   disabled={!isDeleteAllowed}
          style={styles}
        ></TextField>
      </span>
      <span>
        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">
            Select Organisation
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={formType}
            onChange={handleFormTypeChange}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            autoWidth
            variant="standard"
            disabled={!isDeleteAllowed}
            style={styles}

            // size="medium"
          >
            <MenuItem value={0} style={styles}>
              <div> Default Form</div>
            </MenuItem>
            <MenuItem value={1} style={styles}>
              <div> No Form</div>
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">
            Select Organisation
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={categoryType}
            onChange={handleCategoryTypeChange}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            autoWidth
            variant="standard"
            disabled={editMode}
            style={styles}

            // size="medium"
          >
            <MenuItem value={0} style={styles}>
              {open ? (
                <div
                  style={{
                    wordWrap: "break-word",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontFamily: "helvetica" }}>
                    {" "}
                    In Progress
                  </p>

                  <p
                    style={{
                      wordWrap: "break-word",
                      fontSize: "14px",
                      whiteSpace: "initial",
                    }}
                  >
                    This means that candidate selection is still in progress
                  </p>
                </div>
              ) : (
                <div>
                  {" "}
                  <b> Type - In Progress</b>
                </div>
              )}
            </MenuItem>
            <MenuItem value={1} style={styles}>
              {" "}
              {open ? (
                <div
                  style={{
                    wordWrap: "break-word",
                  }}
                >
                  <p style={{ fontWeight: "bold", fontFamily: "helvetica" }}>
                    {" "}
                    Interview
                  </p>

                  <p
                    style={{
                      wordWrap: "break-word",
                      fontSize: "14px",
                      whiteSpace: "initial",
                    }}
                  >
                    This option is selected when interview is in progress.
                  </p>
                </div>
              ) : (
                <div> Interview</div>
              )}
            </MenuItem>
          </Select>
        </FormControl>
      </span>
      <span>
        <FormControlLabel
          control={
            <Checkbox
              name="checkedC"
              checked={checkVideoEnabled}
              onChange={() => {
                setCheckVideoEnabled(!checkVideoEnabled);
              }}
            />
          }
          label="Video "
        />
      </span>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          padding: "10px",
          alignContent: "center",
        }}
      >
        <Button color="primary" variant="outlined" onClick={handleFormSubmit}>
          {editMode ? "Update Step" : "Add Step"}
        </Button>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => setIsAddStepFormOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default AddStepForm;

// const handleAddToList = () => {
//   addToList(stepName, stepDescription);
//   setStepName("");
//   setStepDescription("");
//   setIsAddStepFormOpen(false);
// };
