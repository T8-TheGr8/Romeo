import Card from "@/components/ui/Card.jsx";
import { useEffect, useState } from "react";
import { encryptPassword } from "../logic/encrypt.js";
import { decryptPassword } from "../logic/decrypt.js";
import ScramblingText from "../animation/ScramblingText.jsx";

const API_BASE = import.meta.env.VITE_API_URL;

export default function SideProject() {
  const [entries, setEntries] = useState([]);
  const [revealed, setRevealed] = useState({});

  useEffect(() => {
    async function load() {
      const res = await fetch(`${API_BASE}/api/passwords`);
      const data = await res.json();
      setEntries(data);
    }
    load();
  }, []);

  async function addPassword() {
    const site = prompt("Site name (e.g. Netflix):");
    if (!site) return;

    const usernameInput = prompt("Username/email (optional):") || "";
    const rawPassword = prompt("What's the password?");
    if (!rawPassword) return;

    const masterPassword = prompt("Enter the master password");
    if (!masterPassword) return;

    const masterPassword2 = prompt("Enter the master password again:");
    if (masterPassword !== masterPassword2) return;

    let encryptedUsername = null;

    if (usernameInput.trim() !== "") {
      encryptedUsername = await encryptPassword(masterPassword, usernameInput);
    }

    try {
      const encryptedPassword = await encryptPassword(
        masterPassword,
        rawPassword
      );

      const newEntry = {
        site,

        ciphertext: encryptedPassword.ciphertext,
        iv: encryptedPassword.iv,
        salt: encryptedPassword.salt,
        iterations: encryptedPassword.iterations,

        ...(encryptedUsername && {
          usernameCiphertext: encryptedUsername.ciphertext,
          usernameIv: encryptedUsername.iv,
          usernameSalt: encryptedUsername.salt,
          usernameIterations: encryptedUsername.iterations,
        }),
      };

      const res = await fetch(`${API_BASE}/api/passwords`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEntry),
      });

      const saved = await res.json();
      setEntries((prev) => [...prev, saved]);

      alert("Password saved");
    } catch (err) {
      console.error(err);
      alert("Failed to encrypt/save password");
    }
  }

  async function handleDecrypt(entry) {
    if (revealed[entry._id]) {
      setRevealed((prev) => {
        const copy = { ...prev };
        delete copy[entry._id];
        return copy;
      });
      return;
    }

    const masterPassword = prompt("Enter the master password:");
    if (!masterPassword) return;

    try {
      const decryptedPassword = await decryptPassword(entry, masterPassword);

      let decryptedUsername = null;

      if (entry.usernameCiphertext) {
        decryptedUsername = await decryptPassword(
          {
            ciphertext: entry.usernameCiphertext,
            iv: entry.usernameIv,
            salt: entry.usernameSalt,
            iterations: entry.usernameIterations,
          },
          masterPassword
        );
      }

      setRevealed((prev) => ({
        ...prev,
        [entry._id]: {
          username: decryptedUsername,
          password: decryptedPassword,
        },
      }));
    } catch (err) {
      console.error(err);
      alert("Failed to decrypt. Wrong password?");
    }
  }

  async function deletePassword(entryId) {
    const password = prompt("Enter delete password:");
    if (password !== "pleasedonthackme") return;

    try {
      const res = await fetch(`${API_BASE}/api/passwords/${entryId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setEntries((prev) => prev.filter((e) => e._id !== entryId));

      setRevealed((prev) => {
        const copy = { ...prev };
        delete copy[entryId];
        return copy;
      });
    } catch (err) {
      console.error(err);
      alert("Failed to delete password");
    }
  }

  return (
    <div className="page">
      <Card title="Our Passwords">Click them</Card>
      {entries.map((entry) => {
        const isRevealed = revealed[entry._id];

        return (
          <Card
            title={entry.site}
            key={entry._id}
            onClick={() => handleDecrypt(entry)}
          >
            <div>
              {entry.usernameCiphertext && (
                <p>
                  <strong>User/email:</strong>{" "}
                  <ScramblingText
                    text={
                      isRevealed
                        ? isRevealed.username
                        : entry.usernameCiphertext
                    }
                  />
                </p>
              )}

              <p>
                <strong>Password:</strong>{" "}
                <ScramblingText
                  text={isRevealed ? isRevealed.password : entry.ciphertext}
                />
              </p>
            </div>

            <button
              className="btn"
              onClick={(e) => {
                e.stopPropagation();
                deletePassword(entry._id);
              }}
            >
              Delete
            </button>
          </Card>
        );
      })}

      <button className="btn" onClick={addPassword}>
        Add a password
      </button>
    </div>
  );
}
