# Heart Forward Foundation — Site Audit & Remediation Plan

**Date:** 2026-01-14
**Auditor:** Claude Code
**Status:** Ready for Developer Review

---

## Executive Summary

This document provides a comprehensive audit of the Heart Forward Foundation website identifying **4 critical issues** and **12 enhancement items**. The audit covers form submission failures, UI/UX issues, color system problems, and clickable element design flaws.

---

## PART 1: CRITICAL ISSUES

### Issue #1: Form Submission Pipeline — BROKEN

**Severity:** CRITICAL
**Status:** Forms submit successfully to API but data never reaches Google Sheets

#### Root Cause Analysis

The form submission pipeline has a **type mismatch** between the Next.js API and the Google Apps Script:

```
Frontend Form → POST /api/homes/apply → submitHomesForm() → Google Apps Script
                                              ↓
                                    formType: "homes"  ← WRONG
                                              ↓
                                    Apps Script expects: "homes-verification"
```

#### Technical Details

| Component | Location | Issue |
|-----------|----------|-------|
| **Form Page** | `site/src/app/homes/apply/review/page.tsx:73` | Posts to `/api/homes/apply` ✅ |
| **API Route** | `site/src/app/api/homes/apply/route.ts:40` | Calls `submitHomesForm()` ✅ |
| **GoogleSheets Util** | `site/src/lib/forms/googleSheets.ts:197-200` | Sends `formType: "homes"` ❌ |
| **Apps Script Config** | `apps-script/config.gs:132` | Expects type: `"homes-verification"` ❌ |

#### The Mismatch

```javascript
// googleSheets.ts line 197-200
export async function submitHomesForm(data: HomesFormPayload): Promise<WebhookResponse> {
  return submitToGoogleSheets({
    formType: "homes",     // ❌ WRONG - sends "homes"
    data,
  });
}

// Apps Script config.gs expects:
TYPE_CONFIG = {
  'homes-verification': { ... }  // ❌ MISMATCH - expects "homes-verification"
}
```

#### Additional Issue: Environment Variables

The `submitToGoogleSheets` function reads:
- `GOOGLE_APPS_SCRIPT_WEBHOOK` ← Legacy variable name
- `HFF_SHEETS_SECRET` ← Legacy variable name

But `.env.example` shows the current variables are:
- `APPS_SCRIPT_WEBHOOK_URL` ← Current variable name
- `APPS_SCRIPT_SHARED_SECRET` ← Current variable name

**If `.env.local` uses the new names, the webhook call silently fails.**

#### Fix Required

```typescript
// Option A: Fix googleSheets.ts to use correct type
export async function submitHomesForm(data: HomesFormPayload): Promise<WebhookResponse> {
  return submitToGoogleSheets({
    formType: "homes-verification",  // ✅ Match Apps Script config
    data,
  });
}

// Option B: Fix Apps Script to accept "homes"
// In config.gs, add alias or rename type to "homes"

// Option C: Fix environment variable names in googleSheets.ts
const webhookUrl = process.env.APPS_SCRIPT_WEBHOOK_URL;  // ✅ Use current name
const secret = process.env.APPS_SCRIPT_SHARED_SECRET;     // ✅ Use current name
```

---

### Issue #2: Flip Card Links Not Clickable — BROKEN

**Severity:** CRITICAL
**Status:** Links visible but click events don't fire

#### Root Cause Analysis

The flip card implementation has **z-index stacking issues** that prevent link clicks from registering:

```
FlipDoorCard.tsx Structure:

<div className="relative" style={{ perspective: "1200px" }}>
  <div style={{ transform: isFlipped ? "rotateY(180deg)" : "..." }}>

    {/* FRONT - z-index not explicitly set */}
    <div style={{ backfaceVisibility: "hidden" }}>
      <CardFront ... />
    </div>

    {/* BACK - z-index not explicitly set */}
    <div style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
      <CardBack options={options} ... />  ← Links are here
    </div>

  </div>
</div>
```

#### Technical Details

| Component | Location | Issue |
|-----------|----------|-------|
| **CardBack links** | `FlipDoorCard.tsx:355-369` | Links exist with `z-30` class |
| **Parent container** | `FlipDoorCard.tsx:206-224` | No explicit z-index hierarchy |
| **Click handler** | `FlipDoorCard.tsx:304-306` | `stopPropagation` is set correctly |

