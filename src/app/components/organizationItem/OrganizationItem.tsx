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

  //   console.log("<--- all data --->", data);

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

  if (data.domain_url.includes("http://www.")) {
    data.domain_url = data.domain_url.replace("http://www.", "");
    console.log("data.domain_url", data.domain_url);
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
    <Card
      style={{ border: "1px solid black", cursor: "pointer", width: "auto" }}
      onClick={(e) => handleClick()}
    >
      <CardContent style={{ backgroundColor: "lightgray" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{}}>
            <Avatar
              // alt={data.slug}
              alt=""
              src="/static/images/avatar/1.jpg"
              style={{
                backgroundColor: "#ff8c00",
                fontSize: "60px",
                width: "80px",
                height: "80px",
              }}
            />
          </div>
          <div style={{}}>
            <Typography variant="h4" color="primary" component="h4">
              {data.slug}
            </Typography>
            <div>{data.domain_url}</div>
            <p>
              {" "}
              <b>{progress}</b>% completed.{" "}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrganizationItem;
