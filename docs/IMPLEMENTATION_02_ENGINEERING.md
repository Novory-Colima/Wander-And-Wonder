# IMPLEMENTATION_02_ENGINEERING.md

# Wander & Wonder

## Official Implementation Guide

### Part II · Engineering

**Version 1.0**

---

# Purpose

This document defines **how the project must be engineered**.

If `IMPLEMENTATION_01_FOUNDATION.md` defines *what the architecture is*, this document defines *how that architecture is executed*.

Every technical decision must prioritize:

* Performance
* Scalability
* Accessibility
* Maintainability
* Visual quality
* Progressive enhancement

The implementation must feel indistinguishable from a premium production built by an experienced frontend studio.

---

# Engineering Philosophy

Every interaction should appear effortless.

Achieving that requires discipline.

The user must never perceive:

* technical limitations
* rendering delays
* layout shifts
* loading artifacts
* inconsistent animations
* accessibility compromises

The implementation should disappear behind the experience.

---

# Rendering Strategy

Astro Static Rendering is the default.

Everything starts static.

JavaScript is progressively introduced only where interaction genuinely requires it.

Order of preference:

1. Pure HTML + CSS
2. Astro Component
3. Astro Island
4. Client-side JavaScript

Never invert this order.

---

# Hydration Strategy

Hydration is expensive.

Use it only when the interface becomes interactive.

Preferred directives:

```text
client:visible
```

↓

```text
client:idle
```

↓

```text
client:media
```

↓

```text
client:load
```

Avoid `client:load` unless interaction is immediately required.

Never hydrate decorative elements.

---

# Motion Architecture

Motion exists to support storytelling.

Never to decorate.

Every animation must satisfy at least one objective:

* Direct attention
* Explain hierarchy
* Reinforce emotion
* Improve continuity
* Increase immersion

Otherwise:

Remove it.

---

# Animation Directory

```text
src/

animations/

hero.ts

around-world.ts

dream.ts

journey.ts

memories.ts

experiences.ts

destinations.ts

about.ts

cta.ts

navbar.ts

footer.ts

shared.ts
```

Each file owns one scene.

No animation file should control multiple sections.

---

# GSAP Strategy

GSAP is the animation engine.

CSS transitions remain the default for simple interactions.

GSAP is reserved for:

* timelines
* sequencing
* parallax
* reveal effects
* complex transitions
* scroll synchronization

Avoid using GSAP for simple hover effects.

---

# Timeline Rules

One master timeline per scene.

Child timelines allowed only for reusable patterns.

Never create deeply nested timelines.

Maximum nesting:

2 levels.

---

# ScrollTrigger

ScrollTrigger controls narrative progression.

Every scene owns its own trigger.

Never create one global trigger.

Recommended trigger strategy:

* enter
* enterBack
* leave
* leaveBack

Avoid excessive scrubbing.

Only use scrub where visual continuity benefits.

---

# SplitText Usage

SplitText is reserved for:

* Hero headlines
* Editorial quotes
* Section titles

Never split long paragraphs.

---

# Parallax Strategy

Parallax must feel cinematic.

Not exaggerated.

Allowed elements:

* background imagery
* floating objects
* decorative layers
* atmospheric elements

Never apply parallax to:

* body text
* forms
* navigation
* buttons

---

# Lenis

Exactly one Lenis instance.

Global.

Created during application initialization.

Shared with ScrollTrigger.

Never instantiate Lenis inside components.

---

# View Transitions

Use Astro View Transitions whenever page navigation occurs.

Transitions must feel continuous.

Never flashy.

Duration:

200–500 ms.

Focus on opacity and transform.

Avoid dramatic zooms or rotations.

---

# Microinteractions

Every interactive element should respond.

Buttons.

Links.

Cards.

Images.

Language selector.

Form controls.

Responses should be subtle.

Preferred properties:

* opacity
* transform
* filter

Avoid animating layout properties.

---

# Responsive Strategy

Mobile First.

Always.

Design begins at the smallest viewport.

Enhance progressively.

Never remove content on mobile.

Reorganize instead.

---

# Breakpoint Behavior

Mobile

Single-column layouts.

Large touch targets.

Readable typography.

---

Tablet

Editorial layouts begin to emerge.

Images grow.

Whitespace increases.

---

Laptop

Reference layout.

Primary optimization target.

---

Desktop

Expanded spacing.

Larger photography.