#### The Problem

The CSS `backfaceVisibility: "hidden"` combined with 3D transforms creates a stacking context where:
1. When card flips, the back face becomes visible
2. But the front face (now hidden) still intercepts pointer events
3. The `pointer-events` CSS property is not explicitly controlled

#### Fix Required

```tsx
// In FlipDoorCard.tsx, add pointer-events control:

{/* Front - disable pointer events when flipped */}
<div
  className={cn(
    "absolute inset-0 rounded-[24px] p-6 sm:p-8",
    cardGradient,
    isFlipped && "pointer-events-none"  // ✅ Add this
  )}
  style={{ backfaceVisibility: "hidden", minHeight: cardMinHeight }}
>
  <CardFront ... />
</div>

{/* Back - only enable pointer events when flipped */}
<div
  className={cn(
    "absolute inset-0 rounded-[24px] p-6 sm:p-8",
    cardGradient,
    !isFlipped && "pointer-events-none"  // ✅ Add this
  )}
  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
>
  <CardBack ... />
</div>
```

---

### Issue #3: Color System — Brown Tones Creating Muted Appearance

**Severity:** HIGH
**Status:** Design refresh needed

#### Current Color Analysis

```css
/* globals.css current values */
--hf-bg-base: #1a1512;        /* Dark brown-charcoal */
--hf-bg-elevated: #2a2520;    /* Warm brown */
--hf-text-muted: #8a8070;     /* Brown-gray */
--hf-amber: #c4623a;          /* Orange-brown */
--hf-amber-dark: #8a3f24;     /* Dark brown-orange */
--hf-btn-cream-text: #3a2a20; /* Brown text */
```

#### Color Theory Analysis

**Problem:** The current palette uses analogous warm browns/oranges which:
1. Creates visual monotony (everything blends together)
2. Reduces contrast and visual hierarchy
3. Feels muted and "muddy" rather than vibrant

**Solution:** Replace browns with a **split-complementary** purple/red scheme:

```
Current: Brown → Orange → Amber (analogous, muddy)
Proposed: Deep Purple ↔ Ruby Red ↔ Cream (split-complementary, vibrant)
```

#### Recommended New Color Palette

```css
:root {
  /* Background - Deep charcoal-violet (removes brown undertones) */
  --hf-bg-base: #15131a;          /* Cool dark purple-black */
  --hf-bg-elevated: #1f1d26;      /* Elevated purple-charcoal */

  /* Text - Pure cream without brown cast */
  --hf-text-primary: #f8f6f2;     /* Warm white cream */
  --hf-text-secondary: #c5c0b8;   /* Neutral gray-cream */
  --hf-text-muted: #7a7572;       /* Neutral gray (no brown) */

  /* Brand: Deep Plum (replacing maroon) */
  --hf-plum: #5C3158;             /* From card - rich purple-magenta */
  --hf-plum-dark: #4A2848;        /* Darker plum */
  --hf-plum-light: #6B3A68;       /* Lighter plum */

  /* Brand: Ruby Red (replacing amber) */
  --hf-ruby: #8B2D3A;             /* From card - rich red */
  --hf-ruby-dark: #722535;        /* Darker ruby */
  --hf-ruby-light: #A33545;       /* Lighter ruby */

  /* Accent - Vibrant magenta-red for CTAs */
  --hf-accent: #C42D44;           /* Brighter than current */
  --hf-accent-hover: #D43D54;     /* Hover state */

  /* Buttons */
  --hf-btn-cream-bg: #f8f6f2;     /* Pure cream */
  --hf-btn-cream-text: #1a1520;   /* Dark purple-black */
}
```

#### Visual Impact Map

| Element | Before (Brown) | After (Purple/Red) |
|---------|----------------|-------------------|
| Background | #1a1512 (brown-black) | #15131a (purple-black) |
| Cards | Plum + Ruby (good) | Keep as-is (already correct) |
| Elevated sections | #2a2520 (warm brown) | #1f1d26 (cool purple) |
| Muted text | #8a8070 (brown-gray) | #7a7572 (neutral gray) |
| Link hover | amber-light | --hf-ruby-light |

---

### Issue #4: Clickable Elements — Text Links Without Visual Affordance

**Severity:** HIGH
**Status:** UX anti-pattern throughout site

#### Problem Statement

