import { Button } from "@material-ui/core";
import Axios from "axios";
import React, { useState } from "react";
import AddRole from "./AddRole";
// import ViewRole from "./ViewRole";

// 1 = ADMIN
// 2 = MANAGER
// 3 = EDITOR
// 4 = CLIENT
// 5 = VIEWER
// 6 = THIRD PARTY

const AddRoles = (props: any) => {
  const { handleNext, handleBack } = props;

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

  const addRole = (name: string, type: number) =>
    setRoles([...roles, { name, type }]);

  const removeRole = (index: number) => {
    const newRoles = [...roles];
    newRoles.splice(index, 1);
    setRoles(newRoles);
  };

  const handleSubmitForm = () => {
    const accessToken = localStorage.getItem("accessToken");

    const jwtToken = `Bearer ${accessToken}`;

    Axios.post(`http://thor.thetobbers-develop.ml/api/v1/team/roles/`, roles, {
      headers: {
        Authorization: `${jwtToken}`,
      },
    })
      .then((response) => console.log("data", response.data))
      // .then(() => handleNext())
      .catch((e) => console.log("err", e));
  };

  const getRolesFromAPI = async () => {
    const accessToken = localStorage.getItem("accessToken");

    const jwtToken = `Bearer ${accessToken}`;

    let fData = [];

    await Axios.get(`http://thor.thetobbers-develop.ml/api/v1/team/roles/`, {
      headers: {
        Authorization: `${jwtToken}`,
      },
    })
      .then((response) => {
        fData = response.data.data;

        setOriRoles(fData);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getRolesFromAPI();
  }, []);

  return (
    <div style={{ paddingLeft: "30px" }}>
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
            />
            <br />
          </div>
        ))}
      </div>
      <AddRole addRole={addRole} />
      <div style={{ paddingTop: "20px" }}>
        <span style={{ paddingRight: "10px" }}>
          <Button
            variant="outlined"
            color="primary"
            type="submit"
            //   autoFocus={true}
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
          <Button variant="outlined" color="secondary">
            Skip
          </Button>
        </span>
      </div>
    </div>
  );
};

export default AddRoles;
