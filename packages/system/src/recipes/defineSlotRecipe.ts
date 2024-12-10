import { merge } from '@nex-ui/utils'
import { createRuntimeFn } from './createRuntimeFn'
import { memoizeFn } from '../utils'
import type {
  SlotGroups,
  SlotRecipeConfig,
  SlotVariantGroups,
  SlotRecipeRuntimeFn,
} from './types'

function defineSlotRecipeImpl<
  S extends SlotGroups,
  V extends SlotVariantGroups<S>,
>({ extend, ...args }: SlotRecipeConfig<S, V>) {
  let config = args

  if (extend?.__slotRecipe === true && extend?.__config) {
    config = merge({}, extend.__config, config)
  }

  const { slots, ...other } = config

  const runtimeFn = createRuntimeFn({
    mainStyles: slots,
    ...other,
  }) as SlotRecipeRuntimeFn<S, V>

  runtimeFn.__slotRecipe = true
  runtimeFn.__config = config
  runtimeFn.variants = config.variants ? Object.keys(config.variants) : []
  runtimeFn.slots = config.slots ? Object.keys(config.slots) : []

  return runtimeFn
}

export const defineSlotRecipe = memoizeFn(defineSlotRecipeImpl)
