import request from "supertest";
import { createApp } from "../../src/index.js";
import React from 'react'
const app = createApp();

describe("Registration Integration Tests", () => {

  test("should create account successfully", async () => {

    const res = await request(app)
      .post("/registration")
      .field("email", "test@gmail.com")
      .field("username", "testuser_" + Date.now()) //was failing on 2nd run due to duplicate so made unique
      .field("password", "123456789")
      .field("confirmPassword", "123456789")
      .attach("image", "tests/test-image.png");

    expect(res.statusCode).toBe(201);
  });

  test("should fail if email is invalid", async () => {

    const res = await request(app)
      .post("/registration")
      .field("email", "invalid-email")
      .field("username", "testuser123")
      .field("password", "123456789")
      .field("confirmPassword", "123456789")
      .attach("image", "tests/test-image.png");

    expect(res.statusCode).toBe(400);
  });

  test("should fail if passwords do not match", async () => {

    const res = await request(app)
      .post("/registration")
      .field("email", "test@gmail.com")
      .field("username", "testuser123")
      .field("password", "123456789")
      .field("confirmPassword", "wrongpass")
      .attach("image", "tests/test-image.png");

    expect(res.statusCode).toBe(400);
  });

  test("should fail if image is missing", async () => {

    const res = await request(app)
      .post("/registration")
      .field("email", "test@gmail.com")
      .field("username", "testuser123")
      .field("password", "123456789")
      .field("confirmPassword", "123456789");

    expect(res.statusCode).toBe(400);
  });

  test("should fail if username already exists", async () => {

    await request(app)
      .post("/registration")
      .field("email", "test1@gmail.com")
      .field("username", "duplicateUser")
      .field("password", "123456789")
      .field("confirmPassword", "123456789")
      .attach("image", "tests/test-image.png");

    const res = await request(app)
      .post("/registration")
      .field("email", "test2@gmail.com")
      .field("username", "duplicateUser")
      .field("password", "123456789")
      .field("confirmPassword", "123456789")
      .attach("image", "tests/test-image.png");

    expect(res.statusCode).toBe(400);
  });

});