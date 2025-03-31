import type { Overwrite } from '../utils'

export interface SelectorsOverrides {}

export type Selectors = Overwrite<DefaultSelectors, SelectorsOverrides>

export interface DefaultSelectors {
  hover?: '&:is(:hover, [data-hover=true]):not(:disabled, [data-disabled=true])'
  active?: '&:is(:active, [data-active=true]):not(:disabled, [data-disabled=true])'
  focus?: '&:is(:focus, [data-focus=true])'
  focusWithin?: '&:is(:focus-within, [data-focus-within=true])'
  disabled?: '&:is(:disabled, [data-disabled=true])'
  focusVisible?: '&:is(:focus-visible, [data-focus-visible=true]):not(:disabled, [data-disabled=true])'
}
