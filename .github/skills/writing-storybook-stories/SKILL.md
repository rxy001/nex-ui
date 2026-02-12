---
name: writing-storybook-stories
description: Write multiple stories per component to describe all supported states of the component.
---

# Writing Storybook Stories

This skill document describes how to write **Storybook 9** stories (React + Vite renderer) for components in **nex-ui**, based on the actual patterns used under `packages/react/src/**/*.stories.tsx`.

It covers:

- Where story files live and how they’re named.
- How to write CSF meta and stories with TypeScript.
- When to use `StoryObj` vs plain function stories.
- How we organize stories for controls, variants, and Chromatic visual tests.

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
    - `Tooltip.stories.tsx`
    - `Modal.stories.tsx`
    - `Menu.stories.tsx`

Using the same name as the component keeps Storybook’s type inference and developer navigation straightforward.

---

## 2. Basic CSF structure

All stories follow **CSF (Component Story Format)** and use TypeScript types from `@storybook/react-vite`.

The canonical pattern (used by most visual components) is:

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

// 4. Concrete stories using args
export const Default: Story = {}
export const WithSomething: Story = {
  args: {
    /* ... */
  },
}
```

In the codebase you’ll see two main variants of this pattern:

1. **Meta component is the real component**
   - Example: `Avatar.stories.tsx`
   - `component: Avatar<'div'>`.
2. **Meta component is a wrapper template**
   - Used when stories should fix certain props or compose multiple subcomponents.
   - Examples: `AccordionTemplate`, `AlertTemplate`, `BadgeTemplate`, `ButtonTemplate`, `CheckboxTemplate`, `CardHeaderTemplate`, `ModalTemplate`, `TooltipTemplate`.

Why use templates?

- To fix text props (button label, alert title/description, etc.) so docs are clearer.
- To avoid repeating complex layout/children wiring in every story.

Example from the repo:

```tsx
// Avatar
const meta = {
  title: 'Components/Avatar',
  component: Avatar<'div'>,
} satisfies Meta<typeof Avatar<'div'>>

// Button
function ButtonTemplate(props: ButtonProps) {
  return <Button {...props}>{props.children ?? 'Button'}</Button>
}

