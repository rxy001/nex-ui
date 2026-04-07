# AGENTS.md - Nex UI

> Context file for AI agents working in this repository.

## Project overview

**Nex UI** is a comprehensive React component system for building accessible, high-quality web applications and design systems.

- **Package name:** `@nex-ui`
- **Repository:** https://github.com/rxy001/nex-ui
- **Documentation:** https://nex-ui-docs.vercel.app
- **License:** MIT

## Tech Stack

| Concern                | Tool                                          |
| ---------------------- | --------------------------------------------- |
| Package manager        | pnpm@10.2.0                                   |
| Node version           | v20                                           |
| Monorepo orchestration | Turborepo                                     |
| Language               | TypeScript                                    |
| Library                | React@19, Motion                              |
| JS bundler             | Rollup (SWC)                                  |
| CSS processing         | Emotion                                       |
| Linting                | ESLint@9                                      |
| Formatting             | Prettier                                      |
| Testing                | Jest, Storybook, Chromatic(visual regression) |

## Project structure

```text
nex-ui/
├── docs/                                     # Documentation website
├── packages/
│   ├── cli/                                  # Command-line interface tools
│   ├── hooks/                                # Custom React hooks
│   ├── icons/                                # Shared react icon components
│   ├── react/                                # Core React components
│   │   └── src/
│   │       ├── components/                   # UI components
│   │       │   └── component-name/           # Specific component implementation
│   │       │       ├── index.tsx             # Component entry point
│   │       │       ├── __stories__/          # Storybook stories for the component
│   │       │       └── __tests__/            # Unit tests for the component
│   │       └── themes/
│   │           ├── recipes/                  # Predefined UI component styles
│   │           └── system/                   # Design tokens
│   ├── styled/                               # Atomic, theme-aware components
│   ├── system/                               # Styled system implementation
│   └── utils/                                # Utility functions and helpers
├── sb/                                       # Storybook environment configuration
├── scripts/                                  # Build and utility scripts
├── tests/                                    # Jest configuration and shared test utilities
├── pnpm-workspace.yaml
├── turbo.json
└── package.json                              # Root monorepo configuration
```

## Styled System Architecture

`@nex-ui/system` is Nex UI’s core styling engine, variant-based and built on Emotion. It provides a flexible way to define design tokens and style components, with a focus on developer experience.

### Key Features

#### Tokens

Define your own design tokens and apply them seamlessly as CSS values. CSS properties are automatically mapped to token scales, and tokens can even be used within shorthand CSS properties.

#### Scales

Scales map tokens and semantic tokens to CSS properties, allowing CSS properties to directly reference tokens of the appropriate type. This enables the use of tokens as values for CSS properties, ensuring consistency and scalability across the design system.

#### Aliases

Aliases are used to define shorthands for CSS properties, which simplifies CSS property names and supports combining multiple CSS properties.

#### Selectors

Selectors are designed to combine multiple CSS selectors, aiming to apply style rules to page elements more efficiently and flexibly.

#### Recipes

Create multi-variant styles with a type-safe runtime API, heavily inspired by [vanilla-extract](https://vanilla-extract.style/documentation/packages/recipes/).

#### Dark Mode

Dark Mode works out of the box. Additionally, dark mode styles can be easily defined within recipes.

#### Responsive Design

Define custom breakpoints and apply them directly in recipes to create responsive layouts.

## Code guidelines

- Always use the `createContext` utility from `@nex-ui/utils` instead of React's `createContext` to create context with built-in error handling and type safety.
- Always use the `ownerDocument` and `ownerWindow` from `@nex-ui/utils` instead of `document` and `window` to ensure compatibility with iframes and server-side rendering.
- Always use the `Portal` component from `@nex-ui/utils` instead of `ReactDOM.createPortal`.
- Always use the `useSlot` utility from `@nex-ui/react` to create components that support the slot pattern for better composition and flexibility.
- Prefer using function declarations over arrow functions for React components and hooks.
- Avoid unnecessary logic duplication. If two components can share logic (such as event handlers), define the logic or handlers in the parent component and share them with child components via context; use an existing context where available.
- Use `clsx` library for conditional class merging.

## Styling guidelines

- Reuse existing tokens/scales/aliases/semanticTokens/selectors/breakpoints when possible.
- Avoid hard-coded one-off values if a token exists.
- Keep variant logic consistent and discoverable.

## Key Commands

Run all commands from the **repository root** unless stated otherwise:

```bash
# Install dependencies
pnpm install

# Start development (Storybook and docs)
pnpm dev

# Start Storybook
pnpm dev:sb
# Then visit http://localhost:6006

# Start documentation site
pnpm dev:docs
# Then visit http://localhost:3000

# Build react, styled, icons, hooks, system, and utils packages
pnpm build

# Build docs
pnpm build:docs

# Build Storybook
pnpm build:sb

# Build CLI
pnpm build:cli

# Lint everything
pnpm lint

# Typecheck everything
pnpm typecheck

# Run unit tests
pnpm test

```
