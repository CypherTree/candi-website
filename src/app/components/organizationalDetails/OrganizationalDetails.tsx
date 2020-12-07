import {
  Button,
  // FormControl,
  // FormLabel,
  // Input,
  // InputLabel,
  TextField,
  Typography,
} from "@material-ui/core";
// import { Label } from "@material-ui/icons";
import React, { useState, useEffect } from "react";
// import { useForm , Controller} from "react-hook-form";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useDispatch } from "react-redux";

import { connect } from "react-redux";

import {
  CheckDomainName,
  SetOrganisationalDetails,
} from "../../core/redux/app/actions";

function OrganizationalDetails(props: any) {
  const dispatch = useDispatch();
  // const { register, handleSubmit } = useForm();
  // const onSubmit = (data: any) => console.log(data);
  const [domain, setDomain] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [organisationWebsite, setOrganisationWebsite] = useState("");

  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    handleNext,
    //   domain,
    //   setDomain,
    //   // organisationWebsite,
    //   // setOrganisationWebsite,
    //   // organisationName,
    //   // setOrganisationName,
    currentOrganization,
  } = props;

  console.log("props in ogr details ", props);

  console.log("props in ogr details --> current org", currentOrganization);

  let fieldsDisabled = false;

  // const { control, errors: fieldsErrors } = useForm();

  // };

  const handleNewSubmit = () => {
    currentOrganization.name = organisationName;
    currentOrganization.website = organisationWebsite;
    currentOrganization.domain = domain;

    if (isSubmitted) {
      handleNext();
    } else {
      dispatch(
        SetOrganisationalDetails(
          organisationName,
          organisationWebsite,
          domain,
          handleNext
        )
      );
    }

    // handleNext();
  };

  useEffect(() => {
    if (
      props.state.app &&
      props.state.app.newOrganisation &&
      props.state.app.newOrganisation.message === "Organization created"
    ) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      fieldsDisabled = true;
    }
  }, [fieldsDisabled]);

  useEffect(() => {
    if (currentOrganization.name) {
      setOrganisationName(currentOrganization.name);
      setIsSubmitted(true);
    }
    if (currentOrganization.domain) {
      setDomain(currentOrganization.domain);
    }
    if (currentOrganization.website) {
      setOrganisationWebsite(currentOrganization.website);
    }
  }, []);

  const handleDomainURLChange = (e: any) => {
    setDomain(e.target.value);

    if (domain.length >= 4) {
      dispatch(
        CheckDomainName(
          e.target.value,
          localStorage.getItem("accessToken") || ""
        )
      );
    }
  };

  return (
    <div>
      <div
        style={{
          margin: "0 auto",
          lineHeight: "40px",
          width: "800px",
          padding: "100px",
          paddingTop: "0px",
          paddingBottom: "0px",
        }}
      >
        <TextField
          type="text"
          label="Organisation Name"
          fullWidth
          required
          helperText="Name of your organisation"
          autoFocus={true}
          color="primary"
          size="medium"
          variant="outlined"
          value={organisationName}
          onChange={(e) => setOrganisationName(e.target.value)}
          disabled={isSubmitted}
        ></TextField>
        <br /> <br />
        <TextField
          type="text"
          label="Website"
          fullWidth
          required
          helperText="Your organization's website URL. example -> something.com"
          autoFocus={true}
          color="primary"
          size="medium"
          variant="outlined"
          value={organisationWebsite}
          onChange={(e) => setOrganisationWebsite(e.target.value)}
          // disabled={fieldsDisabled}
          disabled={isSubmitted}
        ></TextField>
        <br /> <br />
        <TextField
          type="text"
          label="Domain"
          fullWidth
          required
          autoFocus={true}
          color="primary"
          size="medium"
          variant="outlined"
          value={domain}
          onChange={(e) => handleDomainURLChange(e)}
          disabled={isSubmitted}
        ></TextField>
        <div>
          <span>
            Your domain will be
            <Typography variant="h5" component="h5" color="primary">
              {domain === "" ? "your-domain" : domain}.theonboarders.com
            </Typography>
          </span>
        </div>
        {domain !== "" &&
        props.state.app.domainCheckMessage !== "Domain already taken" ? (
          <p>
            This domain is available.{" "}
            <CheckCircleIcon fontSize="small" style={{ color: "green" }} />
          </p>
        ) : (
          <p>
            This domain is NOT available.{" "}
            <CheckCircleIcon fontSize="small" style={{ color: "red" }} />
          </p>
        )}
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          //   autoFocus={true}
          // onClick={() => handleNewSubmit()}
          disabled
        >
          {" "}
          Back
        </Button>{" "}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          //   autoFocus={true}
          onClick={() => handleNewSubmit()}
        >
          {" "}
          {isSubmitted ? "Next" : "Save and Next"}
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(OrganizationalDetails);
