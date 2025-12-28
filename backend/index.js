const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🚨 TEMP STORAGE (NO DATABASE)
let snippets = [];

// Test route
app.get("/", (req, res) => {
  res.send("Backend running (No DB mode)");
});

// SAVE SNIPPET
app.post("/snippets", (req, res) => {
  const { title, code, language } = req.body;

  if (!title || !code) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const snippet = {
    _id: Date.now(),
    title,
    code,
    language: language || "javascript"
  };

  snippets.push(snippet);
  res.status(201).json(snippet);
});

// GET ALL SNIPPETS
app.get("/snippets", (req, res) => {
  res.json(snippets);
});

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000 (No DB)");
});
