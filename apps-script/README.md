# Heart Forward Foundation — Google Apps Script Webhook

This folder contains the Google Apps Script code that receives form submissions from the Heart Forward website and appends them to Google Sheets.

## Architecture

```
[Website Form] → [Next.js API Route] → [Apps Script Webhook] → [Google Sheet]
```

- Single webhook handles all 4 form types
- Routes by `formType` parameter
- Validates required fields
- Auto-ensures headers match schema
- Returns JSON responses

## Setup Instructions

### Step 1: Create the Apps Script Project

1. Go to [script.google.com](https://script.google.com)
2. Click **New Project**
3. Name it: `HFF Forms Webhook`
4. Delete default content in `Code.gs`
5. Copy entire contents of `Code.gs` from this folder and paste

### Step 2: Configure Script Properties

1. In Apps Script editor, click **Project Settings** (gear icon)
2. Scroll to **Script Properties**
3. Add the following properties:

| Property | Value |
|----------|-------|
| `HFF_SECRET` | Generate a secure random string (32+ chars) |
| `CONTACT_SHEET_ID` | `1lr9dNdS1_rnJR5qaA1d7NrWNeC4Em2LtrGI4VZ_Uwgo` |
| `VOLUNTEER_SHEET_ID` | `1BIQwrLomRHYElzDqVQ3XNA_B0xqbyGx7UEwyclEpr-o` |
| `PARTNER_SHEET_ID` | `1bW27Ud_Uuey4vtL2Dn8eZyPJg94Ip5zcXy6d9Bdk7xM` |
| `HOMES_SHEET_ID` | `19c7LE2eJz_Zsrr5_zS40N3SrEqSeGcM5SooGhgkajEA` |

### Step 3: Grant Permissions to Sheets

The Apps Script needs editor access to all 4 Google Sheets:

1. Open each Google Sheet URL
2. Click **Share** button
3. Add the email address associated with your Google account running the Apps Script
4. Give **Editor** access

### Step 4: Initialize Sheet Headers

1. In Apps Script editor, select function: `initializeAllSheets`
2. Click **Run**
3. Grant permissions when prompted (first run only)
4. Check **Execution log** for results

This will:
- Set correct headers in row 1 of each sheet
- Bold the header row
- Freeze the header row
- Auto-resize columns

### Step 5: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click gear icon → **Web app**
3. Configure:
   - **Description**: `HFF Forms v1.0`
   - **Execute as**: `Me`
   - **Who has access**: `Anyone`
4. Click **Deploy**
5. Copy the **Web app URL** (looks like: `https://script.google.com/macros/s/xxx.../exec`)

### Step 6: Configure Website Environment

Add to your `.env.local` file:

```bash
# Google Sheets Form Backend
GOOGLE_APPS_SCRIPT_WEBHOOK=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
HFF_SHEETS_SECRET=your_same_secret_from_step_2
```

## Sheet Schemas

### Contact Form
| Column | Field | Required | Notes |
|--------|-------|----------|-------|
| A | Timestamp | Auto | ISO 8601 format |
| B | Name | Yes | |
| C | Email | Yes | |
| D | Phone | No | |
| E | Topic | Yes | Dropdown: Scholarships, Resources, Events, Volunteering, Partnership, Other |
| F | Message | Yes | |
| G | Newsletter Opt-in | No | Yes/No |

### Volunteer Form
| Column | Field | Required | Notes |
|--------|-------|----------|-------|
| A | Timestamp | Auto | ISO 8601 format |
| B | Full Name | Yes | |
| C | Email | Yes | |
| D | Phone | No | |
| E | Preferred Contact Method | No | Dropdown: Email, Text, Phone |
| F | Interests | No | Comma-separated |
| G | Availability | Yes | |
| H | Notes | No | |
| I | Consent Acknowledged | Yes | Yes/No |

### Partner Form
| Column | Field | Required | Notes |
|--------|-------|----------|-------|
| A | Timestamp | Auto | ISO 8601 format |
| B | Organization Name | Yes | |
| C | Contact Name | Yes | |
| D | Email | Yes | |
| E | Partnership Interest | Yes | Dropdown: Sponsorship, In-kind, Referral partner, Other |
| F | Notes | No | |

### Homes Verification
| Column | Field | Required | Notes |
|--------|-------|----------|-------|
| A | Timestamp | Auto | |
| B | Is Recovery Home | Yes | Yes/No |
| C | Has Capacity (2+) | Yes | Yes/No |
| D | Accepts Referrals | Yes | Yes/No |
| E | Has House Rules | Yes | Yes/No |
| F | Home Name | Yes | |
| G | Contact Name | Yes | |
| H | Email | Yes | |
| I | Phone | Yes | |
| J | Website | No | |
| K | Operating Length | No | Less than 1 year, 1-2 years, 3-5 years, 5+ years |
| L | Description | No | |
| M | Street Address | Yes | |
| N | City | Yes | |
| O | State | Yes | |
| P | ZIP Code | Yes | |
| Q | Total Capacity | Yes | Number |
| R | Current Openings | No | Number |
| S | Gender Served | Yes | Men only, Women only, All genders, Other |
| T | Monthly Cost | No | Dollar amount |
| U | Recovery Program Required | Yes | Yes, No, Encouraged but not required |
| V | MAT Allowed | No | Yes, No, Case by case |
| W | House Rules | No | Comma-separated |
| X | Staffing Level | Yes | 24/7, Part-time, On-call, No |
| Y | Relapse Approach | No | |
| Z | Certifications | No | Comma-separated |
| AA | Additional Notes | No | |
| AB | Confirmed Accurate | Yes | Yes/No |
| AC | Allow Contact | Yes | Yes/No |
| AD | Notify Changes | Yes | Yes/No |

## API Usage

### POST Request Format

```json
{
  "formType": "contact|volunteer|partner|homes",
  "data": {
    // Form-specific fields
  },
  "secret": "your_hff_secret"
}
```

### Response Format

Success:
```json
{
  "ok": true,
  "message": "contact form submitted successfully"
}
```

Error:
```json
{
  "ok": false,
  "error": "Missing required fields: email, message"
}
```

## Testing

### Manual Test via Apps Script

1. Open Apps Script editor
2. Select function: `testContactSubmission`
3. Click **Run**
4. Check Execution log and Google Sheet

### Schema Verification

GET request to webhook URL with `?action=verify-schemas` returns a detailed report of all sheets:

```bash
curl "YOUR_WEBHOOK_URL?action=verify-schemas"
```

### Test from Website

After configuring environment variables:

1. Go to contact page
2. Fill out form
3. Submit
4. Check Google Sheet for new row

## Troubleshooting

### "Invalid secret" error
- Verify `HFF_SECRET` in Script Properties matches `.env.local`
- Ensure no trailing spaces

### "Sheet ID not configured" error
- Check Script Properties are set correctly
- Property names are case-sensitive

### Headers don't match
- Run `initializeAllSheets` function to reset headers
- Or manually edit first row in Google Sheet

### Permission denied on sheet
- Ensure Apps Script account has Editor access to all 4 sheets
- Check sharing settings on each Google Sheet

### No data appearing
- Check Execution log in Apps Script for errors
- Verify webhook URL is correct (must end with `/exec`)
- Test with `doGet` first (just visit URL in browser)

## Updating the Script

When making changes:

1. Edit `Code.gs` in Apps Script editor
2. Save (Ctrl/Cmd + S)
3. **Deploy** → **Manage deployments**
4. Click pencil icon on active deployment
5. Set **Version** to `New version`
6. Click **Deploy**

Note: The webhook URL stays the same after updates.

## Security Notes

- The `HFF_SECRET` provides basic protection against unauthorized submissions
- Always transmit secret over HTTPS (Apps Script enforces this)
- Consider adding rate limiting if abuse occurs
- Monitor Google Sheet for suspicious patterns
- Never expose the secret in client-side code