const meta = {
  title: 'Components/Button',
  component: ButtonTemplate,
} satisfies Meta<typeof ButtonTemplate>
```

Some story files (e.g. `Menu.stories.tsx`) use only function stories and a `Meta` without a `component` because they demonstrate behavior rather than pure visual variants. That pattern is also allowed when it matches the existing usage.

---

## 3. `title` and story grouping

There are two main top-level groups in `title`:

- **Components**: visual building blocks
  - `Button` → `'Components/Button'`
  - `Input` → `'Components/Input'`
  - `Avatar` → `'Components/Avatar'`
  - `Card` → `'Components/Card'`
  - `Checkbox` → `'Components/Checkbox'`
  - `Badge` → `'Components/Badge'`
  - `Accordion` → `'Components/Accordion'`
  - `Tooltip` → `'Components/Tooltip'`
  - etc.
- **Utilities**: structural or behavioral utilities
  - `Modal` → `'Utilities/Modal'`
  - `Menu` → `'Utilities/Menu'`

Closely related components still get their own `title`:

- `Avatar` → `'Components/Avatar'`
- `AvatarGroup` → `'Components/AvatarGroup'`

Use these same prefixes when adding new stories to keep the Storybook sidebar consistent.

---

## 4. `argTypes` and Controls

Use `argTypes` to drive the Controls panel. Conventions in `packages/react/src/**/*.stories.tsx`:

- **Booleans** (`control: 'boolean'`)
  - Examples: `disabled`, `multiple`, `hideIndicator`, `keepMounted`, `outlined`, `closable`, `loading`, `disableAnimation`, `hoverable`, etc.
- **Enums / string unions** (`control: 'select'` with `options`)
  - Use a constant array or shared constants:
  - Example:
    - `const VARIANTS = ['outlined', 'underlined'] as const`
    - `variant: { options: VARIANTS, control: 'select' }`
  - Colors, sizes, radii:
    - `COLORS`, `SIZES`, `RADII` from `~/sb/utils`.
  - Component-specific options:
    - `PLACEMENTS` for `Tooltip`.
    - `SHADOWS` for `Card`.
    - `LABEL_PLACEMENTS` for `Input`.
- **Numbers** (`control: 'number'`)
  - Examples: `max`, `spacing` on `AvatarGroup`; `openDelay` / `closeDelay` for `Tooltip`.
- **Text** (`control: 'text'`)
  - Example: `href` on `Button`.

Typical meta snippet:

```ts
const meta = {
  title: 'Components/Tooltip',
  component: TooltipTemplate,
  argTypes: {
    color: {
      options: COLORS,
      control: 'select',
    },
    size: {
      options: SIZES,
      control: 'select',
    },
    radius: {
      options: RADII,
      control: 'select',
    },
    placement: {
      options: PLACEMENTS,
      control: 'select',
    },
    closeDelay: {
      control: 'number',
    },
    // ...
  },
} satisfies Meta<typeof TooltipTemplate>
```

> Guidance: if a prop is important for consumers and safe to change at runtime, expose it via `argTypes`.

Controls can also be disabled at the **meta** level when a story file is purely behavioral (e.g. `Menu.stories.tsx`):

```ts
const meta = {
  title: 'Utilities/Menu',
  parameters: {
    controls: {
      disable: true,
    },
  },
} satisfies Meta
```

---

## 5. `StoryObj` vs function stories

There are two ways stories are written in this repo:

1. **Object stories** using `StoryObj` (recommended for single-state + Chromatic stories)
2. **Plain function stories** (recommended for galleries of variants)

### 5.1 Object stories with `StoryObj`

Used for single states and for the `Chromatic` story:

```ts
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
```

Use `args` to describe one specific combination of props. This pattern is widely used in `Accordion`, `Alert`, `Avatar`, `Badge`, `Button`, `Checkbox`, `Input`, `Modal` (e.g. `DisableAnimations`), etc.

### 5.2 Function stories for variant galleries

Stories that render many variants at once are usually exported as plain functions that accept the component’s props type:

```ts
export function Colors(props: BadgeProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {COLORS.map((color) => (
        <WithLabel key={color} label={`${upperFirst(color)}Color`}>
          <BadgeTemplate {...props} color={color} />
        </WithLabel>
      ))}
    </Flex>
  )
}

