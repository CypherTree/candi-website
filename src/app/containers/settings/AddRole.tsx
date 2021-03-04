import React, { useState, useEffect } from "react";

import { Button, Row, Col, Input, Form, Select, Typography } from "antd";
import { DeleteFilled, EditOutlined, CloseOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import axios from "axios";

const { Option } = Select;
const { Text } = Typography;

const AddRole = (props: any) => {
  console.log("roles ----> ", props);

  const {
    addRole,
    roleData,
    removeRole,
    index,
    deleteRoleFromAPI,
    error,
    editAllowed,
    setLoading,
    setReloadRequired,
  } = props;

  const [isAdded, SetIsAdded] = useState(false);
  const [isDeleteAllowed, setIsDeleteAllowed] = useState(true);
  const [isEditAllowed, setIsEditAllowed] = useState(false);
  const [type, setType] = useState<string | undefined>();
  const [name, setName] = useState("");
  const [currentError, setCurrentError] = useState("");

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
    let roleValue;

    if (type === "Manager") {
      roleValue = 2;
    } else if (type === "Editor") {
      roleValue = 3;
    } else if (type === "Viewer") {
      roleValue = 4;
    } else if (type === "Third Party") {
      roleValue = 6;
    }

    addRole(name, roleValue);
  };

  const onFinish = () => {
    if (name === "") {
      setCurrentError("Enter the Role Name.");
    }
    if (!type) {
      setCurrentError("Select the Role Type.");
    }

    if (name !== "" && type) {
      setCurrentError("");
      setName("");
      setType(undefined);
      onSubmit();
    }
  };

  const handleUpdateRole = async (name: string, role_id: number) => {
    const accessToken = localStorage.getItem("accessToken");
    const jwtToken = `Bearer ${accessToken}`;
    setLoading(true);
    const tenant = "cyphertree";
    await axios
      .put(
        `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/team/roles/${role_id}/  `,
        { name },
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
      .then((response) => {
        console.log("data", response.data);
        toast.success("Role updated successfully.");
        setLoading(false);
      })
      .then(() => setReloadRequired(true))
      .catch((e) => {
        console.log("err", e);
        setLoading(false);
        toast.error("Some error occoured.");
      });
  };

  useEffect(() => {
    if (props.roleData) {
      if (props.roleData.uuid) {
        setIsDeleteAllowed(false);
        setIsEditAllowed(false);
      }
      SetIsAdded(true);

      setName(props.roleData.name);

      let roleType;

      if (props.roleData.type === 2) {
        roleType = "Manager";
      } else if (props.roleData.type === 3) {
        roleType = "Editor";
      } else if (props.roleData.type === 4) {
        roleType = "Viewer";
      } else if (props.roleData.type === 6) {
        roleType = "Third Party";
      }
      setType(roleType);
    }
  }, []);

  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      style={{ backgroundColor: "white" }}
    >
      {editAllowed}
      <Row gutter={8}>
        <Col span={8}>
          <Form.Item>
            <Input
              placeholder="Role Name"
              onChange={handleChangeName}
              disabled={!isEditAllowed && !isDeleteAllowed}
              style={{ width: "250px" }}
              value={name}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item>
            <Select
              style={{ width: "250px" }}
              placeholder="Role Type"
              disabled={!isDeleteAllowed}
              onChange={handleChange}
              value={type}
            >
              {console.log("values in form --> ", name, type)}
              <Option value="Manager">
                <div
                  style={{
                    wordWrap: "break-word",
                  }}
                >
                  <p style={{ fontWeight: "bold" }}>Manager</p>

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
                <div>
                  <p style={{ fontWeight: "bold" }}> Editor</p>

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
                  <p style={{ fontWeight: "bold" }}> Viewer</p>
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
                  <p style={{ fontWeight: "bold" }}> Third Party</p>
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
            // case 1: is not in the list - Add Role
            // case 2: is in the list - EDIT / DELETE
            // case 3: local delete

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add role
              </Button>
            </Form.Item>
          )}

          {isDeleteAllowed && isAdded && (
            <Form.Item style={{ width: "100px" }}>
              <Button onClick={() => removeRole(index)}>
                <DeleteFilled style={{ color: "red" }} />
              </Button>
            </Form.Item>
          )}

          <span
            style={{
              display: "flex",
              flexDirection: "row",
              // backgroundColor: "yellow",
            }}
          >
            {!isEditAllowed && !isDeleteAllowed && (
              <Form.Item style={{ width: "100px" }}>
                <Button
                  onClick={() => {
                    setIsEditAllowed(true);
                  }}
                >
                  <EditOutlined style={{ color: "black" }} />
                </Button>
              </Form.Item>
            )}
            {isEditAllowed && (
              <Form.Item style={{ width: "100px" }}>
                <Button
                  onClick={() => {
                    setIsEditAllowed(false);
                    removeRole(index);
                  }}
                >
                  <CloseOutlined style={{ color: "red" }} />
                </Button>
              </Form.Item>
            )}
            {isEditAllowed && (
              <Form.Item style={{ width: "100px" }}>
                <Button onClick={() => handleUpdateRole(name, roleData.id)}>
                  Update Role
                </Button>
              </Form.Item>
            )}
            {!isDeleteAllowed && (
              <Form.Item style={{ width: "100px" }}>
                <Button onClick={handleDeleteRoleFromApi}>
                  <DeleteFilled style={{ color: "red" }} />
                </Button>
              </Form.Item>
            )}
          </span>
        </Col>
      </Row>
      {currentError && <Text type="danger">{currentError}</Text>}
      {error && <Text type="danger">{error}</Text>}
    </Form>
  );
};

export default AddRole;
