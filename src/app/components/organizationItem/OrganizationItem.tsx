import React from "react";

import { Avatar } from "antd";

import { useDispatch } from "react-redux";

import { PassDataToModal } from "../../core/redux/app/actions";

const OrganizationItem = (props: any) => {
  const dispatch = useDispatch();

  console.log(" data in organisation item -->", props);

  const { data, handleOpen } = props;

  let progress: number = 20;

  if (data.pincode !== "") {
    progress = progress + 40;
  }
  if (data.workflow_added !== 0) {
    progress = progress + 20;
  }
  if (data.roles_added !== 0) {
    progress = progress + 20;
  }

  if (data.website.includes("http://www.")) {
    data.website = data.website.replace("http://www.", "");
    console.log("data.website", data.website);
  }

  if (data.domain_url.includes("http://www.")) {
    data.domain_url = data.domain_url.replace("http://www.", "");
    console.log("data.domain_url", data.domain_url);
  }

  const handleClick = () => {
    dispatch(
      PassDataToModal(
        data.id,
        data.name,
        data.website,
        data.slug,
        data.domain_url,
        data.gst,
        data.country,
        data.state,
        data.city,
        data.pincode,
        data.address,
        data.email,
        data.billing_address,
        data.logo
      )
    );
    handleOpen();
  };

  return (
    <div
      style={{
        border: "none",
        cursor: "pointer",
        width: "auto",
        padding: "none",
        margin: "none",
      }}
      onClick={(e) => handleClick()}
    >
      <div
        style={{
          backgroundColor: "#f8f8f8",
          padding: "none",
          margin: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "flex-start",
          }}
        >
          <div
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
            }}
          >
            <Avatar
              style={{
                backgroundColor: "#F9650D",
                fontSize: "40px",
                width: "60px",
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                verticalAlign: "middle",
              }}
            >
              {data.slug.charAt(0).toUpperCase() || "A"}
            </Avatar>
          </div>
          <div
            style={{
              paddingLeft: "10px ",
              textAlign: "left",
              lineHeight: "10px",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                color: "#696969	",
                margin: "20px 0 15px 0px",
                padding: 0,
              }}
            >
              {data.name}
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#696969	",
              }}
            >
              {data.website}
            </p>
            <p>
              <b>{progress}</b>% completed.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationItem;
