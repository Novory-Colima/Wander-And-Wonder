# IMPLEMENTATION_03_COMPONENT_CATALOG.md

# Wander & Wonder

## Official Implementation Guide

### Part III · Component Catalog

**Version 1.0**

---

# Purpose

This document defines every reusable component of the project.

Its purpose is to eliminate architectural ambiguity.

Each component has a single responsibility.

Components must never evolve into feature containers.

If a new component does not naturally fit into this catalog, its creation must be justified.

---

# Component Philosophy

Components are building blocks.

Not pages.

Not features.

Not workflows.

Each component should answer one question:

> **What single responsibility does this component have?**

If the answer contains "and", the component probably has too many responsibilities.

---

# Component Rules

Every component must define:

* Responsibility
* Public Props
* Internal State
* Dependencies
* Accessibility Requirements
* Responsive Behavior
* Animation Policy

---

# Component Layers

```text
Layouts
    ↓
Sections
    ↓
Blocks
    ↓
UI Components
    ↓
Primitives
```

Never invert this hierarchy.

---

# Folder Structure

```text
components/

layout/

navigation/

sections/

blocks/

ui/

common/
```

---

# LAYOUT COMPONENTS

These components define page structure.

They never contain business logic.

---

## RootLayout

### Responsibility

Application shell.

### Contains

* Metadata
* Global styles
* ViewTransitions
* Fonts

### Never

* Hero
* Sections
* Page content

---

## PageLayout

### Responsibility

Generic page wrapper.

### Contains

* Main container
* Skip links
* Main element

---

## EditorialContainer

### Responsibility

Constrain editorial content.

Never define colors.

---

## SectionContainer

### Responsibility

Consistent section spacing.

---

# NAVIGATION COMPONENTS

---

## Navbar

### Responsibility

Primary navigation.

### Contains

Logo

Navigation

Language selector

CTA

### Never

Section logic.

---

## NavLinks

Only navigation links.

---

## NavItem

Single navigation item.

---

## LanguageSelector

Language switch.

Nothing else.

---

## CTAButton

Primary navigation CTA.

---

## MobileMenu

Exclusive mobile navigation.

---

## ScrollIndicator

Hero scroll indicator.

Reusable.

---

# SECTION COMPONENTS

Each major scene has exactly one section component.

---

## HeroSection

Represents Scene 1.

Never reused.

Contains:

* HeroTitle
* HeroSubtitle
* HeroBackground
* ScrollIndicator

---

## AroundWorldSection

Scene 2.

Contains globe experience.

---

## DreamSection

Scene 3.

Editorial layout.

---

## JourneySection

Scene 4.

Alternating storytelling.

---

## MemoriesSection

Scene 5.

Low rhythm section.

---

## ExperiencesSection

Scene 6.

Experience showcase.

---

## DestinationsSection

Scene 7.

Destination grid.

---

## AboutSection

Scene 8.

Company presentation.

---

## CTASection

Scene 9.

Final conversion.

---

## FooterSection

Footer.

---

# BLOCK COMPONENTS

Reusable content compositions.

---

## SectionHeader

Contains

* Eyebrow
* Title
* Description

---

## EditorialQuote

Large inspirational quote.

---

## EditorialImage

Editorial photography wrapper.

---

## ImageStack

Image composition.

---

## StoryPreview

Story summary.

---

## StatisticGroup

Statistics layout.

---

## StatisticItem

Single metric.

---

## FeatureGrid

Grid layout.

---

## ExperienceGrid

Grid of experiences.

---

## DestinationGrid

Grid of destinations.

---

## FormGroup

Form composition.

---

## ContactInfo

Contact information.

---

## SocialLinks

Social icons.

---

# CARD COMPONENTS

---

## StoryCard

### Contains

Image

Location

Quote

Author

Date

---

Never:

Navigation.

---

## ExperienceCard

Contains

Image

Title

Description

Category

---

## DestinationCard

Contains

Image

Country

Description

Season

Duration

CTA

