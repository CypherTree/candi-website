import React, { useState } from "react";

import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import {
  getAWSTokenForLogoUpload,
  uploadFileToAWS,
  updateServerWithLogoUploadData,
} from "../../core/services/logo-upload";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

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

const UploadLogo = ({ organisation_id, name, website }) => {
  const jwtToken = localStorage.getItem("accessToken");

  const [loading, setLoading] = useState(false);

  const [imageUrl, setImageUrl] = useState("");

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

  const handleChange = (info) => {
    onFileUpload(info.file);
    // console.log("info -->", info);

    // if (info.file.status === "uploading") {
    //   setLoading(true);
    //   return;
    // }
    // if (info.file.status === "done") {
    //   // Get this url from response in real world.
    //   getBase64(info.file.originFileObj, (imageUrl) => {
    //     setLoading(false);
    //     setImageSrc(imageUrl);
    //   });
    // }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

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
        // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        // action=""
        beforeUpload={beforeUpload}
        // onChange={(e) => {
        //   // handleChange();
        //   onFileChange(e);
        // }}
        progress="line"
        accept="image/png, image/jpeg"
        onChange={handleChange}
        disabled={true}
        style={{ height: "60px", width: "60px" }}
      >
        {imageUrl ? (
          <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
        ) : (
          uploadButton
        )}
      </Upload>

      {logoUploadDone && (
        <div>
          <p> Logo was uploaded Successfully.</p>
        </div>
      )}
    </div>
  );
};

export default UploadLogo;

// <span>
// <label htmlFor="upload-photo">
//   <Input
//     style={{ display: "none" }}
//     id="upload-photo"
//     name="upload-photo"
//     type="file"
//     onChange={(e) => onFileChange(e)}
//   />

//   <Fab
//     color="secondary"
//     size="small"
//     component="span"
//     aria-label="add"
//     variant="extended"
//   >
//     <AddIcon /> Select Logo
//   </Fab>
//   <br />
//   <br />
// </label>

// {imageSrc !== "" && (
//   <div
//     style={{
//       display: "flex",
//       justifyContent: "flex-start",
//     }}
//   >
//     <img
//       src={imageSrc}
//       style={{ height: "100px", width: "100px", borderRadius: "50%" }}
//     />
//     <span style={{ paddingLeft: "20px" }}>
//       <Button
//         onClick={onFileUpload}
//         color="#c1c1c1"
//         style={{
//           backgroundColor: "lightgray",
//         }}
//       >
//         Upload Logo
//       </Button>
//     </span>
//   </div>
// )}

// {logoUploadDone && (
//   <div>
//     <p> Logo was uploaded Successfully.</p>
//   </div>
// )}
// </span>
