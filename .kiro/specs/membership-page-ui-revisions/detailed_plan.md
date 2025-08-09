# Detailed Implementation Plan

This plan captures the concrete steps, sequencing, and validation approach for the membership page UI revisions.

## Scope
- Fix tooltip scroll interactions (Req 1)
- Track performance metrics for Time-to-CTA, Time-to-Pricing, Clicks-to-Payment (Req 2)
- Reorder content: move Exclusives above tools, Pricing standalone (Req 3)
- Implement Services/Tools grid with Do/When/Outcome/Time (Req 4)
- Present Core Tools detail (Req 5)
- Prioritize testimonials by outcomes (Req 6)
- Side-by-side overlapping pricing cards with mobile fallback (Req 7)
- Show “Cancel anytime” + Next billing in pricing (Req 2.4–2.5)

## Tasks and Steps
1) Scroll lock + Enhanced Tooltip
- Add `utils/useScrollLock.ts` (body lock with iOS Safari handling, layout shift compensation)
- Add `components/ui/EnhancedTooltip.tsx` (locks scroll, prevents touch-scroll, ESC to close)
- Refactor `ProductCarousel` to use `EnhancedTooltip`
- Add `.scroll-locked` CSS in `styles/globals.css`

2) Performance Metrics
- Add `utils/usePerformanceMetrics.ts` (IntersectionObserver for `[data-cta]` and `[data-pricing]`, click path to `[data-payment-cta]`)
- Integrate into `PricingSection` with dev-only metric readout
- Tag CTAs via `data-cta` and payment buttons via `data-payment-cta`

3) Content Hierarchy
- In `pages/index.tsx`: move `GlassBowlIconsSection` above tools; add standalone `PricingSection` post-testimonials; add `id="quiz"`
- Update navigation targets in `CircularMenuWithGooeyText.tsx`

4) Grid Views
- Create `components/ui/ToolGrid.tsx`
- Create `components/sections/ServicesGridSection.tsx` with items for Bi-weekly Calls, Self Dashboard, Tool Library
- Insert Services grid between Exclusives and Tools

5) Core Tools Detail
- Create `components/sections/CoreToolsDetail.tsx` (Reset Chamber, Focus Corridor, Timeline Terminal)
- Place after tool carousels

6) Testimonial Prioritization
- Extend `data/testimonialData.ts` with `priority`, `outcomeType`, `isPinned`
- Update 1–2 testimonials as pinned with revenue outcomes
- Sort in `TestimonialCarousel` with pinned first, then by priority

7) Pricing Layout + Billing Visibility
- Add side-by-side layout mode with subtle overlap; keep stacked mode for fallback
- Show “Cancel anytime” and a computed next billing date under price
- Ensure mobile stacks cleanly

8) Validation & Testing
- Build and run: `npm run build`
- Manually verify:
  - Tooltip open locks page; closes restores scroll (mouse + touch)
  - `[data-cta]` visible <3s; `[data-pricing]` visible <5s on typical devices
  - ≤3 clicks to payment recorded in dev metrics
  - Exclusives above tools; services grid displays correctly
  - Testimonials start with pinned revenue/throughput outcomes
  - Pricing plans render side-by-side with slight overlap on desktop; stacked on mobile
  - Price block shows “Cancel anytime • Next billing: <date>”

9) Cross-browser Checks
- Chrome, Safari (incl. iOS), Firefox basic validation
- Reduced motion consideration (animations are cosmetic)

10) Rollout
- Monitor dev metrics overlay locally; tune if thresholds missed (reorder CTAs, reduce above-the-fold content, consider lazy loads)

## Troubleshooting
- iOS scroll lock: prefer `position: fixed` with stored scroll offset; restore on unlock
- IntersectionObserver not firing: adjust thresholds; ensure elements have size and are mounted
- Overlap artifacts: reduce negative margins; add z-index where required

## Timelines
- Phase 1 (Infra): 0.5–1 day
- Phase 2 (Content): 0.5 day
- Phase 3 (Grids/Details): 0.5 day
- Phase 4 (Pricing/Testimonial): 0.5 day
- Phase 5 (Polish/Test): 0.5 day

## Acceptance
- Meets EARS criteria in `requirements.md` with on-page verification and dev metrics


