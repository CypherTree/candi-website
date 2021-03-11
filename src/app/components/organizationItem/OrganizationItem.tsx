import React from "react";

import { Avatar, Button, Tag } from "antd";

import { useDispatch } from "react-redux";

import { PassDataToModal } from "../../core/redux/app/actions";

const OrganizationItem = (props: any) => {
  const dispatch = useDispatch();

  console.log(" data in organisation item -->", props);

  const { data, handleOpen, type } = props;

  // TODO
  const tenantURL = `http://${data.slug}.${process.env.REACT_APP_FRONTEND_BASE_DOMAIN}`;

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

  const days_between = (date1: any, date2: any) => {
    console.log("Date 1 : ", date1);
    console.log("Date 2 : ", date2);

    const date3: any = new Date(date2);

    // The number of milliseconds in one day
    const ONE_DAY = 1000 * 60 * 60 * 24;

    // Calculate the difference in milliseconds
    const differenceMs = Math.abs(date1 - date3);

    // Convert back to days and return
    const result = Math.round(differenceMs / ONE_DAY);

    console.log("total days ---> ", result);

    return result;
  };

  return (
    <div
      style={{
        border: "none",
        // cursor: "pointer",
        width: "auto",
        // margin: "none",
        margin: "20px",
        overflow: "auto",
        // backgroundColor: "orange",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          // padding: "none",
          // margin: "10px",
          borderRadius: "10px",
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            // backgroundColor: "blue",
          }}
        >
          <div
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              // backgroundColor: "yellowgreen",
            }}
          >
            {data.logo ? (
              <img
                src={data.logo}
                style={{
                  // backgroundColor: "#F9650D",
                  fontSize: "40px",
                  width: "90px",
                  height: "90px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  verticalAlign: "middle",
                  borderRadius: "50%",
                }}
                alt="logo"
              />
            ) : (
              <Avatar
                style={{
                  backgroundColor: "#F9650D",
                  fontSize: "40px",
                  width: "90px",
                  height: "90px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  verticalAlign: "middle",
                }}
              >
                {data.slug.charAt(0).toUpperCase() || "A"}
              </Avatar>
            )}
          </div>
          <div
            style={{
              paddingLeft: "10px ",
              textAlign: "left",
              lineHeight: "10px",
              // backgroundColor: "yellow",
            }}
          >
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                width: "450px",
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
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  // backgroundColor: "yellow",
                  alignSelf: "flex-end",
                }}
              >
                {" "}
                <Tag
                  color="#c1c1c1"
                  style={{ height: "20px", marginTop: "20px" }}
                >
                  {type == 1 ? "ADMIN" : "MEMBER"}
                </Tag>
                {data.plan_has_expired && (
                  <Tag
                    color="red"
                    style={{ height: "20px", marginTop: "20px" }}
                  >
                    EXPIRED
                  </Tag>
                )}
                {data.plan_has_expired !== null && !data.plan_has_expired && (
                  <Tag
                    color="red"
                    style={{ height: "20px", marginTop: "20px" }}
                  >
                    {/* Expiring on : {data.plan_expiry_date} */}
                    Expiring in{" "}
                    {days_between(new Date(), data.plan_expiry_date)}{" "}
                    {days_between(new Date(), data.plan_expiry_date) === 1
                      ? "day"
                      : "days"}
                  </Tag>
                )}
              </span>
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
