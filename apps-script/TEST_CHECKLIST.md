# Heart Forward Forms — Test Checklist

## Pre-Testing Setup

### 1. Apps Script Configuration
- [ ] Created Apps Script project at script.google.com
- [ ] Pasted `Code.gs` content into editor
- [ ] Set Script Properties:
  - [ ] `HFF_SECRET` (32+ character random string)
  - [ ] `CONTACT_SHEET_ID` = `1lr9dNdS1_rnJR5qaA1d7NrWNeC4Em2LtrGI4VZ_Uwgo`
  - [ ] `VOLUNTEER_SHEET_ID` = `1BIQwrLomRHYElzDqVQ3XNA_B0xqbyGx7UEwyclEpr-o`
  - [ ] `PARTNER_SHEET_ID` = `1bW27Ud_Uuey4vtL2Dn8eZyPJg94Ip5zcXy6d9Bdk7xM`
  - [ ] `HOMES_SHEET_ID` = `19c7LE2eJz_Zsrr5_zS40N3SrEqSeGcM5SooGhgkajEA`
- [ ] Ran `initializeAllSheets` function to set up headers
- [ ] Deployed as Web App (Execute as: Me, Access: Anyone)
- [ ] Copied deployment URL

### 2. Website Configuration
- [ ] Created `.env.local` from `.env.example`
- [ ] Set `GOOGLE_APPS_SCRIPT_WEBHOOK` to deployment URL
- [ ] Set `HFF_SHEETS_SECRET` to same value as Apps Script
- [ ] Restarted dev server (`npm run dev`)

### 3. Google Sheets Access
- [ ] Verified Apps Script account has Editor access to all 4 sheets

---

## Schema Verification

### Method 1: Browser Check
Visit your webhook URL with `?action=verify-schemas` appended:
```
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?action=verify-schemas
```

Expected response:
```json
{
  "ok": true,
  "timestamp": "2024-...",
  "sheets": {
    "contact": { "configured": true, "headersValid": true, ... },
    "volunteer": { "configured": true, "headersValid": true, ... },
    "partner": { "configured": true, "headersValid": true, ... },
    "homes": { "configured": true, "headersValid": true, ... }
  }
}
```

### Method 2: Manual Sheet Check

#### Contact Sheet Headers (Row 1)
| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| Timestamp | Name | Email | Phone | Topic | Message | Newsletter Opt-in |

#### Volunteer Sheet Headers (Row 1)
| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Timestamp | Full Name | Email | Phone | Preferred Contact Method | Interests | Availability | Notes | Consent Acknowledged |

#### Partner Sheet Headers (Row 1)
| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Timestamp | Organization Name | Contact Name | Email | Partnership Interest | Notes |

#### Homes Sheet Headers (Row 1)
| Col | Header |
|-----|--------|
| A | Timestamp |
| B | Is Recovery Home |
| C | Has Capacity (2+) |
| D | Accepts Referrals |
| E | Has House Rules |
| F | Home Name |
| G | Contact Name |
| H | Email |
| I | Phone |
| J | Website |
| K | Operating Length |
| L | Description |
| M | Street Address |
| N | City |
| O | State |
| P | ZIP Code |
| Q | Total Capacity |
| R | Current Openings |
| S | Gender Served |
| T | Monthly Cost |
| U | Recovery Program Required |
| V | MAT Allowed |
| W | House Rules |
| X | Staffing Level |
| Y | Relapse Approach |
| Z | Certifications |
| AA | Additional Notes |
| AB | Confirmed Accurate |
| AC | Allow Contact |
| AD | Notify Changes |

---

## Form Tests

### Test 1: Contact Form
**URL:** `/contact`

**Test Data:**
```
Name: Test Contact User
Email: test@example.com
Phone: 512-555-1234
Topic: Scholarships
Message: This is a test contact form submission.
Newsletter: ✓ Checked
```

**Expected Results:**
- [ ] Form shows loading spinner on submit
- [ ] Success message displayed after submission
- [ ] New row appears in Contact sheet with:
  - [ ] Timestamp in Column A
  - [ ] Name in Column B
  - [ ] Email in Column C
  - [ ] Phone in Column D
  - [ ] Topic shows "Scholarships" in Column E
  - [ ] Message in Column F
  - [ ] Newsletter shows "Yes" in Column G

**Validation Tests:**
- [ ] Submit with empty name → Shows "Name is required" error
- [ ] Submit with invalid email → Shows "Please enter a valid email" error
- [ ] Submit with no topic selected → Shows "Please select a topic" error
- [ ] Submit with empty message → Shows "Message is required" error

---

### Test 2: Volunteer Form
**URL:** `/get-involved/volunteer`

**Test Data:**
```
Full Name: Test Volunteer User
Email: volunteer@example.com
Phone: 512-555-2345
Preferred Contact: Email
Interests: [Events, Outreach]
Availability: Weekday evenings and weekends
Notes: Test volunteer submission
Consent: ✓ Checked
```