export function Sizes(props: ButtonProps) {
  return (
    <Flex gap='5' wrap='wrap'>
      {SIZES.map((size) => (
        <WithLabel key={size} label={`${toReadableSize(size)}Size`}>
          <ButtonTemplate {...props} size={size} />
        </WithLabel>
      ))}
    </Flex>
  )
}
```

This style is used heavily in `Button`, `Avatar`, `Badge`, `Checkbox`, `Input`, `Card`, `Tooltip`, etc.

> When adding **gallery**-style stories (many variants in one view), follow the function-story pattern above instead of `StoryObj`.

### 5.3 Controlled examples

When demonstrating controlled behavior, stories use `useState` inside a function story:

```ts
export function Controlled(props: CheckboxProps) {
  const [checked, setChecked] = useState(false)

  return (
    <div>
      <CheckboxTemplate
        {...props}
        checked={checked}
        onCheckedChange={setChecked}
      >
        Controlled Checkbox
      </CheckboxTemplate>
      <p>checked: {checked ? 'true' : 'false'}</p>
    </div>
  )
}
```

Follow this pattern for other controlled components like `Accordion`, `Input`, `Tooltip`, and `Modal`.

---

## 6. `Chromatic` stories for visual regression

Visual components generally define a `Chromatic` story that aggregates the most important visual states. Chromatic uses this story for visual regression testing.

Pattern:

- **Name**: `Chromatic`.
- **Type**: `StoryObj<typeof meta>` with a `render` function.
- **Content**: render labeled examples using `<WithLabel>` and gallery function stories.
- **Parameters**:
  - `chromatic.disable: false`.
  - `controls.disable: true`.

Example taken from `Button.stories.tsx`:

```ts
export const Chromatic: Story = {
  render: () => (
    <>
      <Flex gap='5' wrap='wrap'>
        <WithLabel label='LoadingButton'>
          <ButtonTemplate {...LoadingButton.args} />
        </WithLabel>
        {/* ...other labeled single-state examples... */}
      </Flex>
      <Variants />
      <Colors />
      <Sizes />
      <Radii />
    </>
  ),
  parameters: {
    controls: {
      disable: true,
    },
    chromatic: {
      disable: false,
    },
  },
}
```

Similar patterns exist in `Accordion`, `Alert`, `Avatar`, `Badge`, `Checkbox`, `Card`, etc.

> When adding stories for a new visual component, always add a `Chromatic` story that reuses the existing single-state and gallery stories where possible.

---

## 7. Shared utilities and layout (`~/sb/utils`)

To keep Storybook output consistent, nex-ui exposes several utilities in `~/sb/utils` used throughout `packages/react/src/**/*.stories.tsx`:

- **Constants**: `SIZES`, `RADII`, `COLORS`, etc.
  - Used for both `argTypes.options` and in gallery stories.
- **Label helpers**: `toReadableSize`, `toReadableRadius`.
  - Provide readable labels like `SmallSize`, `LgRadius`, etc.
- **Label wrapper component**: `<WithLabel label={label}>{children}</WithLabel>`.
  - Wraps each example with a label, especially in Chromatic and gallery stories.

Layout components:

- `Flex` is used for layout in almost all galleries:
  - `gap='5'`.
  - `wrap='wrap'` for multi-row layouts.
  - Optional `align` / `justify` / `direction` when needed.
- `Box` is used when additional styling is required (e.g. `BlurredCard`).

When adding new stories, prefer these shared utilities and layout components to match the existing look and feel.

---

## 8. Step-by-step: adding stories for a new component

Assume you’ve added a `Switch` component at `packages/react/src/components/switch`.

1. **Create the story file**
   - `packages/react/src/components/switch/__stories__/Switch.stories.tsx`.
2. **Import dependencies**
   - `Meta`, `StoryObj` from `@storybook/react-vite`.
   - The component: `import { Switch } from '../Switch'`.
   - Optional: `SIZES`, `COLORS`, `RADII`, `WithLabel` from `~/sb/utils`, and `Flex` from `../../flex`.
3. **Create `SwitchTemplate` (optional)**
   - If you need fixed children or composition, add a wrapper and set it as `component` in `meta`.
4. **Define `meta`**
   - `title: 'Components/Switch'`.
   - `component: Switch` or `SwitchTemplate`.
   - `argTypes` for booleans, enums, numbers, and text props that should have controls.
5. **Define the `Story` type alias**
   - `type Story = StoryObj<typeof meta>`.
6. **Add single-state stories with `args`**
   - `Default`, `Disabled`, `Checked`, `WithLabel`, etc.
7. **Add gallery stories as functions**
   - For example, `Colors`, `Sizes`, `Radii`, using `<WithLabel>` and `Flex` as in `Checkbox` or `Button` stories.
8. **Add a `Controlled` function story (if relevant)**
   - Use `useState` to show controlled usage.
9. **Add the `Chromatic` story**
   - As a `StoryObj` with `render` that composes your single-state and gallery stories and sets `chromatic` / `controls` parameters.

---

## 9. Style and other considerations

- **TypeScript first**
  - Use `satisfies Meta<typeof Component>` to keep meta strongly typed.
  - Use `StoryObj<typeof meta>` instead of hand-written prop types for object stories.
- **Stay aligned with component APIs**
  - When props change, update `argTypes`, `Default` / other single-state stories, and `Chromatic` accordingly.
- **Keep stories focused on UI behavior**
  - Use minimal state (`useState`) only to demonstrate controlled patterns or nested/complex compositions (see `Modal` and `Menu`).
- **Clear, descriptive naming**
  - Follow existing names: `WithAction`, `WithoutIcon`, `LoadingButton`, `DefaultOpen`, `DisableAnimations`, etc.

Following these conventions—derived directly from `packages/react/src/**/*.stories.tsx`—keeps nex-ui’s Storybook stories consistent, discoverable, and reliable for both developers and visual regression tooling like Chromatic.
