import { merge } from '@nex-ui/utils'
import { createRuntimeFn } from './createRuntimeFn'
import { memoizeFn } from '../utils'
import type { RecipeConfig, BaseVariantGroups, RecipeRuntimeFn } from './types'

function defineRecipeImpl<V extends BaseVariantGroups>({
  extend,
  ...args
}: RecipeConfig<V>) {
  let config = args

  if (extend?.__recipe === true && extend?.__config) {
    config = merge({}, extend.__config, config)
  }

  const { base, ...other } = config
  const runtimeFn = createRuntimeFn({
    mainStyles: base,
    ...other,
  }) as RecipeRuntimeFn<V>

  runtimeFn.__recipe = true
  runtimeFn.__config = config
  runtimeFn.variants = config.variants ? Object.keys(config.variants) : []

  return runtimeFn
}

export const defineRecipe = memoizeFn(defineRecipeImpl)
