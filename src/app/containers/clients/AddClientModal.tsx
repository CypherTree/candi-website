import {
  Button,
  Form,
  Input,
  InputNumber,
  Layout,
  Modal,
  Select,
  Spin,
} from "antd";
import Title from "antd/lib/typography/Title";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getCurrentSessionTokens } from "../../../auth/core/services/session";
import AntSpinner from "../../components/spinner/AntSpinner";
import { getTenantInfo } from "../../core/services/tenantinfo";

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

const AddClientModal = (props: any) => {
  const tenant = getTenantInfo();

  const { setShowModal, setShouldReload } = props;

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [about, setAbout] = useState("");
  const [city, setCity] = useState("");
  const [yearEstablished, setYearEstablished] = useState<number | undefined>();
  const [companySize, setCompanySize] = useState("");

  const [isCreated, setIsCreated] = useState(false);

  const clearAllFields = () => {
    setName("");
    setWebsite("");
    setAbout("");
    setCity("");
    setCompanySize("");
  };

  const onOk = () => {
    if (isCreated) {
      setShowModal(false);
      clearAllFields();
    } else {
      const sendObject = {
        name,
        website,
        about,
        city,
        company_size: companySize,
        year_established: `${yearEstablished}-01-01`,
      };

      addANewClient(sendObject);
    }
  };

  const onCancel = () => {
    setShowModal(false);
  };

  const handleCompanySizeChange = (value: any) => {
    setCompanySize(value);
  };

  const onFinish = () => {};

  const { accessToken } = getCurrentSessionTokens();

  const jwtToken = `Bearer ${accessToken}`;

  const addANewClient = (values: any) => {
    console.log("value ---->", values);
    setLoading(true);
    axios
      .post(
        `http://${tenant}.${process.env.REACT_APP_BASE_URL}/api/v1/clients/`,
        values,
        {
          headers: {
            Authorization: `${jwtToken}`,
          },
        }
      )
      .then((response: any) => {
        console.log("response from api --> ", response.data);
        setIsCreated(true);
        toast.success("Company was created successfully.");
        setShowModal(false);
      })
      .then(() => setLoading(false))
      .then(() => setShouldReload(true))
      .catch((err: any) => {
        console.log("Err", err);
        setLoading(false);
        toast.error("Some error occoured");
      });
  };

  if (loading) {
    return (
      <Layout
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
          height: "auto",
        }}
      >
        <Spin />
      </Layout>
    );
  }
  return (
    <Modal
      title="Add a new client"
      centered
      visible={true}
      onOk={() => onOk()}
      onCancel={() => onCancel()}
      width={500}
    >
      {isCreated ? (
        <Layout
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            height: "auto",
          }}
        >
          <Title level={5} type="success">
            Company was created successfully.
          </Title>
        </Layout>
      ) : (
        <Form name="add-a-new-client" onFinish={onFinish} layout="vertical">
          <Form.Item
            label={name === "" ? "" : "Name of the company: "}
            rules={[{ required: true }]}
          >
            <Input
              value={name}
              onChange={(e: any) => setName(e.target.value)}
              placeholder="Name of the company"
              maxLength={100}
            />
          </Form.Item>
          <Form.Item
            label={website === "" ? "" : "Website: "}
            rules={[{ required: true }]}
          >
            <Input
              value={website}
              onChange={(e: any) => setWebsite(e.target.value)}
              placeholder="Website of the company - eg. (http://www.website.com)"
            />
          </Form.Item>
          <Form.Item
            label={!yearEstablished ? "" : "Year Established: "}
            rules={[{ required: true }]}
          >
            <InputNumber
              value={yearEstablished}
              onChange={(e: any) => setYearEstablished(e)}
              placeholder="Year when company was established - (YYYY) - eg. (2001)"
              max={2021}
              min={1000}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label={city === "" ? "" : "City : "}
            rules={[{ required: true }]}
          >
            <Input
              value={city}
              onChange={(e: any) => setCity(e.target.value)}
              placeholder="City"
            />
          </Form.Item>
          <Form.Item
            label={about === "" ? "" : "About the company: "}
            rules={[{ required: true }]}
          >
            <Input.TextArea
              value={about}
              onChange={(e: any) => setAbout(e.target.value)}
              placeholder="A little about the company"
            />
          </Form.Item>

          <Form.Item
            label={companySize === "" ? "" : "Company Size: "}
            rules={[{ required: true }]}
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
        </Form>
      )}
    </Modal>
  );
};

export default AddClientModal;
