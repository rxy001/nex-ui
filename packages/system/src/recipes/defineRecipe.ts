import { isPlainObject, isArray, __DEV__ } from '@nex-ui/utils'
import { createRuntimeFn } from './createRuntimeFn'
import { mergeRecipe } from '../utils'
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
  let config = maybeConfig || extendOrConfig

  // @ts-ignore
  if (__DEV__ && config.compoundVariants && !isArray(config.compoundVariants)) {
    throw new TypeError(
      // @ts-ignore
      `[Nex UI] defineRecipe: The "compoundVariants" prop must be an array. Received: ${typeof config.compoundVariants}`,
    )
  }

  if (
    (extendOrConfig as E)?.__recipe === true &&
    (extendOrConfig as E)?.__config &&
    isPlainObject(maybeConfig)
  ) {
    config = mergeRecipe((extendOrConfig as E).__config, config)
  }

  // @ts-ignore
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
