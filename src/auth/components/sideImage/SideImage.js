import React from "react";
const mainImage = require("../../../shared/assets/images/main-image.jpg");

function SideImage() {
  return (
    <div className="fill">
      <img
        alt="logo"
        style={{ width: 100, height: "100vh" }}
        src={String(mainImage)}
      />
    </div>
  );
}

export default SideImage;
