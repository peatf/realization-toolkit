# Design Document

## Overview

This design document outlines the comprehensive approach to revising the membership page UI for power tools, addressing critical user experience issues and implementing performance optimizations. The solution focuses on eliminating tooltip scrolling conflicts, restructuring content hierarchy for better conversion, implementing modern grid layouts, and creating a detailed implementation reference document.

The current membership page is built using Next.js with React components, utilizing Framer Motion for animations, and custom CSS with Tailwind for styling. The page structure includes multiple sections: OpeningSection, MembershipBenefits, TestimonialCarousel, PricingSection, ProductCarousel, and GlassBowlIconsSection.

## Architecture

### Component Structure
The membership page follows a modular component architecture with the main page (`pages/index.tsx`) orchestrating multiple section components. The key architectural decisions include:

1. **Section-based Layout**: Each major feature area is encapsulated in its own component
2. **Shared Layout System**: Common layout patterns are abstracted into reusable components
3. **Animation Integration**: Framer Motion is used for smooth transitions and interactions
4. **Responsive Design**: Mobile-first approach with progressive enhancement

### State Management
- Local component state for UI interactions (tooltips, carousels, accordions)
- No global state management needed for current requirements
- Event-driven interactions for tooltip and modal behaviors

### Styling Architecture
- CSS custom properties for consistent theming
- Tailwind CSS for utility-first styling
- Component-scoped styles for complex animations
- Glass morphism effects using backdrop-filter

## Components and Interfaces

### 1. Enhanced Tooltip System
**Purpose**: Fix background scrolling during tooltip interactions

**Interface**:
```typescript
interface TooltipProps {
  isOpen: boolean;
  onToggle: () => void;
  content: React.ReactNode;
  trigger: React.ReactNode;
  preventBodyScroll?: boolean;
}

interface ScrollLockManager {
  lock(): void;
  unlock(): void;
  isLocked(): boolean;
}
```

**Implementation Strategy**:
- Create a custom hook `useScrollLock` to manage body scroll state
- Implement CSS-based scroll prevention using `overflow: hidden`
- Add touch event handling to prevent scroll on mobile devices
- Ensure proper cleanup when tooltips close

### 2. Performance Metrics Tracker
**Purpose**: Monitor and ensure ≤5s time-to-pricing and ≤3s time-to-CTA

**Interface**:
```typescript
interface PerformanceMetrics {
  timeToFirstCTA: number;
  timeToPricing: number;
  clicksToPayment: number;
}

interface MetricsTracker {
  startTracking(): void;
  recordCTAVisible(): void;
  recordPricingVisible(): void;
  recordPaymentClick(): void;
  getMetrics(): PerformanceMetrics;
}
```

**Implementation Strategy**:
- Use Intersection Observer API to detect when elements become visible
- Implement performance timing using `performance.now()`
- Add data attributes for tracking click paths to payment
- Create development-only metrics display for monitoring

### 3. Restructured Content Hierarchy
**Purpose**: Move exclusives section above poetic tool list

**Current Structure**:
```
1. Opening Section
2. Circular Menu
3. Membership Benefits + Quiz
4. Product Carousels (Tools)
5. Testimonials
6. Glass Bowl (Exclusives) + Pricing
```

**New Structure**:
```
1. Opening Section
2. Circular Menu
3. Membership Benefits + Quiz
4. Glass Bowl (Exclusives) - MOVED UP
5. Product Carousels (Tools)
6. Testimonials
7. Pricing Section - STANDALONE
```

### 4. Grid Layout System for Tools
**Purpose**: Implement Do/When/Outcome/Time grid layout

**Interface**:
```typescript
interface ToolGridItem {
  name: string;
  do: string;
  when: string;
  outcome: string;
  time: string;
  icon?: string;
}

interface ToolGridProps {
  items: ToolGridItem[];
  variant: 'services' | 'tools';
}
```

**Grid Structure**:
- Responsive CSS Grid with 4 columns on desktop, stacked on mobile
- Column headers: "Do" | "When" | "Outcome" | "Time"
- Alternating row backgrounds for better readability
- Hover effects for enhanced interactivity

### 5. Core Tools Detail System
**Purpose**: Structured presentation of tool information

**Interface**:
```typescript
interface CoreTool {
  name: string;
  whenToUse: string;
  whatItDoes: string;
  timeRequired: string;
  category: 'power' | 'alchemical';
}

interface CoreToolsProps {
  tools: CoreTool[];
  displayMode: 'grid' | 'list';
}
```

