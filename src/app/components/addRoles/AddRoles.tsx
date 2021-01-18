import React, { useState } from "react";

import Axios from "axios";
import { connect } from "react-redux";

import AddRole from "./AddRole";
import { Button, Layout } from "antd";
import Title from "antd/lib/typography/Title";

// 1 = ADMIN
// 2 = MANAGER
// 3 = EDITOR
// 4 = CLIENT
// 5 = VIEWER
// 6 = THIRD PARTY

const AddRoles = (props: any) => {
  console.log("<------------ PROPS IN ADD ROLES -------------->", props);
  const { handleNext, handleBack } = props;

  const org_id = props.state.app.currentOrganization.id;

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

  const addRole = (name: string, type: number) => {
    setRoles([...roles, { name, type }]);
  };

  const removeRole = (index: number) => {
    const newRoles = [...roles];
    newRoles.splice(index, 1);
    setRoles(newRoles);
  };

  const handleSkip = () => {
    updateOrganisation(2);
    handleNext();
  };

  const deleteRoleFromAPI = (role_id: number) => {
    const accessToken = localStorage.getItem("accessToken");

    const jwtToken = `Bearer ${accessToken}`;

    Axios.delete(
      `http://cyphertree.thetobbers-staging.ml:8000/api/v1/team/roles/${role_id}/`,

      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
      .then((response) => console.log("Delete success", response.data))
      .then(() => {
        console.log("reload value before change ---->", reloadRequired);
        setReloadRequired(true);
        getRolesFromAPI();
        console.log("reload value after change ---->", reloadRequired);
      })
      .catch((e) => console.log("err", e));
  };

  const handleSubmitForm = () => {
    const accessToken = localStorage.getItem("accessToken");

    const jwtToken = `Bearer ${accessToken}`;

    Axios.post(
      `http://cyphertree.thetobbers-staging.ml:8000/api/v1/team/roles/`,
      roles,
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
      .then((response) => console.log("data", response.data))
      .then(() => updateOrganisation(1))
      .then(() => handleNext())
      .catch((e) => console.log("err", e));
  };

  const getRolesFromAPI = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const jwtToken = `Bearer ${accessToken}`;

    let fData = [];

    await Axios.get(
      `http://cyphertree.thetobbers-staging.ml:8000/api/v1/team/roles/`,
      {
        headers: {
          Authorization: `${jwtToken}`,
        },
      }
    )
      .then((response) => {
        fData = response.data.data;

        setOriRoles(fData);
      })
      .catch((err) => console.log(err));
  };

  const updateOrganisation = (value: number) => {
    const accessToken = localStorage.getItem("accessToken");

    const data = props.state.app.currentOrganization;

    data.roles_added = value;

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

  React.useEffect(() => {
    console.log("<--- reload value changed --->", reloadRequired);
    getRolesFromAPI();
    setReloadRequired(false);
  }, [setReloadRequired]);

  React.useEffect(() => {
    console.log("<--- Initial reload --->", reloadRequired);

    getRolesFromAPI();
  }, []);

  return (
    <Layout
      style={{
        paddingLeft: "100px",
        // backgroundColor: "#fff",
        // justifyContent: "center",
        // alignItems: "center",
        // padding: "30px 30px 0px 100px",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ height: "400px", overflowY: "scroll" }}>
        <Title
          level={4}
          style={{
            fontWeight: "bold",
            // width: "auto",
            marginTop: "20px",
            textAlign: "center",
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
        }}
      >
        <Button onClick={() => handleBack()} style={{ marginRight: "10px" }}>
          Back
        </Button>{" "}
        <Button
          type="primary"
          onClick={handleSubmitForm}
          style={{ marginRight: "10px" }}
        >
          Save and Next
        </Button>
        <Button onClick={handleSkip}>Skip</Button>
      </div>
    </Layout>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(AddRoles);
