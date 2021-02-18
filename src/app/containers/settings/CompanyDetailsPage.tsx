import React, { useState, useEffect } from "react";

import { Button, Col, Form, Input, Layout, Row, Checkbox, Spin } from "antd";
import Title from "antd/lib/typography/Title";
import axios from "axios";

import UploadLogo from "../../components/uploadLogo/UploadLogo";

import {
  getOrgIdFromTenantName,
  getTenantInfo,
} from "../../core/services/tenantinfo";
import AntSpinner from "../../components/spinner/AntSpinner";

import { toast } from "react-toastify";

const CompanyDetailsPage = () => {
  const [loading, setLoading] = useState(true);

  const [gstNumber, setGstNumber] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [address, setAddress] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [email, setEmail] = useState("");
  const [logo, setLogo] = useState("");

  const [isGSTVerified, setIsGSTVerified] = useState(false);
  const [billingAddressSame, setBillingAddressSame] = useState(true);

  const organizationId = 55;

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

  const styles = { width: "350px" };

  const handleCopyBusinessAddress = () => {
    if (billingAddressSame) {
      setBillingAddress(address);
    } else {
      setBillingAddress("");
    }
  };

  const fetchCompanyDetails = () => {
    const accessToken = localStorage.getItem("accessToken");
    setLoading(true);
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/organization/${organizationId}/`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("data recieved ------>", response.data);

        const companyData = response.data.data;

        setGstNumber(companyData.gst);
        setCountry(companyData.country);
        setState(companyData.state);
        setCity(companyData.city);
        setPincode(companyData.pincode);
        setAddress(companyData.address);

        setBillingAddress(
          companyData.billing_address !== ""
            ? companyData.billing_address
            : companyData.address
        );
        setEmail(companyData.email);
        setLogo(companyData.logo);
      })
      .then(() => setLoading(false))
      .catch((err) => {
        console.log("--- erro", err.message);
        toast.error("Unexpected Error occoured.");
      });
  };

  const fetchGSTDetails = () => {
    const accessToken = localStorage.getItem("accessToken");
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
        toast.error("Unexpected Error occoured.");
      });
  };

  const onFinish = (values: any) => {
    console.log("Success:", values);
    // handleNewSubmit();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    const ten = getTenantInfo();
    fetchCompanyDetails();
    console.log("tenant -->", ten);
  }, []);

  if (loading) {
    return <AntSpinner />;
  } else {
    return (
      <Layout
        style={{
          backgroundColor: "#fff",
          margin: "30px",
          padding: "30px 30px 0px 30px",
          borderRadius: "10px",
          textAlign: "left",
          paddingLeft: "200px",
        }}
      >
        <div>
          <Title
            level={4}
            style={{
              fontWeight: "bold",
              width: "auto",
            }}
          >
            Company details
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
              Billing details
            </Title>

            <Row gutter={8}>
              <Col span={9}>
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

            <Row gutter={8} style={{}}>
              <Col style={{}}>
                <Form.Item>
                  <UploadLogo
                    organisation_id={2}
                    name="Hellow"
                    website="hellow.com"
                    logo="logo"
                  />
                </Form.Item>
              </Col>
            </Row>

            <div
              style={{
                paddingBottom: "20px",
              }}
            >
              <Button
                type="primary"
                // onClick={() =>
                //   // handleFormSubmit(

                //   )}
              >
                Save Details
              </Button>
            </div>
          </Form>
        </div>
      </Layout>
    );
  }
};

export default CompanyDetailsPage;
