import React from "react";

import { Button, Tag } from "antd";

import { ReactSortable } from "react-sortablejs";
import { toast } from "react-toastify";

const SortableList = (props: any) => {
  console.log("props-------->", props);
  const {
    state,
    setState,
    setSelectedStep,
    setIsAddStepFormOpen,
    isAddStepFormOpen,
    setDidOrderChange,
  } = props;

  console.log(" list -- is ass dtep form open", isAddStepFormOpen);

  console.log("---- state data ", state);

  const handleEdit = (data: any) => {
    // toast.warn("Edit was called");
    console.log("isAddStepFormOpen", isAddStepFormOpen, data);
    if (isAddStepFormOpen) {
      setIsAddStepFormOpen(false);
    }
    setIsAddStepFormOpen(true);

    console.log("isAddStepFormOpen", isAddStepFormOpen, data);
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
                <Tag>{item.category.name}</Tag>
                <p style={{ paddingTop: "10px" }}>{item.description}</p>
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
