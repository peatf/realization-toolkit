# Implementation Plan

- [ ] 1. Create scroll lock system and tooltip enhancements

  - Implement custom hook `useScrollLock` for managing body scroll state during tooltip interactions
  - Add CSS-based scroll prevention using overflow hidden on body element
  - Create enhanced tooltip component with scroll lock integration
  - Add touch event handling to prevent mobile scroll during tooltip interactions
  - _Requirements: 1.1, 1.2, 1.3_

- [ ] 2. Implement performance metrics tracking system

  - Create `usePerformanceMetrics` hook to track time-to-CTA and time-to-pricing
  - Implement Intersection Observer to detect when pricing and CTA elements become visible
  - Add click tracking for payment flow to ensure ≤3 clicks to payment
  - Create development-only metrics display component for monitoring performance
  - _Requirements: 2.1, 2.2, 2.3_

- [ ] 3. Restructure main page component section order

  - Modify `pages/index.tsx` to move GlassBowlIconsSection (exclusives) above ProductCarousel sections
  - Update section IDs and navigation references in CircularMenuWithGooeyText
  - Ensure proper spacing and transitions between reordered sections
  - Test responsive behavior of new section order
  - _Requirements: 3.1, 3.2, 3.3_

- [ ] 4. Create tool grid component system

  - Build `ToolGrid` component with responsive CSS Grid layout for Do/When/Outcome/Time columns
  - Create data structure for services (bi-weekly calls, Self Dashboard, Tool library)
  - Implement responsive design that stacks columns on mobile devices
  - Add hover effects and visual enhancements for grid rows
  - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5_

- [ ] 5. Implement core tools detail presentation

  - Create `CoreToolsDetail` component with Name/When to Use/What it Does/Time format
  - Add data for Reset Chamber, Focus Corridor, and Timeline Terminal tools
  - Implement consistent formatting across all core tools
  - Create responsive layout that works on all device sizes
  - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

- [ ] 6. Enhance testimonial system with prioritization

  - Modify testimonial data structure to include priority and outcome type fields
  - Update `TestimonialCarousel` component to sort testimonials by priority
  - Pin first 1-2 testimonials that emphasize revenue, throughput, and implementation outcomes
  - Maintain existing carousel functionality while reordering content
  - _Requirements: 6.1, 6.2, 6.3_

- [ ] 7. Implement side-by-side pricing layout with overlap

  - Modify `PricingSection` component to display plans side-by-side instead of vertically stacked
  - Add CSS transforms and positioning for slight overlap effect between plan blocks
  - Ensure mobile responsiveness maintains functionality and readability
  - Test visual hierarchy and comparison ease between pricing options
  - _Requirements: 7.1, 7.2, 7.3_

- [ ] 8. Add billing information visibility enhancements

  - Update pricing display components to prominently show "Cancel anytime" option
  - Add next billing date display in pricing information
  - Ensure billing details are visible both in price display and at checkout
  - Test visibility and clarity of cancellation and billing information
  - _Requirements: 2.4, 2.5_

- [ ] 9. Create detailed implementation plan document

  - Generate `detailed_plan.md` file with comprehensive task breakdown
  - Include specific steps, timelines, and implementation details for all changes
  - Add troubleshooting guide and context preservation strategies
  - Document testing procedures and validation steps for each requirement
  - _Requirements: 8.1, 8.2, 8.3_

- [ ] 10. Integrate performance optimizations and testing

  - Add performance monitoring to validate ≤5s time-to-pricing and ≤3s time-to-CTA metrics
  - Implement cross-browser testing for tooltip scroll lock functionality
  - Add accessibility testing for keyboard navigation and screen reader compatibility
  - Create visual regression tests for layout changes and responsive behavior
  - _Requirements: 2.1, 2.2, 2.3, 1.1, 1.2, 1.3_

- [ ] 11. Final integration and validation testing
  - Test complete user flow from landing to payment with all changes integrated
  - Validate that all requirements are met through comprehensive testing
  - Ensure no regressions in existing functionality
  - Document any edge cases or browser-specific behaviors discovered during testing
  - _Requirements: All requirements validation_
