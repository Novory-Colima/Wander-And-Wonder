# IMPLEMENTATION_01_FOUNDATION.md

# Wander & Wonder

## Official Implementation Guide

### Part I · Foundation

**Version 1.0**

---

# Purpose

This document defines the technical foundation of the project.

It is the definitive reference for every architectural, structural and implementation decision.

Its purpose is to eliminate ambiguity.

If any implementation decision conflicts with this document, this document always takes precedence unless explicitly superseded by a newer version.

This guide complements:

* README.md
* DESIGN_SPEC.md
* WIREFRAME.md
* PROJECT_RULES.md

It never replaces them.

---

# Implementation Philosophy

The project is built around one fundamental principle:

> **Every line of code must exist to improve the experience.**

Technology is never the goal.

Technology is the medium.

Visual quality.

Maintainability.

Scalability.

Performance.

Accessibility.

Consistency.

All have equal priority.

Never sacrifice one to improve another without explicit justification.

---

## Guiding Principles

Every implementation decision must satisfy these principles.

### Simplicity First

Prefer the simplest solution capable of solving the problem correctly.

Avoid clever code.

Avoid unnecessary abstractions.

Avoid premature optimization.

---

### Composition Over Complexity

Components should be assembled.

Never become monoliths.

Large features are built from many small responsibilities.

---

### Readability Above Brevity

Readable code is preferred over short code.

Future maintainability always wins.

---

### Predictability

Every file should live exactly where another developer expects it.

No surprises.

---

### Explicitness

Avoid magic.

Avoid hidden behaviors.

Avoid implicit side effects.

Code should explain itself.

---

### Static First

Astro's static capabilities are the default.

Hydration must always be justified.

Never hydrate by default.

---

### Performance by Design

Performance is not an optimization phase.

Performance is an architectural decision.

Every component must be designed assuming Lighthouse scores above 95.

---

### Accessibility by Default

Accessibility is not an enhancement.

It is part of the implementation.

---

# Project Architecture

```
/
├── public/
│
├── src/
│   ├── animations/
│   │
│   ├── assets/
│   │   ├── fonts/
│   │   ├── icons/
│   │   ├── images/
│   │   └── videos/
│   │
│   ├── components/
│   │   ├── common/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── ui/
│   │   └── sections/
│   │
│   ├── config/
│   │
│   ├── content/
│   │
│   ├── data/
│   │
│   ├── layouts/
│   │
│   ├── lib/
│   │
│   ├── pages/
│   │
│   ├── styles/
│   │
│   ├── types/
│   │
│   ├── utils/
│   │
│   └── env.d.ts
│
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

---

# Folder Responsibilities

## animations/

Contains only animation logic.

Never UI.

Never business logic.

Never content.

Every animation belongs to one scene.

Example:

```
hero.ts
journey.ts
memories.ts
footer.ts
```

---

## assets/

Contains immutable resources.

Images.

Videos.

Fonts.

Icons.

Never generated data.

---

## components/

Contains reusable interface elements.

No global configuration.

No application state.

No page logic.

---

## config/

Application configuration.

Navigation.

Metadata.

Languages.

Theme configuration.

Constants.

---

## content/

Static textual content.

Quotes.

Stories.

Translations.

Editorial content.

---

## data/

Structured datasets.

Destinations.

Experiences.

Countries.

Statistics.

Timeline entries.

---

## layouts/

Only page layouts.

Never reusable UI.

---

## lib/

Shared integrations.

External libraries.

Utility wrappers.

Configuration adapters.

---

## pages/

Astro routes only.

Pages should remain thin.

Maximum responsibility:

Assemble layouts.

---

## styles/

Global styles.

Tokens.

Utilities.

Typography.

Animations.

Resets.

---

## types/

Shared interfaces.

Enums.

Type aliases.

Global types.

---

## utils/

Pure functions.

Never UI.

Never DOM manipulation.

Never side effects.

---

# Naming Conventions

Consistency is mandatory.

---

## Components

PascalCase

```
HeroSection.astro

StoryCard.astro

DestinationGrid.astro
```

---

## Layouts

PascalCase

```
RootLayout.astro

DefaultLayout.astro
```

---

## Utilities

camelCase

```
formatDate.ts

buildMetadata.ts

createSlug.ts
```

---

## Types

PascalCase

```
Destination.ts

Experience.ts

Story.ts
```

---

## Interfaces

Prefix with I is forbidden.

Correct:

```
Destination

Story

Experience
```

Wrong:

```
IDestination
```

---

## Enums

PascalCase

```
Language

Theme

ExperienceCategory
```

---

## Constants

UPPER_SNAKE_CASE

```
DEFAULT_LANGUAGE

MAX_CONTENT_WIDTH

NAVBAR_HEIGHT
```

---

## CSS Variables

```
--color-primary

--space-xl

--radius-lg
```

Never camelCase.

---

## Files

Always lowercase except components.

```
colors.css

spacing.css

typography.css
```

---

# Component Conventions

Every component must have exactly one responsibility.

Never combine unrelated concerns.

---

Good

```
SectionTitle

QuoteBlock

