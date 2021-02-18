import { Layout, Button, Spin, Divider } from "antd";
import Title from "antd/lib/typography/Title";
import React, { useState, useEffect } from "react";
import AddRoles from "../../components/addRoles/AddRoles";

import Axios from "axios";

import { connect } from "react-redux";

import AddRole from "../../components/addRoles/AddRole";
import { toast } from "react-toastify";

const RolesDetailsPage = (props: any) => {
  const tenant = "cyphertree";

  console.log("<------------ PROPS IN ADD ROLES -------------->", props);
  const { handleNext, handleBack } = props;

  const org_id = 10;

  interface role {
    role: [Iroles];
  }

  interface Iroles {
    name: string;
    type: number;
    id?: number;
    uuid?: string;
  }

  const [roles, setRoles] = useState<Iroles[]>([]);

  const [oriRoles, setOriRoles] = useState<Iroles[]>([]);

  const [reloadRequired, setReloadRequired] = useState<boolean>(false);

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(true);

  const addRole = (name: string, type: number) => {
    console.log(" values in add role --> ", name, type);

    // check if role with name already exists

    const data = oriRoles.filter(
      (role) => role.name.toLowerCase() === name.toLowerCase()
    );

    if (data.length > 0) {
      setError("Role with this name already exists.");
      toast.error("Role with this name already exists");
    } else {
      setError("");
      setRoles([...roles, { name, type }]);
    }
  };

  const removeRole = (index: number) => {
    const newRoles = [...roles];
    newRoles.splice(index, 0);
    setRoles(newRoles);
  };

  const handleSkip = () => {
    handleNext();
  };

  const deleteRoleFromAPI = (role_id: number) => {
    setLoading(true);

    const accessToken = localStorage.getItem("accessToken");

    const jwtToken = `Bearer ${accessToken}`;

    Axios.delete(
      `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/team/roles/${role_id}/`,

      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
      .then((response) => {
        console.log("Delete success", response.data);
        // getRolesFromAPI();
      })
      .then(() => {
        console.log("reload value before change ---->", reloadRequired);
        setReloadRequired(true);
        // getRolesFromAPI();
        console.log("reload value after change ---->", reloadRequired);
        setLoading(false);
      })
      .catch((e) => {
        console.log("err", e);
        setLoading(false);
        toast.error("Some error occoured");
      });
  };

  const handleSubmitForm = () => {
    const accessToken = localStorage.getItem("accessToken");

    const jwtToken = `Bearer ${accessToken}`;

    setLoading(true);

    Axios.post(
      `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/team/roles/`,
      roles,
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
      .then((response) => {
        console.log("data", response.data);
        setLoading(false);
        setReloadRequired(true);
        setRoles([]);
      })
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        console.log("err", e);
        toast.error("Some error occoured.");
      });
  };

  const getRolesFromAPI = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const jwtToken = `Bearer ${accessToken}`;

    setOriRoles([]);

    let fData = [];

    await Axios.get(
      `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/team/roles/`,
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
      .then((response) => {
        fData = response.data.data;
        setOriRoles(fData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error("Some error occoured.");
      });
  };

  React.useEffect(() => {
    console.log("<--- reload value changed --->", reloadRequired);
    getRolesFromAPI();
    setReloadRequired(false);
  }, [reloadRequired]);

  React.useEffect(() => {
    console.log("<--- Initial reload --->", reloadRequired);

    getRolesFromAPI();
  }, []);

  if (loading) {
    return (
      <Layout
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "500px",
          backgroundColor: "white",
        }}
      >
        <Spin />
      </Layout>
    );
  } else {
    return (
      <Layout
        style={{
          margin: "30px",
          borderRadius: "30px",
          backgroundColor: "#fff",
        }}
      >
        <Layout
          style={{
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            width: "800px",
          }}
        >
          <div
            style={{
              paddingLeft: "200px",
            }}
          >
            <Title
              level={4}
              style={{
                fontWeight: "bold",
                marginTop: "20px",
                paddingLeft: "200px",
              }}
            >
              Add Roles to Organization
            </Title>
            <br />
            <div>
              {oriRoles.map((roleData: any, index: number) => (
                <div key={index}>
                  <AddRole
                    addRole={addRole}
                    roleData={roleData}
                    removeRole={removeRole}
                    index={index}
                    deleteRoleFromAPI={deleteRoleFromAPI}
                  />
                  <br />
                </div>
              ))}

              {roles.map((roleData: any, index: number) => (
                <div key={index}>
                  <AddRole
                    addRole={addRole}
                    roleData={roleData}
                    removeRole={removeRole}
                    index={index}
                    deleteRoleFromAPI={deleteRoleFromAPI}
                    error={error}
                    setError={setError}
                  />
                  <br />
                </div>
              ))}
            </div>
            <AddRole addRole={addRole} />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              paddingBottom: "20px",
            }}
          >
            <Button
              type="primary"
              onClick={handleSubmitForm}
              style={{ marginRight: "10px" }}
            >
              Save Roles
            </Button>
          </div>
        </Layout>
      </Layout>
    );
  }
};

export default RolesDetailsPage;
