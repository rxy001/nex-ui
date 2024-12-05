import { merge } from '@nex-ui/utils'
import { createRuntimeFn } from './createRuntimeFn'
import { memoizeFn } from '../utils'
import type {
  SlotGroups,
  SlotRecipeDefinition,
  SlotVariantGroups,
  RuntimeFn,
} from './types'
import type { StyleObject } from '../types'

export const defineSlotRecipe = memoizeFn(function defineSlotRecipe<
  S extends SlotGroups,
  V extends SlotVariantGroups<S>,
>({
  extend,
  ...args
}: SlotRecipeDefinition<S, V>): RuntimeFn<V, Record<keyof S, StyleObject>> {
  let config = args

  // @ts-ignore
  if (extend?.__original) {
    // @ts-ignore
    config = merge({}, extend.__original, config)
  }

  const { slots, ...other } = config
  const runtimeFn = createRuntimeFn({
    mainStyles: slots,
    ...other,
  })
  // @ts-ignore
  runtimeFn.__slotRecipe = true
  // @ts-ignore
  runtimeFn.__original = config
  // @ts-ignore
  runtimeFn.variants = config.variants ? Object.keys(config.variants) : []
  // @ts-ignore
  return runtimeFn
})
