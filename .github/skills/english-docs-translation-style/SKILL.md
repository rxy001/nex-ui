---
name: english-docs-translation-style
description: Translate and polish English documentation with consistent, natural, developer-friendly style for nex-ui. Use when translating docs.
---

# English Docs Translation Style

This skill defines a consistent style for translating and polishing English docs in **nex-ui**.

The goal is simple: **natural English, stable terminology, and consistent tone**—without changing technical meaning.

---

## 1) Core style goals

Prioritize the following, in order:

1. **Correctness first**: preserve behavior and API semantics.
2. **Clarity**: use short, direct sentences.
3. **Consistency**: use the same terms and sentence patterns across pages.
4. **Readability**: avoid translation-ese and overly formal phrasing.

---

## 2) Voice and tone

- Use a neutral, professional developer-doc tone.
- Be concise and practical.
- Prefer active voice.
- Avoid hype unless in homepage marketing copy.
- Keep examples and descriptions scannable.

### Preferred tone examples

- ✅ “Use `checked` and `onCheckedChange` to control the Switch state.”
- ✅ “Callback fired when the value changes.”
- ✅ “NexUI provides two components for building checkboxes.”

---

## 3) Project-specific terminology

Use these terms consistently:

- Product naming in prose: **Nex UI**
- Package/API names: **NexUIProvider**, `@nex-ui/react`, component symbols as-is
- “props” not “properties” when referring to component inputs
- “controlled / uncontrolled” in standard React sense
- “callback fired…” for event descriptions
- “provides … components” for anatomy intros

---

## 4) Standard sentence patterns

Apply these patterns across docs.

### 4.1 Anatomy sections

- Prefer: `NexUI provides <number> components for building <feature>.`

### 4.2 Usage instructions

- Prefer: `Use <prop> to ...` / `Set <prop> to ...`

### 4.3 API callback descriptions

- Prefer: `Callback fired when ...`

### 4.4 TypeScript extension notes

- Prefer: `If your project uses TypeScript, you can extend ...`

### 4.5 State wording

- Prefer concrete UI states: “on/off”, “open/closed”, “selected/unselected”, “checked/unchecked”.
- Use “purely visual” when documenting presentational states like indeterminate.

### 4.6 Boolean prop descriptions in component APIs

Follow the current `en/docs/components` pattern:

- Prefer: `If true, disables ...`
- Prefer: `If true, hides ...`
- Prefer: `If true, shows ...`
- Prefer controlled state: `If true, opens/shows ... (controlled)`
- Prefer uncontrolled default state: `If true, opens/shows ... by default. (uncontrolled)`
- Prefer mounted-state wording: `If true, keeps ... mounted in the DOM when not open/expanded.`

Avoid noun-heavy or passive alternatives when an action verb works better.

---

## 5) Translation and rewrite rules

### Keep

- API names, code snippets, prop values, and behavior contracts
- Existing structure/headings unless they are clearly unnatural or inconsistent

### Rewrite

- Wordy sentences with nested clauses
- Literal translations that sound formal or unnatural
- Redundant phrases (“in order to”, “through … can …”)

### Do not do

- Do not change technical meaning.
- Do not rename public APIs.
- Do not add new product claims not present in source docs.

---

## 6) QA checklist before finishing

Run this checklist on edited docs:

1. Does every changed sentence preserve original technical meaning?
2. Are callback descriptions consistently “Callback fired when …”?
3. Are anatomy intros consistent (“NexUI provides …”)?
4. Is TypeScript extension language consistent?
5. Are there leftover translation-ese phrases or awkward long sentences?
6. Did we keep code/API identifiers unchanged?
7. Do files pass lint/error checks?
8. For component API docs, do repeated shared descriptions match the canonical phrasebook exactly?

---
