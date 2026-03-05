# ✅ EmailJS Setup - Quick Configuration Guide

## Your Current Issue
Your contact form won't send emails because **EmailJS credentials are missing**. Follow these steps to fix it.

---

## Step 1: Get Your Credentials (5 minutes)

### A. Go to EmailJS Dashboard
1. Visit: https://dashboard.emailjs.com/
2. Sign in (or create a free account)

### B. Find Your Public Key
1. Click your **profile icon** (top right)
2. Select **Account**
3. Find **PUBLIC KEY** (looks like: `abc123xyz789`)
4. **Copy** it

### C. Create/Find Your Service ID
1. In left sidebar, click **Email Services**
2. If you see Gmail listed, click **Copy** next to **Service ID**
3. If not, click **Add Service** → **Gmail** → follow steps
4. **Service ID** looks like: `service_abc123xyz`

### D. Find/Create Your Template ID
1. In left sidebar, click **Email Templates**
2. Create a new template with this content:

```
Subject: {{subject}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}
```

3. Save and **Copy Template ID** (looks like: `template_xyz789abc`)

---

## Step 2: Update script.js (1 minute)

Open [script.js](script.js#L371) and replace the placeholders:

**Find these lines:**
```javascript
emailjs.init("YOUR_PUBLIC_KEY_HERE");
```
**Replace with your public key:**
```javascript
emailjs.init("abc123xyz789"); // Your actual public key
```

**Then find:**
```javascript
const response = await emailjs.send(
    "YOUR_SERVICE_ID",
    "YOUR_TEMPLATE_ID",
```
**Replace with your IDs:**
```javascript
const response = await emailjs.send(
    "service_abc123xyz",      // Your service ID
    "template_xyz789abc",     // Your template ID
```

---

## Step 3: Test It ✅
1. Save **script.js**
2. Open your portfolio in browser
3. Scroll to "Get In Touch" section
4. Fill out the form
5. Click "Send Message"
6. **Check your Gmail for the message!**

---

## 🆘 Still Not Working?

### Troubleshooting Checklist
- [ ] All three placeholders replaced with real values (not text like "YOUR_PUBLIC_KEY_HERE")
- [ ] Gmail account is connected in EmailJS (Email Services → Gmail)
- [ ] Template variable names are: `{{subject}}`, `{{from_name}}`, `{{from_email}}`, `{{message}}`
- [ ] Check Gmail SPAM folder
- [ ] Open browser console for error messages (F12 → Console)

### Check Browser Console
Press **F12** and go to **Console** tab:
1. Fill the form and click "Send Message"
2. Look for error messages
3. Share the error in console for debugging

---

## 📧 Alternative: FormSubmit (Zero Setup)

If EmailJS continues to be problematic, I can switch you to **FormSubmit** - no setup required!

Simply let me know and I'll:
- Change form to use FormSubmit endpoint
- Emails go directly to: `prakharsaxena230706@gmail.com`
- No API keys needed

---

## Quick Reference
| Item | Where to Find |
|------|---------------|
| Public Key | Account → API Keys |
| Service ID | Email Services → Copy ID |
| Template ID | Email Templates → Copy ID |
| Test Email | Check Gmail inbox |

Good luck! 🚀
