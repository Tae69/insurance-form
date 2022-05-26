import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import ThirdPage from "../ThirdPage.vue";
import { Currency } from "@/enums/currency";

const buttonSelector = "[data-testid=next]";
const backSelector = "[data-testid=back]";

describe("ThirdPage", () => {
  const props = {
    form: {
      name: "hermanto",
      age: 25,
      country: "Australia",
      selectedPackage: "Super Safe",
      currency: Currency.AUD,
      premium: 525,
    },
  };

  it("renders properly", () => {
    const wrapper = mount(ThirdPage, { props });

    expect(wrapper.text()).toContain("Summary");
    expect(wrapper.text()).toContain("Name: hermanto");
    expect(wrapper.text()).toContain("Age: 25");
    expect(wrapper.text()).toContain("Where do you live: Australia");
    expect(wrapper.text()).toContain("Package: Super Safe");
    expect(wrapper.text()).toContain("Premium: 525AUD");
  });

  it("test nextPage event is emitted", async () => {
    const wrapper = mount(ThirdPage, { props });
    await wrapper.find(buttonSelector).trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().nextPage).toBeTruthy();
  });

  it("test back event is emitted", async () => {
    const wrapper = mount(ThirdPage, { props });
    await wrapper.find(backSelector).trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().back).toBeTruthy();
  });
});
