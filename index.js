const express = require("express");
const cors = require("cors");
const fetch = (...args) => import("node-fetch").then(({ default: f }) => f(...args));
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = "pat8tMpT82oIpGSoX.1330e10e3b62c1c90cfab6732a5f5f7cafd6fc221f7e3922033e8129444a57a7";
const BASE_ID = "appXIS4gWUbR7YzfS";
const BASE_URL = `https://api.airtable.com/v0/${BASE_ID}`;
const HEADERS = { "Authorization": `Bearer ${API_KEY}`, "Content-Type": "application/json" };

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tory@indianpondbarbados.com",
    pass: "sicu rofq ekdu mkoq"
  }
});

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
    const r = await fetch(`${BASE_URL}/${req.params.table}/${req.params.id}`, {
      method: "PATCH", headers: HEADERS, body: JSON.stringify({ fields: req.body.fields })
    });
    res.json(await r.json());
  } catch (e) {
    res.status(500).json({ error: { message: e.message } });
  }
});

app.post("/notify", async (req, res) => {
  try {
    const { name, email, phone, ecName, ecPhone, dietary, medical } = req.body;
    await transporter.sendMail({
      from: "tory@indianpondbarbados.com",
      to: "tory.miell@me.com",
      subject: `New retreat registration: ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px; background: #F7F3EE;">
          <h2 style="font-weight: 300; color: #2C2416; border-bottom: 1px solid #E8DDD0; padding-bottom: 16px;">New Retreat Registration</h2>
          <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #2C2416;">
            <tr><td style="padding: 10px 0; color: #A89880; width: 180px;">Name</td><td style="padding: 10px 0;"><strong>${name}</strong></td></tr>
            <tr><td style="padding: 10px 0; color: #A89880;">Email</td><td style="padding: 10px 0;">${email}</td></tr>
            <tr><td style="padding: 10px 0; color: #A89880;">Phone</td><td style="padding: 10px 0;">${phone}</td></tr>
            <tr><td style="padding: 10px 0; color: #A89880;">Emergency Contact</td><td style="padding: 10px 0;">${ecName} — ${ecPhone}</td></tr>
            <tr><td style="padding: 10px 0; color: #A89880;">Dietary</td><td style="padding: 10px 0;">${dietary || "None stated"}</td></tr>
            <tr><td style="padding: 10px 0; color: #A89880;">Medical Notes</td><td style="padding: 10px 0;">${medical || "None stated"}</td></tr>
            <tr><td style="padding: 10px 0; color: #A89880;">Waiver Signed</td><td style="padding: 10px 0;">Yes</td></tr>
          </table>
          <p style="margin-top: 24px; font-size: 12px; color: #A89880;">This registration has been saved to your Airtable database.</p>
        </div>
      `
    });
    res.json({ ok: true });
  } catch (e) {
    console.error("Email error:", e.message);
    res.status(500).json({ error: e.message });
  }
});

app.listen(process.env.PORT || 3000, () => console.log("Sveccha server running"));