Throughout the site, interactive elements appear as plain text without visual cues:

```tsx
// Current pattern (bad)
<a href="/impact" className="text-[var(--hf-accent)] hover:text-[var(--hf-accent-hover)]">
  See Our Impact
</a>

// What users see: Plain text that happens to be colored
// What users expect: A button or clearly clickable element
```

#### Affected Pages & Locations

| Page | Location | Current | Issue |
|------|----------|---------|-------|
| `page.tsx:224-234` | Homepage "See Our Impact" | Text link with arrow | No button container |
| `page.tsx:247-252` | "How Verification Works" | Button ✅ | Correct |
| `page.tsx:262-265` | "Contact Our Team" | Button ✅ | Correct |
| `about/page.tsx:129-139` | CTA section | Buttons ✅ | Correct |
| Card backs | All flip card options | Styled links | Need stronger visual |

#### Design Standard Required

Every clickable element should follow one of these patterns:

```tsx
// Pattern A: Primary Button (main CTAs)
<Link
  href="/path"
  className="inline-flex items-center justify-center px-6 py-3 rounded-full
             bg-[var(--hf-accent)] text-white font-medium
             hover:bg-[var(--hf-accent-hover)] transition-colors"
>
  Action Text
</Link>

// Pattern B: Secondary Button (alternative actions)
<Link
  href="/path"
  className="inline-flex items-center justify-center px-6 py-3 rounded-full
             border border-[var(--hf-glass-border)] text-[var(--hf-text-primary)]
             font-medium hover:bg-white/5 transition-colors"
>
  Action Text
</Link>

// Pattern C: Text Link (only for inline text, never standalone)
<Link
  href="/path"
  className="underline underline-offset-4 decoration-[var(--hf-accent)]
             hover:decoration-2 transition-all"
>
  Link Text
</Link>
```

---

## PART 2: FORM SUBMISSION SCHEMATICS

### Complete Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           FORM SUBMISSION PIPELINE                           │
└─────────────────────────────────────────────────────────────────────────────┘

USER ACTION
    │
    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ Step 1: Form Completion                                                      │
│ Location: /homes/apply/review/page.tsx                                       │
│                                                                              │
│   User fills multi-step funnel:                                             │
│   /homes/apply/eligibility → /about → /location → /policies → /review      │
│                                                                              │
│   Data stored in HomesFunnelProvider context (localStorage persistence)     │
└─────────────────────────────────────────────────────────────────────────────┘
    │
    │ handleSubmit() called on form submit
    │
    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ Step 2: Frontend API Call                                                    │
│ Location: /homes/apply/review/page.tsx:72-79                                │
│                                                                              │
│   const response = await fetch("/api/homes/apply", {                        │
│     method: "POST",                                                         │
│     headers: { "Content-Type": "application/json" },                        │
│     body: JSON.stringify(data),  // HomesFunnelData                         │
│   });                                                                        │
└─────────────────────────────────────────────────────────────────────────────┘
    │
    │ POST /api/homes/apply
    │
    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ Step 3: Next.js API Route                                                    │
│ Location: /src/app/api/homes/apply/route.ts                                 │
│                                                                              │
│   1. Parse JSON body as HomesFunnelData                                     │
│   2. Run validateSubmission() - check all required fields                   │
│   3. Log submission to console                                              │
│   4. Call submitHomesForm(data) from lib/forms/googleSheets.ts              │
└─────────────────────────────────────────────────────────────────────────────┘
    │
    │ submitHomesForm() called
    │
    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ Step 4: Google Sheets Utility                                                │
│ Location: /src/lib/forms/googleSheets.ts:194-200                            │
│                                                                              │
│   export async function submitHomesForm(data) {                             │
│     return submitToGoogleSheets({                                           │
│       formType: "homes",  ← ❌ WRONG TYPE (should be "homes-verification") │
│       data,                                                                 │
│     });                                                                      │
│   }                                                                          │
└─────────────────────────────────────────────────────────────────────────────┘
    │
    │ submitToGoogleSheets() called
    │
    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ Step 5: Webhook POST                                                         │
