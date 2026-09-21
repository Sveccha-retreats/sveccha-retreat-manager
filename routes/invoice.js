const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { generateInvoice } = require('../invoiceGenerator');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'tory@indianpondbarbados.com',
    pass: 'sicu rofq ekdu mkoq'
  }
});

// POST /api/invoice
// Body: { name, email, retreat, retreatDates, roomType, totalPrice, depositAmount, balanceDueDate }
router.post('/', async (req, res) => {
  const b = req.body || {};
  if (!b.name || !b.email) return res.status(400).json({ error: 'name and email are required' });

  try {
    const pdfBuffer = await generateInvoice(b);
    const deposit = parseFloat(b.depositAmount) || 500;
    const filename = 'Sveccha-Invoice-' + b.name.replace(/\s+/g, '-') + '.pdf';

    await transporter.sendMail({
      from: 'Sveccha Retreats <tory@indianpondbarbados.com>',
      to: b.email,
      bcc: 'tory@indianpondbarbados.com',
      subject: 'Your booking invoice \u2014 ' + b.retreat,
      html: '<p>Dear ' + b.name + ',</p>' +
            '<p>Thank you for booking your place on <strong>' + b.retreat + '</strong>. Please find your invoice attached.</p>' +
            '<p>Your deposit of <strong>\u00a3' + deposit.toFixed(2) + '</strong> is due now by bank transfer \u2014 all payment details are on the invoice.</p>' +
            '<p>Once received, your place is confirmed.</p>' +
            '<p>With warmth,<br>Tory<br>Sveccha Retreats</p>',
      attachments: [{ filename, content: pdfBuffer, contentType: 'application/pdf' }]
    });

    res.json({ success: true, message: 'Invoice sent to ' + b.email });
  } catch (e) {
    console.error('[invoice]', e.message);
    res.status(500).json({ error: e.message });
  }
});

// GET /api/invoice/preview — opens PDF in browser for testing
router.get('/preview', async (req, res) => {
  try {
    const pdf = await generateInvoice({
      name: 'James Scobbie',
      email: 'jscobbie1@googlemail.com',
      retreat: 'Tuscany \u2013 The Artistry of Practice',
      retreatDates: '8 May 2027 \u2013 14 May 2027',
      roomType: 'Single en-suite room',
      totalPrice: 3245,
      depositAmount: 500,
      balanceDueDate: '1 March 2027'
    });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="preview.pdf"');
    res.send(pdf);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;