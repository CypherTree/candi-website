import React, { useState, useEffect } from "react";

import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import {
  getAWSTokenForLogoUpload,
  uploadFileToAWS,
  updateServerWithLogoUploadData,
} from "../../core/services/logo-upload";

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

const UploadLogo = ({ organisation_id, name, website, logo }) => {
  const [logoUrl, setLogoUrl] = useState("");

  const [imageSrc, setImageSrc] = useState("");

  const jwtToken = localStorage.getItem("accessToken");

  const [loading, setLoading] = useState(false);

  const [logoUploadDone, setLogoUploadDone] = useState(false);

  console.log("<---- data *** logo  ----->", logo);

  console.log("<---- data *** logo URL ----->", logoUrl);

  useEffect(() => {
    setLogoUrl(logo);
  }, []);

  const onFileUpload = async () => {
    const formData = new FormData();

    const file = selectedFile.name !== "" ? selectedFile : "  ";

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

  const handleChange = (info) => {
    console.log("info here ----", info);
    onFileUpload(info.file);
    setLogoUrl(info.file.name);
  };

  const showLogoChangeMessage = () => {
    if (logo || logoUrl) {
      if (logo !== "" || logoUrl !== "") {
        return true;
      }
    } else {
      return false;
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const serverRequest = (file) => {
    console.log("File YES -> ", file);
  };

  return (
    <div
      style={{
        paddingTop: "10px",
        textAlign: "left",
      }}
    >
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        beforeUpload={beforeUpload}
        progress="line"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        style={{ height: "50px", width: "50px" }}
        customRequest={(f) => serverRequest(f)}
      >
        {showLogoChangeMessage() ? (
          <img
            src={logo ? logo : logoUrl}
            alt="logo"
            style={{ width: "100%", height: "100%", padding: "2%" }}
          />
        ) : (
          uploadButton
        )}
      </Upload>

      {showLogoChangeMessage() && (
        <p>You may click on image to a upload new logo.</p>
      )}

      {logoUploadDone && (
        <div>
          <p> Logo was uploaded Successfully.</p>
        </div>
      )}
    </div>
  );
};

export default UploadLogo;
