import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@material-ui/core";

import React from "react";

// address: ""
// billing_address: ""
// billing_email: ""
// city: ""
// country: ""
// domain_url: "alibaba.theonboarders.com"
// email: ""
// gst: ""
// id: 8
// locality: ""
// logo: null
// logo_process_status: 0
// name: "Ali Baba"
// owner: 12
// pincode: ""
// roles_added: 0
// schema_name: "alibaba_1605603236"
// slug: "alibaba"
// state: ""
// website: "http://www.alibaba.com"
// workflow_added: 0

const styles = (theme: any) => ({
  title: {
    color: "red",
  },
});

const OrganizationItem = (props: any) => {
  const { data } = props;

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

  //   address: ""
  // billing_address: ""
  // billing_email: ""
  // city: ""
  // country: ""
  // domain_url: "alibaba.theonboarders.com"
  // email: ""
  // gst: ""
  // id: 8
  // locality: ""
  // logo: null
  // logo_process_status: 0
  // name: "Ali Baba"
  // owner: 12
  // pincode: ""
  // roles_added: 0
  // schema_name: "alibaba_1605603236"
  // slug: "alibaba"
  // state: ""
  // website: "http://www.alibaba.com"
  // workflow_added: 0

  const handleClick = () => {
    alert("<---- Organization  ---->");
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
          // border: "1px solid black",
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
            // border: "1px solid black",
          }}
        >
          <div
            style={{
              paddingLeft: "20px",
              paddingRight: "20px",
              // border: "1px solid black",
            }}
          >
            <Avatar
              alt={data.slug.toUpperCase()}
              // alt=""
              src="dsakld/"
              style={{
                // backgroundColor: "#dd6c26",
                backgroundColor: "#F9650D",
                fontSize: "40px",
                width: "60px",
                height: "60px",
              }}
            />
          </div>
          <div
            style={{
              // border: "1px solid black",
              paddingLeft: "10px ",
              textAlign: "left",
              lineHeight: "10px",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                // fontWeight: "bold",
                fontFamily: "Helvetica",
                color: "#696969	",
                // border: "1px solid black",
                margin: "20px 0 5px 0",
                padding: 0,
              }}
            >
              {" "}
              {data.name}
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#696969	",
                // border: "1px solid black",
              }}
            >
              {data.website}
              {/* alibaba.com */}
            </p>
            <p>
              {" "}
              <b>{progress}</b>% completed.{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrganizationItem;
