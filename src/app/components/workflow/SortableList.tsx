import { Button, Grid } from "@material-ui/core";
import React, { FC, useState } from "react";

import { ReactSortable } from "react-sortablejs";

const SortableList = (props: any) => {
  console.log("props-------->", props);
  const {
    state,
    setState,
    selectedStep,
    setSelectedStep,
    setIsAddStepFormOpen,
    isAddStepFormOpen,
    closeAddStepForm,
    setDidOrderChange,
  } = props;

  const handleEdit = (data: any) => {
    if (isAddStepFormOpen) {
      setIsAddStepFormOpen(false);
    }
    setIsAddStepFormOpen(true);
    setSelectedStep(data);
  };

  const handleStateListChange = () => {
    console.log("handle state list change was called ----->");
    setDidOrderChange(true);
  };

  return (
    <div>
      <div
        style={{
          width: "600px",
          border: "1px solid black",
          paddingLeft: "20px",
          paddingRight: "20px",
          //   cursor: "move",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "20px" }}>Recrutiment Flow</p>
        </div>
        <Grid container style={{ justifyContent: "space-between" }}>
          <Grid item>
            <p>Name</p>
          </Grid>
          <Grid item>
            <p>Action</p>
          </Grid>
        </Grid>
      </div>

      <ReactSortable list={state} setList={setState}>
        {state.map((item: any) => (
          <div
            key={item.id}
            style={{
              width: "600px",
              border: "1px dotted black",
              margin: "5px",
              paddingLeft: "20px",
              backgroundColor: "whitesmoke",
              cursor: "move",
            }}
          >
            <Grid container style={{ justifyContent: "space-between" }}>
              <Grid item>
                <p>
                  <b>{item.name}</b>
                </p>
                <p>{item.description}</p>
              </Grid>
              <Grid item style={{ padding: "20px" }}>
                <Button onClick={() => handleEdit(item)} variant="outlined">
                  Edit
                </Button>
              </Grid>
            </Grid>
          </div>
        ))}
      </ReactSortable>
    </div>
  );
};

export default SortableList;
