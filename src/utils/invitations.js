export const normalizeCode = (code) => code.replace(/[-\s]/g, "").toLowerCase();
const decode = (value) =>
  Uint8Array.from(atob(value), (char) => char.charCodeAt(0));
async function digest(purpose, code) {
  return window.crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${purpose}:${normalizeCode(code)}`)
  );
}
export async function openInvitation(code, basePath) {
  if (!/^[a-f0-9]{32}$/.test(normalizeCode(code)))
    throw new Error("Check the invitation code and try again.");
  const lookup = Array.from(
    new Uint8Array(await digest("lookup", code)),
    (byte) => byte.toString(16).padStart(2, "0")
  ).join("");
  const response = await fetch(`${basePath}${lookup}.json`, {
    cache: "no-store",
  });
  if (response.status === 404)
    throw new Error(
      "We couldn’t find that invitation. Check your code or contact Tom and Emma."
    );
  if (!response.ok)
    throw new Error(
      "We couldn’t load your invitation. Please try again shortly."
    );
  const envelope = await response.json();
  const key = await window.crypto.subtle.importKey(
    "raw",
    await digest("key", code),
    "AES-GCM",
    false,
    ["decrypt"]
  );
  const plaintext = await window.crypto.subtle.decrypt(
    { name: "AES-GCM", iv: decode(envelope.iv) },
    key,
    decode(envelope.data)
  );
  return JSON.parse(new TextDecoder().decode(plaintext));
}
