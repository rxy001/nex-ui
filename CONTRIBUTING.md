# Contributing Guide

Thanks for showing interest to contribute to Nex UI ✨, you rock!

> We welcome all contributions, no matter how big or small.

## Tooling

- [PNPM](https://pnpm.io/) to manage packages and dependencies.
- [Rolldown](https://rolldown.rs/) to bundle packages.
- [Storybook](https://storybook.js.org/) for rapid UI component development and
  testing.
- [Testing Library](https://testing-library.com/) for testing components and
  hooks.
- [Changeset](https://github.com/atlassian/changesets) for changes
  documentation, changelog generation, and release management.

## Development Setup

- Clone the repository

```bash
git clone https://github.com/rxy001/nex-ui.git
```

- Install dependencies with pnpm

```bash
pnpm i
```

- Build local version of all packages

```bash
pnpm build
```

- Start storybook

```bash
pnpm dev:sb
```

- Start documentation website

```bash
pnpm dev:docs
```

- Run tests

```bash
pnpm test
```

## Recommended Extensions

We recommend using the following extensions in your editor:

- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [MDX](https://mdxjs.com/)
