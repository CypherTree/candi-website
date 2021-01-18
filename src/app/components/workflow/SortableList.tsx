// import { Button, Grid } from "@material-ui/core";
import React, { FC, useState } from "react";

import { Button, Row, Col, Layout, Divider } from "antd";
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
          width: "610px",
          border: "1px solid black",
          paddingLeft: "20px",
          paddingRight: "20px",
          //   cursor: "move",
        }}
      >
        <div style={{ textAlign: "center", padding: "5px" }}>
          <p style={{ fontSize: "20px" }}>Recrutiment Flow</p>
        </div>
        <div
          style={{
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <p>Name</p>
          <p>Action</p>
        </div>
      </div>

      <ReactSortable list={state} setList={setState}>
        {state.map((item: any) => (
          <div
            key={item.id}
            style={{
              width: "600px",
              border: "1px dotted black",
              margin: "5px",
              padding: "10px",
              backgroundColor: "whitesmoke",
              cursor: "move",
            }}
          >
            <div
              style={{
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div style={{ display: "flex", flexDirection: "column" }}>
                <p>
                  <b>{item.name}</b>
                </p>
                <p>{item.description}</p>
              </div>
              <Button onClick={() => handleEdit(item)}>Edit</Button>
            </div>
          </div>
        ))}
      </ReactSortable>
    </div>
  );
};

export default SortableList;
