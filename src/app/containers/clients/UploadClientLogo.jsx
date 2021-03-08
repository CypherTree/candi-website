import React, { useState } from "react";

import { Input } from "@material-ui/core";
import { Button, Typography } from "antd";

import { PlusOutlined } from "@ant-design/icons";

import {
  getAWSTokenForLogoUpload,
  uploadFileToAWS,
  updateServerWithLogoUploadData,
  updateLogoForClientCompany,
} from "../../core/services/logo-upload";

import { toast } from "react-toastify";
import AddIcon from "@material-ui/icons/Add";

import { Fab } from "@material-ui/core";
import Layout from "antd/lib/layout/layout";

const { Text } = Typography;

const UploadClientLogo = ({ id, tenant, logo }) => {
  const jwtToken = localStorage.getItem("accessToken");

  const [logoUploadDone, setLogoUploadDone] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  const [imageSrc, setImageSrc] = useState("");

  const onFileChange = (e) => {
    setLogoUploadDone(false);

    const file = e.target.files[0];

    setSelectedFile(e.target.files[0]);

    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setImageSrc(reader.result);
    };
    console.log(url);

    // onFileUpload();
  };

  const onFileUpload = async () => {
    const formData = new FormData();

    const file = selectedFile.name !== "" ? selectedFile : "  ";
    const fileName = selectedFile.name !== "" ? selectedFile.name : "  ";

    const keys = await getAWSTokenForLogoUpload(jwtToken);

    const data = await keys.fields;

    const key = data.key;

    formData.append("key", data["key"]);
    formData.append("x-amz-algorithm", data["x-amz-algorithm"]);
    formData.append("x-amz-credential", data["x-amz-credential"]);
    formData.append("x-amz-date", data["x-amz-date"]);
    formData.append("policy", data["policy"]);
    formData.append("x-amz-signature", data["x-amz-signature"]);
    formData.append("file", file);

    const result = await uploadFileToAWS(keys.url, formData, key);

    // const organisation_id = 39;
    // const name = "name";
    // const website = "http://www.green.com.theonboarders.com";

    const data2 = await updateLogoForClientCompany(jwtToken, key, tenant, id);

    console.log("data 2 --> ", data2);

    setLogoUrl(data2.data.logo);
    setLogoUploadDone(true);
    toast.success("Logo was uploaded successfully.");
  };

  const [selectedFile, setSelectedFile] = useState("");

  const showImage = () => {
    return imageSrc !== "" || (logo && logo !== "");
  };

  return (
    <div style={{ paddingTop: "10px" }}>
      <span>
        <label htmlFor="upload-photo">
          <Input
            style={{ display: "none" }}
            id="upload-photo"
            name="upload-photo"
            type="file"
            onChange={(e) => onFileChange(e)}
          />
          <Layout
            style={{
              height: "100px",
              width: "100px",
              padding: "5px",
              border: "1px dotted #c1c1c1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              // padding: "2px",
              // border: "1px solid #c1c1c1",
              // width: "auto",
            }}
          >
            {showImage() ? (
              <img
                src={imageSrc ? imageSrc : logo}
                style={{
                  height: "90px",
                  width: "90px",
                  objectFit: "cover",
                }}
              />
            ) : (
              <>
                <PlusOutlined />
                <Text>Upload Logo</Text>
              </>
            )}
          </Layout>
          {imageSrc && (
            <Button
              onClick={onFileUpload}
              color="#c1c1c1"
              style={{
                backgroundColor: "lightgray",
              }}
            >
              Upload Logo
            </Button>
          )}
        </label>
        {showImage() && (
          <p style={{ paddingTop: "5px" }}>
            You may click on the logo to upload a new one.
          </p>
        )}
      </span>
    </div>
  );
};
export default UploadClientLogo;
