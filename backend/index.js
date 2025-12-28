const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());


let snippets = [];


app.get("/", (req, res) => {
  res.send("Backend running (No DB mode)");
});


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


app.get("/snippets", (req, res) => {
  res.json(snippets);
});


app.listen(5000, () => {
  console.log("Server running on port 5000 (No DB)");
});
