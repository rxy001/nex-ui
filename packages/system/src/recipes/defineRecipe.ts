import { merge } from '@nex-ui/utils'
import { createRuntimeFn } from './createRuntimeFn'
import { memoizeFn } from '../utils'
import type {
  RecipeConfig,
  BaseVariantGroups,
  RecipeRuntimeFn,
  CombineVariants,
} from './types'

function defineRecipeImpl<V extends BaseVariantGroups>(
  config: RecipeConfig<V>,
): RecipeRuntimeFn<V>
function defineRecipeImpl<
  V extends BaseVariantGroups,
  E extends RecipeRuntimeFn,
>(extend: E, config: RecipeConfig<V, E>): RecipeRuntimeFn<CombineVariants<V, E>>
function defineRecipeImpl<
  V extends BaseVariantGroups,
  E extends RecipeRuntimeFn,
>(extendOrConfig: E | RecipeConfig<V>, maybeConfig?: RecipeConfig<V, E>) {
  let config: RecipeConfig<any> = maybeConfig || extendOrConfig

  if (
    (extendOrConfig as E)?.__recipe === true &&
    (extendOrConfig as E)?.__config
  ) {
    config = merge({}, (extendOrConfig as E).__config, config)
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

export const defineRecipe = memoizeFn(defineRecipeImpl)
