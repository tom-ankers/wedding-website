const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const root = path.resolve(__dirname, "..");
const masterPath = path.join(root, "private/guest-list.json");
const outputPath = path.join(root, "static/invitations");
const normalize = (code) => code.replace(/[-\s]/g, "").toLowerCase();
const digest = (purpose, code) =>
  crypto
    .createHash("sha256")
    .update(`${purpose}:${normalize(code)}`)
    .digest();

function validateMaster(master) {
  if (!Array.isArray(master.parties))
    throw new Error("Master list must contain a parties array.");
  const ids = new Set();
  const codes = new Set();
  for (const party of master.parties) {
    if (!/^[a-z0-9-]+$/.test(party.id || "") || ids.has(party.id))
      throw new Error("Party IDs must be unique lowercase identifiers.");
    ids.add(party.id);
    if (
      typeof party.name !== "string" ||
      !party.name.trim() ||
      !Array.isArray(party.guests) ||
      !party.guests.length
    )
      throw new Error(`Party ${party.id} needs a name and invited guests.`);
    const guestIds = new Set();
    for (const guest of party.guests) {
      if (
        !/^[a-z0-9-]+$/.test(guest.id || "") ||
        guestIds.has(guest.id) ||
        typeof guest.name !== "string" ||
        !guest.name.trim()
      )
        throw new Error(`Invalid or duplicate guest in ${party.id}.`);
      guestIds.add(guest.id);
    }
    if (party.code) {
      const code = normalize(party.code);
      if (!/^[a-f0-9]{32}$/.test(code) || codes.has(code))
        throw new Error(
          "Invitation codes must be unique generated 32-character hexadecimal values."
        );
      codes.add(code);
    }
  }
}
function encryptParty(party) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv(
    "aes-256-gcm",
    digest("key", party.code),
    iv
  );
  const body = JSON.stringify({
    id: party.id,
    name: party.name,
    guests: party.guests.map(({ id, name }) => ({ id, name })),
  });
  const encrypted = Buffer.concat([
    cipher.update(body, "utf8"),
    cipher.final(),
    cipher.getAuthTag(),
  ]);
  return {
    filename: `${digest("lookup", party.code).toString("hex")}.json`,
    envelope: {
      version: 1,
      iv: iv.toString("base64"),
      data: encrypted.toString("base64"),
    },
  };
}
function build() {
  const master = JSON.parse(fs.readFileSync(masterPath, "utf8"));
  validateMaster(master);
  if (!master.parties.length)
    throw new Error(
      "Add the confirmed invitee names to private/guest-list.json first."
    );
  for (const party of master.parties)
    party.code ||= crypto
      .randomBytes(16)
      .toString("hex")
      .match(/.{8}/g)
      .join("-");
  const files = master.parties.map(encryptParty);
  fs.writeFileSync(masterPath, JSON.stringify(master, null, 2) + "\n");
  fs.mkdirSync(outputPath, { recursive: true });
  for (const file of fs.readdirSync(outputPath)) {
    if (/^[a-f0-9]{64}\.json$/.test(file))
      fs.unlinkSync(path.join(outputPath, file));
  }
  for (const file of files)
    fs.writeFileSync(
      path.join(outputPath, file.filename),
      JSON.stringify(file.envelope)
    );
  const count = master.parties.reduce(
    (total, party) => total + party.guests.length,
    0
  );
  const report = [
    `# Master invitee list`,
    `${count} guests across ${master.parties.length} parties.`,
    ...master.parties.map(
      (party) =>
        `## ${party.name}\n\nInvitation code: ${party.code}\n\n${party.guests
          .map((guest) => `- ${guest.name}`)
          .join("\n")}`
    ),
  ].join("\n\n");
  fs.writeFileSync(
    path.join(root, "private/master-invitees.md"),
    report + "\n"
  );
  console.log(
    `Prepared ${count} guests in ${master.parties.length} parties. Codes are in the private master list.`
  );
}
if (require.main === module) build();
module.exports = { validateMaster, encryptParty, digest };
