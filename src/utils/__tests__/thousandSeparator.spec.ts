import { describe, it, expect } from "vitest";

import thousandSeparator from "../thousandSeparator";

describe("ThousandSeparator", () => {
  it("must separate thousand with comma", () => {
    const number = 123123;
    expect(thousandSeparator(number)).toEqual("123,123");
  });
});
