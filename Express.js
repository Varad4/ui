// server.js
const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

let historyStore = []; // In-memory array of { id, url, timestamp }

// Get all history
app.get("/api/history", (req, res) => {
  res.json(historyStore);
});

// Add a new history item
app.post("/api/history", (req, res) => {
  const { url } = req.body;
  const newItem = {
    id: Date.now(),
    url,
    timestamp: new Date().toISOString(),
  };
  historyStore.push(newItem);
  res.status(201).json(newItem);
});

// Delete a specific history item
app.delete("/api/history/:id", (req, res) => {
  const { id } = req.params;
  historyStore = historyStore.filter(item => item.id !== Number(id));
  res.status(204).send();
});

// Delete all history
app.delete("/api/history", (req, res) => {
  historyStore = [];
  res.status(204).send();
});

app.listen(4000, () => console.log("Backend running on http://localhost:4000"));
