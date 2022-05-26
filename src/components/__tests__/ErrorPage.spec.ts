import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ErrorPage from "../ErrorPage.vue";

describe("ErrorPage", () => {
  it("renders properly", () => {
    const wrapper = mount(ErrorPage);
    expect(wrapper.text()).toContain("Your age is over our accepted limit");
    expect(wrapper.text()).toContain(
      "We are sorry but we can't insure you now"
    );
  });
});
