import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import FirstPage from "../FirstPage.vue";

const buttonSelector = "[data-testid=next]";

describe("FirstPage", () => {
  it("renders properly", () => {
    const wrapper = mount(FirstPage);
    expect(wrapper.text()).toContain("Start");
  });

  it("test nextPage event is emitted", async () => {
    const wrapper = mount(FirstPage);
    await wrapper.find(buttonSelector).trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().nextPage).toBeTruthy();
  });
});
