import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { Document, Page } from "react-pdf";

function PrivacyPolicy() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  //   const pdfURL = "https://www.soundczech.cz/temp/lorem-ipsum.pdf";
  const pdfURL =
    "https://candi-website.s3.us-east-2.amazonaws.com/Lorem-Ipsum-Privacy-Policy.pdf";

  function onDocumentLoadSuccess(data: any) {
    setNumPages(data.numPages);
  }

  return (
    <div>
      {/* <Typography variant="h4" component="h4" color="primary">
        This is privacy policy
      </Typography> */}
      <div
        style={{
          display: "block",
        }}
      >
        {/* <Document
          file={{
            url: pdfURL,
            httpHeaders: {
              "Access-Control-Request-Method": "GET",
              "Access-Control-Allow-Origin": "*",
            },
            withCredentials: true,
          }}
          renderMode="canvas"
          onLoadSuccess={onDocumentLoadSuccess}
          options={{ workerSrc: "pdf.worker.js" }}
        >
          {" "}
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p> */}
        <div
          style={{
            width: "80%",
            alignContent: "center",
            textAlign: "center",
            height: "90vh",
            display: "block",
            backgroundColor: "red",
            margin: "0 auto",
          }}
        >
          <iframe
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              alignSelf: "center",
            }}
            src={pdfURL}
            title="Privacy Policy"
          />
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
