# Requirements Document

## Introduction

This feature focuses on revising the membership page for power tools to eliminate user experience friction and improve conversion metrics. The primary goals are to fix scrolling issues with tooltip interactions, optimize time-to-pricing and call-to-action visibility, restructure content hierarchy for better clarity, and implement a modern grid layout for tools and services presentation.

## Requirements

### Requirement 1

**User Story:** As a potential member visiting the membership page, I want tooltip interactions to not interfere with page scrolling, so that I can explore tool details without losing my place on the page.

#### Acceptance Criteria

1. WHEN a user opens a tooltip card THEN the background page SHALL NOT scroll while the tooltip is active
2. WHEN a user closes a tooltip card THEN normal page scrolling SHALL be restored immediately
3. WHEN a tooltip is open THEN the user SHALL still be able to interact with the tooltip content without triggering background scroll

### Requirement 2

**User Story:** As a potential customer, I want to quickly understand pricing and see clear calls-to-action, so that I can make a purchase decision efficiently.

#### Acceptance Criteria

1. WHEN a user lands on the membership page THEN they SHALL see pricing information within 5 seconds
2. WHEN a user lands on the membership page THEN they SHALL see the first call-to-action within 3 seconds
3. WHEN a user decides to purchase THEN they SHALL reach the payment page within 3 clicks maximum
4. WHEN viewing pricing information THEN the "Cancel anytime" option and next billing date SHALL be clearly visible
5. WHEN at checkout THEN the "Cancel anytime" option and billing details SHALL be prominently displayed

### Requirement 3

**User Story:** As a potential member, I want to see tangible benefits before artistic presentations, so that I can quickly understand the practical value of the membership.

#### Acceptance Criteria

1. WHEN a user views the membership page THEN the "Exclusives" section (calls, dashboard, 1:1 booking access) SHALL appear above the poetic tool list
2. WHEN a user scrolls through content THEN they SHALL encounter concrete benefits before abstract tool descriptions
3. WHEN viewing the exclusives section THEN it SHALL clearly highlight calls, dashboard access, and 1:1 booking capabilities

### Requirement 4

**User Story:** As a potential member, I want to see tools and services in a structured grid format, so that I can quickly compare what's included and understand time commitments.

#### Acceptance Criteria

1. WHEN viewing tools and services THEN they SHALL be displayed in a grid layout with columns: Do / When / Outcome / Time
2. WHEN viewing each service row THEN it SHALL contain: activity name, usage timing, expected outcome, and time duration
3. WHEN viewing bi-weekly calls THEN it SHALL show: "live implementation" / "momentum & feedback" / "~60–90 min"
4. WHEN viewing Self Dashboard THEN it SHALL show: "daily tracking" / "consistency" / "2 min/day"
5. WHEN viewing Tool library THEN it SHALL show: "on demand" / "state change" / "5–10 min each"

### Requirement 5

**User Story:** As a potential member, I want detailed information about each core tool, so that I can understand when and how to use them effectively.

#### Acceptance Criteria

1. WHEN viewing core tools THEN each SHALL display: Name • When to Use • What it Does • Time
2. WHEN viewing tool details THEN the format SHALL be consistent across all tools
3. WHEN viewing Reset Chamber THEN it SHALL show: "when foggy" / "interrupts looping and clears cortisol" / "7 min"
4. WHEN viewing Focus Corridor THEN it SHALL show: "before deep work" / "locks attention for 90 mins" / "9 min"
5. WHEN viewing Timeline Terminal THEN it SHALL show: "before shipping" / "identity shift on command" / "6 min"

### Requirement 6

**User Story:** As a potential member, I want to see the most compelling testimonials first, so that I can quickly understand the specific outcomes other members have achieved.

#### Acceptance Criteria

1. WHEN viewing testimonials THEN the first 1-2 testimonials SHALL be pinned and emphasize specific outcomes
2. WHEN viewing pinned testimonials THEN they SHALL highlight improvements in revenue, throughput, and ease of implementation
3. WHEN viewing testimonials section THEN it SHALL maintain the existing testimonial functionality while reordering content

### Requirement 7

**User Story:** As a potential member, I want to see pricing plans in a modern layout, so that I can easily compare options and make a selection.

#### Acceptance Criteria

1. WHEN viewing pricing plans THEN they SHALL be displayed side-by-side with slight overlap instead of vertical stacking
2. WHEN viewing plan blocks THEN the layout SHALL be visually appealing and easy to compare
3. WHEN on mobile devices THEN the plan layout SHALL remain functional and readable

### Requirement 8

**User Story:** As a developer, I want a detailed implementation plan document, so that I can reference tasks and maintain context during development.

#### Acceptance Criteria

1. WHEN development begins THEN a detailed_plan.md file SHALL exist with comprehensive task breakdown
2. WHEN referencing the plan THEN it SHALL include specific steps, timelines, and implementation details
3. WHEN context is lost during development THEN the plan SHALL serve as a complete reference guide