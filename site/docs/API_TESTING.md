# API Testing Guide

## Prerequisites

1. Copy `.env.example` to `.env.local`
2. Set `APPS_SCRIPT_WEBHOOK_URL` (already has default)
3. Set `APPS_SCRIPT_SHARED_SECRET` to match your Apps Script `HFF_SHARED_SECRET`
4. Run the one-time setup to initialize sheets (see below)
5. Start dev server: `npm run dev`

## One-Time Sheet Setup

Before testing, initialize all Google Sheets with proper headers:

```bash
curl -X POST "https://script.google.com/a/macros/heartfwd.info/s/AKfycbxNoBvZ0OtrSg0V5DXgEGvmOIRHMYpQ6TON7k500JsVuQKMu934hBolLzB4xCzO1tk4/exec" \
  -H "Content-Type: application/json" \
  -d '{"secret":"YOUR_SHARED_SECRET","action":"setup"}'
```

This creates "Submissions" tabs with proper headers in all 5 spreadsheets.

**Expected Response:**
```json
{
  "ok": true,
  "message": "Setup complete",
  "results": {
    "apply": { "createdTab": true, "wroteHeaders": true, "finalHeaderCount": 18 },
    "contact": { "createdTab": true, "wroteHeaders": true, "finalHeaderCount": 11 },
    ...
  }
}
```

## Test Commands

### 1. Test Contact Intake

```bash
curl -X POST http://localhost:3000/api/intake/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "512-555-1234",
    "topic": "scholarships",
    "message": "This is a test contact submission.",
    "newsletterOptIn": true
  }'
```

**Expected Response (Success):**
```json
{
  "ok": true,
  "message": "Thank you for reaching out. We'll respond within 24-48 hours."
}
```

**Expected Response (Validation Error):**
```json
{
  "ok": false,
  "error": "Validation failed",
  "errors": [
    { "field": "email", "message": "Please enter a valid email address" }
  ]
}
```

### 2. Test Volunteer Intake

```bash
curl -X POST http://localhost:3000/api/intake/volunteer \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test Volunteer",
    "email": "volunteer@example.com",
    "phone": "512-555-2345",
    "preferredContactMethod": "email",
    "interests": ["events", "outreach"],
    "availability": "Weekends and some evenings",
    "notes": "Excited to help!",
    "consentAcknowledged": true
  }'
```

**Expected Response:**
```json
{
  "ok": true,
  "message": "Thank you for your interest in volunteering. We'll follow up with next steps."
}
```

### 3. Test Partner Intake

```bash
curl -X POST http://localhost:3000/api/intake/partner \
  -H "Content-Type: application/json" \
  -d '{
    "organizationName": "Test Organization",
    "contactName": "Jane Partner",
    "email": "partner@testorg.com",
    "partnershipInterest": "sponsorship",
    "notes": "Interested in annual sponsorship"
  }'
```

**Expected Response:**
```json
{
  "ok": true,
  "message": "Thank you for your partnership interest. Our team will be in touch soon."
}
```

### 4. Test Apply Endpoint

```bash
curl -X POST http://localhost:3000/api/apply \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Applicant",
    "email": "john@example.com",
    "phone": "512-555-3456",
    "programType": "scholarship",
    "applicationReason": "I am seeking support for my recovery journey and housing assistance.",
    "recoveryStatus": "In recovery for 6 months",
    "currentHousing": "Transitional housing",
    "referralSource": "Friend",
    "consentToContact": true,
    "consentToTerms": true
  }'
```

**Expected Response:**
```json
{
  "ok": true,
  "message": "Application submitted successfully. We'll be in touch soon!"
}
```

### 5. Test Rate Limiting

Run this command 12 times quickly to trigger rate limit:

```bash
for i in {1..12}; do
  curl -X POST http://localhost:3000/api/intake/contact \
    -H "Content-Type: application/json" \
    -d '{"name":"Test","email":"test@test.com","topic":"other","message":"Rate limit test"}' \
    -w "\n"
done
```

**Expected Response (after 10 requests):**
```json
{
  "ok": false,
  "error": "Too many requests. Please try again in X seconds."
}
```

### 6. Test Honeypot Detection

```bash
curl -X POST http://localhost:3000/api/apply \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Bot",
    "lastName": "Test",
    "email": "bot@example.com",
    "applicationReason": "Testing honeypot",
    "consentToContact": true,
    "consentToTerms": true,
    "website": "http://spam-site.com"
  }'
```

**Expected Response:**
```json
{
  "ok": false,
  "error": "Invalid request"
}
```

### 7. Test Invalid Intake Type

```bash
curl -X POST http://localhost:3000/api/intake/invalid-type \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Expected Response:**
```json
{
  "ok": false,
  "error": "Invalid intake type. Supported types: contact, volunteer, partner, homes-verification"
}
```

## Verifying Apps Script Responses

Check your Google Sheets to verify data was recorded:

1. **Contact Sheet** — Should have new row with test contact data
2. **Volunteer Sheet** — Should have new row with volunteer data
3. **Partner Sheet** — Should have new row with partner data
4. **Applications Sheet** — Should have new row with apply data

## Troubleshooting

### "Form submission is not configured"
- Check that `APPS_SCRIPT_WEBHOOK_URL` is set in `.env.local`
- Check that `APPS_SCRIPT_SHARED_SECRET` is set

### "Request timed out"
- Apps Script may be cold starting (try again)
- Check Apps Script logs for errors

### "Failed to submit form"
- Verify Apps Script is deployed and accessible
- Check Apps Script execution logs
- Ensure secret matches between Next.js and Apps Script

### CORS errors in browser console
- Remember: These endpoints are server-to-server only
- Never call Apps Script directly from browser
- Form pages should POST to `/api/...` routes
