import React from "react";

import { Avatar, Button, Tag } from "antd";

import { useDispatch } from "react-redux";

import { PassDataToModal } from "../../core/redux/app/actions";

const OrganizationItem = (props: any) => {
  const dispatch = useDispatch();

  console.log(" data in organisation item -->", props);

  const tenantURL = `http://cyphertree.${process.env.REACT_APP_FRONTEND_BASE_DOMAIN}`;

  const { data, handleOpen, type } = props;

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
        // cursor: "pointer",
        width: "auto",
        padding: "none",
        margin: "none",
      }}
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
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "400px",
                // backgroundColor: "red",
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
              <Tag
                color="#2db7f5"
                style={{ height: "20px", marginTop: "20px" }}
              >
                {type == 1 ? "ADMIN" : "MEMBER"}
              </Tag>
            </span>
            <p
              style={{
                fontSize: "14px",
                color: "#696969	",
              }}
            >
              {data.website}
            </p>

            {progress === 100 ? (
              <a href={tenantURL}>
                <Button style={{ marginBottom: "10px" }}>Visit Tenant</Button>
              </a>
            ) : (
              <span>
                <p>
                  <b>{progress}</b>% completed.
                </p>
                <Button
                  onClick={(e) => handleClick()}
                  style={{ marginBottom: "10px" }}
                >
                  Complete Process
                </Button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationItem;
