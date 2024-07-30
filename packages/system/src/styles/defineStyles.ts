import type { StyleObject } from '../types'
import type {
  VariantGroups,
  BaseStylesDefinition,
  SlotGroups,
  SlotStylesDefinition,
  StylesDefinition,
} from './types'

export function defineStyles<B extends StyleObject, V extends VariantGroups<B>>(
  options: BaseStylesDefinition<B, V>,
): BaseStylesDefinition<B, V>
export function defineStyles<S extends SlotGroups, V extends VariantGroups<S>>(
  options: SlotStylesDefinition<S, V>,
): SlotStylesDefinition<S, V>
export function defineStyles<
  S extends SlotGroups | StyleObject,
  V extends VariantGroups<S>,
>(options: StylesDefinition<S, V>) {
  return options
}
