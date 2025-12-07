import express from "express";
import Password from "../models/Password.js";

const router = express.Router();

//
// GET /api/passwords
// Returns all encrypted entries
//
router.get("/", async (req, res) => {
  try {
    const entries = await Password.find().lean();
    res.json(entries);
  } catch (err) {
    console.error("Error fetching passwords:", err);
    res.status(500).json({ error: "Failed to fetch password entries" });
  }
});

//
// POST /api/passwords
// Body MUST already contain encrypted fields:
// { site, username, ciphertext, iv, salt, iterations }
//
router.post("/", async (req, res) => {
  try {
    const newEntry = await Password.create(req.body);
    res.status(201).json(newEntry);
  } catch (err) {
    console.error("Error creating password entry:", err);
    res.status(500).json({ error: "Failed to create password entry" });
  }
});

//
// PUT /api/passwords/:id
// Replace an entry (client must send NEW encrypted data)
//
router.put("/:id", async (req, res) => {
  try {
    const updated = await Password.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ error: "Entry not found" });
    }

    res.json(updated);
  } catch (err) {
    console.error("Error updating password entry:", err);
    res.status(500).json({ error: "Failed to update password entry" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Password.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Password entry not found" });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete password entry" });
  }
});

export default router;