ExperienceCard

DestinationCard
```

---

Bad

```
HeroAndNavbar

ContentEverything

LandingComponent
```

---

## Maximum Component Size

Ideal

150 lines

Soft limit

250 lines

Hard limit

400 lines

If exceeded:

Split.

---

## Props

Keep minimal.

Prefer explicit props.

Avoid configuration objects unless necessary.

---

## State

Local whenever possible.

Global only when absolutely necessary.

---

## Nesting

Maximum recommended depth:

4 levels

If deeper:

Refactor.

---

## Side Effects

Must be isolated.

Never hidden inside rendering logic.

---

# TypeScript Conventions

Strict mode mandatory.

No exceptions.

---

## Forbidden

```
any
```

```
as unknown as
```

```
@ts-ignore
```

Without explicit justification.

---

## Preferred

Unknown.

Generics.

Discriminated unions.

Literal types.

Readonly objects.

---

## Functions

Small.

Pure.

Predictable.

---

Maximum:

40 lines.

---

## Parameters

Maximum recommended:

4

Beyond that:

Use an object.

---

## Return Types

Public functions must always declare them explicitly.

---

## Nullability

Prefer:

```
undefined
```

Avoid:

```
null
```

Unless external APIs require it.

---

# Astro Conventions

Astro is the rendering engine.

Not React.

Do not recreate SPA patterns.

---

Pages assemble.

Components render.

Layouts structure.

Animations enhance.

---

Hydration is exceptional.

Not default.

---

Use Astro islands only when interaction requires JavaScript.

---

Prefer:

```
client:visible
```

Before

```
client:load
```

---

Avoid unnecessary client directives.

---

Every page must export metadata.

---

Images always use:

```
<Image />
```

Never raw img unless justified.

---

# Tailwind Conventions

Tailwind is a styling utility.

Not the design system.

The design system lives inside tokens.

---

Never write arbitrary values repeatedly.

Bad

```
mt-[17px]

rounded-[13px]
```

Good

```
mt-lg

rounded-xl
```

---

Utilities should remain readable.

Avoid class explosions.

If a class list becomes difficult to scan:

Create a component.

---

Prefer semantic extraction.

---

Never create gigantic utility chains.

---

Order utilities consistently.

Layout

↓

Flex/Grid

↓

Spacing

↓

Sizing

↓

Typography

↓

Borders

↓

Background

↓

Effects

↓

Animation

---

# Design Tokens

Every visual decision originates from tokens.

Never hardcode values repeatedly.

---

# Color Tokens

## Primary

Midnight Blue

```
#0D1B2A
```

---

## Surface

Warm Ivory

```
#F8F6F2
```

---

## Accent

Ocean Blue

```
#2E86DE
```

---

## Emotional Accent

Sunset Gold

```
#D8A657
```

---

## Nature

Forest Green

```
#3E6B48
```

---

## Secondary Text

Cloud Gray

```
#6F7782
```

---

## Neutral Black

```
#111111
```

---

## Neutral White

```
#FFFFFF
```

Reserved only where technically required.

---

# Typography Tokens

Primary Serif

```
Cormorant Garamond
```

Fallback

```
Georgia
```

---

Secondary Sans

```
Inter
```

Fallback

```
system-ui
```

---

Scale

```
xs

sm

base

lg

xl

2xl

3xl

4xl

5xl

6xl

7xl
```

Never invent intermediate sizes.

---

# Spacing Tokens

Base scale

```
4
8
12
16
24
32
48
64
80
96
128
160
```

Everything must derive from this scale.

---

# Border Radius

```
none

sm

md

lg

xl

2xl

full
```

---

# Shadow Tokens

```
shadow-xs

shadow-sm

shadow-md

shadow-lg
```

Never stronger.

---

# Blur

```
blur-xs

blur-sm

blur-md

blur-lg
```

Reserved primarily for overlays and glass effects.

---

# Opacity

```
10

20

40

60

80

100
```

---

# Transition Durations

```
100

200

300

500

700

1000
```

Milliseconds.

---

# Easing Tokens

```
ease-standard

ease-smooth

ease-emphasis

ease-decelerate
```

Avoid custom curves unless justified.

---

# Breakpoints

```
sm

640

md

768

lg

1024

xl

1280

2xl

1536
```

Never introduce additional breakpoints without approval.

---

# Container Width

```
max-width

1440px
```

Editorial blocks

```
780px
```

Reading width

```
68ch
```

---

# Z-Index Scale

```
0

10

20

30

40

50

100
```

Reserved

```
999

9999
```

Only for overlays or emergency cases.

---

# Grid

Desktop

12 columns

Tablet

8 columns

Mobile

4 columns

Ultra-wide

Maintain maximum content width.

Never stretch typography indefinitely.

---

# Absolute Rules

Never hardcode colors.

Never hardcode spacing.

Never invent typography values.

Never duplicate tokens.

Never violate folder responsibilities.

Never create God Components.

Never disable TypeScript.

Never hydrate without justification.

Never optimize prematurely.

Never sacrifice readability.

When in doubt:

Choose the solution that makes the project easier to understand six months from now.
