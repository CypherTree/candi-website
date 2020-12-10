import React, { useState } from "react";

import { Button, Input } from "@material-ui/core";

import {
  getAWSTokenForLogoUpload,
  uploadFileToAWS,
  updateServerWithLogoUploadData,
} from "../../core/services/logo-upload";

import AddIcon from "@material-ui/icons/Add";

import { Fab } from "@material-ui/core";

function UploadLogo({ organisation_id, name, website }) {
  const jwtToken = localStorage.getItem("accessToken");

  const [logoUploadDone, setLogoUploadDone] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");

  const [imageSrc, setImageSrc] = useState("");

  const onFileChange = (e) => {
    const file = e.target.files[0];

    setSelectedFile(e.target.files[0]);

    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setImageSrc(reader.result);
    };
    console.log(url);
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

          <Fab
            color="secondary"
            size="small"
            component="span"
            aria-label="add"
            variant="extended"
          >
            <AddIcon /> Select Logo
          </Fab>
          <br />
          <br />
        </label>

        {imageSrc !== "" && (
          <>
            {" "}
            <img
              src={imageSrc}
              style={{ height: "200px", width: "200px", borderRadius: "50%" }}
            />
            <span style={{ paddingLeft: "20px" }}>
              <Button
                onClick={onFileUpload}
                color="#c1c1c1"
                style={{
                  backgroundColor: "lightgray",
                }}
              >
                Upload Logo
              </Button>
            </span>
          </>
        )}

        {logoUploadDone && (
          <div>
            <p> Logo was uploaded Successfully.</p>
          </div>
        )}
      </span>
    </div>
  );
}

export default UploadLogo;
