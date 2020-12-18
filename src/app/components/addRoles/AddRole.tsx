import { Button, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { Delete } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const AddRole = (props: any) => {
  console.log("roles ----> ", props);

  //   roleData={roleData}
  //   removeRole={removeRole}
  //   index={index}
  const classes = useStyles();

  const { addRole, roleData, removeRole, index, deleteRoleFromAPI } = props;

  const [isAdded, SetIsAdded] = useState(false);

  const [isDeleteAllowed, setIsDeleteAllowed] = useState(true);

  const [type, setType] = React.useState(2);

  const [name, setName] = useState("");

  const [open, setOpen] = useState(false);

  const handleChange = (event: any) => {
    setType(event.target.value);
  };

  const handleChangeName = (event: any) => {
    setName(event.target.value);
  };

  const handleDeleteRoleFromApi = () => {
    deleteRoleFromAPI(roleData.id);
  };

  const onSubmit = () => {
    addRole(name, type);
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
      <span>
        <TextField
          type="text"
          label="Role Type Name"
          required
          autoFocus={true}
          color="primary"
          size="medium"
          variant="outlined"
          value={name}
          onChange={handleChangeName}
          //   value={role}
          //   onChange={(e) => setRole(e.target.value)}
          disabled={!isDeleteAllowed}
          style={styles}
        ></TextField>
        <span style={{ paddingLeft: "30px" }}>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">
              Role Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={type}
              onChange={handleChange}
              onOpen={() => setOpen(true)}
              onClose={() => setOpen(false)}
              autoWidth
              variant="standard"
              disabled={!isDeleteAllowed}
              style={styles}

              // size="medium"
            >
              <MenuItem value={2} style={styles}>
                {" "}
                {open ? (
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
                ) : (
                  <div> Manager</div>
                )}
              </MenuItem>
              <MenuItem value={3} style={styles}>
                {open ? (
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
                ) : (
                  <div> Editor</div>
                )}
              </MenuItem>
              <MenuItem value={4} style={styles}>
                {" "}
                {open ? (
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
                ) : (
                  <div> Viewer</div>
                )}
              </MenuItem>
              <MenuItem value={5} style={styles}>
                {" "}
                {open ? (
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
                ) : (
                  <div> Third Party</div>
                )}
              </MenuItem>
            </Select>
          </FormControl>{" "}
        </span>
        {!isAdded && (
          <Button variant="outlined" color="primary" onClick={onSubmit}>
            Add role
          </Button>
        )}
        {isDeleteAllowed && isAdded && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => removeRole(index)}
          >
            <Delete />
          </Button>
        )}
        {!isDeleteAllowed && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleDeleteRoleFromApi}
            // disabled={true}
          >
            <Delete />
          </Button>
        )}
      </span>
    </div>
  );
};

export default AddRole;

{
  /* <MenuItem value={1} style={styles} disabled={true}>
                {open ? (
                  <div>
                    <p style={{ fontWeight: "bold", fontFamily: "helvetica" }}>
                      {" "}
                      Admin
                    </p>
                  </div>
                ) : (
                  <div> Admin</div>
                )}
              </MenuItem> */
}
