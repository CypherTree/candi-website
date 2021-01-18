import React, { useState } from "react";

import { Button, Row, Col, Input, Form, Select } from "antd";

import { DeleteFilled } from "@ant-design/icons";

const { Option } = Select;

const AddRole = (props: any) => {
  console.log("roles ----> ", props);

  //   roleData={roleData}
  //   removeRole={removeRole}
  //   index={index}

  const returnValue = (type: any) => {
    if (type === "2") {
      return "Manager";
    }
    if (type === "3") {
      return "Editor";
    }
    if (type === "4") {
      return "Third Party";
    }
  };

  const { addRole, roleData, removeRole, index, deleteRoleFromAPI } = props;

  const [isAdded, SetIsAdded] = useState(false);

  const [isDeleteAllowed, setIsDeleteAllowed] = useState(true);

  const [type, setType] = React.useState(2);

  const [name, setName] = useState("");

  const [open, setOpen] = useState(false);

  const handleChange = (value: any) => {
    setType(value);
  };

  const handleChangeName = (event: any) => {
    setName(event.target.value);
  };

  const handleDeleteRoleFromApi = () => {
    deleteRoleFromAPI(roleData.id);
  };

  const onSubmit = () => {
    addRole(name, type);
    // setName("");
    // setType(2);
  };

  React.useEffect(() => {
    if (props.roleData) {
      if (props.roleData.uuid) {
        setIsDeleteAllowed(false);
      }
      SetIsAdded(true);

      setName(props.roleData.name);
      setType(props.roleData.type);
    }
  }, [props]);

  const styles = { width: "300px" };

  return (
    <div style={{ width: "1000px", maxWidth: "1000px" }}>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
      >
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item
              // name="gstNumber"
              rules={[
                {
                  required: true,
                  message: "Please input Role name!",
                },
              ]}
            >
              <Input
                placeholder="Role Name"
                value={name}
                onChange={handleChangeName}
                disabled={!isDeleteAllowed}
                style={{ width: "250px" }}
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              // name="gstNumber"
              rules={[
                {
                  required: true,
                  message: "Please input Role name!",
                },
              ]}
            >
              <Select
                defaultValue={returnValue(type)}
                style={{ width: "250px" }}
                // onChange={handleChange}
                placeholder="Role Type"
                disabled={!isDeleteAllowed}
                onChange={handleChange}

                // onOpen={() => setOpen(true)}
                // onClose={() => setOpen(false)}
              >
                <Option value="Manager">
                  <div
                    style={{
                      wordWrap: "break-word",
                    }}
                  >
                    <p style={{ fontWeight: "bold", fontFamily: "helvetica" }}>
                      {" "}
                      Manager
                    </p>

                    <p
                      style={{
                        wordWrap: "break-word",
                        fontSize: "14px",
                        whiteSpace: "initial",
                      }}
                    >
                      Can modify, create workflow, add, delete, users, can
                      invite/add third party members. Delete and mofidy the job
                      and tasks. Can't delete the workspace.
                    </p>
                  </div>
                </Option>
                <Option value="Editor">
                  {" "}
                  <div>
                    <p style={{ fontWeight: "bold", fontFamily: "helvetica" }}>
                      {" "}
                      Editor
                    </p>

                    <p
                      style={{
                        wordWrap: "break-word",
                        fontSize: "14px",
                        whiteSpace: "initial",
                      }}
                    >
                      Can create jobs, change workflow status. Can invite third
                      party members.
                    </p>
                  </div>
                </Option>
                <Option value="Viewer">
                  <div>
                    <p style={{ fontWeight: "bold", fontFamily: "helvetica" }}>
                      {" "}
                      Viewer
                    </p>
                    <p
                      style={{
                        wordWrap: "break-word",
                        fontSize: "14px",
                        whiteSpace: "initial",
                      }}
                    >
                      Can view workflow and space. Can't modify or delete the
                      workspace and flow.
                    </p>
                  </div>
                </Option>
                <Option value="Third Party">
                  <div>
                    <p style={{ fontWeight: "bold", fontFamily: "helvetica" }}>
                      {" "}
                      Third Party
                    </p>

                    <p
                      style={{
                        wordWrap: "break-word",
                        fontSize: "14px",
                        whiteSpace: "initial",
                      }}
                    >
                      can't view workflow and space. Can't modify or delete the
                      workspace or delete the workspace and flow. Can only do
                      tasks assigned by editor/manager/admin
                    </p>
                  </div>
                </Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            {!isAdded && (
              <Button type="primary" onClick={onSubmit}>
                Add role
              </Button>
            )}
            {isDeleteAllowed && isAdded && (
              <div style={{ width: "100px" }}>
                <Button onClick={() => removeRole(index)}>
                  <DeleteFilled style={{ color: "red" }} />
                </Button>
              </div>
            )}
            {!isDeleteAllowed && (
              <div style={{ width: "100px" }}>
                <Button onClick={handleDeleteRoleFromApi}>
                  <DeleteFilled style={{ color: "red" }} />
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddRole;
