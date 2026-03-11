const express = require("express");
const cors = require("cors");
const fetch = (...args) => import("node-fetch").then(({ default: f }) => f(...args));

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "pat8tMpT82oIpGSoX.1330e10e3b62c1c90cfab6732a5f5f7cafd6fc221f7e3922033e8129444a57a7";
const BASE_ID = "appXIS4gWUbR7YzfS";
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;
const HEADERS = { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" };

app.get("/api/:table", async (req, res) => {
  try {
    let records = [], offset = null;
    do {
      const qs = offset ? `?offset=${offset}` : "";
      const r = await fetch(`${BASE_URL}/${req.params.table}${qs}`, { headers: HEADERS });
      const data = await r.json();
      if (data.error) return res.status(400).json(data);
      records = records.concat(data.records || []);
      offset = data.offset || null;
    } while (offset);
    res.json({ records });
  } catch (e) {
    res.status(500).json({ error: { message: e.message } });
  }
});

app.post("/api/:table", async (req, res) => {
  try {
    const r = await fetch(`${BASE_URL}/${req.params.table}`, {
      method: "POST", headers: HEADERS, body: JSON.stringify({ fields: req.body.fields })
    });
    res.json(await r.json());
  } catch (e) {
    res.status(500).json({ error: { message: e.message } });
  }
});

app.patch("/api/:table/:id", async (req, res) => {
  try {
    const r = await fetch(`${BASE_URL}/${encodeURIComponent(req.params.table)}/${req.params.id}`, {
      method: "PATCH", headers: HEADERS, body: JSON.stringify({ fields: req.body.fields })
    });
    res.json(await r.json());
  } catch (e) {
    res.status(500).json({ error: { message: e.message } });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Sveccha server running"));
