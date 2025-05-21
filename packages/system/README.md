# @nex-ui/system

A lightweight and performant styling library based on Emotion, focusing on component architecture and developer experience.

## Installation

```bash
npm i @nex-ui/system
```

## Key Features

### Tokens

Define your own design tokens and apply them seamlessly as CSS values. CSS properties are automatically mapped to token scales, and tokens can even be used within shorthand CSS properties.

### Scales

Scales map tokens and semantic tokens to CSS properties, allowing CSS properties to directly reference tokens of the appropriate type. This enables the use of tokens as values for CSS properties, ensuring consistency and scalability across the design system.',

### Aliases

Aliases are used to define aliases for CSS properties, which simplifies CSS property names and supports combining CSS properties.

### Selectors

Selectors are designed to combine multiple CSS selectors, aiming to apply style rules to page elements more efficiently and flexibly.

### Recipes

Create multi-variant styles with a type-safe runtime API, heavily inspired by [vanilla-extract](https://vanilla-extract.style/documentation/packages/recipes/).

### Dark Mode

Dark Mode that works out of the box. Additionally, the styles for the Dark Mode can be easily defined in the recipes.

### Responsive Design

Define custom breakpoints and apply them directly in the recipes to create responsive layouts.

### Developer Experience

One of our main goals is to provide the best possible developer experience. The system provides a fully-typed API, so when using TypeScript, CSS properties, tokens, and breakpoints etc. will be auto-completed for you.
