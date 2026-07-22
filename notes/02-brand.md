# Step 2 — Brand Identity
*(Process notes — 2026-07-06)*

## Direction exploration
Built three direction boards (Golden Hour / Signal / Dusk) and compared them on palette, type voice, logo territory, and hero treatment.
- **Chosen: Golden Hour as base** — the only direction where the visual language and the positioning make the same argument (warmth without glare).
- **Stolen from Dusk:** one full-bleed dark chapter on the site, where visitors meet Amber's light language in the evening — the hours the product exists to win back.
- **Stolen from Signal:** the discipline rule, reframed as the brand's one-accent rule: *amber appears only where Amber acts.*
- Rejected: Signal alone (warmth would depend entirely on copy/photography), Dusk alone (dark launch-site trope, long-form readability).

## Logo
Explored 4 marks: Pebble (pendant stone), Inclusion (light preserved in amber), Lit Counter (glowing "a" counter), Ripple (voice rings).
- **Chosen: the Pebble, refined into a perfect circle — "the Orb."** Reads as pendant face-on + amber stone + the light itself. Survives every size with zero redraw; gains a halo on dark grounds matching the pendant's real listening glow.
- Rules: always carries its gradient (never flat/outlined); clear space = its own radius.
- Lockups: horizontal, stacked with "BY A1" endorsement, app icon tiles, favicon.

## Color
Two grounds, one light:
- **Linen system (default):** Linen #FBF7EF, Card #FFFDF8, Warm ink #2E251C, Umber #6E6455 (muted text), Amber #E29A3C (the light only), Ember #96541F (text accent), Stone #CBC0AF.
- **Dusk system (one chapter):** Dusk #191521, Plum #221D2C, Moonlight #F0EAE0, Haze #A79BBE, Firelight #FFB45C.
- **All pairs measured for WCAG 2.1:** body paths AAA (14:1, 15:1); muted/accent AA (5.4–6.9:1). Key finding turned into a rule: raw amber measures 2.2:1 on linen → **amber never carries text.** It is glow, mark, and decoration only. Original muted candidate #8A7F6D failed AA (3.7:1) and was darkened to #6E6455.

## Typography
- **Fraunces (560, opsz)** for display/headlines — a warm old-style serif; brings the lamplight.
- **Instrument Sans (450/600)** for body/UI — humanist, neutral, translation-friendly.
- Rules: serif never below 22px; sans never plays display; body never below 16px.
- Scale: 64/46 display, 31 heading, 22 subhead, 18/16 body, 13 caption, 12 caps label.

## Voice
Plain words, short sentences, no theater. Translation-friendly (global audience — no load-bearing idioms). Do/don't pairs written into guidelines ("Amber is listening." not "Voice capture session active.").

## Visual style rules
1. The glow is the brand's only effect (soft radial warm light, from the Orb or device only).
2. Imagery: golden-hour domestic, device at human scale; never hardware floating on a void.
3. Icons: 1.5px rounded strokes in warm ink; fills reserved for Amber-active states.
4. Corners 14–20px; full-round only for Orb, pills, pendant.
5. Motion: nothing faster than a breath — 300–600ms ease-out; listening glow breathes on ~4s cycle (matches device); prefers-reduced-motion respected.

## Accessibility commitments
AA minimum everywhere, AAA on core reading paths; color never carries meaning alone; visible focus (2px ember outline); every voice interaction shown with a text equivalent; fluid type with a 16px floor.

## Artifacts produced this step
- Direction boards (3 directions compared)
- Logo exploration (4 marks) → refined Orb lockups
- Brand guidelines v1 (foundation, color, typography, voice, style, a11y)

---

## Addendum — sleek pivot (2026-07-06, after guidelines v1 review)
Feedback on the first two guideline treatments: "not sleek enough — like apple.com (or similar sites)." Pivot recorded:
- **Execution shifted from editorial-warm to sleek-premium:** white ground, huge tight display type, bento tiles, frosted thin nav, generous vertical air. Grain, ghost numerals, and eyebrow-heavy editorial dropped.
- **Type system changed (brand-level decision):** Inter Tight variable carries everything (display 620 tight-tracked, body 450, labels 600). **Fraunces survives only in the wordmark** — the single warm, old-style gesture in the system. Rationale: warmth moved from typography to light (palette, glow, voice).
- **Palette roles updated:** White #FFFFFF ground; Linen #F5F1E8 becomes the tile/surface color (the brand's answer to Apple's #F5F5F7); Ink deepened to #1D1815. Re-measured: ink/white 17.6:1 AAA, umber/white 5.8:1 AA, ember/white 5.9:1 AA, ink/linen 15.6:1 AAA. Dusk system unchanged.
- **The Orb dimmed** on request: highlight #FFE3AE→#F0D19B, mid #E29A3C→#CE8B33, glow strength −⅓. Reads as embers, not a lit bulb — more on-message for "warmth without glare." Nominal amber token #E29A3C retained; the Orb renders a dimmed gradient of it.
