import PageNotFound from "./PageNotFound";

import React from "react";
import { render } from "@testing-library/react";

describe("<PageNotFound />", () => {
  it("renders correctly", () => {
    const { getByText } = render(<PageNotFound />);
    expect(
      getByText("404: Page you requested was not found on this server.")
    ).toBeTruthy();
  });
});