---

## FeatureCard

Single philosophy feature.

---

## GalleryCard

Editorial image card.

---

# TYPOGRAPHY COMPONENTS

---

## DisplayTitle

Largest heading.

Hero only.

---

## SectionTitle

Primary section title.

---

## Eyebrow

Small contextual heading.

---

## Lead

Introductory paragraph.

---

## BodyText

Standard paragraph.

---

## Caption

Image caption.

---

## Quote

Editorial quote.

---

# MEDIA COMPONENTS

---

## ResponsiveImage

Wrapper around Astro Image.

Mandatory.

---

## HeroImage

Optimized hero photography.

---

## BackgroundVideo

Decorative looping video.

---

## VideoOverlay

Readable overlay.

---

## AmbientLayer

Fog.

Particles.

Light.

Decorative only.

---

# INTERACTION COMPONENTS

---

## PrimaryButton

Main CTA.

---

## SecondaryButton

Secondary CTA.

---

## IconButton

Icon-only interaction.

---

## LinkButton

Styled navigation link.

---

## InputField

Text input.

---

## TextArea

Textarea.

---

## SelectField

Select control.

---

## CheckboxField

Checkbox.

---

## SubmitButton

Form submission.

---

# UI COMPONENTS

---

## Divider

Editorial divider.

---

## Badge

Small informational label.

---

## Chip

Category indicator.

---

## Tag

Experience tag.

---

## Pill

Rounded label.

---

## Icon

Generic icon wrapper.

---

## Avatar

Story author avatar.

---

## Tooltip

Accessible tooltip.

---

## Modal

Future use.

Not implemented initially.

---

# ANIMATION WRAPPERS

These components expose animation hooks.

They never contain animation logic.

---

## FadeIn

Animation container.

---

## RevealMask

Reveal wrapper.

---

## ParallaxLayer

Receives movement.

Logic lives in animations/.

---

## FloatingLayer

Ambient movement wrapper.

---

## ClipReveal

Mask reveal.

---

## ScaleReveal

Scale reveal wrapper.

---

# COMMON COMPONENTS

---

## Container

Maximum width.

---

## Grid

Responsive grid.

---

## Stack

Vertical spacing.

---

## Cluster

Horizontal spacing.

---

## Spacer

Intentional whitespace.

---

## AspectRatio

Media ratio helper.

---

## VisuallyHidden

Accessibility helper.

---

# COMPONENT RESPONSIBILITIES

Every component must satisfy:

One responsibility.

Small API.

Predictable behavior.

Reusable implementation.

Independent styling.

Semantic HTML.

Accessible interaction.

---

# PROPS POLICY

Public APIs must remain minimal.

Prefer:

```ts
title
description
image
alt
```

Avoid:

```ts
config

options

settings

data
```

When more than six props are required:

Refactor.

---

# CHILDREN POLICY

Components should expose children only when composition improves flexibility.

Avoid unnecessary slot nesting.

---

# STYLING POLICY

Every component must consume design tokens.

Never hardcode:

* colors
* spacing
* typography
* shadows
* radius

---

# RESPONSIVE POLICY

Every component must define behavior for:

* Mobile
* Tablet
* Laptop
* Desktop
* Ultra-wide

No component should rely on page-level responsiveness.

---

# ACCESSIBILITY POLICY

Interactive components require:

Keyboard support.

Visible focus.

Semantic HTML.

Screen reader compatibility.

ARIA only when necessary.

---

# ANIMATION POLICY

Components never own timelines.

Components expose references.

Animation implementation belongs exclusively to:

```text
src/animations/
```

---

# TEST OF A GOOD COMPONENT

A component is considered successful if:

It has one responsibility.

Its name immediately explains its purpose.

It can be reused without modification.

It contains no hidden side effects.

Its API is intuitive.

Its styling comes entirely from design tokens.

Its behavior is predictable.

Its animation is external.

Its implementation remains understandable after six months.

If any of these conditions fail, the component should be redesigned before implementation.
