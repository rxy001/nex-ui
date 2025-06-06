import { isPlainObject, isArray, __DEV__ } from '@nex-ui/utils'
import { createRuntimeFn } from './createRuntimeFn'
import { mergeRecipeConfigs } from '../utils'
import type {
  RecipeConfig,
  BaseVariantGroups,
  RecipeRuntimeFn,
  CombineVariants,
} from './types'

export function defineRecipe<V extends BaseVariantGroups>(
  config: RecipeConfig<V>,
): RecipeRuntimeFn<V>
export function defineRecipe<
  V extends BaseVariantGroups,
  E extends RecipeRuntimeFn,
>(extend: E, config: RecipeConfig<V, E>): RecipeRuntimeFn<CombineVariants<V, E>>
export function defineRecipe<
  V extends BaseVariantGroups,
  E extends RecipeRuntimeFn,
>(extendOrConfig: E | RecipeConfig<V>, maybeConfig?: RecipeConfig<V, E>) {
  const arg = maybeConfig || extendOrConfig

  if (__DEV__ && isPlainObject(arg)) {
    const config = arg as RecipeConfig<V>
    if (config.compoundVariants && !isArray(config.compoundVariants)) {
      throw new TypeError(
        `[Nex UI] system: The "compoundVariants" prop must be an array. Received: ${typeof config.compoundVariants}`,
      )
    }
  }

  let config = extendOrConfig as RecipeConfig<V> | RecipeConfig<V, E>

  if (
    (extendOrConfig as RecipeRuntimeFn)?.__recipe === true &&
    (extendOrConfig as RecipeRuntimeFn)?.__config &&
    isPlainObject(maybeConfig)
  ) {
    config = mergeRecipeConfigs(
      (extendOrConfig as RecipeRuntimeFn).__config,
      maybeConfig,
    )
  }

  const { base, ...other } = config
  const runtimeFn = createRuntimeFn({
    mainStyles: base,
    ...other,
  }) as any

  runtimeFn.__recipe = true
  runtimeFn.__config = config
  runtimeFn.variants = config.variants ? Object.keys(config.variants) : []

  return runtimeFn
}
