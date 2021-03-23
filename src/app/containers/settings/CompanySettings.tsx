import React, { useEffect, useState } from "react";

import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Layout,
  Row,
  Select,
} from "antd";

import Title from "antd/lib/typography/Title";

import axios from "axios";
import { toast } from "react-toastify";

import { getCurrentSessionTokens } from "../../../auth/core/services/session";
import AntSpinner from "../../components/spinner/AntSpinner";

import "react-toastify/dist/ReactToastify.css";
import { getOrgIdFromTenantName } from "../../core/services/tenantinfo";

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

const CompanySettings = () => {
  const [loading, setLoading] = useState(true);
  const [about, setAbout] = useState("");
  const [yearEstablished, setYearEstablished] = useState<any>();
  const [companySize, setCompanySize] = useState<any>();
  const [markets, setMarkets] = useState<any>();
  const [selectedMarkets, setSelectedMarkets] = useState<any>();

  const styles = { width: "400px" };

  const onFinish = async (values: any) => {
    const marketsData: { market: number }[] = [];
    await selectedMarkets.map((item: number) => {
      marketsData.push({ market: item });
    });

    await updateCompanyDetails(marketsData);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const handleCompanySizeChange = (value: any) => {
    setCompanySize(value);
  };

  const handleSelectedMarketsChange = (values: any) => {
    setSelectedMarkets(values);
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
      })
      .catch((err: any) => {
        console.log("errors could not be get");
        toast.error("Could not get markets dara.");
      });
  };

  const getCompanyDetails = async () => {
    const organizationId = await getOrgIdFromTenantName();

    await axios
      .get(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/organization/${organizationId}/`,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
      .then(async (response) => {
        console.log("Company details data", response.data);

        setLoading(false);

        if (response.data.data.about) {
          setAbout(response.data.data.about);
        }
        if (response.data.data.year_established) {
          setYearEstablished(
            parseInt(response.data.data.year_established.slice(0, 4))
          );
        }
        if (
          response.data.data.company_size ||
          response.data.data.company_size == 0
        ) {
          setCompanySize(response.data.data.company_size);
        }
        if (response.data.data.markets) {
          console.log("Inside wanted if ");
          const idOfMarkets: any[] = [];
          await response.data.data.markets.map((marketItem: any) => {
            idOfMarkets.push(marketItem.market);
          });
          await setSelectedMarkets(idOfMarkets);

          console.log("slected markets --> ", idOfMarkets);
        }
      })
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        console.log("err", e);
        toast.error("Unexpected Error occoured.");
      });
  };

  const updateCompanyDetails = async (marketData: any) => {
    setLoading(true);

    const organizationId = await getOrgIdFromTenantName();

    type DataToUpdate = {
      about?: string;
      company_size?: number;
      markets?: any;
      year_established?: any;
    };

    const dataToUpdate: DataToUpdate = {};

    if (about) {
      dataToUpdate.about = about;
    }
    if (companySize) {
      dataToUpdate.company_size = companySize;
    }
    if (marketData) {
      dataToUpdate.markets = marketData;
    }
    if (yearEstablished) {
      dataToUpdate.year_established = `${yearEstablished}-01-01`;
    }

    await axios
      .put(
        `${process.env.REACT_APP_SERVER_URL}/api/v1/organization/${organizationId}/`,
        dataToUpdate,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
      .then((response) => console.log("data", response.data))

      .then(() => {
        setLoading(false);
        toast.success("Data updated successfully.");
      })
      .catch((e) => {
        console.log("err", e);
        toast.error("Some error occoured.");
        setLoading(false);
      });
  };

  useEffect(() => {
    getMarketDataFromAPI();
    getCompanyDetails();
  }, []);

  if (loading) {
    return <AntSpinner />;
  } else {
    return (
      <Layout style={{ width: "90vw" }}>
        <Layout
          style={{
            backgroundColor: "#fff",
            margin: "30px",
            padding: "30px 30px 0px 30px",
            borderRadius: "10px",
            textAlign: "left",
            display: "flex",
            flexDirection: "row",
            // justifyContent: "center",
            width: "90vw",
            maxWidth: "1000px",
          }}
        >
          <div
            style={{
              // backgroundColor: "red",
              width: "800px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingLeft: "50px",
            }}
          >
            <Title
              level={4}
              style={{
                fontWeight: "bold",
                width: "auto",
                textAlign: "center",
              }}
            >
              ABOUT US
            </Title>

            <br />

            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="vertical"
            >
              <Row gutter={8}>
                <Col span={14}>
                  <Form.Item label={about ? "About:" : ""}>
                    <Input.TextArea
                      placeholder="About"
                      onChange={(e) => {
                        setAbout(e.target.value);
                      }}
                      maxLength={2000}
                      value={about}
                      style={styles}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item label={yearEstablished ? "Year Established:" : ""}>
                    <InputNumber
                      placeholder="Year Established"
                      value={yearEstablished ? yearEstablished : ""}
                      onChange={(value: any) => setYearEstablished(value)}
                      min={1000}
                      max={2021}
                      style={styles}
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    label={
                      companySize || companySize == 0 ? "Company Size:" : ""
                    }
                  >
                    <Select
                      style={styles}
                      placeholder="Company Size"
                      value={companySize}
                      onChange={handleCompanySizeChange}
                    >
                      <Option
                        value={COMPANY_SIZE_ENUM.BETWEEN_1_TO_10}
                        key={COMPANY_SIZE_ENUM.BETWEEN_1_TO_10}
                      >
                        BETWEEN 1 TO 10
                      </Option>
                      <Option
                        value={COMPANY_SIZE_ENUM.BETWEEN_11_TO_50}
                        key={COMPANY_SIZE_ENUM.BETWEEN_11_TO_50}
                      >
                        BETWEEN 11 TO 50
                      </Option>
                      <Option
                        value={COMPANY_SIZE_ENUM.BETWEEN_51_TO_200}
                        key={COMPANY_SIZE_ENUM.BETWEEN_51_TO_200}
                      >
                        BETWEEN 51 TO 200
                      </Option>
                      <Option
                        value={COMPANY_SIZE_ENUM.BETWEEN_201_TO_500}
                        key={COMPANY_SIZE_ENUM.BETWEEN_201_TO_500}
                      >
                        BETWEEN 201 TO 500
                      </Option>
                      <Option
                        value={COMPANY_SIZE_ENUM.BETWEEN_501_TO_1000}
                        key={COMPANY_SIZE_ENUM.BETWEEN_501_TO_1000}
                      >
                        BETWEEN 501 TO 1000
                      </Option>
                      <Option
                        value={COMPANY_SIZE_ENUM.BETWEEN_1001_TO_5000}
                        key={COMPANY_SIZE_ENUM.BETWEEN_1001_TO_5000}
                      >
                        BETWEEN 1001 TO 5000
                      </Option>
                      <Option
                        value={COMPANY_SIZE_ENUM.PLUS_5000}
                        key={COMPANY_SIZE_ENUM.PLUS_5000}
                      >
                        MORE THAN 5000
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={8}>
                <Col span={12}>
                  <Form.Item
                    style={styles}
                    label={
                      selectedMarkets && selectedMarkets.length > 0
                        ? "Markets:"
                        : ""
                    }
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      autoClearSearchValue
                      bordered
                      defaultActiveFirstOption={false}
                      filterOption={(input, option: any) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      style={{ width: "100%" }}
                      placeholder="Markets"
                      onChange={handleSelectedMarketsChange}
                      value={selectedMarkets}
                    >
                      {markets}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <div
                style={{
                  paddingBottom: "40px",
                }}
              >
                <Button type="primary" htmlType="submit">
                  Save Details
                </Button>
              </div>
            </Form>
          </div>
        </Layout>
      </Layout>
    );
  }
};

export default CompanySettings;
