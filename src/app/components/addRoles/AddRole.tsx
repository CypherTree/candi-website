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

function AddRole(props: any) {
  console.log("roles ----> ", props);
  const classes = useStyles();

  const { addRole, roleData, removeRole, index } = props;

  const [isAdded, SetIsAdded] = useState(false);

  const [isDeleteAllowed, setIsDeleteAllowed] = useState(true);

  //   roleData={roleData}
  //   removeRole={removeRole}
  //   index={index}

  const [type, setType] = React.useState(1);
  const [name, setName] = useState("");

  const [open, setOpen] = useState(false);

  const handleChange = (event: any) => {
    setType(event.target.value);
  };

  const handleChangeName = (event: any) => {
    setName(event.target.value);
  };

  const onSubmit = () => {
    console.log("role selected", name);
    console.log("role type selected", type);
    addRole(name, type);
  };

  React.useEffect(() => {
    // console.log("props", )
    if (props.roleData) {
      if (props.roleData.uuid) {
        setIsDeleteAllowed(false);
      }
      SetIsAdded(true);

      setName(props.roleData.name);
      setType(props.roleData.type);
    }
  }, [props]);

  return (
    <div style={{ width: "1000px", maxWidth: "1000px" }}>
      <span>
        {/* <InputLabel id="demo-simple-select-helper-label">
          Role Type Name
        </InputLabel> */}
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
        ></TextField>
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
            variant="filled"
            disabled={!isDeleteAllowed}
            // size="medium"
          >
            <MenuItem value={1}>
              {open ? (
                <div>
                  Admin
                  <hr />
                  <p>
                    Can modify, create workflow, add, delete, users, can add
                    third party members.
                  </p>
                  <p>
                    {" "}
                    Delete and mofidy the job and tasks. Can delete the
                    workspace.
                  </p>
                </div>
              ) : (
                <div> Admin</div>
              )}
            </MenuItem>
            <MenuItem value={2}>
              {" "}
              {open ? (
                <div>
                  Manager
                  <hr />
                  <p>
                    Can modify, create workflow, add, delete, users, can
                    invite/add third party members.
                  </p>
                  <p>
                    {" "}
                    Delete and mofidy the job and tasks. Can't delete the
                    workspace.
                  </p>
                </div>
              ) : (
                <div> Manager</div>
              )}
            </MenuItem>
            <MenuItem value={3}>
              {open ? (
                <div>
                  Editor
                  <hr />
                  <p>
                    Can create jobs, change workflow status. Can invite third
                    party members.
                  </p>
                </div>
              ) : (
                <div> Editor</div>
              )}
            </MenuItem>
            <MenuItem value={4}>
              {" "}
              {open ? (
                <div>
                  Viewer
                  <hr />
                  <p>
                    Can view workflow and space. Can't modify or delete the
                    workspace and flow.
                  </p>
                </div>
              ) : (
                <div> Viewer</div>
              )}
            </MenuItem>
            <MenuItem value={5}>
              {" "}
              {open ? (
                <div>
                  Third Party
                  <hr />
                  <p>
                    can't view workflow and space. Can't modify or delete the
                    workspace or delete the workspace and flow.
                  </p>
                  <p>Can only do tasks assigned by editor/manager/admin</p>
                </div>
              ) : (
                <div> Third Party</div>
              )}
            </MenuItem>
          </Select>
        </FormControl>{" "}
        {!isAdded && (
          <Button variant="outlined" color="primary" onClick={onSubmit}>
            Add role
          </Button>
        )}
        {isDeleteAllowed && isAdded && (
          <Button
            variant="contained"
            color="secondary"
            onClick={() => removeRole(index)}
          >
            <Delete />
          </Button>
        )}
      </span>
    </div>
  );
}

export default AddRole;