│ Location: /src/lib/forms/googleSheets.ts:23-82                              │
│                                                                              │
│   Environment Variables Read:                                               │
│   - GOOGLE_APPS_SCRIPT_WEBHOOK  ← ❌ Legacy name, may not be set           │
│   - HFF_SHEETS_SECRET           ← ❌ Legacy name, may not be set           │
│                                                                              │
│   Payload sent:                                                             │
│   {                                                                         │
│     formType: "homes",          ← ❌ Apps Script doesn't recognize this    │
│     data: { eligibility, about, location, policies, consent },             │
│     secret: "...",                                                          │
│   }                                                                          │
└─────────────────────────────────────────────────────────────────────────────┘
    │
    │ HTTP POST to Apps Script Web App
    │
    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ Step 6: Google Apps Script Receives                                          │
│ Location: apps-script/Code.gs:20-54                                         │
│                                                                              │
│   doPost(e) {                                                               │
│     payload = JSON.parse(e.postData.contents)                               │
│     validateSecret(payload.secret)  // Must match HFF_SHARED_SECRET         │
│     handleSubmission(payload)        // Routes by type                      │
│   }                                                                          │
└─────────────────────────────────────────────────────────────────────────────┘
    │
    │ handleSubmission() checks type
    │
    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ Step 7: Type Validation                                                      │
│ Location: apps-script/config.gs:181-183                                     │
│                                                                              │
│   function getTypeConfig(type) {                                            │
│     return TYPE_CONFIG[type] || null;  // ← Returns null for "homes"       │
│   }                                                                          │
│                                                                              │
│   TYPE_CONFIG keys: ['apply', 'contact', 'volunteer', 'partner',           │
│                      'homes-verification']  ← No "homes" key!              │
└─────────────────────────────────────────────────────────────────────────────┘
    │
    │ Returns error: "Invalid type: homes"
    │
    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│ Step 8: ERROR Response                                                       │
│ Location: apps-script/Code.gs:109-112                                       │
│                                                                              │
│   return errorResponse(                                                     │
│     'Invalid type: homes. Valid types: apply, contact, volunteer, ' +      │
│     'partner, homes-verification',                                          │
│     400                                                                     │
│   );                                                                         │
│                                                                              │
│   ❌ DATA NEVER REACHES GOOGLE SHEET                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Environment Variable Matrix

| Variable (Current) | Variable (Legacy) | Used In | Status |
|--------------------|-------------------|---------|--------|
| `APPS_SCRIPT_WEBHOOK_URL` | `GOOGLE_APPS_SCRIPT_WEBHOOK` | googleSheets.ts:27 | ❌ Mismatch |
| `APPS_SCRIPT_SHARED_SECRET` | `HFF_SHEETS_SECRET` | googleSheets.ts:28 | ❌ Mismatch |
| `HFF_SHARED_SECRET` | — | Apps Script properties | ✅ Correct |

### Form Type Matrix

| Frontend Type | Apps Script Type | Spreadsheet ID | Status |
|---------------|------------------|----------------|--------|
| `"contact"` | `"contact"` | `1lr9dNdS1_...` | ✅ Match |
| `"volunteer"` | `"volunteer"` | `1BIQwrLom...` | ✅ Match |
| `"partner"` | `"partner"` | `1bW27Ud_U...` | ✅ Match |
| `"homes"` | `"homes-verification"` | `19c7LE2eJ...` | ❌ MISMATCH |

---

## PART 3: REMEDIATION CHECKLIST

### Priority 1: Critical Fixes (Do First)

- [ ] **Fix form type mismatch**
  - [ ] Edit `site/src/lib/forms/googleSheets.ts`
  - [ ] Change line 197: `formType: "homes"` → `formType: "homes-verification"`
  - [ ] Test with sample submission
  - [ ] Verify data appears in Google Sheet

- [ ] **Fix environment variable names**
  - [ ] Edit `site/src/lib/forms/googleSheets.ts`
  - [ ] Line 27: `process.env.GOOGLE_APPS_SCRIPT_WEBHOOK` → `process.env.APPS_SCRIPT_WEBHOOK_URL`
  - [ ] Line 28: `process.env.HFF_SHEETS_SECRET` → `process.env.APPS_SCRIPT_SHARED_SECRET`
  - [ ] Verify `.env.local` has these variables set

- [ ] **Fix flip card pointer events**
  - [ ] Edit `site/src/components/FlipDoorCard.tsx`
  - [ ] Add `pointer-events-none` to front face when flipped (line ~184)
  - [ ] Add `pointer-events-none` to back face when not flipped (line ~210)
  - [ ] Test all link clicks on both cards

