const puppeteer = require('puppeteer');

function gbp(n) {
  return '\u00a3' + parseFloat(n || 0).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function invoiceRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return 'INV-' + s;
}

function buildHtml(b) {
  const total   = parseFloat(b.totalPrice)    || 0;
  const deposit = parseFloat(b.depositAmount) || 500;
  const balance = Math.max(0, total - deposit);
  const ref     = b.invoiceNumber || invoiceRef();
  const date    = b.invoiceDate   || new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;background:#F7F3EE;color:#1C1917;font-size:13px;line-height:1.5;width:210mm;margin:0 auto}
.header{background:#1C1917;padding:28px 40px 22px;display:flex;justify-content:space-between;align-items:flex-start}
.brand-name{font-size:28px;font-weight:300;letter-spacing:3px;color:#fff;margin-bottom:4px}
.brand-tagline{color:#C4917A;font-size:10px;letter-spacing:1.5px}
.inv-meta{text-align:right}
.inv-meta .word{color:#C4917A;font-size:13px;letter-spacing:3px;text-transform:uppercase;display:block;margin-bottom:6px}
.inv-meta .ref{color:#fff;font-size:15px;font-weight:500;display:block}
.inv-meta .date{color:#BDB5B0;font-size:11px;display:block;margin-top:3px}
.body{padding:32px 40px 28px}
.parties{display:flex;gap:40px;margin-bottom:28px}
.party{flex:1}
.lbl{color:#C4917A;font-size:9px;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px}
.party .nm{font-size:15px;font-weight:600;color:#1C1917;margin-bottom:3px}
.party .dt{color:#6B5E57;font-size:11px;line-height:1.6}
.rcard{background:#fff;border:1px solid #E8D5CC;border-radius:8px;padding:20px 24px;margin-bottom:28px;display:flex}
.rcol{flex:1;padding-right:24px;border-right:1px solid #E8D5CC;margin-right:24px}
.rcol:last-child{border-right:none;margin-right:0;padding-right:0}
.rcol .rname{font-size:15px;font-weight:600;color:#1C1917;margin-bottom:4px}
.rcol .rsub{color:#6B5E57;font-size:11px}
table.inv{width:100%;border-collapse:collapse;margin-bottom:24px;border-radius:8px;overflow:hidden}
table.inv thead tr{background:#1C1917;color:#F7F3EE}
table.inv thead th{padding:11px 16px;font-size:9px;letter-spacing:1.5px;text-transform:uppercase;font-weight:400;text-align:left}
table.inv thead th:last-child{text-align:right}
table.inv tbody tr{background:#fff}
table.inv tbody tr+tr{border-top:1px solid #E8D5CC}
table.inv tbody tr.dep{background:#F2E8E3}
table.inv tbody td{padding:14px 16px;vertical-align:top}
table.inv tbody td:last-child{text-align:right;white-space:nowrap}
.rt{font-size:13px;color:#1C1917}
.rs{font-size:10px;color:#6B5E57;margin-top:2px}
.dep .rt{color:#8B5E4E;font-weight:600;font-size:14px}
.dep td:last-child{color:#8B5E4E;font-weight:700;font-size:15px}
.tag{display:inline-block;background:#8B5E4E;color:#fff;font-size:8px;letter-spacing:1.5px;text-transform:uppercase;padding:2px 7px;border-radius:3px;margin-left:8px;vertical-align:middle}
.bbox-wrap{display:flex;justify-content:flex-end;margin-bottom:32px}
.bbox{background:#1C1917;color:#fff;border-radius:8px;padding:14px 24px;min-width:240px;text-align:right}
.bbox .bl{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:#C4917A;margin-bottom:6px}
.bbox .ba{font-size:28px;font-weight:300;letter-spacing:1px}
.bbox .bs{font-size:10px;color:#BDB5B0;margin-top:4px}
.psec{background:#fff;border:1px solid #E8D5CC;border-radius:8px;padding:20px 24px;margin-bottom:28px}
.pml{font-size:9px;letter-spacing:1.5px;text-transform:uppercase;color:#6B5E57;margin-bottom:4px;margin-top:12px}
.pml:first-of-type{margin-top:0}
.pd{font-size:12px;color:#1C1917}
.pd a{color:#C4917A;text-decoration:none}
.pnote{font-style:italic;color:#6B5E57;font-size:11px;margin-top:14px;padding-top:12px;border-top:1px solid #E8D5CC}
footer{text-align:center;padding:18px 40px 24px;font-size:10px;color:#6B5E57;border-top:1px solid #E8D5CC;line-height:1.7}
</style></head><body>
<div class="header">
  <div><div class="brand-name">Sveccha Retreats</div><div class="brand-tagline">freedom through connection</div></div>
  <div class="inv-meta"><span class="word">Invoice</span><span class="ref">${ref}</span><span class="date">${date}</span></div>
</div>
<div class="body">
  <div class="parties">
    <div class="party"><div class="lbl">Invoice to</div><div class="nm">${b.name||''}</div><div class="dt">${b.email||''}</div></div>
    <div class="party"><div class="lbl">From</div><div class="nm">Tory Miell</div><div class="dt">Sveccha Retreats / Kula Life Barbados Inc<br>The Gables, Haggatt Hall<br>St Michael, Barbados<br>tory.miell@me.com</div></div>
  </div>
  <div class="rcard">
    <div class="rcol"><div class="lbl">Retreat</div><div class="rname">${b.retreat||''}</div>${b.roomType ? '<div class="rsub">'+b.roomType+'</div>' : ''}</div>
    <div class="rcol"><div class="lbl">Dates</div><div class="rname" style="font-weight:400;font-size:14px">${b.retreatDates||''}</div></div>
  </div>
  <table class="inv">
    <thead><tr><th>Description</th><th>Amount</th></tr></thead>
    <tbody>
      <tr><td><div class="rt">Retreat Fee &mdash; ${b.retreat||''}${b.roomType ? '</div><div class="rs">'+b.roomType : ''}</div></td><td>${gbp(total)}</td></tr>
      <tr class="dep"><td><div class="rt">Deposit Due Now <span class="tag">Pay now</span></div><div class="rs">Please transfer within 48 hours to secure your place</div></td><td>${gbp(deposit)}</td></tr>
      <tr><td><div class="rt">Balance</div>${b.balanceDueDate ? '<div class="rs">Due '+b.balanceDueDate+'</div>' : ''}</td><td>${gbp(balance)}</td></tr>
    </tbody>
  </table>
  <div class="bbox-wrap"><div class="bbox"><div class="bl">Deposit Due Now</div><div class="ba">${gbp(deposit)}</div><div class="bs">Balance of ${gbp(balance)} due ${b.balanceDueDate||''}</div></div></div>
  <div class="psec">
    <div class="lbl">Payment Details</div>
    <div class="pml">UK Bank Transfer</div><div class="pd">Victoria Miell &nbsp;&middot;&nbsp; Sort Code: 77-77-92 &nbsp;&middot;&nbsp; Account: 05730468</div>
    <div class="pml">International</div><div class="pd">Victoria Miell &nbsp;&middot;&nbsp; IBAN: GB50LOYD77779205730468 &nbsp;&middot;&nbsp; BIC/SWIFT: LOYDGB21F97</div>
    <div class="pml">Pay Online</div><div class="pd"><a href="https://wise.com/pay/me/victorialouisem47">wise.com/pay/me/victorialouisem47</a></div>
    <div class="pnote">Payments of any amount can be made at any time before the balance due date.</div>
  </div>
</div>
<footer>Sveccha Retreats &nbsp;&middot;&nbsp; Kula Life Barbados Inc &nbsp;&middot;&nbsp; The Gables, Haggatt Hall, St Michael, Barbados<br>tory.miell@me.com &nbsp;&middot;&nbsp; freedom through connection</footer>
</body></html>`;
}

async function generateInvoice(booking) {
  let browser;
  try {
    browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    const page = await browser.newPage();
    await page.setContent(buildHtml(booking), { waitUntil: 'networkidle0' });
    const pdf = await page.pdf({ format: 'A4', printBackground: true, margin: { top: '0', right: '0', bottom: '0', left: '0' } });
    return Buffer.from(pdf);
  } finally {
    if (browser) await browser.close();
  }
}

module.exports = { generateInvoice };