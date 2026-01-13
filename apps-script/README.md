# Heart Forward Foundation - Apps Script Form Handler

Schema-driven Google Sheets form submission handler with automatic header management.

## Architecture

```
Next.js API Route  →  Apps Script Web App  →  Google Sheets
     (POST)              (doPost)             (append row)
```

## Files

| File | Purpose |
|------|---------|
| `Code.gs` | Main entry point, doPost/doGet handlers |
| `config.gs` | TYPE_CONFIG with spreadsheet IDs and headers |
| `sheets.gs` | Sheet/header management, row appending |
| `util.gs` | JSON helpers, object flattening |

## Deployment

### Step 1: Create Apps Script Project

1. Go to [script.google.com](https://script.google.com)
2. Create a new project: "HFF Form Handler"
3. Delete the default `Code.gs` content

### Step 2: Add All Files

Copy each `.gs` file from this folder into the Apps Script editor:
- `Code.gs`
- `config.gs`
- `sheets.gs`
- `util.gs`

### Step 3: Set Script Properties

1. Click **Project Settings** (gear icon)
2. Scroll to **Script Properties**
3. Add property:
   - **Name:** `HFF_SHARED_SECRET`
   - **Value:** (same value as `APPS_SCRIPT_SHARED_SECRET` in Next.js `.env.local`)

### Step 4: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Settings:
   - **Type:** Web app
   - **Execute as:** Me
   - **Who has access:** Anyone
3. Click **Deploy**
4. Copy the Web App URL

### Step 5: Update Next.js Environment

Add to `site/.env.local`:
```bash
APPS_SCRIPT_WEBHOOK_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
APPS_SCRIPT_SHARED_SECRET=your-random-32-char-secret
```

## One-Time Setup

After deployment, run the setup command to initialize all sheets with headers:

```bash
curl -X POST "https://script.google.com/a/macros/heartfwd.info/s/AKfycbxNoBvZ0OtrSg0V5DXgEGvmOIRHMYpQ6TON7k500JsVuQKMu934hBolLzB4xCzO1tk4/exec" \
  -H "Content-Type: application/json" \
  -d '{"secret":"YOUR_SHARED_SECRET","action":"setup"}'
```

Expected response:
```json
{
  "ok": true,
  "message": "Setup complete",
  "results": {
    "apply": { "createdTab": true, "wroteHeaders": true, "finalHeaderCount": 18 },
    "contact": { "createdTab": true, "wroteHeaders": true, "finalHeaderCount": 11 },
    "volunteer": { "createdTab": true, "wroteHeaders": true, "finalHeaderCount": 13 },
    "partner": { "createdTab": true, "wroteHeaders": true, "finalHeaderCount": 10 },
    "homes-verification": { "createdTab": true, "wroteHeaders": true, "finalHeaderCount": 34 }
  }
}
```

## Header Schemas

### Universal Columns (all types)
| Column | Description |
|--------|-------------|
| `submittedAt` | ISO timestamp from submission |
| `sourceType` | Form type identifier |
| `status` | Default: "Submitted" |
| `adminNotes` | For manual notes |

### Apply Form (18 columns)
```
submittedAt, sourceType, status, adminNotes,
firstName, lastName, email, phone,
programType, applicationReason,
recoveryStatus, sobrietyDate, currentHousing,
referralSource, additionalNotes,
consentToContact, consentToTerms,
rawJson
```

### Contact Form (11 columns)
```
submittedAt, sourceType, status, adminNotes,
name, email, phone, topic, message, newsletterOptIn,
rawJson
```

### Volunteer Form (13 columns)
```
submittedAt, sourceType, status, adminNotes,
fullName, email, phone, preferredContactMethod,
interests, availability, notes, consentAcknowledged,
rawJson
```

### Partner Form (10 columns)
```
submittedAt, sourceType, status, adminNotes,
organizationName, contactName, email, partnershipInterest, notes,
rawJson
```

### Homes Verification Form (34 columns)
```
submittedAt, sourceType, status, adminNotes,
eligibility.isRecoveryHome, eligibility.hasCapacity, eligibility.acceptsReferrals, eligibility.hasHouseRules,
about.homeName, about.contactName, about.email, about.phone, about.website, about.operatingLength, about.description,
location.streetAddress, location.city, location.state, location.zip, location.totalCapacity, location.currentOpenings, location.genderServed, location.monthlyCost,
policies.recoveryProgramRequired, policies.matAllowed, policies.houseRules, policies.staffingLevel, policies.relapseApproach, policies.certifications, policies.additionalNotes,
consent.confirmAccurate, consent.allowContact, consent.notifyChanges,
rawJson
```

## Testing

### Test Contact Submission

```bash
curl -X POST "APPS_SCRIPT_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "YOUR_SECRET",
    "type": "contact",
    "submittedAt": "2025-01-13T12:00:00Z",
    "data": {
      "name": "Test User",
      "email": "test@example.com",
      "phone": "512-555-1234",
      "topic": "scholarships",
      "message": "Test message",
      "newsletterOptIn": true
    }
  }'
```

### Test Apply Submission

```bash
curl -X POST "APPS_SCRIPT_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "YOUR_SECRET",
    "type": "apply",
    "submittedAt": "2025-01-13T12:00:00Z",
    "data": {
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "phone": "512-555-5678",
      "programType": "scholarship",
      "applicationReason": "Seeking support for recovery journey",
      "consentToContact": true,
      "consentToTerms": true
    }
  }'
```

### Test Homes Verification Submission

```bash
curl -X POST "APPS_SCRIPT_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "secret": "YOUR_SECRET",
    "type": "homes-verification",
    "submittedAt": "2025-01-13T12:00:00Z",
    "data": {
      "eligibility": {
        "isRecoveryHome": "yes",
        "hasCapacity": "yes",
        "acceptsReferrals": "yes",
        "hasHouseRules": "yes"
      },
      "about": {
        "homeName": "Hope House",
        "contactName": "Jane Manager",
        "email": "jane@hopehouse.com",
        "phone": "512-555-9999"
      },
      "location": {
        "streetAddress": "123 Recovery St",
        "city": "Austin",
        "state": "TX",
        "zip": "78701",
        "totalCapacity": "12",
        "genderServed": "all"
      },
      "policies": {
        "recoveryProgramRequired": "yes",
        "staffingLevel": "24/7",
        "houseRules": ["No drugs", "Curfew"],
        "certifications": ["NARR Level 2"]
      },
      "consent": {
        "confirmAccurate": true,
        "allowContact": true,
        "notifyChanges": true
      }
    }
  }'
```

## Verification Checklist

After running setup:

- [ ] Open Applications spreadsheet - verify "Submissions" tab with 18 columns
- [ ] Open Contact spreadsheet - verify "Submissions" tab with 11 columns
- [ ] Open Volunteer spreadsheet - verify "Submissions" tab with 13 columns
- [ ] Open Partner spreadsheet - verify "Submissions" tab with 10 columns
- [ ] Open Homes Verification spreadsheet - verify "Submissions" tab with 34 columns

After test submissions:

- [ ] Check row 2 in each sheet has test data
- [ ] Verify each field is in the correct column
- [ ] Verify arrays are comma-separated (e.g., interests, houseRules)
- [ ] Verify booleans show as "Yes"/"No"
- [ ] Verify rawJson column contains full submission

## Troubleshooting

### "Unauthorized" Error
- Check `HFF_SHARED_SECRET` is set in Script Properties
- Verify secret matches between Next.js and Apps Script

### "Unknown type" Error
- Valid types: `apply`, `contact`, `volunteer`, `partner`, `homes-verification`

### Headers Not Appearing
- Run the setup action first
- Check Script Properties for spreadsheet IDs

### Missing Columns
- Run setup again - it will append missing columns to the right
- Existing data is preserved

## Spreadsheet Links

| Type | Spreadsheet ID |
|------|----------------|
| Applications | `1SlW2d3qnOIO4gOFt_C683UrcZv7bl7f9nadbj01QQhA` |
| Contact | `1lr9dNdS1_rnJR5qaA1d7NrWNeC4Em2LtrGI4VZ_Uwgo` |
| Volunteer | `1BIQwrLomRHYElzDqVQ3XNA_B0xqbyGx7UEwyclEpr-o` |
| Partner | `1bW27Ud_Uuey4vtL2Dn8eZyPJg94Ip5zcXy6d9Bdk7xM` |
| Homes Verification | `19c7LE2eJz_Zsrr5_zS40N3SrEqSeGcM5SooGhgkajEA` |
