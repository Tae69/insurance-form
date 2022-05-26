import { describe, it, expect } from "vitest";

import validateForm from "../validateForm";

describe("ValidateForm", () => {
  it("should warn empty name if name is empty", () => {
    let errors = validateForm({ name: "", age: "12" });
    expect(errors.name).toEqual("Name must not be empty");

    errors = validateForm({ name: " ", age: "12" });
    expect(errors.name).toEqual("Name must not be empty");
  });

  it("should not warn empty name if ignoreEmpty is true", () => {
    const errors = validateForm({ name: "", age: "12" }, true);
    expect(errors.name).not.toBeDefined();
  });

  it("should not warn empty name if name is filled", () => {
    let errors = validateForm({ name: "asdf", age: "12" });
    expect(errors.name).not.toBeDefined();

    errors = validateForm({ name: "asdf test", age: "12" });
    expect(errors.name).not.toBeDefined();
  });

  it("should warn if name is filled with number", () => {
    const errors = validateForm({ name: "asdf1", age: "12" });
    expect(errors.name).toContain("Name must contains letters only");
  });

  it("should warn empty age if age is empty", () => {
    const errors = validateForm({ name: "", age: "" });
    expect(errors.age).toEqual("Age must not be empty");
  });

  it("should not warn empty age if ignoreEmpty is true", () => {
    const errors = validateForm({ name: "", age: "" }, true);
    expect(errors.age).not.toBeDefined();
  });

  it("should not warn empty age if age is filled", () => {
    const errors = validateForm({ name: "", age: "12" });
    expect(errors.age).not.toBeDefined();
  });

  it("should warn if age is filled with letters ", () => {
    const errors = validateForm({ name: "", age: "asdf10" });
    expect(errors.age).toEqual(
      "Age not valid, must be >= 1 years old and within reasonable age"
    );
  });

  it("should warn if age is filled with value < 1 ", () => {
    let errors = validateForm({ name: "", age: "-10" });
    expect(errors.age).toEqual(
      "Age not valid, must be >= 1 years old and within reasonable age"
    );

    errors = validateForm({ name: "", age: "0" });
    expect(errors.age).toEqual(
      "Age not valid, must be >= 1 years old and within reasonable age"
    );
  });
});
