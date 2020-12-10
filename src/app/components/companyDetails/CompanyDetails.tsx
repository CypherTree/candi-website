import {
  Typography,
  Button,
  TextField,
  Grid,
  Checkbox,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";

import axios from "axios";

import UploadLogo from "../uploadLogo/UploadLogo";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";

import {
  AddCompanyDetailsToOrganization,
  AddCompanyDetailsToCurrentOrganization,
} from "../../core/redux/app/actions";

function CompanyDetails(props: any) {
  console.log("--- ALL PROPS -- ", props);

  const { handleBack, handleNext } = props;

  // const {
  //   id: organisation_id,
  //   name,
  //   website,
  // } = props.state.app.newOrganisation;

  const [organisation_id, setOrganisationId] = useState<number>(0);

  const [website, setWebsite] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    if (props.state.app.newOrganisation) {
      setOrganisationId(props.state.app.newOrganisation.id);
      setWebsite(props.state.app.newOrganisation.website);
      setName(props.state.app.newOrganisation.name);
    }
    if (props.state.app.currentOrganization) {
      setOrganisationId(props.state.app.currentOrganization.id);
      setWebsite(props.state.app.currentOrganization.website);

      setName(props.state.app.currentOrganization.name);

      if (props.state.app.currentOrganization.country !== "") {
        setGstNumber(props.state.app.currentOrganization.gst);
        setCountry(props.state.app.currentOrganization.country);
        setState(props.state.app.currentOrganization.state);
        setCity(props.state.app.currentOrganization.city);
        setPincode(props.state.app.currentOrganization.pincode);
        setAddress(props.state.app.currentOrganization.address);
        setBillingAddress(props.state.app.currentOrganization.billing_address);
        setEmail(props.state.app.currentOrganization.email);
        setLogo(props.state.app.currentOrganization.logo);
      }
    }
  });

  const dispatch = useDispatch();

  const [gstNumber, setGstNumber] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [email, setEmail] = useState("");

  const [isGSTVerified, setIsGSTVerified] = useState(false);
  const [billingAddressSame, setBillingAddressSame] = useState(true);

  const [logo, setLogo] = useState("");

  const clearEverything = () => {
    setIsGSTVerified(false);
    setCountry("");
    setState("");
    setCity("");
    setPincode("");
    setAddress("");
    setBillingAddress("");
    setEmail("");
  };

  const handleCopyBusinessAddress = () => {
    console.log("checkedValue ", billingAddressSame);

    if (billingAddressSame) {
      setBillingAddress(address);

      console.log("setting billing address same ");
    } else {
      setBillingAddress("");
      console.log("setting billing address empty ");
    }
  };

  const fetchGSTDetails = () => {
    const accessToken = localStorage.getItem("accessToken");
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/organization/verify-gst/?gst_number=${gstNumber}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        // setData(response.data);

        const { addr } = response.data.data.pradr;

        setState(addr.stcd);
        setPincode(addr.pncd);
        setCountry("India");
        setCity(addr.city === "" ? addr.dst : addr.city);
        setAddress(
          `${addr.flno} , \n ${addr.bnm} , \n ${addr.bno} , \n ${addr.loc} , \n ${addr.st}`
        );
        setIsGSTVerified(true);
      })
      .catch((err) => console.log("--- erro", err.message));
  };

  const handleFormSubmit = () => {
    const putData = {
      // gst: gstNumber,
      email,
      address,
      country,
      state,
      city,
      // locality, //
      pincode,
      billing_address: billingAddress,
      billing_email: email,
      website,
      name,
    };

    const dataForLocal = {
      email,
      address,
      country,
      state,
      city,
      pincode,
      billingAddress,
    };

    // const organisation_id = 12;

    dispatch(AddCompanyDetailsToOrganization(putData, organisation_id));

    dispatch(AddCompanyDetailsToCurrentOrganization(dataForLocal));

    handleNext();
  };

  const styles = { width: "350px" };

  return (
    <div style={{ textAlign: "left", paddingLeft: "30px" }}>
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
        Enter company details
      </p>
      <br />
      <Grid
        container
        alignItems="flex-start"
        spacing={1}
        style={{ width: "1000px" }}
      >
        <Grid item xs={6}>
          <div>
            <TextField
              type="text"
              label="GST Number"
              required
              autoFocus={true}
              color="primary"
              size="medium"
              variant="outlined"
              value={gstNumber}
              onChange={(e) => {
                setGstNumber(e.target.value);
                clearEverything();
              }}
              style={styles}
            ></TextField>
            <span style={{ paddingLeft: "10px", paddingTop: "20px" }}>
              {" "}
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  fetchGSTDetails();
                }}
              >
                Verify GST{" "}
              </Button>
            </span>
          </div>
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="text"
            label="Country"
            required
            autoFocus={true}
            color="primary"
            size="medium"
            variant="outlined"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            disabled={!isGSTVerified}
            // style={{ width: "300px" }}
            style={styles}
          ></TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="text"
            label="State"
            required
            autoFocus={true}
            color="primary"
            size="medium"
            variant="outlined"
            value={state}
            onChange={(e) => setState(e.target.value)}
            disabled={!isGSTVerified}
            style={styles}
          ></TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="text"
            label="City"
            required
            autoFocus={true}
            color="primary"
            size="medium"
            variant="outlined"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={!isGSTVerified}
            style={styles}
          ></TextField>
        </Grid>{" "}
        <Grid item xs={6}>
          <TextField
            type="text"
            label="Pincode"
            required
            autoFocus={true}
            color="primary"
            size="medium"
            variant="outlined"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            disabled={!isGSTVerified}
            style={styles}
          ></TextField>
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="textArea"
            label="Address"
            multiline
            required
            autoFocus={true}
            color="primary"
            size="medium"
            variant="outlined"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              if (billingAddressSame) {
                setBillingAddress(e.target.value);
              }
            }}
            disabled={!isGSTVerified}
            style={styles}
          ></TextField>
        </Grid>
      </Grid>

      <Grid
        container
        alignItems="flex-start"
        spacing={1}
        style={{ width: "1000px" }}
      >
        <Grid item xs={12}>
          <span>
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
              Enter billing details
            </p>
            <Checkbox
              name="checkedC"
              checked={billingAddressSame}
              onChange={() => {
                setBillingAddressSame(!billingAddressSame);
                handleCopyBusinessAddress();
              }}
            />
            Same as company Address{" "}
          </span>
        </Grid>
        <Grid item xs={6}>
          <TextField
            type="text"
            label="Business Email address"
            multiline
            required
            autoFocus={true}
            color="primary"
            size="medium"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isGSTVerified}
            style={styles}
          ></TextField>
        </Grid>

        <Grid item xs={6}>
          <TextField
            type="textArea"
            label="Address"
            multiline
            required
            autoFocus={true}
            color="primary"
            size="medium"
            variant="outlined"
            disabled={billingAddressSame ? true : false}
            value={billingAddressSame ? address : billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            // disabled={!isGSTVerified}
            style={styles}
          ></TextField>
        </Grid>

        <Grid item xs={6}>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              fontFamily: "Helvetica",
              color: "#696969	",
              width: "auto",
              margin: "10px 40px 5px 0 ",
              padding: "0 0 20px 0",
            }}
          >
            Company Logo
          </p>
          {logo !== "" && (
            <img
              src={logo}
              style={{ height: "200px", width: "200px", borderRadius: "50%" }}
            />
          )}
          <UploadLogo
            organisation_id={organisation_id}
            name={name}
            website={website}
          />
          {/* <UploadLogo /> */}
        </Grid>

        <Grid item xs={6}>
          {props.state.app.companyDetailsToOrganizationMessage && (
            <div>
              <Typography variant="h5" component="h5" color="primary">
                {props.state.app.companyDetailsToOrganizationMessage}
              </Typography>{" "}
            </div>
          )}
        </Grid>
      </Grid>
      {/* 
      {props.state.app.companyDetailsToOrganizationMessage && (
        <div>
          <Typography variant="h5" component="h5" color="primary">
            {props.state.app.companyDetailsToOrganizationMessage}
          </Typography>{" "}
        </div>
      )} */}

      <div>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          //   autoFocus={true}
          onClick={() => handleBack()}
        >
          {" "}
          Back
        </Button>{" "}
        <Button
          variant="contained"
          color="primary"
          type="submit"
          //   autoFocus={true}
          onClick={() => handleFormSubmit()}
        >
          {" "}
          Save and Next
        </Button>{" "}
      </div>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(CompanyDetails);
