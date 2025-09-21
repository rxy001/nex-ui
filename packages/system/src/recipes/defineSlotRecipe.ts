import { isArray, __DEV__ } from '@nex-ui/utils'
import { createRuntimeFn } from './createRuntimeFn'
import { mergeRecipeConfigs } from '../utils'
import type {
  SlotGroups,
  SlotRecipeConfig,
  SlotVariantGroups,
  SlotRecipeRuntimeFn,
  MergeVariants,
  MergeSlots,
} from './types'

export function defineSlotRecipe<
  Slots extends SlotGroups,
  RuntimeFn extends SlotRecipeRuntimeFn | undefined = undefined,
  Variants extends SlotVariantGroups<
    MergeSlots<Slots, RuntimeFn>
  > = SlotVariantGroups<MergeSlots<Slots, RuntimeFn>>,
>(
  config: SlotRecipeConfig<Slots, RuntimeFn, Variants>,
): SlotRecipeRuntimeFn<
  MergeSlots<Slots, RuntimeFn>,
  MergeVariants<Variants, RuntimeFn>
> {
  if (__DEV__) {
    if (config.compoundVariants && !isArray(config.compoundVariants)) {
      throw new TypeError(
        `[Nex UI] system: The "compoundVariants" prop must be an array. Received: ${typeof config.compoundVariants}`,
      )
    }
  }

  // eslint-disable-next-line prefer-const
  let { extend, ...other } = config

  if (extend && extend.__slotRecipe === true && extend.__config) {
    other = mergeRecipeConfigs(extend.__config, other)
  }

  const { slots, ...o } = other

  const runtimeFn = createRuntimeFn({
    mainStyles: slots,
    ...o,
  }) as any

  runtimeFn.__slotRecipe = true
  runtimeFn.__config = other
  runtimeFn.variants = other.variants ? Object.keys(other.variants) : []
  runtimeFn.slots = other.slots ? Object.keys(other.slots) : []

  return runtimeFn
}
