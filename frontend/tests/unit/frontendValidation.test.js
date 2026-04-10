import {
  validateEmail,
  validateUsername,
  validatePassword,
  validateConfirmPassword
} from "../../src/util/frontendValidation.js";


describe("validateEmail", () => {

  test("returns error if email is empty", () => {
    const result = validateEmail("");
    expect(result).toBe("Enter an email");
  });

  test("returns error if email is invalid", () => {
    const result = validateEmail("invalidemail");
    expect(result).toBe("Enter a valid email");
  });

  test("returns empty string if email is valid", () => {
    const result = validateEmail("test@gmail.com");
    expect(result).toBe("");
  });

});

describe("validateUsername", () => {

  test("returns error if username is empty", () => {
    const result = validateUsername("");
    expect(result).toBe("Enter a username");
  });

  test("returns empty string if username is provided", () => {
    const result = validateUsername("joe");
    expect(result).toBe("");
  });

});

describe("validatePassword", () => {

  test("returns empty string if password is empty", () => {
    const result = validatePassword("");
    expect(result).toBe("");
  });

  test("returns error if password is too short", () => {
    const result = validatePassword("abc123");
    expect(result).toBe("Password must be 9–17 characters long");
  });

  test("returns empty string if password is valid", () => {
    const result = validatePassword("abc1234567");
    expect(result).toBe("");
  });

});

describe("validateConfirmPassword", () => {

  test("returns error if password exists but confirm password is empty", () => {
    const result = validateConfirmPassword("abc1234567", "");
    expect(result).toBe("Confirm your password");
  });

  test("returns error if passwords do not match", () => {
    const result = validateConfirmPassword("abc1234567", "different123");
    expect(result).toBe("Passwords do not match");
  });

  test("returns empty string if passwords match", () => {
    const result = validateConfirmPassword("abc1234567", "abc1234567");
    expect(result).toBe("");
  });

});