import { test } from "node:test";
import assert from "node:assert/strict";
import { validateCredentials, makeSession } from "../src/components/auth/auth-utils.js";

test("valid login passes with no error", () => {
  assert.equal(validateCredentials("login", { email: "a@b.com", password: "secret1" }), null);
});

test("login rejects a malformed email", () => {
  assert.equal(
    validateCredentials("login", { email: "not-an-email", password: "secret1" }),
    "Please enter a valid email address.",
  );
});

test("login rejects a short password", () => {
  assert.equal(
    validateCredentials("login", { email: "a@b.com", password: "123" }),
    "Password must be at least 6 characters.",
  );
});

test("signup requires a name", () => {
  assert.equal(
    validateCredentials("signup", { email: "a@b.com", password: "secret1", confirm: "secret1" }),
    "Please enter your name.",
  );
});

test("signup rejects mismatched passwords", () => {
  assert.equal(
    validateCredentials("signup", { name: "Ada", email: "a@b.com", password: "secret1", confirm: "secret2" }),
    "Passwords do not match.",
  );
});

test("makeSession derives a name from the email on login", () => {
  assert.deepEqual(makeSession("login", { email: "ada@b.com", password: "secret1" }), {
    name: "ada",
    email: "ada@b.com",
  });
});

//comment change