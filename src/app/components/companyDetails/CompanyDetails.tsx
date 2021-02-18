import React, { useState, useEffect } from "react";

import axios from "axios";

import Layout from "antd/lib/layout/layout";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  Checkbox,
  Spin,
  Typography,
} from "antd";
import Title from "antd/lib/typography/Title";

import UploadLogo from "../uploadLogo/UploadLogo";
import { useDispatch } from "react-redux";
import { connect } from "react-redux";

import {
  AddCompanyDetailsToOrganization,
  AddCompanyDetailsToCurrentOrganization,
} from "../../core/redux/app/actions";

const { Text } = Typography;

const CompanyDetails = (props: any) => {
  console.log("--- ALL PROPS -- ", props);

  const { handleBack, handleNext, loading, setLoading } = props;

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

      setLogo(props.state.app.currentOrganization.logo);

      if (props.state.app.currentOrganization.country !== "") {
        setGstNumber(
          props.state.app.currentOrganization.gst
            ? props.state.app.currentOrganization.gst
            : props.state.app.currentOrganization.gstNumber
        );
        setCountry(props.state.app.currentOrganization.country);
        setState(props.state.app.currentOrganization.state);
        setCity(props.state.app.currentOrganization.city);
        setPincode(props.state.app.currentOrganization.pincode);
        setAddress(props.state.app.currentOrganization.address);

        setBillingAddress(
          props.state.app.currentOrganization.billing_address !== ""
            ? props.state.app.currentOrganization.billing_address
            : props.state.app.currentOrganization.address
        );
        setEmail(props.state.app.currentOrganization.email);
      }
    }
  }, []);

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

  const [gstError, setGstError] = useState("");

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
    } else {
      setBillingAddress("");
    }
  };

  const fetchGSTDetails = () => {
    const accessToken = localStorage.getItem("accessToken");

    setGstError("");

    setLoading(true);

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

        console.log("data recieved", response.data);

        const { addr } = response.data.data.pradr;

        setState(addr.stcd);
        setPincode(addr.pncd);
        setCountry("India");
        setCity(addr.city === "" ? addr.dst : addr.city);
        setAddress(
          `${addr.flno} , \n ${addr.bnm} , \n ${addr.bno} , \n ${addr.loc} , \n ${addr.st}`
        );
        setIsGSTVerified(true);

        if (billingAddressSame) {
          setBillingAddress(
            `${addr.flno} , \n ${addr.bnm} , \n ${addr.bno} , \n ${addr.loc} , \n ${addr.st}`
          );
        }
      })
      .then(() => setLoading(false))
      .catch((err) => {
        console.log("--- erro", err.message);
        setLoading(false);
        setGstError("GST details could not be fetched. Please retry.");
      });
  };

  const handleFormSubmit = () => {
    const putData = {
      gst: gstNumber,
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
      id: organisation_id,
      email,
      address,
      country,
      state,
      city,
      pincode,
      billingAddress,
      gstNumber,
      logo,
    };

    // const organisation_id = 12;

    dispatch(
      AddCompanyDetailsToOrganization(putData, organisation_id, setLoading)
    );

    dispatch(AddCompanyDetailsToCurrentOrganization(dataForLocal));

    handleNext();
  };

  const styles = { width: "350px" };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    // handleNewSubmit();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

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
          backgroundColor: "#fff",
          padding: "30px 30px 0px 30px",
        }}
      >
        <div
          style={{ height: "400px", overflowY: "scroll", paddingLeft: "60px" }}
        >
          <Title
            level={4}
            style={{
              fontWeight: "bold",
              width: "auto",
            }}
          >
            Enter company details
          </Title>

          <br />

          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input your gstNumber!",
                    },
                  ]}
                >
                  <Input
                    placeholder="GST Number"
                    onChange={(e) => {
                      setGstNumber(e.target.value);
                      clearEverything();
                    }}
                    value={gstNumber}
                    style={{ width: "250px" }}
                  />
                  <Button
                    type="primary"
                    onClick={() => {
                      fetchGSTDetails();
                    }}
                  >
                    Verify GST
                  </Button>
                </Form.Item>
                {gstError && <Text type="danger">{gstError}</Text>}
              </Col>
              <Col span={12}>
                <Form.Item
                  rules={[
                    { required: true, message: "Please input your country!" },
                  ]}
                >
                  <Input
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    disabled={!isGSTVerified}
                    style={styles}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  rules={[
                    { required: true, message: "Please input your state!" },
                  ]}
                >
                  <Input
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    disabled={!isGSTVerified}
                    style={styles}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  rules={[
                    { required: true, message: "Please input your City!" },
                  ]}
                >
                  <Input
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={!isGSTVerified}
                    style={styles}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  rules={[
                    { required: true, message: "Please input your Pincode!" },
                  ]}
                >
                  <Input
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    disabled={!isGSTVerified}
                    style={styles}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  rules={[
                    { required: true, message: "Please input your Address!" },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    disabled={!isGSTVerified}
                    style={styles}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Title
              level={4}
              style={{
                fontWeight: "bold",
                width: "auto",
              }}
            >
              Enter billing details
            </Title>

            <Row gutter={8}>
              <Col span={12}>
                <Form.Item>
                  <Checkbox
                    name="checkedC"
                    checked={billingAddressSame}
                    onChange={() => {
                      setBillingAddressSame(!billingAddressSame);
                      handleCopyBusinessAddress();
                    }}
                  />{" "}
                  Same as company Address
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={8}>
              <Col span={12}>
                <Form.Item>
                  <Input
                    placeholder="Business Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isGSTVerified}
                    style={styles}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  rules={[
                    {
                      required: true,
                      message: "Please input your Billing Address!",
                    },
                  ]}
                >
                  <Input.TextArea
                    placeholder="Business Address"
                    disabled={billingAddressSame ? true : false}
                    value={billingAddressSame ? address : billingAddress}
                    onChange={(e) => setBillingAddress(e.target.value)}
                    style={styles}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Title
              level={4}
              style={{
                fontWeight: "bold",
                width: "auto",
              }}
            >
              Company logo
            </Title>

            <Row gutter={8}>
              <Col span={12}>
                <Form.Item>
                  <UploadLogo
                    organisation_id={organisation_id}
                    name={name}
                    website={website}
                    logo={logo}
                  />
                </Form.Item>
              </Col>
            </Row>

            {props.state.app.companyDetailsToOrganizationMessage && (
              <p>{props.state.app.companyDetailsToOrganizationMessage}</p>
            )}
          </Form>
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
          </Button>
          <Button type="primary" onClick={() => handleFormSubmit()}>
            Save and Next
          </Button>
        </div>
      </Layout>
    );
  }
};

const mapStateToProps = (state: any) => {
  return {
    state: state,
  };
};

export default connect(mapStateToProps)(CompanyDetails);
