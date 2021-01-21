import React, { useState } from "react";

import { Input } from "@material-ui/core";
import { Typography } from "antd";

import { PlusOutlined } from "@ant-design/icons";

import {
  getAWSTokenForLogoUpload,
  uploadFileToAWS,
  updateServerWithLogoUploadData,
} from "../../core/services/logo-upload";

import Layout from "antd/lib/layout/layout";

const { Text } = Typography;

const UploadLogo = ({ organisation_id, name, website, logo }) => {
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

    onFileUpload();
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

    const data2 = await updateServerWithLogoUploadData(
      jwtToken,
      key,
      organisation_id,
      name,
      website
    );

    console.log("data 2 --> ", data2);

    setLogoUrl(data2.data.logo);
    setLogoUploadDone(true);
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
          {logoUploadDone && (
            <div>
              <p> Logo was uploaded Successfully.</p>
            </div>
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
export default UploadLogo;