**Expected Results:**
- [ ] Form shows loading spinner on submit
- [ ] Success message displayed after submission
- [ ] New row appears in Volunteer sheet with:
  - [ ] Timestamp in Column A
  - [ ] Full Name in Column B
  - [ ] Email in Column C
  - [ ] Phone in Column D
  - [ ] Contact Method shows "Email" in Column E
  - [ ] Interests shows "events, outreach" in Column F
  - [ ] Availability in Column G
  - [ ] Notes in Column H
  - [ ] Consent shows "Yes" in Column I

**Validation Tests:**
- [ ] Submit without consent → Shows consent error
- [ ] Submit with empty availability → Shows error
- [ ] Submit with no email → Shows error

---

### Test 3: Partner Form
**URL:** `/get-involved/partner`

**Test Data:**
```
Organization: Test Organization Inc
Contact Name: Jane Partner
Email: partner@testorg.com
Interest: Sponsorship
Notes: Interested in annual sponsorship
```

**Expected Results:**
- [ ] Form shows loading spinner on submit
- [ ] Success message displayed after submission
- [ ] New row appears in Partner sheet with:
  - [ ] Timestamp in Column A
  - [ ] Organization in Column B
  - [ ] Contact Name in Column C
  - [ ] Email in Column D
  - [ ] Interest shows "Sponsorship" in Column E
  - [ ] Notes in Column F

**Validation Tests:**
- [ ] Submit with empty organization → Shows error
- [ ] Submit with empty contact name → Shows error
- [ ] Submit with no interest selected → Shows error

---

### Test 4: Homes Verification Funnel
**URL:** `/homes/apply/eligibility` (start of funnel)

**Test Data:**

**Step 1 - Eligibility:**
- Is Recovery Home: Yes
- Has Capacity: Yes
- Accepts Referrals: Yes
- Has House Rules: Yes

**Step 2 - About:**
- Home Name: Test Recovery Home
- Contact Name: John Manager
- Email: manager@testrecovery.com
- Phone: 512-555-3456
- Website: https://testrecovery.com
- Operating: 3-5 years
- Description: A supportive recovery environment

**Step 3 - Location:**
- Address: 123 Recovery Lane
- City: Austin
- State: TX
- ZIP: 78701
- Total Capacity: 12
- Current Openings: 3
- Gender Served: All genders
- Monthly Cost: 850

**Step 4 - Policies:**
- Recovery Program: Yes
- MAT Allowed: Yes
- House Rules: [No alcohol or drugs, Curfew hours, Mandatory meetings]
- Staffing: Part-time
- Relapse Approach: Supportive, case-by-case evaluation
- Certifications: [NARR, State licensing]
- Notes: Additional test notes

**Step 5 - Review & Consent:**
- All three checkboxes: ✓ Checked

**Expected Results:**
- [ ] Funnel saves progress between steps
- [ ] Review page shows all entered data
- [ ] Submit shows loading state
- [ ] Redirects to thanks page on success
- [ ] New row appears in Homes sheet with all 30 columns populated

**Key Columns to Verify:**
- [ ] Column A: Timestamp
- [ ] Columns B-E: All "Yes"
- [ ] Column F: "Test Recovery Home"
- [ ] Column G: "John Manager"
- [ ] Column S: "All genders"
- [ ] Column U: "Yes"
- [ ] Column W: "No alcohol or drugs on premises, Curfew hours, Mandatory house meetings"
- [ ] Columns AB-AD: All "Yes"

---

## Error Handling Tests

### Network Error
- [ ] Disconnect internet, submit form → Shows friendly error message
- [ ] Reconnect and retry → Form submits successfully

### Invalid Secret
- [ ] Change HFF_SHEETS_SECRET in .env.local to wrong value
- [ ] Submit any form → Shows error message (check server logs for "Invalid secret")

### Missing Configuration
- [ ] Remove GOOGLE_APPS_SCRIPT_WEBHOOK from .env.local
- [ ] Submit any form → Shows "Form submission is not configured" error

---

## Performance Tests

### Response Time
- [ ] Contact form submits in < 3 seconds
- [ ] Volunteer form submits in < 3 seconds
- [ ] Partner form submits in < 3 seconds
- [ ] Homes funnel submits in < 5 seconds

---

## Browser Compatibility

Test each form in:
- [ ] Chrome (desktop)
- [ ] Safari (desktop)
- [ ] Firefox (desktop)
- [ ] Chrome (mobile)
- [ ] Safari (iOS)

---

## Post-Testing Cleanup

- [ ] Delete test rows from all 4 Google Sheets
- [ ] Or mark test rows clearly (add "TEST" in a notes column)

---

## Sign-Off

| Test Category | Pass | Fail | Notes |
|--------------|------|------|-------|
| Apps Script Setup | | | |
| Schema Verification | | | |
| Contact Form | | | |
| Volunteer Form | | | |
| Partner Form | | | |
| Homes Funnel | | | |
| Error Handling | | | |
| Performance | | | |

**Tested By:** _________________
**Date:** _________________
**Build Version:** _________________
