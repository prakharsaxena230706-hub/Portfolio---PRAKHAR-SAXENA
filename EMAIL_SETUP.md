# Email Integration Setup Guide

Your contact form is now integrated with **EmailJS** to send messages directly to your Gmail inbox.

## Setup Instructions

Follow these steps to complete the email integration:

### Step 1: Create an EmailJS Account
1. Go to https://www.emailjs.com/
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Set Up Gmail Service
1. Log in to your EmailJS dashboard
2. Go to **Email Services** (left sidebar)
3. Click **Add Service**
4. Select **Gmail**
5. Click **Connect Account**
6. Sign in with your Gmail account (prakharsaxena230706@gmail.com)
7. Grant EmailJS permission to send emails
8. Copy the **Service ID** (looks like: `service_xxxxx`)

### Step 3: Create Email Template
1. Go to **Email Templates** (left sidebar)
2. Click **Create New Template**
3. Set template name to: `contact_form_template`
4. Use the following template content:

```
Subject: {{subject}}

From: {{from_name}} ({{from_email}})

Message:
{{message}}
```

5. Click **Save**
6. Copy the **Template ID** (looks like: `template_xxxxx`)

### Step 4: Get Your Public Key
1. Go to **Account** (top right menu)
2. Click **API Keys**
3. Copy your **Public Key** (looks like: `xxxxxxxxxxxxxxxxxxxxx`)

### Step 5: Update Your Code
Open `script.js` and replace these three placeholders with your credentials:

```javascript
emailjs.init("YOUR_PUBLIC_KEY");  // Line 320 - Replace with your public key
"YOUR_SERVICE_ID",               // Line 336 - Replace with your service ID
"YOUR_TEMPLATE_ID",              // Line 337 - Replace with your template ID
```

**Example:**
```javascript
emailjs.init("j8k2m3n4o5p6q7r8s9t0u1v2");
"service_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
"template_x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6",
```

### Step 6: Test Your Form
1. Save all changes
2. Open your portfolio in a browser
3. Go to the "Get In Touch" section
4. Fill out the contact form
5. Click "Send Message"
6. Check your Gmail inbox (prakharsaxena230706@gmail.com) for the message

## Security Notes
- EmailJS handles email sending securely without exposing your actual email address to the client
- Your public key is safe to expose (it's meant to be public)
- Never share your private key or API credentials in code

## Troubleshooting

**"Failed to send email" error:**
- Double-check that you've replaced all three placeholders correctly
- Verify your Service ID and Template ID match your EmailJS dashboard
- Ensure your Gmail account is connected in the EmailJS dashboard

**Emails not arriving:**
- Check your Gmail spam/junk folder
- Verify the recipient email in script.js is correct: `prakharsaxena230706@gmail.com`
- Test by sending from EmailJS dashboard to confirm service works

**Template not matching:**
- Make sure the template variable names match: `{{subject}}`, `{{from_name}}`, `{{from_email}}`, `{{message}}`
- Underscores and hyphens matter in variable names

## Alternative: Using FormSubmit (No Setup Required)

If you prefer a solution with even less setup, you can use FormSubmit instead:
- Simply change the form action to: `https://formsubmit.co/prakharsaxena230706@gmail.com`
- No API keys needed
- It will send emails automatically

For more details on alternatives, visit: https://formspree.io/ or https://getform.io/
