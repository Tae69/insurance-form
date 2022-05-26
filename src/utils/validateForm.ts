import type { FormError } from "../types/form-error";
export default function validateForm(
  data: { name: string; age: string },
  ignoreEmpty = false
): FormError {
  const errors: FormError = {};

  if (!data.name.trim()) {
    if (!ignoreEmpty) {
      errors.name = "Name must not be empty";
    }
  } else if (/^[a-z]+$/i.test(data.name) === false) {
    errors.name = "Name must contains letters only";
  }

  if (!data.age.toString().trim()) {
    if (!ignoreEmpty) {
      errors.age = "Age must not be empty";
    }
  } else if (
    /^\d+$/.test(data.age) === false ||
    Number(data.age) < 1 ||
    Number(data.age) > 9999
  ) {
    errors.age =
      "Age not valid, must be >= 1 years old and within reasonable age";
  }

  return errors;
}