### 6. Enhanced Testimonial System
**Purpose**: Reorder testimonials with outcome-focused content first

**Interface**:
```typescript
interface TestimonialWithPriority extends Testimonial {
  priority: 'high' | 'medium' | 'low';
  outcomeType: 'revenue' | 'throughput' | 'implementation' | 'general';
  isPinned: boolean;
}

interface TestimonialCarouselProps {
  testimonials: TestimonialWithPriority[];
  showPinnedFirst: boolean;
}
```

### 7. Modern Plan Block Layout
**Purpose**: Side-by-side pricing with overlap instead of vertical stacking

**Interface**:
```typescript
interface PlanBlockProps {
  plans: Plan[];
  layout: 'stacked' | 'overlapped' | 'side-by-side';
  overlapOffset?: number;
}
```

**Layout Strategy**:
- CSS Grid with overlapping using negative margins
- Transform-based positioning for smooth animations
- Responsive breakpoints for mobile adaptation
- Enhanced visual hierarchy with depth effects

## Data Models

### Enhanced Testimonial Model
```typescript
interface TestimonialData {
  id: string;
  text: string;
  name: string;
  title?: string;
  imageUrl?: string;
  priority: 'high' | 'medium' | 'low';
  outcomeType: 'revenue' | 'throughput' | 'implementation' | 'general';
  isPinned: boolean;
  metrics?: {
    revenueIncrease?: string;
    timeImprovement?: string;
    specificOutcome?: string;
  };
}
```

### Tool Grid Data Model
```typescript
interface ServiceItem {
  id: string;
  name: string;
  do: string;
  when: string;
  outcome: string;
  time: string;
  type: 'service' | 'tool';
}

interface CoreToolData {
  id: string;
  name: string;
  whenToUse: string;
  whatItDoes: string;
  timeRequired: string;
  category: 'power' | 'alchemical';
  icon?: string;
}
```

### Performance Tracking Model
```typescript
interface PageMetrics {
  loadTime: number;
  timeToFirstCTA: number;
  timeToPricing: number;
  userInteractions: {
    tooltipOpens: number;
    ctaClicks: number;
    pricingViews: number;
    paymentAttempts: number;
  };
}
```

## Error Handling

### Scroll Lock Error Handling
- Graceful fallback when `body.style.overflow` is not supported
- Detection and handling of iOS Safari scroll behavior differences
- Cleanup mechanisms for interrupted tooltip interactions

### Performance Metrics Error Handling
- Fallback timing mechanisms when Performance API is unavailable
- Error boundaries around metrics collection to prevent UI disruption
- Development vs production metric collection strategies

### Animation Error Handling
- Reduced motion preferences detection and respect
- Fallback layouts when CSS Grid is not supported
- Progressive enhancement for advanced visual effects

## Testing Strategy

### Unit Testing
- Component isolation testing for tooltip scroll lock functionality
- Performance metrics calculation accuracy testing
- Grid layout responsive behavior testing
- Testimonial sorting and filtering logic testing

### Integration Testing
- End-to-end user flow testing from landing to payment
- Cross-browser tooltip behavior testing
- Mobile device scroll prevention testing
- Performance metrics collection across different devices

### Performance Testing
- Time-to-CTA measurement validation
- Time-to-pricing measurement validation
- Click-to-payment path optimization testing
- Page load performance impact assessment

### Accessibility Testing
- Keyboard navigation through new grid layouts
- Screen reader compatibility with restructured content
- Focus management during tooltip interactions
- Color contrast validation for new visual elements

### Visual Regression Testing
- Before/after comparison of layout changes
- Cross-device rendering consistency
- Animation smoothness validation
- Responsive breakpoint behavior verification

## Implementation Phases

### Phase 1: Core Infrastructure
1. Implement scroll lock system and tooltip enhancements
2. Create performance metrics tracking system
3. Set up new data models and interfaces

### Phase 2: Content Restructuring
1. Reorganize section order in main page component
2. Move exclusives section above tools
3. Implement new testimonial prioritization system

### Phase 3: Grid Layout Implementation
1. Create tool grid component system
2. Implement responsive grid layouts
3. Add core tools detail presentation

### Phase 4: Visual Enhancements
1. Implement side-by-side pricing layout with overlap
2. Enhance visual hierarchy and spacing
3. Add performance optimizations and animations

### Phase 5: Testing and Optimization
1. Comprehensive testing across all requirements
2. Performance validation and optimization
3. Documentation and implementation plan creation