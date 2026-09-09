const crypto = require("crypto");
const { validateMaster, encryptParty, digest } = require("./build-invitations");
const party = {
  id: "example",
  name: "Example party",
  code: "01234567-89abcdef-01234567-89abcdef",
  guests: [{ id: "guest", name: "Private guest" }],
};
async function decrypt(envelope, code) {
  const key = await crypto.webcrypto.subtle.importKey(
    "raw",
    digest("key", code),
    "AES-GCM",
    false,
    ["decrypt"]
  );
  const result = await crypto.webcrypto.subtle.decrypt(
    { name: "AES-GCM", iv: Buffer.from(envelope.iv, "base64") },
    key,
    Buffer.from(envelope.data, "base64")
  );
  return JSON.parse(Buffer.from(result).toString());
}
test("invitation decrypts with its code using the browser-compatible crypto format", async () => {
  const encrypted = encryptParty(party);
  const opened = await decrypt(encrypted.envelope, party.code.toUpperCase());
  expect(opened.guests).toEqual(party.guests);
  expect(opened.code).toBeUndefined();
  expect(JSON.stringify(encrypted)).not.toContain("Private guest");
  expect(JSON.stringify(encrypted)).not.toContain(party.code);
});
test("another party code cannot decrypt an invitation", async () => {
  await expect(
    decrypt(encryptParty(party).envelope, "abcdef01-23456789-abcdef01-23456789")
  ).rejects.toThrow();
});
test("public lookup hash is not the encryption key", () => {
  expect(digest("lookup", party.code).equals(digest("key", party.code))).toBe(
    false
  );
});
test("master rejects duplicate parties, guest IDs, and codes", () => {
  expect(() => validateMaster({ parties: [party, party] })).toThrow();
  expect(() =>
    validateMaster({
      parties: [{ ...party, guests: [party.guests[0], party.guests[0]] }],
    })
  ).toThrow();
  expect(() =>
    validateMaster({ parties: [party, { ...party, id: "another" }] })
  ).toThrow();
});