Greater visual rhythm.

---

Ultra-wide

Typography remains constrained.

Photography may expand.

Never allow text lines to become excessively long.

---

# Image Strategy

Every image must use Astro Image.

Mandatory:

* width
* height
* alt
* sizes

Priority loading only for Hero imagery.

Everything else lazy loads.

---

# Image Formats

Preferred order:

AVIF

↓

WebP

↓

JPEG

PNG only when transparency is required.

Never upload oversized assets.

---

# Image Quality

Photographic assets:

80–90%

Never maximum quality.

Balance quality with payload.

---

# Video Strategy

Videos are decorative.

Never essential for understanding content.

Requirements:

* loop
* muted
* autoplay
* playsinline

Maximum duration:

5 seconds.

Preferred formats:

WebM

Fallback:

MP4

Maximum size:

2 MB.

---

# Asset Organization

```text
assets/

images/

hero/

stories/

destinations/

experiences/

shared/

videos/

icons/

fonts/
```

No mixed directories.

---

# Font Strategy

Load only required weights.

Avoid unnecessary font families.

Preferred:

2 families.

Maximum:

3.

Use variable fonts whenever possible.

---

# Performance Philosophy

Performance is non-negotiable.

Visual richness must never compromise responsiveness.

Target metrics:

Performance

95+

Accessibility

100

Best Practices

100

SEO

100

---

# Core Web Vitals

Optimize for:

LCP

INP

CLS

Every new feature must be evaluated against these metrics.

---

# JavaScript Strategy

Ship as little JavaScript as possible.

Avoid runtime logic when build-time solutions exist.

Keep bundles small.

Split by responsibility.

Never create utility files that grow indefinitely.

---

# CSS Strategy

Prefer modern CSS features.

Use Tailwind utilities.

Use CSS variables for tokens.

Avoid duplicated styles.

Avoid `!important`.

---

# Accessibility Strategy

Accessibility is implemented from day one.

Not after development.

Every interactive element must support:

* keyboard navigation
* visible focus
* semantic HTML
* screen readers

---

# Focus Management

Never remove focus outlines.

Replace only with a superior alternative.

Focus visibility must satisfy WCAG.

---

# Motion Accessibility

Respect:

```text
prefers-reduced-motion
```

When enabled:

* disable parallax
* reduce timeline duration
* remove floating effects
* simplify transitions

Never ignore this preference.

---

# Semantic HTML

Prefer semantic elements.

Examples:

```text
header

nav

main

section

article

footer

figure

figcaption
```

Avoid unnecessary `<div>` wrappers.

---

# ARIA

Use ARIA only where semantic HTML is insufficient.

Incorrect ARIA is worse than no ARIA.

---

# SEO Strategy

Every page requires:

* unique title
* meta description
* canonical URL
* Open Graph metadata
* Twitter metadata
* structured heading hierarchy

Only one `<h1>` per page.

---

# Structured Data

Implement Schema.org where appropriate.

Organization.

Website.

Breadcrumb.

Article (future).

FAQ (future).

Never generate fake structured data.

---

# Internationalization

All user-facing text must be externalized.

Never hardcode copy inside components.

Preferred structure:

```text
content/

es/

en/

fr/

it/

pt/

de/
```

Each language mirrors the same file structure.

---

# Error Handling

Fail gracefully.

Never expose raw errors to users.

Console output should remain meaningful during development and silent in production.

---

# Dependency Policy

Every dependency must justify its existence.

Before adding one, evaluate:

* native browser APIs
* Astro capabilities
* existing utilities

If a dependency replaces ten lines of code, reject it.

If it meaningfully improves architecture, consider it.

---

# Code Splitting

Split by responsibility.

Avoid monolithic bundles.

Load only what the current page needs.

---

# Progressive Enhancement

Every page should remain understandable before JavaScript executes.

Animations enhance.

They never deliver essential information.

---

# Quality Gates

Before considering any feature complete, verify:

* no layout shifts
* responsive behavior
* keyboard navigation
* screen reader compatibility
* reduced motion support
* optimized images
* Lighthouse targets
* no unnecessary hydration
* clean TypeScript compilation
* zero console errors

---

# Engineering Principles

Always optimize for clarity.

Always optimize for maintainability.

Always optimize for performance.

Never trade architecture for speed.

Never introduce complexity without measurable benefit.

The implementation should feel invisible.

The user should remember the journey.

Never the technology behind it.
