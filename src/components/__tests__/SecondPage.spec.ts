import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import SecondPage from "../SecondPage.vue";
import { Country } from "../../enums/country";
import { Package } from "../../enums/package";

const buttonSelector = "[data-testid=next]";
const backSelector = "[data-testid=back]";
const nameSelector = "[data-testid=name]";
const ageSelector = "[data-testid=age]";
const countrySelector = "[data-testid=country]";
const finalPriceSelector = "[data-testid=final-price]";

describe("SecondPage", () => {
  it("renders properly", () => {
    const wrapper = mount(SecondPage);
    expect(wrapper.text()).toContain("Tell us about yourself");
  });

  it("emits nextPage event when click on initial render", async () => {
    const wrapper = mount(SecondPage);
    await wrapper.find(buttonSelector).trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().nextPage).toBeFalsy();
  });

  it("emits back event is emitted", async () => {
    const wrapper = mount(SecondPage);
    await wrapper.find(backSelector).trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.emitted().back).toBeTruthy();
  });

  it("will show name error message submitting empty form", async () => {
    const wrapper = mount(SecondPage);
    await wrapper.find(buttonSelector).trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.find(nameSelector).text()).toContain(
      "Name must not be empty"
    );
  });

  it("will show age error message submitting empty form", async () => {
    const wrapper = mount(SecondPage);
    await wrapper.find(buttonSelector).trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.find(ageSelector).text()).toContain("Age must not be empty");
  });

  it("is able to calculate price based on country", async () => {
    const wrapper = mount(SecondPage);
    await wrapper.find(ageSelector).find("input").setValue(10);

    const country = wrapper.find(countrySelector).find("select");
    const finalPrice = wrapper.find(finalPriceSelector);

    await country.setValue(Country.HongKong);
    await wrapper.vm.$nextTick();
    expect(finalPrice.text()).toContain("100 HKD");

    await country.setValue(Country.USA);
    await wrapper.vm.$nextTick();
    expect(finalPrice.text()).toContain("200 USD");

    wrapper.find(countrySelector).find("select").setValue(Country.Australia);
    await wrapper.vm.$nextTick();
    expect(finalPrice.text()).toContain("300 AUD");
  });

  it("is able to calculate price based on standard package", async () => {
    const wrapper = mount(SecondPage);
    await wrapper.find(ageSelector).find("input").setValue(10);
    await wrapper
      .find(countrySelector)
      .find("select")
      .setValue(Country.HongKong);

    const standard = wrapper.find(`input[value=${Package.Standard}]`);

    await standard.setValue();

    await wrapper.vm.$nextTick();
    expect(wrapper.find(finalPriceSelector).text()).toContain("100 HKD");

    wrapper.find(countrySelector).find("select").setValue(Country.USA);
    await wrapper.vm.$nextTick();
    expect(wrapper.find(finalPriceSelector).text()).toContain("200 USD");

    wrapper.find(countrySelector).find("select").setValue(Country.Australia);
    await wrapper.vm.$nextTick();
    expect(wrapper.find(finalPriceSelector).text()).toContain("300 AUD");
  });

  it("is able to calculate price based on safe package", async () => {
    const wrapper = mount(SecondPage);
    await wrapper.find(ageSelector).find("input").setValue(10);
    await wrapper
      .find(countrySelector)
      .find("select")
      .setValue(Country.HongKong);

    const safe = wrapper.find(`input[value=${Package.Safe}]`);

    await safe.setValue();

    await wrapper.vm.$nextTick();
    expect(wrapper.find(finalPriceSelector).text()).toContain("150 HKD");

    wrapper.find(countrySelector).find("select").setValue(Country.USA);
    await wrapper.vm.$nextTick();
    expect(wrapper.find(finalPriceSelector).text()).toContain("300 USD");

    wrapper.find(countrySelector).find("select").setValue(Country.Australia);
    await wrapper.vm.$nextTick();
    expect(wrapper.find(finalPriceSelector).text()).toContain("450 AUD");
  });

  it("is able to calculate price based on super safe package", async () => {
    const wrapper = mount(SecondPage);
    await wrapper.find(ageSelector).find("input").setValue(10);
    await wrapper
      .find(countrySelector)
      .find("select")
      .setValue(Country.HongKong);

    const safe = wrapper.find(`input[value=${Package.SuperSafe}]`);

    await safe.setValue();

    await wrapper.vm.$nextTick();
    expect(wrapper.find(finalPriceSelector).text()).toContain("175 HKD");

    wrapper.find(countrySelector).find("select").setValue(Country.USA);
    await wrapper.vm.$nextTick();
    expect(wrapper.find(finalPriceSelector).text()).toContain("350 USD");

    wrapper.find(countrySelector).find("select").setValue(Country.Australia);
    await wrapper.vm.$nextTick();
    expect(wrapper.find(finalPriceSelector).text()).toContain("525 AUD");
  });
});
