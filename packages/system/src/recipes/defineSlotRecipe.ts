import { isPlainObject } from '@nex-ui/utils'
import { createRuntimeFn } from './createRuntimeFn'
import { memoizeFn, mergeRecipe } from '../utils'
import type {
  SlotGroups,
  SlotRecipeConfig,
  SlotVariantGroups,
  SlotRecipeRuntimeFn,
  CombineVariants,
  CombineSlots,
} from './types'

function defineSlotRecipeImpl<
  S extends SlotGroups,
  V extends SlotVariantGroups<S>,
>(config: SlotRecipeConfig<S, undefined, V>): SlotRecipeRuntimeFn<S, V>
function defineSlotRecipeImpl<
  S extends SlotGroups,
  E extends SlotRecipeRuntimeFn,
  V extends SlotVariantGroups<CombineSlots<S, E>>,
>(
  extend: E,
  config: SlotRecipeConfig<S, E, V>,
): SlotRecipeRuntimeFn<CombineSlots<S, E>, CombineVariants<V, E>>
function defineSlotRecipeImpl<
  S extends SlotGroups,
  E extends SlotRecipeRuntimeFn,
  V extends SlotVariantGroups<CombineSlots<S, E>>,
>(
  extendOrConfig: E | SlotRecipeConfig<S, undefined, V>,
  maybeConfig?: SlotRecipeConfig<S, E, V>,
) {
  let config = maybeConfig || extendOrConfig

  if (
    (extendOrConfig as E)?.__slotRecipe === true &&
    (extendOrConfig as E)?.__config &&
    isPlainObject(maybeConfig)
  ) {
    config = mergeRecipe((extendOrConfig as E).__config, config)
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

export const defineSlotRecipe = memoizeFn(defineSlotRecipeImpl)
