---
name: storybook-stories-writing
description: Write multiple stories per component to describe all supported states of the component.
---

# Writing Storybook stories

This skill document describes how to write **Storybook 9** stories (React + Vite renderer) for components in **nex-ui**, following the same conventions as existing components like `Accordion`, `Alert`, `Avatar`, `Badge`, and `Button`.

> Recommended reading from the official Storybook docs:
>
> - [Stories](https://storybook.js.org/docs/9/writing-stories)
> - [CSF (Component Story Format)](https://storybook.js.org/docs/9/api/csf)
> - [Writing stories in TypeScript](https://storybook.js.org/docs/9/writing-stories/typescript)

---

## 1. File location and naming

- For each component, stories live in a `__stories__` subdirectory next to the component implementation:
  - `packages/react/src/components/<component>/__stories__/<Component>.stories.tsx`
- File names follow the pattern `<Component>.stories.tsx`:
  - Examples:
    - `Accordion.stories.tsx`
    - `Alert.stories.tsx`
    - `Avatar.stories.tsx`
    - `Badge.stories.tsx`
    - `Button.stories.tsx`

Using the same name as the component keeps Storybook’s type inference and developer navigation straightforward.

---

## 2. Basic CSF structure

All stories use **CSF (Component Story Format)** with TypeScript types:

```ts
import type { Meta, StoryObj } from '@storybook/react-vite'

// 1. Component (or wrapper template)
function ComponentTemplate(props: ComponentProps) {
  return <Component {...props} />
}

// 2. Default-exported meta
const meta = {
  title: 'Components/Component',
  component: ComponentTemplate,
  argTypes: {
    // Declare controls here
  },
} satisfies Meta<typeof ComponentTemplate>

export default meta

// 3. Story type alias
type Story = StoryObj<typeof meta>

// 4. Concrete stories
export const Default: Story = {}
export const WithSomething: Story = {
  args: {
    /* ... */
  },
}
```

In this repo you’ll see two main patterns:

- For simple components, `component` points directly to the component itself (e.g. `Avatar<'div'>`).
- For components that need fixed props or composition of multiple subcomponents, we wrap them in a `*Template` component (e.g. `AccordionTemplate`, `AlertTemplate`, `BadgeTemplate`, `ButtonTemplate`) and use that as the `component` in `meta`.

Why use fixed props?

Fixed props are usually text-based properties to improve usability. Examples include children on Button, and title and description on Alert.

Example:

```tsx
// Avatar
const meta = {
  title: 'Components/Avatar',
  component: Avatar<'div'>,
}

// Button
function ButtonTemplate(props: ButtonProps) {
  return <Button {...props}>{props.children ?? 'Button'}</Button>
}

const meta = {
  title: 'Components/Button',
  component: ButtonTemplate,
} satisfies Meta<typeof ButtonTemplate>
```

---

## 3. `title` and component grouping

- `title` uses the convention `Components/<Name>`:
  - `Accordion` → `'Components/Accordion'`
  - `Alert` → `'Components/Alert'`
  - `Avatar` → `'Components/Avatar'`
  - `Badge` → `'Components/Badge'`
  - `Button` → `'Components/Button'`
- For closely related components, each still gets its own `title`:
  - For example, `Avatar` and `AvatarGroup`:
    - `'Components/Avatar'`
    - `'Components/AvatarGroup'`

Using the `Components/` prefix keeps the Storybook sidebar organized by component.

---

## 4. `argTypes` and Controls

Use `argTypes` to describe which props are controllable in the Storybook Controls panel and how:

- **Booleans**:
  - `control: 'boolean'`
  - Examples: `disabled`, `multiple`, `hideIndicator`, `keepMounted`, `outlined`, etc.
- **Enums / string unions**:
  - Use a constant array + `control: 'select'`:
  - Example:
    - `const VARIANTS = ['outlined', 'underlined'] as const`
    - `variant: { options: VARIANTS, control: 'select' }`
  - For colors, sizes, and radii, reuse constants from `~/sb/utils`:
    - `COLORS`, `SIZES`, `RADII`, etc.
- **Numbers**:
  - `control: 'number'` (e.g. `AvatarGroup`’s `max`, `spacing`).
- **Text**:
  - `control: 'text'` (e.g. `Button`’s `href`).

Good references:

- `Accordion.stories.tsx`: `variant`, `multiple`, `keepMounted`, etc.
- `Alert.stories.tsx`: `status`, `color`, `radius`, etc.
- `Avatar.stories.tsx`, `Badge.stories.tsx`, `Button.stories.tsx`: unified treatment of size and color.

> Recommendation: if a prop is configurable and relevant for users of the docs, expose it via `argTypes`.

---

## 5. Using `args` vs `render`

### 5.1 `args`: single state stories

Use `args` when a story simply tweaks props on the default template:

- Example from `Accordion`:
  - `Multiple`, `KeepMounted`, `Disabled`, `DefaultExpanded`, `DisabledKeys`, `WithoutIndicator`, `DisableAnimation`, `CustomIndicator` are all implemented via `args`.

Typical pattern:

```ts
export const Multiple: Story = {
  args: {
    multiple: true,
    defaultExpandedKeys: ['1', '2'],
  },
}
```

### 5.2 `render`: multiple variants or complex layout

Use `render` when you need to:

- Show multiple variants at once (different `size`, `color`, `variant`, etc.), or
- Introduce layout components (e.g. `Flex`) or labels (`withLabel`), or
- Execute logic such as controlled state with `useState`.

Examples:

- `Avatar` / `Badge` / `Button` use `render*` helpers to display all `sizes`, `colors`, and `variants`.
- `Accordion`’s `Controlled` story uses `useState` to manage `expandedKeys`.

Example:

```ts
function renderSizes(props?: ButtonProps) {
  return (
    <Flex gap='5' wrap='5'>
      {SIZES.map((size) =>
        withLabel(`${toReadableSize(size)}Size`)(
          <ButtonTemplate {...props} key={size} size={size} />,
        ),
      )}
    </Flex>
  )
}

export const Sizes: Story = {
  render: renderSizes,
}
```

---

## 6. `Chromatic` stories for visual regression

Each component should define a `Chromatic` story that aggregates the most important visual states for that component. Chromatic uses this story for visual regression testing:

- **Name**: always `Chromatic`.
- **Content**: in `render`, compose multiple labeled examples (via `withLabel`) that cover:
  - Key variants (`variant`), sizes (`size`), colors (`color`), and states (`disabled`, `loading`, etc.).
  - Usually includes examples from other stories except DEFAULT.
- **Parameters**:
  - `chromatic.disable: false` (so Chromatic will capture it).
  - Turn off controls for this story: `controls.disable: true`.

You can use these as references:

- `Accordion.stories.tsx` → `Chromatic`
- `Alert.stories.tsx` → `Chromatic`
- `Avatar.stories.tsx` → `Chromatic`
- `Badge.stories.tsx` → `Chromatic`
- `Button.stories.tsx` → `Chromatic`

> When adding stories for a new component, always add a `Chromatic` story that covers a wide range of important states.

---

## 7. Shared utilities and layout (`~/sb/utils`)

To keep Storybook output consistent, nex-ui exposes a few helper utilities and constants under `~/sb/utils`:

- Constants: `SIZES`, `RADII`, `COLORS`, etc.
  - Used in `argTypes` and in `render` to ensure consistent size/radius/color sets.
- Label helpers: `toReadableSize`, `toReadableRadius`.
  - Used for nicer label text in the UI.
- Label wrapper: `withLabel(label)(node)`.
  - Used in Chromatic and variant stories to annotate each example.

Layout components:

- Most examples use `Flex` (from the component library) to arrange groups of examples horizontally or vertically. The gap property of `Flex` is '5', and the wrap property is 'wrap'.

When adding new stories, favor these helpers to keep style and structure consistent.

---

## 8. Step-by-step: stories for a new component

Assume you’ve added a `Switch` component at `packages/react/src/components/switch`.

1. **Create the story file**
   - `packages/react/src/components/switch/__stories__/Switch.stories.tsx`
2. **Import dependencies**
   - `Meta`, `StoryObj` from `@storybook/react-vite`.
   - The component: `import { Switch } from '../Switch'`.
   - If needed, import constants/utilities/layout from `~/sb/utils` and components like `Flex`.
3. **Create `SwitchTemplate` (optional)**
   - If you need fixed children or composition, add a small wrapper component and use it as `component` in `meta`.
4. **Define `meta`**
   - `title: 'Components/Switch'`.
   - `component: Switch` or `SwitchTemplate`.
   - In `argTypes`, describe the props you want to expose to controls (booleans, enums, numbers, text, etc.).
5. **Define the `Story` type alias**
   - `type Story = StoryObj<typeof meta>`.
6. **Add basic stories**
   - `Default`: baseline example.
   - Additional stories with `args` for common states (`Checked`, `Disabled`, `WithLabel`, etc.).
7. **Add grouped/variant stories**
   - Use `render` + `withLabel` + `Flex` to display combinations of sizes, colors, and states.
8. **Add the `Chromatic` story**
   - Aggregate all key states, configure `chromatic` and `controls` parameters.

---

## 9. Style and other considerations

- **TypeScript first**
  - Use `satisfies Meta<typeof Component>` instead of assertions to keep strong typing.
  - Use `StoryObj<typeof meta>` for story types instead of manually defining props.
- **Keep stories in sync with the component API**
  - When props change, update both `argTypes` and story examples.
- **Avoid business logic in stories**
  - Only keep logic that’s necessary to demonstrate component behavior (e.g. minimal `useState` for controlled components).
- **Clear naming**
  - Story names should reflect what they show: e.g. `WithAction`, `WithoutIcon`, `LoadingButton`.

Following these conventions keeps nex-ui’s Storybook documentation consistent, easy to maintain, and reliable for Chromatic-based visual regression tests.
