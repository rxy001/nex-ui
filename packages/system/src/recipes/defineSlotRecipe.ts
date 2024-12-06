import { merge } from '@nex-ui/utils'
import { createRuntimeFn } from './createRuntimeFn'
import { memoizeFn } from '../utils'
import type {
  SlotGroups,
  SlotRecipeConfig,
  SlotVariantGroups,
  SlotRecipeRuntimeFn,
} from './types'

export const defineSlotRecipe = memoizeFn(function defineSlotRecipe<
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

  return runtimeFn
})
