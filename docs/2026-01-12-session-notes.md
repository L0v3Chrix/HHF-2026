# Session Notes: 2026-01-12

## Session Focus
Homepage design parity with V2 mock — Image generation and logo update

---

## Previous Session Accomplishments (Completed)

### 1. Fixed Card Colors
- **Support card (left)**: Plum/purple-magenta (`#5C3158` → `#6B3A68` → `#4A2848`)
- **Give card (right)**: Ruby/red (`#8B2D3A` → `#A33545` → `#722535`)
- **File**: `site/src/components/FlipDoorCard.tsx` lines 64-73

### 2. Cinematic Bokeh Background (CSS-based, working)
- Layered CSS gradients creating warm bokeh effect
- Dark base with amber/orange orbs bottom-left
- Vignette overlay for depth
- **File**: `site/src/app/page.tsx` lines 76-99

### 3. Stacked Card Effect
- Two offset layers behind each card for depth
- Matching the V2 mock's layered card appearance

### 4. Build Verified
- Production build passes successfully

---

## Current Session Status

### Attempted This Session
- Tried to generate images with nano-banana MCP
- MCP reported as "repaired" but tool calls fail with "No such tool available"
- **Action needed**: Restart Claude Code to properly reconnect nano-banana MCP

---

## RESTART CHECKLIST

### Immediately After Restart:

1. **Verify nano-banana MCP is connected**
   - Run `/mcp` to check status
   - Test with a simple image generation call

2. **Generate Images (if MCP connected)**

   **Background Image:**
   ```
   Prompt: "Cinematic dark bokeh background, warm amber and red blurred light orbs, soft lens blur, subtle haze, gentle vignette, high-end nonprofit website hero background, comforting and elegant, no text, no logos, no people, smooth gradient lighting, shallow depth of field, realistic photographic look"
   Aspect ratio: 16:9
   Output: site/public/images/bg/home-bokeh.png
   ```

   **Plum Card Overlay (optional):**
   ```
   Prompt: "Subtle fabric or velvet texture overlay, plum purple color #5C3158, soft lighting, elegant surface texture for card background, seamless tileable"
   Output: site/public/images/cards/support-surface.png
   ```

   **Ruby Card Overlay (optional):**
   ```
   Prompt: "Subtle fabric or velvet texture overlay, ruby red color #8B2D3A, soft lighting, elegant surface texture for card background, seamless tileable"
   Output: site/public/images/cards/give-surface.png
   ```

3. **Logo Update**
   - User needs to provide the new horizontal lockup logo file
   - Save to: `site/public/brand/logos/heart-forward-logo-horizontal.png`
   - Update `site/src/components/layout/SiteHeader.tsx`:
     - Remove separate text spans
     - Use new horizontal logo with text built-in
     - Adjust sizing for horizontal lockup display

4. **Final Visual Verification**
   - View at 1280×800
   - Compare against V2 mock reference
   - Check mobile responsiveness

---

## Pending Tasks (Priority Order)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1 | Verify nano-banana MCP connection | Pending | Run `/mcp` after restart |
| 2 | Generate cinematic bokeh background | Pending | Replace CSS with real image |
| 3 | Generate card surface overlays | Pending | Optional enhancement |
| 4 | Update header with horizontal logo | Pending | Need logo file from user |
| 5 | Final visual verification | Pending | Compare to V2 mock |

---

## Reference Files

| File | Purpose |
|------|---------|
| `site/src/app/page.tsx` | Homepage with CSS bokeh background |
| `site/src/components/FlipDoorCard.tsx` | Card colors and stacked effect |
| `site/src/components/layout/SiteHeader.tsx` | Header with logo (needs update) |
| `site/public/brand/mockup-reference.jpeg` | V2 mock reference |

---

## Design Parity Status

| Element | Status | Notes |
|---------|--------|-------|
| Background bokeh | ✅ CSS working | Real image would elevate |
| Card colors | ✅ Fixed | Plum + Ruby correct |
| Stacked layers | ✅ Working | 2 offset layers |
| Buttons | ✅ Cream pills | Both cards styled |
| Help Now ATX widget | ✅ Positioned | Bottom-right floating |
| Typography | ✅ Serif italic | Hero headline matches |
| Logo | ⏳ Pending | Need horizontal lockup |

---

## Quick Start Command (After Restart)

```
Continue with HFF-New-Site homepage tasks:
1. Verify nano-banana MCP is connected
2. Generate bokeh background image (prompt in session notes)
3. Get horizontal logo from user and update SiteHeader.tsx
4. Final visual check at 1280×800
```
