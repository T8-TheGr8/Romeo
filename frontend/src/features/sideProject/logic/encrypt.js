function bytesToB64(bytes) {
  return btoa(String.fromCharCode(...bytes));
}

// Convert string → bytes
const enc = new TextEncoder();

async function deriveKey(masterPassword, salt, iterations) {
  const baseKey = await crypto.subtle.importKey(
    "raw",
    enc.encode(masterPassword),
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt"]
  );
}

export async function encryptPassword(masterPassword, plaintext) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const iterations = 200000;

  const key = await deriveKey(masterPassword, salt, iterations);
  const encoded = enc.encode(plaintext);

  const ciphertextBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoded
  );

  return {
    salt: bytesToB64(salt),
    iv: bytesToB64(iv),
    iterations,
    ciphertext: bytesToB64(new Uint8Array(ciphertextBuffer)),
  };
}
