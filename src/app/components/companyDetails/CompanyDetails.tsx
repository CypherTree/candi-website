import {
  Typography,
  Button,
  TextField,
  Grid,
  Checkbox,
  Input,
} from "@material-ui/core";
import React, { useState } from "react";

import axios from "axios";
import { isGetAccessor } from "typescript";
import UploadLogo from "../uploadLogo/UploadLogo";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";

import { AddCompanyDetailsToOrganization } from "../../core/redux/app/actions";

function CompanyDetails(props: any) {
  console.log("--- ALL PROPS -- ", props);

  const { handleBack, handleNext } = props;

  const {
    id: organisation_id,
    name,
    website,
  } = props.state.app.newOrganisation;

  const dispatch = useDispatch();

  const [gstNumber, setGstNumber] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");

  const [billingAddressSame, setBillingAddressSame] = useState(true);

  const [email, setEmail] = useState("");

  const [data, setData] = useState("");

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
        setData(response.data);

        const { addr } = response.data.data.pradr;

        setState(addr.stcd);
        setPincode(addr.pncd);
        setCountry("India");
        setCity(addr.city === "" ? addr.dst : addr.city);
        setAddress(
          `${addr.flno} , \n ${addr.bnm} , \n ${addr.bno} , \n ${addr.loc} , \n ${addr.st}`
        );
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

    dispatch(AddCompanyDetailsToOrganization(putData, organisation_id));

    // handleNext();
  };

  return (
    <div>
      <Typography variant="h5" component="h5">
        Enter company details...
      </Typography>
      <br />
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
              onChange={(e) => setGstNumber(e.target.value)}
            ></TextField>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                fetchGSTDetails();
              }}
            >
              Fetch GST Details{" "}
            </Button>
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
            onChange={(e) => setAddress(e.target.value)}
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
            <Typography variant="h5" component="h5">
              Enter billing details
            </Typography>
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
        <Grid item xs={12}>
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
          ></TextField>
        </Grid>

        <Grid item xs={12}>
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
          ></TextField>
        </Grid>

        <Grid item xs={6}>
          <UploadLogo />
        </Grid>
      </Grid>

      {props.state.app.companyDetailsToOrganizationMessage && (
        <div>
          <Typography variant="h5" component="h5" color="primary">
            {props.state.app.companyDetailsToOrganizationMessage}
          </Typography>{" "}
        </div>
      )}

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
