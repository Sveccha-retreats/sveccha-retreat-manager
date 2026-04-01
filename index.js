<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Svecchā — Private Yoga Client Registration</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400&display=swap" rel="stylesheet">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'Jost', sans-serif; background: #F7F3EE; color: #2C2416; font-weight: 300; font-size: 15px; line-height: 1.7; }
  .page { max-width: 720px; margin: 0 auto; padding: 60px 32px 100px; }
  .header { text-align: center; padding: 70px 0 60px; border-bottom: 1px solid #E8DDD0; margin-bottom: 60px; }
  .logo-mark { width: 90px; height: 90px; border: 1px solid #2C2416; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; position: relative; }
  .logo-mark::before { content: ''; position: absolute; inset: 6px; border: 1px solid #E8DDD0; border-radius: 50%; }
  .logo-name { font-family: 'Cormorant Garamond', serif; font-size: 13px; letter-spacing: 3px; text-transform: uppercase; color: #2C2416; }
  h1 { font-family: 'Cormorant Garamond', serif; font-size: 42px; font-weight: 300; color: #2C2416; margin-bottom: 10px; line-height: 1.2; }
  .header-sub { font-size: 11px; letter-spacing: 3px; text-transform: uppercase; color: #A89880; margin-bottom: 16px; }
  .welcome { background: #2C2416; color: #F7F3EE; padding: 44px 48px; border-radius: 12px; margin-bottom: 52px; }
  .welcome h2 { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 300; margin-bottom: 16px; color: #F7F3EE; }
  .welcome p { color: rgba(247,243,238,0.8); line-height: 1.8; font-size: 14px; }
  .welcome p + p { margin-top: 12px; }
  .section { margin-bottom: 52px; }
  .section-label { font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: #A89880; margin-bottom: 6px; }
  .section-title { font-family: 'Cormorant Garamond', serif; font-size: 30px; font-weight: 300; color: #2C2416; margin-bottom: 24px; padding-bottom: 14px; border-bottom: 1px solid #E8DDD0; }
  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
  .form-group { display: flex; flex-direction: column; }
  .form-group.full { grid-column: 1 / -1; }
  label { font-size: 9px; letter-spacing: 2px; text-transform: uppercase; color: #6B5B45; margin-bottom: 6px; }
  input, textarea, select { padding: 10px 14px; border: 1px solid #E8DDD0; border-radius: 6px; font-family: 'Jost', sans-serif; font-size: 14px; color: #2C2416; background: white; outline: none; font-weight: 300; width: 100%; transition: border-color 0.2s; }
  input:focus, textarea:focus, select:focus { border-color: #C4714A; }
  textarea { resize: vertical; min-height: 90px; }
  .field-note { font-size: 11px; color: #A89880; margin-top: 4px; }
  .legal-box { background: white; border: 1px solid #E8DDD0; border-radius: 8px; padding: 28px 32px; max-height: 320px; overflow-y: auto; font-size: 13px; line-height: 1.8; color: #3D3020; margin-bottom: 20px; }
  .legal-box h3 { font-family: 'Cormorant Garamond', serif; font-size: 16px; font-weight: 400; margin: 20px 0 8px; color: #2C2416; }
  .legal-box h3:first-child { margin-top: 0; }
  .legal-box p { margin-bottom: 10px; }
  .legal-box ul { padding-left: 20px; margin-bottom: 10px; }
  .legal-box ul li { margin-bottom: 5px; }
  .checkbox-row { display: flex; align-items: flex-start; gap: 14px; padding: 16px 20px; background: #FDFAF7; border: 1px solid #E8DDD0; border-radius: 8px; cursor: pointer; transition: border-color 0.2s; }
  .checkbox-row:hover { border-color: #C4714A; }
  .checkbox-row input[type="checkbox"] { width: 18px; height: 18px; min-width: 18px; margin-top: 2px; accent-color: #C4714A; cursor: pointer; border: 1px solid #E8DDD0; border-radius: 3px; padding: 0; }
  .checkbox-label { font-size: 13px; color: #2C2416; line-height: 1.6; }
  .checkbox-label strong { font-weight: 400; color: #C4714A; }
  .submit-section { text-align: center; padding: 40px 0; }
  .submit-btn { background: #2C2416; color: #F7F3EE; border: none; padding: 16px 52px; font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; border-radius: 6px; cursor: pointer; transition: background 0.2s; font-weight: 400; }
  .submit-btn:hover { background: #C4714A; }
  .submit-btn:disabled { background: #A89880; cursor: not-allowed; }
  .success { display: none; text-align: center; padding: 60px 40px; background: white; border: 1px solid #E8DDD0; border-radius: 12px; }
  .success.visible { display: block; }
  .success h2 { font-family: 'Cormorant Garamond', serif; font-size: 36px; font-weight: 300; margin-bottom: 16px; }
  .success p { color: #6B5B45; font-size: 14px; }
  .error-msg { background: rgba(184,92,74,0.1); color: #B85C4A; border: 1px solid rgba(184,92,74,0.2); border-radius: 7px; padding: 12px 16px; margin-top: 16px; font-size: 13px; display: none; }
  .error-msg.visible { display: block; }
  .footer { text-align: center; padding-top: 40px; border-top: 1px solid #E8DDD0; margin-top: 60px; }
  .footer p { font-size: 11px; letter-spacing: 1px; color: #A89880; }
  @media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } .welcome { padding: 32px 28px; } h1 { font-size: 32px; } .page { padding: 40px 20px 80px; } }
</style>
</head>
<body>
<div class="page">

  <div class="header">
    <div class="logo-mark"><span class="logo-name">S</span></div>
    <div class="header-sub">Svecchā — Private Yoga</div>
    <h1>Client Registration</h1>
  </div>

  <div class="welcome">
    <h2>Welcome.</h2>
    <p>Before we begin working together, I'd like to understand a little more about you — your body, your experience, and what you're hoping to explore. Please take a few minutes to complete this form.</p>
    <p>Everything you share is held in confidence and helps me shape our sessions around what you actually need. There are no right or wrong answers.</p>
    <p style="margin-top:16px; font-style:italic; color:rgba(247,243,238,0.6); font-size:13px;">With love, Tory</p>
  </div>

  <div id="main-form">

    <div class="section">
      <div class="section-label">Step 1 of 4</div>
      <div class="section-title">Your Details</div>
      <div class="form-grid">
        <div class="form-group">
          <label for="firstName">First Name *</label>
          <input type="text" id="firstName" required placeholder="Your first name" />
        </div>
        <div class="form-group">
          <label for="lastName">Last Name *</label>
          <input type="text" id="lastName" required placeholder="Your last name" />
        </div>
        <div class="form-group">
          <label for="email">Email Address *</label>
          <input type="email" id="email" required placeholder="your@email.com" />
        </div>
        <div class="form-group">
          <label for="phone">Phone Number *</label>
          <input type="tel" id="phone" required placeholder="+44..." />
        </div>
        <div class="form-group">
          <label for="ecName">Emergency Contact Name *</label>
          <input type="text" id="ecName" required placeholder="Full name" />
        </div>
        <div class="form-group">
          <label for="ecPhone">Emergency Contact Phone *</label>
          <input type="tel" id="ecPhone" required placeholder="+44..." />
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-label">Step 2 of 4</div>
      <div class="section-title">Your Body & Health</div>
      <div class="form-grid">
        <div class="form-group full">
          <label for="physical">Physical Considerations</label>
          <textarea id="physical" placeholder="Please share anything relevant — injuries, chronic conditions, areas of tension or restriction, surgeries, anything your doctor or physio has advised you about. Nothing is too small to mention."></textarea>
          <div class="field-note">This is shared only with Tory and held in complete confidence.</div>
        </div>
        <div class="form-group full">
          <label for="experience">Previous Yoga Experience</label>
          <textarea id="experience" placeholder="How long have you been practising? Any styles you've explored? Any teachers or traditions that have influenced you? If you're completely new to yoga, that's wonderful too — just say so."></textarea>
        </div>
        <div class="form-group full">
          <label for="intentions">What Are You Looking For?</label>
          <textarea id="intentions" placeholder="What draws you to private sessions? What would feel like a meaningful outcome — whether that's physical, mental, or something harder to name? There's no pressure to have a clear answer."></textarea>
        </div>
        <div class="form-group full">
          <label for="other">Anything Else You'd Like Me to Know</label>
          <textarea id="other" placeholder="Anything at all — about how you learn, what helps you feel at ease, or anything else that feels relevant."></textarea>
        </div>
      </div>
    </div>

    <div class="section">
      <div class="section-label">Step 3 of 4</div>
      <div class="section-title">Terms & Conditions</div>
      <div class="legal-box">
        <p>These Terms and Conditions apply to all private yoga sessions offered by Tory Miell, trading as Svecchā Retreats and Kula Life Barbados Inc (referred to as "the Teacher"). By submitting this form, you confirm that you have read, understood, and agreed to the following.</p>

        <h3>1. Scope of Practice</h3>
        <p>Tory Miell is a qualified yoga teacher. She is not a doctor, physiotherapist, osteopath, psychotherapist, or any other kind of licensed healthcare professional. Private yoga sessions are a movement and wellbeing practice and do not constitute medical, physiotherapeutic, psychological, or therapeutic treatment of any kind.</p>
        <p>Nothing shared during a session — verbally or through the practice itself — should be understood as medical advice, diagnosis, or a substitute for professional medical care. If you have any health concerns, you are responsible for seeking appropriate professional advice before participating.</p>

        <h3>2. Personal Responsibility</h3>
        <p>You confirm that you are in a suitable state of health to participate in yoga. By booking a session, you accept full personal responsibility for your participation, including any physical or emotional responses that may arise. You agree to:</p>
        <ul>
          <li>Inform the Teacher of any injuries, health conditions, or changes to your physical or mental health before each session.</li>
          <li>Practise within your own limits and communicate openly if something does not feel right.</li>
          <li>Follow any guidance offered by medical professionals you are currently working with.</li>
        </ul>

        <h3>3. Liability</h3>
        <p>Tory Miell, Svecchā Retreats, and Kula Life Barbados Inc accept no liability for any injury, loss, or harm arising from participation in private yoga sessions, except where liability cannot be excluded by law. You participate entirely at your own risk.</p>

        <h3>4. Cancellation Policy</h3>
        <p>Your session time is reserved exclusively for you. If you need to cancel or reschedule, please give as much notice as possible.</p>
        <ul>
          <li>Cancellations made with more than 24 hours notice: no charge.</li>
          <li>Cancellations made with less than 24 hours notice, or failure to attend: the full session fee is due.</li>
        </ul>
        <p>In the event that the Teacher needs to cancel, you will be offered a full refund or the option to reschedule at no additional cost.</p>

        <h3>5. Confidentiality</h3>
        <p>All personal information shared with the Teacher — including health details, physical considerations, and anything discussed during sessions — is held in strict confidence and will not be shared with any third party without your consent, except where required by law.</p>

        <h3>6. Governing Law</h3>
        <p>These Terms and Conditions are governed by the laws of England and Wales.</p>
      </div>
      <label class="checkbox-row" for="tcCheck">
        <input type="checkbox" id="tcCheck" />
        <span class="checkbox-label"><strong>I have read and understood</strong> the Terms & Conditions above and agree to be bound by them, including the 24-hour cancellation policy.</span>
      </label>
    </div>

    <div class="section">
      <div class="section-label">Step 4 of 4</div>
      <div class="section-title">Participant Waiver</div>
      <div class="legal-box">
        <p>I am choosing to participate in private yoga sessions with Tory Miell freely and of my own accord.</p>
        <p>I confirm that:</p>
        <ul>
          <li>I am in a suitable state of physical and mental health to practise yoga, or have sought appropriate professional advice where relevant.</li>
          <li>I have shared any health conditions, injuries, or considerations that may affect my practice, to the best of my knowledge.</li>
          <li>I understand that Tory Miell is a yoga teacher, not a medical or therapeutic professional, and that nothing in our sessions constitutes medical, physiotherapeutic, or psychological treatment.</li>
          <li>I take full personal responsibility for my participation, including any physical or emotional responses that arise during or after sessions.</li>
          <li>I release Tory Miell, Svecchā Retreats, and Kula Life Barbados Inc from any liability arising from my participation, except where liability cannot be excluded by law.</li>
        </ul>
        <p>I have read this waiver, I understand its contents, and I sign it freely and willingly.</p>
      </div>
      <label class="checkbox-row" for="waiverCheck">
        <input type="checkbox" id="waiverCheck" />
        <span class="checkbox-label"><strong>I have read and agree</strong> to the Participant Waiver above.</span>
      </label>
    </div>

    <div class="submit-section">
      <p style="font-size:13px; color:#6B5B45; margin-bottom:20px;">By submitting this form you confirm that all information is accurate and that you have read and agreed to the Terms & Conditions and Participant Waiver above.</p>
      <button class="submit-btn" id="submitBtn" onclick="handleSubmit()">Submit Registration</button>
      <div class="error-msg" id="errorMsg"></div>
    </div>

  </div>

  <div class="success" id="successMsg">
    <div style="font-size:32px; margin-bottom:16px;">✦</div>
    <h2>Thank you — you're all set.</h2>
    <p style="margin-top:8px;">Your registration is with me and I look forward to our first session together.</p>
    <p style="margin-top:24px; font-size:12px; color:#A89880;">Questions? <a href="mailto:tory.miell@me.com" style="color:#C4714A;">tory.miell@me.com</a></p>
  </div>

  <div class="footer">
    <p>Svecchā Retreats · Kula Life Barbados Inc · The Gables, Haggatt Hall, St Michael, Barbados</p>
    <p style="margin-top:6px;">freedom through connection</p>
  </div>

</div>

<script>
const RENDER_URL = "https://sveccha-retreat-manager.onrender.com/api";

function val(id) { return document.getElementById(id).value.trim(); }
function checked(id) { return document.getElementById(id).checked; }

async function handleSubmit() {
  const btn = document.getElementById("submitBtn");
  const errEl = document.getElementById("errorMsg");
  errEl.classList.remove("visible");

  const firstName = val("firstName");
  const lastName = val("lastName");
  const email = val("email");
  const phone = val("phone");
  const ecName = val("ecName");
  const ecPhone = val("ecPhone");

  if (!firstName || !lastName || !email || !phone || !ecName || !ecPhone) {
    errEl.textContent = "Please fill in all required fields before submitting.";
    errEl.classList.add("visible");
    return;
  }
  if (!checked("tcCheck")) {
    errEl.textContent = "Please confirm that you have read and understood the Terms & Conditions.";
    errEl.classList.add("visible");
    return;
  }
  if (!checked("waiverCheck")) {
    errEl.textContent = "Please confirm that you have read and agreed to the Participant Waiver.";
    errEl.classList.add("visible");
    return;
  }

  btn.disabled = true;
  btn.textContent = "Submitting...";

  const fullName = firstName + " " + lastName;
  const today = new Date().toISOString().split("T")[0];
  const physical = val("physical");
  const experience = val("experience");
  const intentions = val("intentions");
  const other = val("other");

  const fields = {
    "Name": fullName,
    "Email": email,
    "Phone": phone,
    "Emergency Contact Name": ecName,
    "Emergency Contact Phone": ecPhone,
    "Waiver Signed": true,
    "Waiver Date": today,
  };
  if (physical) fields["Physical Considerations"] = physical;
  if (experience) fields["Previous Experience"] = experience;
  if (intentions) fields["Intentions"] = intentions;
  if (other) fields["Notes"] = other;

  const errors = [];

  try {
    let existing = null;
    try {
      const searchRes = await fetch(RENDER_URL + "/Private%20Clients");
      if (searchRes.ok) {
        const searchData = await searchRes.json();
        existing = (searchData.records || []).find(r =>
          r.fields.Email && r.fields.Email.toLowerCase() === email.toLowerCase()
        );
      }
    } catch(e) { errors.push("Lookup: " + e.message); }

    try {
      let saveRes;
      if (existing) {
        saveRes = await fetch(RENDER_URL + "/Private%20Clients/" + existing.id, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fields })
        });
      } else {
        saveRes = await fetch(RENDER_URL + "/Private%20Clients", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fields })
        });
      }
      const saveData = await saveRes.json();
      if (saveData.error) errors.push("Save: " + JSON.stringify(saveData.error));
    } catch(e) { errors.push("Save: " + e.message); }

  } catch(e) { errors.push("Submission: " + e.message); }

  // Email notification
  try {
    await fetch(RENDER_URL.replace("/api", "/notify-private"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: fullName, email, phone, ecName, ecPhone, physical, experience, intentions, other })
    });
  } catch(e) { errors.push("Notify: " + e.message); }

  if (errors.length > 0) console.error("Submission errors:", errors);

  document.getElementById("main-form").style.display = "none";
  document.getElementById("successMsg").classList.add("visible");
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>
</body>
</html>
