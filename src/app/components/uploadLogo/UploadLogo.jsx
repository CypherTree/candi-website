import React, { useState } from "react";

import { Button, Input } from "@material-ui/core";

import Axios from "axios";

function UploadLogo() {
  //   const imageUpload = () => {};
  const jwtToken = localStorage.getItem("accessToken");

  const onFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const onFileUpload = () => {
    const formData = new FormData();

    const file = selectedFile.name !== "" ? selectedFile : "  ";
    const fileName = selectedFile.name !== "" ? selectedFile.name : "  ";

    formData.append("myFile", file, fileName);

    Axios.get(
      `${process.env.REACT_APP_SERVER_URL}/api/v1/upload-token/photo?file_extension=png`,
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    )
      .then((response) => console.log("response --> ", response.data))
      .catch((err) => console.log("errr -> ", err));

    Axios.post(`https://tobs-develop.s3.amazonaws.com/`, {
      key: "public/media/20201124111614267053.png",
      "x-amz-algorithm": "AWS4-HMAC-SHA256",
      "x-amz-credential":
        "AKIA3NMWLEEPVHGTIY6I/20201124/ap-south-1/s3/aws4_request",
      "x-amz-date": "20201124T111614Z",
      policy:
        "eyJleHBpcmF0aW9uIjogIjIwMjAtMTEtMjRUMTE6MjE6MTRaIiwgImNvbmRpdGlvbnMiOiBbeyJidWNrZXQiOiAidG9icy1kZXZlbG9wIn0sIHsia2V5IjogInB1YmxpYy9tZWRpYS8yMDIwMTEyNDExMTYxNDI2NzA1My5wbmcifSwgeyJ4LWFtei1hbGdvcml0aG0iOiAiQVdTNC1ITUFDLVNIQTI1NiJ9LCB7IngtYW16LWNyZWRlbnRpYWwiOiAiQUtJQTNOTVdMRUVQVkhHVElZNkkvMjAyMDExMjQvYXAtc291dGgtMS9zMy9hd3M0X3JlcXVlc3QifSwgeyJ4LWFtei1kYXRlIjogIjIwMjAxMTI0VDExMTYxNFoifV19",
      "x-amz-signature":
        "5af0517c68f33aec45d3aed02f891aaef87add851d6198ce48f9546c2a6ee32d",
      file: formData,
    })
      .then((response) => response.data)
      .catch((err) => console.log(err));

    // Axios.put(
    //   `http://id.thetobbers-develop.ml/api/v1/organization/${organization_id}/`,
    //   {
    //     organization: 14,
    //     name: "cocacola",
    //     logo_key: "public/media/20201124111614267053.png",
    //     website: "http://www.cocacola.com.theonboarders.com",
    //   },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${jwtToken}`,
    //     },
    //   }
    // )
    //   .then((response) => response.data)
    //   .catch((err) => console.log(err));
  };

  const [selectedFile, setSelectedFile] = useState("");

  const fileData = () => {
    if (selectedFile) {
      return <div>File selected</div>;
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  return (
    <div>
      <label htmlFor="Upload Logo">
        <Input type="file" onChange={(e) => onFileChange(e)}></Input>
        <Button onClick={onFileUpload}>Upload! </Button>
      </label>
      {fileData}
    </div>
  );
}

export default UploadLogo;
