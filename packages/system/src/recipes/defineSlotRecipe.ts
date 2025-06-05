import { isPlainObject, isArray, __DEV__ } from '@nex-ui/utils'
import { createRuntimeFn } from './createRuntimeFn'
import { mergeRecipeConfigs } from '../utils'
import type {
  SlotGroups,
  SlotRecipeConfig,
  SlotVariantGroups,
  SlotRecipeRuntimeFn,
  CombineVariants,
  CombineSlots,
} from './types'

export function defineSlotRecipe<
  S extends SlotGroups,
  V extends SlotVariantGroups<S>,
>(config: SlotRecipeConfig<S, undefined, V>): SlotRecipeRuntimeFn<S, V>
export function defineSlotRecipe<
  S extends SlotGroups,
  E extends SlotRecipeRuntimeFn,
  V extends SlotVariantGroups<CombineSlots<S, E>>,
>(
  extend: E,
  config: SlotRecipeConfig<S, E, V>,
): SlotRecipeRuntimeFn<CombineSlots<S, E>, CombineVariants<V, E>>
export function defineSlotRecipe<
  S extends SlotGroups,
  E extends SlotRecipeRuntimeFn,
  V extends SlotVariantGroups<CombineSlots<S, E>>,
>(
  extendOrConfig: E | SlotRecipeConfig<S, undefined, V>,
  maybeConfig?: SlotRecipeConfig<S, E, V>,
) {
  const arg = maybeConfig || extendOrConfig

  if (__DEV__ && isPlainObject(arg)) {
    const config = arg as SlotRecipeConfig<S, undefined, V>
    if (config.compoundVariants && !isArray(config.compoundVariants)) {
      throw new TypeError(
        `[Nex UI] system: The "compoundVariants" prop must be an array. Received: ${typeof config.compoundVariants}`,
      )
    }
  }

  let config = extendOrConfig as
    | SlotRecipeConfig<S, undefined, V>
    | SlotRecipeConfig<S, E, V>

  if (
    (extendOrConfig as SlotRecipeRuntimeFn)?.__slotRecipe === true &&
    (extendOrConfig as SlotRecipeRuntimeFn)?.__config &&
    isPlainObject(maybeConfig)
  ) {
    config = mergeRecipeConfigs(
      (extendOrConfig as SlotRecipeRuntimeFn).__config,
      maybeConfig,
    )
  }

  const { slots, ...other } = config

  const runtimeFn = createRuntimeFn({
    mainStyles: slots,
    ...other,
  }) as any

  runtimeFn.__slotRecipe = true
  runtimeFn.__config = config
  runtimeFn.variants = config.variants ? Object.keys(config.variants) : []
  runtimeFn.slots = config.slots ? Object.keys(config.slots) : []

  return runtimeFn
}
