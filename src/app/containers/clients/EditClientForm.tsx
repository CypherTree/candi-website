import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import Title from "antd/lib/typography/Title";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";
import { getTenantInfo } from "../../core/services/tenantinfo";
import UploadClientLogo from "./UploadClientLogo";

const { Option } = Select;

export enum COMPANY_SIZE_ENUM {
  BETWEEN_1_TO_10 = 0,
  BETWEEN_11_TO_50 = 1,
  BETWEEN_51_TO_200 = 2,
  BETWEEN_201_TO_500 = 3,
  BETWEEN_501_TO_1000 = 4,
  BETWEEN_1001_TO_5000 = 5,
  PLUS_5000 = 6,
}

const EditClientForm = (props: any) => {
  // const tenant = "cyphertree";

  const tenant = getTenantInfo();

  const { clientData } = props;

  console.log("props -->", clientData);

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");
  const [city, setCity] = useState("");
  const [yearEstablished, setYearEstablished] = useState<number | undefined>();
  const [companySize, setCompanySize] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [gst, setGst] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [locality, setLocality] = useState("");
  const [pincode, setPincode] = useState("");
  const [markets, setMarkets] = useState<any>();
  const [logo, setLogo] = useState("");
  const [selectedMarkets, setSelectedMarkets] = useState<any>();
  const [isGSTVerified, setIsGSTVerified] = useState(false);

  const [isCreated, setIsCreated] = useState(false);

  const clearAllFields = () => {
    setName("");
    setWebsite("");
    setAbout("");
    setCity("");
    setCompanySize("");
  };

  const onOk = async () => {
    const marketsData: { market: number }[] = [];
    await selectedMarkets.map((item: number) => {
      marketsData.push({ market: item });
    });

    const private_data = {
      billing_address: billingAddress,
      billing_email: billingEmail,
      gst: isGSTVerified ? gst : "",
    };

    const putObject = {
      name,
      website,
      about,
      city,
      state,
      country,
      pincode,
      company_size: companySize,
      year_established: `${yearEstablished}-01-01`,
      markets: marketsData,
      private_data,
    };
    await updateClientDetails(putObject);
  };

  const updateClientDetails = (values: any) => {
    console.log("value ---->", values);
    setLoading(true);
    axios
      .put(
        `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/clients/${clientData.id}/`,
        values,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("response from api --> ", response.data);

        toast.success("Company was updated successfully.");
      })
      .then(() => setLoading(false))
      .catch((err: any) => {
        console.log("Err", err);
        setLoading(false);
        toast.error("Some error occoured");
      });
  };

  const onCancel = () => {
    // setShowModal(false);
  };

  const handleCompanySizeChange = (value: any) => {
    setCompanySize(value);
  };

  const onFinish = () => {};

  const handleSelectedMarketsChange = (values: any) => {
    if (selectedMarkets.length <= 5) {
      setSelectedMarkets(values);
    }
  };

  const { accessToken } = getCurrentSessionTokens();

  const jwtToken = `Bearer ${accessToken}`;

  const getMarketDataFromAPI = () => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/base/markets?size=3000`,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
      .then((res) => {
        const children = [];

        for (let i = 0; i < res.data.data.length; i++) {
          children.push(
            <Option key={res.data.data[i].id} value={res.data.data[i].id}>
              {res.data.data[i].name}
            </Option>
          );
        }

        setMarkets(children);
      });
  };

  const verifyGST = () => {
    fetchGSTDetails();
  };

  const fetchGSTDetails = () => {
    const accessToken = localStorage.getItem("accessToken");

    setLoading(true);

    axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/organization/verify-gst/?gst_number=${gst}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const { addr } = response.data.data.pradr;

        setBillingAddress(
          `${addr.flno} , \n ${addr.bnm} , \n ${addr.bno} , \n ${addr.loc} , \n ${addr.st}`
        );
        setIsGSTVerified(true);
        toast.success("GST details were fetched successfully.");
      })
      .then(() => setLoading(false))
      .catch((err) => {
        console.log("--- erro", err.message);
        setLoading(false);
        toast.error("GST details could not be fetched. Please retry.");
      });
  };

  useEffect(() => {
    getMarketDataFromAPI();
    if (clientData.name) {
      setName(clientData.name);
    }
    if (clientData.website) {
      setWebsite(clientData.website);
    }
    if (clientData.about) {
      setAbout(clientData.about);
    }
    if (clientData.year_established) {
      setYearEstablished(parseInt(clientData.year_established.slice(0, 4)));
    }
    if (clientData.city) {
      setCity(clientData.city);
    }
    if (clientData.state) {
      setState(clientData.state);
    }
    if (clientData.country) {
      setCountry(clientData.country);
    }
    if (clientData.pincode) {
      setPincode(clientData.pincode);
    }
    if (clientData.company_size) {
      setCompanySize(clientData.company_size);
    }

    if (clientData.logo) {
      setLogo(clientData.logo);
    }

    if (clientData.private_data) {
      if (clientData.private_data.hasOwnProperty("gst")) {
        setGst(clientData.private_data.gst);
        setIsGSTVerified(true);
      }
      if (clientData.private_data.hasOwnProperty("billing_address")) {
        setBillingAddress(clientData.private_data.billing_address);
      }
      if (clientData.private_data.hasOwnProperty("billing_email")) {
        setBillingEmail(clientData.private_data.billing_email);
      }
    }

    if (clientData.markets) {
      console.log("Inside wanted if ");
      const idOfMarkets: any[] = [];
      clientData.markets.map((marketItem: any) => {
        idOfMarkets.push(marketItem.market);
      });
      setSelectedMarkets(idOfMarkets);

      console.log("slected markets --> ", idOfMarkets);
    }
  }, []);

  const rowStyle = { width: 500 };

  const colStyle = { width: 250 };

  return (
    <>
      {clientData.invited_owner_name && (
        <>
          {" "}
          <Form
            name="add-a-new-client"
            // onFinish={onFinish}
            layout="horizontal"
            style={{ width: "500px" }}
          >
            <div style={{ width: "500px", textAlign: "center" }}>
              <Title level={5} style={{ paddingBottom: "5px" }}>
                <u>Owner details</u>
              </Title>
            </div>
            <Form.Item
              label="Name: "
              rules={[{ required: true }]}
              style={rowStyle}
              // disabled={true}
            >
              <Input value={clientData.invited_owner_name} disabled={true} />
            </Form.Item>

            <Form.Item
              label="Email: "
              rules={[{ required: true }]}
              style={rowStyle}
              // disabled={true}
            >
              <Input value={clientData.invited_owner_email} disabled={true} />
            </Form.Item>
          </Form>
          <Divider />
        </>
      )}
      <Form
        name="add-a-new-client"
        // onFinish={onFinish}
        layout="vertical"
        style={{ width: "500px" }}
      >
        <Form.Item
          label="Name of the company: "
          rules={[{ required: true }]}
          style={rowStyle}
        >
          <Input value={name} onChange={(e: any) => setName(e.target.value)} />
        </Form.Item>
        <Form.Item
          label="Website - eg. (http://www.website.com): "
          rules={[{ required: true }]}
          style={rowStyle}
        >
          <Input
            value={website}
            onChange={(e: any) => setWebsite(e.target.value)}
          />
        </Form.Item>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              label="Year Established: - (YYYY) "
              rules={[{ required: true }]}
              // style={colStyle}
            >
              <InputNumber
                value={yearEstablished}
                onChange={(value: any) => setYearEstablished(value)}
                min={1000}
                max={2021}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Company Size: "
              rules={[{ required: true }]}
              // style={colStyle}
            >
              <Select
                // style={styles}
                placeholder="Company Size"
                value={companySize ? companySize : "Company Size:"}
                onChange={handleCompanySizeChange}
              >
                <Option
                  value={COMPANY_SIZE_ENUM.BETWEEN_1_TO_10}
                  key={COMPANY_SIZE_ENUM.BETWEEN_1_TO_10}
                >
                  1 to 10
                </Option>
                <Option
                  value={COMPANY_SIZE_ENUM.BETWEEN_11_TO_50}
                  key={COMPANY_SIZE_ENUM.BETWEEN_11_TO_50}
                >
                  11 to 50
                </Option>
                <Option
                  value={COMPANY_SIZE_ENUM.BETWEEN_51_TO_200}
                  key={COMPANY_SIZE_ENUM.BETWEEN_51_TO_200}
                >
                  51 to 200
                </Option>
                <Option
                  value={COMPANY_SIZE_ENUM.BETWEEN_201_TO_500}
                  key={COMPANY_SIZE_ENUM.BETWEEN_201_TO_500}
                >
                  201 to 500
                </Option>
                <Option
                  value={COMPANY_SIZE_ENUM.BETWEEN_501_TO_1000}
                  key={COMPANY_SIZE_ENUM.BETWEEN_501_TO_1000}
                >
                  501 to 1000
                </Option>
                <Option
                  value={COMPANY_SIZE_ENUM.BETWEEN_1001_TO_5000}
                  key={COMPANY_SIZE_ENUM.BETWEEN_1001_TO_5000}
                >
                  1001 to 5000
                </Option>
                <Option
                  value={COMPANY_SIZE_ENUM.PLUS_5000}
                  key={COMPANY_SIZE_ENUM.PLUS_5000}
                >
                  5000+
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={10}>
          <Col span={12}>
            <Form.Item label="City : " rules={[{ required: true }]}>
              <Input
                value={city}
                onChange={(e: any) => setCity(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="State : " rules={[{ required: true }]}>
              <Input
                value={state}
                onChange={(e: any) => setState(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item label="Country : " rules={[{ required: true }]}>
              <Input
                value={country}
                onChange={(e: any) => setCountry(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            {" "}
            <Form.Item label="Pincode : " rules={[{ required: true }]}>
              <Input
                value={pincode}
                onChange={(e: any) => setPincode(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item label="About the company: " rules={[{ required: true }]}>
          <Input.TextArea
            value={about}
            onChange={(e: any) => setAbout(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Markets:"
          //   style={styles}
        >
          <Select
            mode="multiple"
            allowClear
            autoClearSearchValue
            bordered
            defaultActiveFirstOption={false}
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: "100%" }}
            placeholder="Markets"
            onChange={handleSelectedMarketsChange}
            value={selectedMarkets}
            maxTagCount={5}
          >
            {markets}
          </Select>
        </Form.Item>
        <Row gutter={10}>
          <Col span={12}>
            <Form.Item
              label={"GST : "}
              rules={[{ required: true }]}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Input
                value={gst}
                onChange={(e: any) => {
                  setIsGSTVerified(false);
                  setGst(e.target.value);
                }}
              />
              <Button type="primary" onClick={() => verifyGST()}>
                Verify{" "}
              </Button>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label={"Billing Email : "} rules={[{ required: true }]}>
              <Input
                value={billingEmail}
                onChange={(e: any) => setBillingEmail(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={24}>
            <Form.Item label="Billing Address : " rules={[{ required: true }]}>
              <Input.TextArea
                value={billingAddress}
                onChange={(e: any) => setBillingAddress(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>

        <UploadClientLogo id={clientData.id} tenant={tenant} logo={logo} />

        <Form.Item>
          <Button type="primary" onClick={() => onOk()}>
            Save Details
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default EditClientForm;
