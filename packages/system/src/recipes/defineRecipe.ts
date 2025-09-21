import { isArray, __DEV__ } from '@nex-ui/utils'
import { createRuntimeFn } from './createRuntimeFn'
import { mergeRecipeConfigs } from '../utils'
import type {
  RecipeConfig,
  BaseVariantGroups,
  RecipeRuntimeFn,
  MergeVariants,
} from './types'

export function defineRecipe<
  Variants extends BaseVariantGroups,
  RuntimeFn extends RecipeRuntimeFn | undefined = undefined,
>(
  config: RecipeConfig<Variants, RuntimeFn>,
): RecipeRuntimeFn<MergeVariants<Variants, RuntimeFn>> {
  if (__DEV__) {
    if (config.compoundVariants && !isArray(config.compoundVariants)) {
      throw new TypeError(
        `[Nex UI] system: The "compoundVariants" prop must be an array. Received: ${typeof config.compoundVariants}`,
      )
    }
  }

  // eslint-disable-next-line prefer-const
  let { extend, ...other } = config

  if (extend && extend.__recipe === true && extend.__config) {
    other = mergeRecipeConfigs(extend.__config, other)
  }

  const { base, ...o } = other
  const runtimeFn = createRuntimeFn({
    mainStyles: base,
    ...o,
  }) as any

  runtimeFn.__recipe = true
  runtimeFn.__config = other
  runtimeFn.variants = other.variants ? Object.keys(other.variants) : []

  return runtimeFn
}
