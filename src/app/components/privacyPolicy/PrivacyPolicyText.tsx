import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Axios from "axios";

const source =
  "https://candi-website.s3.us-east-2.amazonaws.com/markdownText.txt";

function PrivacyPolicyText() {
  const [text, setText] = useState("");

  useEffect(() => {
    Axios.get(source).then((result) => {
      setText(result.data);
    });
  }, []);
  return (
    <div style={{ padding: "5px", textAlign: "left" }}>
      <ReactMarkdown source={text}></ReactMarkdown>
    </div>
  );
}

export default PrivacyPolicyText;
