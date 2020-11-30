import React, { useState } from "react";

import { Button, Input } from "@material-ui/core";

import {
  getAWSTokenForLogoUpload,
  uploadFileToAWS,
  updateServerWithLogoUploadData,
} from "../../core/services/logo-upload";

// { organisation_id, name, website }

function UploadLogo({ organisation_id, name, website }) {
  const jwtToken = localStorage.getItem("accessToken");

  const [logoUploadDone, setLogoUploadDone] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
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

  return (
    <div>
      <span>
        <label htmlFor="Upload Logo">
          <Input type="file" onChange={(e) => onFileChange(e)}></Input>
          <Button onClick={onFileUpload}>Upload! </Button>
        </label>
        {logoUploadDone && (
          <div
            style={{
              height: "100px",
              width: "100px",
              border: "1px solid black",
            }}
          >
            <img src={logoUrl} width="100px" height="100px" alt="logo"></img>
          </div>
        )}
      </span>
    </div>
  );
}

export default UploadLogo;
