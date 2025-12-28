const mongoose = require("mongoose");

const SnippetSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: String, required: true },
  language: { type: String, default: "javascript" },
  userEmail: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Snippet", SnippetSchema);
