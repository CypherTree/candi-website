import { Button } from "@material-ui/core";
import Axios from "axios";
import React, { useState } from "react";
import AddRole from "./AddRole";

import { connect } from "react-redux";

// import ViewRole from "./ViewRole";

// 1 = ADMIN
// 2 = MANAGER
// 3 = EDITOR
// 4 = CLIENT
// 5 = VIEWER
// 6 = THIRD PARTY

const AddRoles = (props: any) => {
  console.log("<------------ PROPS IN ADD ROLES -------------->", props);
  const { handleNext, handleBack, state } = props;

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

  const addRole = (name: string, type: number) =>
    setRoles([...roles, { name, type }]);

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
    <div style={{ paddingLeft: "30px", width: "1000px", height: "80vh" }}>
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
        {" "}
        Add Roles to Organization
      </p>
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

      <div
        style={{
          paddingTop: "30px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <span style={{ paddingRight: "10px" }}>
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            onClick={() => handleBack()}
          >
            Back
          </Button>{" "}
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
          <Button variant="outlined" color="secondary" onClick={handleSkip}>
            Skip
          </Button>
        </span>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(AddRoles);
