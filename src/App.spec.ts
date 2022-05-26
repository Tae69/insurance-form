import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import FirstPage from "./components/FirstPage.vue";
import SecondPage from "./components/SecondPage.vue";
import ThirdPage from "./components/ThirdPage.vue";
import ErrorPage from "./components/ErrorPage.vue";
import App from "./App.vue";

describe("App", () => {
  it("renders first page at initial load", () => {
    const wrapper = mount(App);
    expect(wrapper.findComponent(FirstPage).isVisible()).toBeTruthy();
  });

  it("renders second page when click next on first page", async () => {
    const wrapper = mount(App);

    await wrapper.find("button[data-testid=next]").trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(SecondPage).isVisible()).toBeTruthy();
  });

  it("renders first page when click back on second page", async () => {
    const wrapper = mount(App);

    await wrapper.find("button[data-testid=next]").trigger("click");

    await wrapper.vm.$nextTick();

    const secondPage = wrapper.findComponent(SecondPage);

    expect(secondPage.isVisible()).toBeTruthy();

    secondPage.find("[data-testid=name]").find("input").setValue("hermanto");
    secondPage.find("[data-testid=age]").find("input").setValue("10");

    await wrapper.find("button[data-testid=back]").trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(FirstPage).isVisible()).toBeTruthy();
  });

  it("renders third page when click next on second page", async () => {
    const wrapper = mount(App);

    await wrapper.find("button[data-testid=next]").trigger("click");

    await wrapper.vm.$nextTick();

    const secondPage = wrapper.findComponent(SecondPage);

    expect(secondPage.isVisible()).toBeTruthy();

    secondPage.find("[data-testid=name]").find("input").setValue("hermanto");
    secondPage.find("[data-testid=age]").find("input").setValue("10");

    await wrapper.find("button[data-testid=next]").trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(ThirdPage).isVisible()).toBeTruthy();
  });

  it("renders error page when age is over 100", async () => {
    const wrapper = mount(App);

    await wrapper.find("button[data-testid=next]").trigger("click");

    await wrapper.vm.$nextTick();

    const secondPage = wrapper.findComponent(SecondPage);

    expect(secondPage.isVisible()).toBeTruthy();

    secondPage.find("[data-testid=name]").find("input").setValue("hermanto");
    secondPage.find("[data-testid=age]").find("input").setValue("101");

    await wrapper.find("button[data-testid=next]").trigger("click");

    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(ErrorPage).isVisible()).toBeTruthy();
  });

  it("persists state when go back from third page", async () => {
    const wrapper = mount(App);

    await wrapper.find("button[data-testid=next]").trigger("click");

    await wrapper.vm.$nextTick();

    const secondPage = wrapper.findComponent(SecondPage);

    expect(secondPage.isVisible()).toBeTruthy();

    secondPage.find("[data-testid=name]").find("input").setValue("hermanto");
    secondPage.find("[data-testid=age]").find("input").setValue("25");

    await wrapper.find("button[data-testid=next]").trigger("click");
    await wrapper.vm.$nextTick();

    const thirdPage = wrapper.findComponent(ThirdPage);
    expect(thirdPage.isVisible()).toBeTruthy();

    await thirdPage.find("[data-testid=back]").trigger("click");
    await wrapper.vm.$nextTick();

    expect(secondPage.isVisible()).toBeTruthy();

    const name = secondPage.find("[data-testid=name]").find("input")
      .element.value;
    expect(name).toEqual("hermanto");

    const age = secondPage.find("[data-testid=age]").find("input")
      .element.value;
    expect(age).toEqual("25");
  });

  it("go back to first page when click buy", async () => {
    const wrapper = mount(App);

    await wrapper.find("button[data-testid=next]").trigger("click");

    await wrapper.vm.$nextTick();

    const secondPage = wrapper.findComponent(SecondPage);

    expect(secondPage.isVisible()).toBeTruthy();

    secondPage.find("[data-testid=name]").find("input").setValue("hermanto");
    secondPage.find("[data-testid=age]").find("input").setValue("10");

    await wrapper.find("button[data-testid=next]").trigger("click");
    await wrapper.vm.$nextTick();

    const thirdPage = wrapper.findComponent(ThirdPage);
    expect(thirdPage.isVisible()).toBeTruthy();

    await thirdPage.find("button[data-testid=next]").trigger("click");
    await wrapper.vm.$nextTick();

    expect(wrapper.findComponent(FirstPage).isVisible()).toBeTruthy();
  });
});