### Priority 2: Color System Update

- [ ] **Update globals.css color tokens**
  - [ ] Replace `--hf-bg-base: #1a1512` → `#15131a`
  - [ ] Replace `--hf-bg-elevated: #2a2520` → `#1f1d26`
  - [ ] Replace `--hf-text-muted: #8a8070` → `#7a7572`
  - [ ] Remove all amber/brown references
  - [ ] Add plum and ruby as primary brand colors
  - [ ] Update `--hf-accent` to brighter value

- [ ] **Update homepage bokeh background**
  - [ ] Remove brown/amber gradient orbs
  - [ ] Add purple/magenta glow orbs
  - [ ] Keep card colors (already purple/red)

### Priority 3: Clickable Element Standards

- [ ] **Audit and fix all standalone text links**
  - [ ] Homepage "See Our Impact" → Convert to button
  - [ ] Review all pages for plain text links
  - [ ] Apply Pattern A (primary) or Pattern B (secondary) to all CTAs
  - [ ] Keep Pattern C (underlined) only for inline text references

### Priority 4: Site-Wide UX Review

- [ ] **Form progression indicators**
  - [ ] Ensure all multi-step forms have progress bars
  - [ ] Add "Step X of Y" labels

- [ ] **Navigation clarity**
  - [ ] Review header navigation for completeness
  - [ ] Ensure all main sections are accessible from nav

- [ ] **Mobile testing**
  - [ ] Test all flip cards on touch devices
  - [ ] Verify form inputs work on mobile
  - [ ] Check button tap targets (minimum 44px)

---

## PART 4: VERIFICATION WORKFLOW

### After Each Fix

1. **Local Testing**
   ```bash
   npm run dev
   # Test the specific fix in browser
   # Check browser console for errors
   ```

2. **Form Testing Protocol**
   ```
   1. Navigate to /homes/apply
   2. Complete all funnel steps with test data
   3. Submit form
   4. Check browser Network tab for API response
   5. Check server console for logs
   6. Verify row appears in Google Sheet
   ```

3. **Flip Card Testing Protocol**
   ```
   1. Navigate to homepage
   2. Click "See Options" on Support card
   3. Card should flip
   4. Click each link - should navigate
   5. Repeat for Give card
   6. Test on mobile (touch)
   ```

4. **Color Testing Protocol**
   ```
   1. After CSS changes, run build
   2. Check all pages for color consistency
   3. Verify no brown tones remain
   4. Check contrast ratios (WCAG AA minimum)
   ```

### Commit Checkpoints

After each priority section:

```bash
git add -A
git commit -m "fix: [description of fix]"
```

Suggested commits:
1. `fix: Correct homes form type to match Apps Script config`
2. `fix: Update environment variable names in googleSheets utility`
3. `fix: Add pointer-events control to flip card faces`
4. `style: Replace brown palette with purple/red color system`
5. `ux: Convert standalone text links to proper buttons`

---

## PART 5: FILES REQUIRING CHANGES

### Critical Path Files

| File | Changes Required | Priority |
|------|------------------|----------|
| `site/src/lib/forms/googleSheets.ts` | Fix type + env vars | P1 |
| `site/src/components/FlipDoorCard.tsx` | Add pointer-events | P1 |
| `site/src/app/globals.css` | Color system overhaul | P2 |
| `site/src/app/page.tsx` | Bokeh colors + button fixes | P2/P3 |

### Secondary Files (Color Updates)

All pages using `--hf-bg-base`, `--hf-bg-elevated`, `--hf-amber*` will automatically update when globals.css is changed. No individual file edits needed.

### Apps Script (No Changes Needed)

The Apps Script code is correct. The fix is on the Next.js side to send the correct type.

---

## Summary

| Issue | Severity | Effort | Fix Location |
|-------|----------|--------|--------------|
| Form type mismatch | CRITICAL | 5 min | googleSheets.ts:197 |
| Env var mismatch | CRITICAL | 5 min | googleSheets.ts:27-28 |
| Flip card clicks | CRITICAL | 15 min | FlipDoorCard.tsx |
| Brown color palette | HIGH | 30 min | globals.css |
| Text link affordance | HIGH | 45 min | Multiple pages |

**Total estimated fix time:** 2-3 hours

---

*Document prepared for developer handoff. All technical details verified against codebase as of 2026-01-14.*
